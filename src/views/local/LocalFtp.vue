<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <ftpAdd style="float: right"></ftpAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data3">
                    <template slot-scope="{ row, index }" slot="state">
                        <!--                        <strong>{{ row.name }}</strong>-->
                        <Button :icon="data3[index].iconName" size="small" style="margin: auto" @click="updateState(index)">
                                <span :style="{'color':data3[index].color}">
                                    {{ row.state }}
                                </span>
                        </Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateFtp(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteFtp(row.id,index)">删除</Button>
                    </template>
                </Table>
                <Page :current.sync="currentPage"
                            :total="dataCount"
                            show-elevator
                            :page-size="pageSize"
                            :show-total="true"
                            style="margin-top:10px;"
                            @on-change="changepage" />
            </div>
        </div>

        <Drawer title="本地FTP服务" v-model="modal.show" width="50%">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="用户名" prop="username" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.username" />
                </FormItem>
                <FormItem label="密码" prop="password" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.password" type="password"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import ftpAdd from "./LocalFtpAdd";
    export default {
        name: "LocalFtp",
        components: {
            jk_tabs: JkTabs,ftpAdd
        },
        inject: ["reload"],
        data(){
            return {
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 10,
                columns1: [
                    {title: '序号', key: 'id', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: '用户名', key: 'username', align: 'center'},
                    {title: 'FTP目录', key: 'path', align: 'center'},
                    {title: '状态', slot: 'state', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "FTP服务", to: "/local/ftp"},
                    {name: "强制访问控制", to: "/local/accessControl"},
                    // {name: "FTP安全代理", to: "/local/proxy"},
                ],
                modal: {
                    show: false,
                    form: {
                        username: null,
                        password: null,
                        path: null,
                        state: null
                    },
                    rules:{
                        username: [
                            { required: true, max:30, pattern: /^[a-zA-Z0-9_\s]*$/, message: '用户名请输入数字或英文或下划线', trigger: 'blur' },
                            {  max:30, message: '长度不超过30', trigger: 'blur' },
                            {  min:3, message: '长度请大于3', trigger: 'blur' }
                        ],
                        password: [
                            { required: true, pattern: /^[a-zA-Z0-9_\s]*$/, message: '请输入数字或英文或下划线的组合', trigger: 'blur' },
                            {  max:20, message: '长度不超过20', trigger: 'blur' },
                            {  min:6, message: '长度请大于6', trigger: 'blur' }
                        ],
                    }
                },
                data1: [],
                data3: [],
                iconName: null,
                api: null,
                stateTitle: null,
                stateContent: null
            }
        },
        mounted: function() {
            // this.showIpAddr();
            this.test();
            // this.push();
        },
        methods: {
            //分页下一页点击事件
            changepage(index) {
                // this.currentPage = index;
                // var _start = (index - 1) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.data3 = this.data1.slice(_start, _end);
                // for(let i in this.data3){
                //         if(this.data3[i].state == "disable"){
                //             this.data3[i]["state"] = "已禁用";
                //             this.data3[i]["color"] = "red";
                //             this.data3[i]["iconName"] = "ios-play";
                //         }else {
                //             this.data3[i]["state"] = "启用中";
                //             this.data3[i]["color"] = "green";
                //             this.data3[i]["iconName"] = "ios-pause";
                //         }
                //     }
            },
            test(){
                this.$https.fetchGet(this.$api.local.findFtpInfo.url).then((resp) => {
                    this.data1 = resp.data.data;
                    this.dataCount = resp.data.data.length
                    this.data3 = this._.cloneDeep(resp.data.data)
                    console.log(this.data1,"data1")
                    for(var i in this.data3){
                        if(this.data3[i].state == "stop"){
                            this.data3[i]["state"] = "已禁用";
                            this.data3[i]["color"] = "red";
                            this.data3[i]["iconName"] = "ios-pause";
                        }else {
                            this.data3[i]["state"] = "启用中";
                            this.data3[i]["color"] = "green";
                            this.data3[i]["iconName"] = "ios-play";
                        }
                    }                }).catch(err => {
                    console.log(err)
                })
            },
            deleteFtp(index,i) {
                if(this.data1[i].state == "start"){
                    this.$Notice.error({title: '启用中无法修改', duration: 2.5});
                    return
                }
                this.$Modal.confirm({
                    title: '删除FTP服务',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.local.delFtp.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('FTP服务删除成功');
                                setTimeout(() => {
                                    this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({
                                    title: 'FTP服务删除失败',
                                    desc: "错误：" + resp.data.desc,
                                    duration: 5
                                });
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            updateState(index){
                if(this.data1[index]["state"] == "stop"){
                    this.stateTitle = "启用服务";
                    this.stateContent = "确定要启用此服务吗?";
                    this.modal.form.state = "start";
                    this.api = this.$api.local.startFtp.url;
                }else {
                    this.stateTitle = "禁用服务";
                    this.stateContent = "确定要禁用此服务吗?";
                    this.modal.form.state = "stop";
                    this.api = this.$api.local.stopFtp.url;
                }
                this.modal.form.username = this.data1[index]["username"];
                this.modal.form.password = this.data1[index]["password"];
                this.modal.form.path = this.data1[index]["path"];
                this.modal.form.id = this.data1[index]["id"];
                this.$Modal.confirm({
                    title: this.stateTitle,
                    content: '<p>'+this.stateContent+'</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchPost(this.api, this.modal.form).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '服务配置成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                            } else{
                                this.$Modal.remove();
                                this.$Notice.error({
                                    title: '服务配置失败',
                                    desc: "错误：" + resp.data.desc,
                                    duration: 5
                                });
                            }
                                
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        });
                    }
                });
            },
            updateFtp(index) {
                if(this.data1[index].state == "start"){
                    this.$Notice.error({title: '启用中无法修改', duration: 2.5});
                    return
                }
                this.modal.show = true;
                this.modal.form.id = this.data1[index].id;
                this.modal.form.username = this.data1[index].username;
                this.modal.form.password = this.data1[index].password;
                this.modal.form.path = this.data1[index].path;
                this.modal.form.state = this.data1[index].state;
                
                if(this.data1[index]["state"] == "stop") { this.modal.form.state = "stop" }
                else { this.modal.form.state = "start" }
            },

            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },
            addPlatForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.modal.form.path = "/home/ftp/"+this.modal.form.username;
                    this.$https.fetchPost(this.$api.local.updateFtp.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: 'FTP服务修改成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: 'FTP服务修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            }
        }
    }
</script>

<style scoped>
</style>