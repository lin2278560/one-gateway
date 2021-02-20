<template>
    <div class="container-fluid" @click="index = null">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
<!--                    <dbsync style="float: right;"></dbsync>-->
                    <!--                    <span style="color: #e86429;">FTP服务</span>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">强制访问控制</a>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">FTP安全代理</a>-->
<!--                    <form class="form-inline pull-right" style="float: right">-->
<!--                        <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal">添加内网客户端</div>-->
<!--                    </form>-->
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
<!--                <Table size="small" border :columns="columns1" :data="data1">-->
<!--                    <template slot-scope="{ row, index }" slot="action">-->
<!--&lt;!&ndash;                        <Button type="update" size="small" style="margin-right: 5px" @click="updateFtpProxy(index)">修改</Button>&ndash;&gt;-->
<!--&lt;!&ndash;                        <Button type="del" size="small" @click="deleteFtpProxy(row.id)">删除</Button>&ndash;&gt;-->
<!--                        <div class="btn-group"><div type="button" class="btn btn-custom dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">配置管理&nbsp;<span class="caret"></span></div><ul class="dropdown-menu"><li><a class="clear_queue" queuename="DATA_ASYNC1" is_allow_send="true" is_allow_recv="true">清空队列</a></li><li><a class="update_queue" queuename="DATA_ASYNC1" is_allow_send="true" is_allow_recv="true">修改队列</a></li><li><a class="delete_queue" queuename="DATA_ASYNC1" is_allow_send="true" is_allow_recv="true">删除队列</a></li><li><a class="find_queue" queuename="DATA_ASYNC1" onclick="">查看队列</a></li></ul></div>-->
<!--                    </template>-->
<!--                </Table>-->
                <table class="table" style="width:100%;border: 1px solid #dcdee2;font-size: 12px;color: #515a6e;">
                    <thead>
                    <tr id="first">
                        <th>业务/服务名</th>
                        <th>服务ID</th>
                        <th>服务类型</th>
                        <th>服务状态</th>
                        <th>主管部门</th>
                        <th>主管人</th>
                        <th>联系电话</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody v-for="(d,idx) in data1" :key="idx">
                    <tr class="gradeX">
                        <td>{{d.taskname}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{{d.department}}</td>
                        <td>{{d.master}}</td>
                        <td>{{d.contact}}</td>
                        <td><div class="btn-group">
<!--                                <div type="button" class="btn btn-custom dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">配置管理&nbsp;<span class="caret"></span></div>-->
                                <Button type="primary" @click.stop="addPlatForm(idx)">配置管理&nbsp;<span class="caret"></span></Button>
                                <ul class="dropdown-menu" :class="idx==index?'open-dropdown-menu':''">
                                    <li><a>数据库同步</a></li>
<!--                                    <li><a>文件同步</a></li>-->
                                    <dbsync @click.native="byBusinessID(d.id)"></dbsync>
                                    <li><a @click="updateBusiness(idx)">修改业务</a></li>
                                    <li><a @click="deleteBusiness(d.id)">删除业务</a></li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                    <tr class="gradeX" v-for="(i,j) in d.filesync" :key="j">
                        <td>{{i.servicename}}</td>
                        <td>{{i.out_task_id}}</td>
                        <td>{{"文件同步"}}</td>
                        <td>{{i.runstate}}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><div class="btn-group">
                            <Button type="primary" @click.stop="addPlatForm(j)">配置管理&nbsp;<span class="caret"></span></Button>
                            <ul class="dropdown-menu" :class="j==index?'open-dropdown-menu':''">
                                <li><a>服务启停</a></li>
                                <dbsync_file_update @click.native="byFileIndex(idx,j)"></dbsync_file_update>
                                <li><a @click="deleteService(d.id,j)">删除服务</a></li>
                                <li><a @click="showService(idx,j)">查看配置</a></li>
                            </ul>
                        </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
<!--            <div v-bind="aa">-->
<!--                <span v-if="render" class="header-span">-->
<!--                </span>-->
<!--            </div>-->
<!--            <SimpleTable v-bind="sysOperLogTable"/>-->
<!--            <Button type="primary" @click="gotolink">弹框</Button>-->
        </div>

        <Modal
                title="Title"
                v-model="modal10"
                class-name="vertical-center-modal">
<!--            <p>资源类型: &nbsp;&nbsp;外端服务ID: &nbsp;&nbsp;服务名称: &nbsp;&nbsp;用户名:</p>-->
<!--            <p>密码:</p>-->
            <div style="height: 50px;">
<!--            <div v-for="(i,j) in data2">-->
                <span style="width: 200px;float: left;" v-for="(i,j) in data2" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</span>
            </div>
        </Modal>

        <Drawer title="业务注册" v-model="register.show" width="1000">
            <Form ref="info_form" :rules="register.rules" :model="register.form"
                  :label-width="150">
                <FormItem label="业务名称" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="register.form.taskname" />
                </FormItem>
                <FormItem label="主管部门" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="register.form.department" />
                </FormItem>
                <FormItem label="主管人" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="register.form.master" />
                </FormItem>
                <FormItem label="联系电话" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="register.form.contact" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addregisterForm">确认</Button>
<!--                    <Button style="margin-left: 8px" @click="restregisterForm">重置</Button>-->
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    // @ is an alias to /src
    import JkTabs from "@/components/JkTabs.vue";
    import dbsync from "./dbsync_file_edit2";
    import dbsync_file_update from "./dbsync_file_edit_update";

    export default {
        components: {
            jk_tabs: JkTabs,dbsync,dbsync_file_update
        },
        data() {
            return {
                index: null,
                links: [
                    {name: "业务/服务列表", to: "/data/fileSync1"}
                ],
                // columns1: [
                //     {title: '业务/服务名', key: 'taskname', align: 'center'},
                //     {title: '服务ID', key: '', align: 'center'},
                //     {title: '服务类型', key: '', align: 'center'},
                //     {title: '服务状态', key: '', align: 'center'},
                //     {title: '主管部门', key: 'department', align: 'center'},
                //     {title: '主管人', key: 'master', align: 'center'},
                //     {title: '联系电话', key: 'contact', align: 'center'},
                //     {title: '操作', slot: 'action', width: 150, align: 'center'}
                // ],
                register: {
                    show: false,
                    form: {
                        id: null,
                        taskname: null,
                        department: null,
                        master: null,
                        contact: null
                    }
                },
                size_show: null,
                data1: [
                    // {"taskname": "test1","master": "张三","department": "研发","contact": "123"}
                    {"contact":"123",
                        "dbsync":{},
                        "department":"研发",
                        "filesync":{
                            "NUM2":{
                                "id":"NUM2",
                                "iocharset":"UTF-8",
                                "ipaddress":"192.168.5.235",
                                "level":"1",
                                "operation":"删除",
                                "out_task_id":"99",
                                "password":"123456",
                                "path":"/test",
                                "remotrport":"8080",
                                "runstate":"stop",
                                "servicename":"fileSync",
                                "time_interval":"3",
                                "type":"ftp",
                                "username":"wukz"
                            },
                            "NUM1":{
                                "id":"NUM1",
                                "iocharset":"1",
                                "ipaddress":"1",
                                "level":"1",
                                "operation":"1",
                                "out_task_id":"10000",
                                "password":"1",
                                "path":"/hoem",
                                "remotrport":"1",
                                "runstate":"run",
                                "servicename":"44444",
                                "time_interval":"1",
                                "type":"本地FTP",
                                "username":"1"
                            }
                        },
                        "id":"NUM1",
                        "master":"张三",
                        "taskname":"table-expand.vue"}
                ],
                data2: [],
                modal10: false
            }
        },
        computed: {},
        mounted: function() {
            this.showSyncTaskInfo();
            document.addEventListener('click',function(e){
                if(e.target.className!='usermessage'){
                    this.index = null;
                }
            })
        },
        methods: {
            addPlatForm(idx) {
                if(this.index == null) {
                    this.index = idx;
                }else {
                    this.index = null;
                }
            },
            byBusinessID(id) {
                this.$storage.setStorage("businessID", id);
                console.log(this.$storage.getStorage("businessID"));
            },
            byFileIndex(idx,index) {
                this.$storage.setStorage("businessIndex", idx);
                this.$storage.setStorage("FileIndex", index);
            },
            gotolink(){
                //点击跳转至上次浏览页面
                // this.$router.go(-1)
                //指定跳转地址
                // this.$router.replace('/login')
                this.$router.replace('/network/channel');
            },
            showService(idx,index) {
                this.data2 = [{name: "资源类型",val: this.data1[idx].filesync[index].type},
                    {name: "外端服务ID",val: this.data1[idx].filesync[index].out_task_id},
                    {name: "服务名称",val: this.data1[idx].filesync[index].servicename},
                    {name: "用户名",val: this.data1[idx].filesync[index].username},
                    {name: "密码",val: this.data1[idx].filesync[index].password},
                    {name: "IP地址",val: this.data1[idx].filesync[index].ipaddress}];
                this.modal10 = true;
            },
            showSyncTaskInfo(){
                this.$https.fetchGet(this.$api.data.syncTaskInfo.url).then((resp) => {
                    console.log(resp);
                    this.data1 = resp.data.data;
                    console.log(this.data1);
                    // let clearbtn = '<div class="btn-group">'+
                    //     '<div type="button" class="btn btn-custom dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'+
                    //     '配置管理&nbsp;<span class="caret"></span></div>'+
                    //     '<ul class="dropdown-menu"><li><a class="clear_queue">清空队列</a></li>'+
                    //     '<li><a class="update_queue">修改队列</a></li>'+
                    //     '<li><a class="delete_queue">删除队列</a></li>'+
                    //     '<li><a class="find_queue">查看队列</a></li></ul></div>';

                    // for(let i in resp.data.data) {
                    //     this.queueconfig.append('<tr class="gradeX">' +
                    //         '<td>' + resp.data.data[i].taskname + '</div></td>' +
                    //         '<td>' + resp.data.data[i].front_client_info + '</td>' +
                    //         '<td>' + resp.data.data[i].front_client_info + '</td>' +
                    //         '<td>' + resp.data.data[i].front_client_info + '</td>' +
                    //         '<td>' + resp.data.data[i].department + '</td>' +
                    //         '<td>' + resp.data.data[i].master + '</td>' +
                    //         '<td>' + resp.data.data[i].contact + '</td>' +
                    //         // '<td>' +clearbtn+'</td>' +
                    //         '</tr>'
                    //     );
                    // }
                }).catch(err => {
                    console.log(err)
                })
            },
            updateBusiness(index) {
                this.register.show = true;
                this.register.form.id = this.data1[index].id;
                this.register.form.taskname = this.data1[index].taskname;
                this.register.form.department = this.data1[index].department;
                this.register.form.master = this.data1[index].master;
                this.register.form.contact = this.data1[index].contact;
            },
            addregisterForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.data.updateSyncTask.url, this.register.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '业务修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '业务修改失败', desc: "错误：" + resp.data.status, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    });
                });
            },
            deleteBusiness(index) {
                this.$Modal.confirm({
                    title: '删除业务',
                    content: '<p>当前操作将会导致该业务被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.delSyncTask.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Message.info('业务删除失败');
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        })
                    }
                });
            },
            deleteService(idx,index) {
                this.$Modal.confirm({
                    title: '删除服务',
                    content: '<p>当前操作将会导致该服务被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.delFileTask.url, {taskId: idx,id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Message.info('服务删除失败');
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        })
                    }
                });
            }
        }
    };
</script>
<style scoped lang="less">
    .open-dropdown-menu {
        display: block;
    }
    #first th {
        border-right: 1px solid #e8eaec;
        background-color: #f8f8f9;
    }
    td {
         border-right: 1px solid #e8eaec;
    }
</style>
