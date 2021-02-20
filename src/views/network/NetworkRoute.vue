<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <route_add style="float: right"></route_add>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="state">
                        <!--                        <strong>{{ row.name }}</strong>-->
                        <Button :icon="data1[index].iconName" size="small" style="margin: auto" @click="updateState(index)">
                                <span :style="{'color':data1[index].color}">
                                    {{ row.state }}
                                </span>
                        </Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateRoute(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteRoute(row.id,index)">删除</Button>
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

        <Drawer title="修改静态路由" v-model="modal.show" width="50%">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="状态" prop="state" style="margin-bottom: 15px;">
                    <RadioGroup v-model="modal.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="目的网络" prop="subent" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.dstent" style="width: 150px;" />/
                    <Select v-model="modal.form.subent" style="width: 70px;">
                        <Option v-for="(mack,key) in mackList" :value="mack" :key="key">{{ mack }}</Option>
                    </Select>
                    <span style="color: red;">* 目的主机选择掩码32</span>
                </FormItem>
                <FormItem label="接口" prop="interface_dev1" style="margin-bottom: 15px;">
                    <Select v-model="modal.form.interface_dev">
                        <Option v-for="i in testList" :value="i" :key="i">{{ i }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="网关" prop="gateway" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.gateway" />
                </FormItem>
                <FormItem label="描述" prop="descr" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.descr" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import route_add from "./NetworkRouteAdd";
    export default {
        inject: ["reload"],
        name: "NetworkRoute",
        components: {
            jk_tabs: JkTabs,route_add
        },
        data(){
            return {
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 10,
                columns1: [
                    {title: '序号',  align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: '网络', key: 'dstent', align: 'center'},
                    {title: '子网掩码', key: 'subent', align: 'center'},
                    {title: '网关', key: 'gateway', align: 'center'},
                    {title: '接口', key: 'interface_dev', align: 'center'},
                    {title: '描述', key: 'descr', align: 'center'},
                    {title: '状态', slot: 'state', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                data1:[],
                data3:[],
                data2:[
                    {
                        "gw": "192.168.104.254",
                        "dev": "eth1",
                        "dsc": "test Route",
                        "state": "start",
                        "routeName": "test1",
                        "network": "192.168.11.0/24"
                    },
                    {
                        "gw": "192.168.104.254",
                        "dev": "eth1",
                        "dsc": "test Route",
                        "state": "stop",
                        "routeName": "test2",
                        "network": "192.168.12.0/24"
                    }
                ],
                stateTitle: "",
                stateContent: "",
                modal: {
                    show: false,
                    form: {
                        dstent: '',
                        subent: '',
                        interface_dev: '',
                        gateway: '',
                        descr: '',
                        state:"",
                    },
                    rules: {
                        gateway:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ]  
                    }
                },
                testList:[],
                mackList:[],
                interfaceList:[{name:"eth0",val:"eth0"},{name:"eth1",val:"eth1"}],
                links: [
                    {name: "默认路由", to: "/network/route"}
                ]
            }
        },
        mounted: function() {
            this.push();
            this.showRoute();
            this.test();
            // this.test2();
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
                this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
                    if (resp.data.status == 200) {
                        this.testList = resp.data.data;
                    } else {
                        this.$Message.info('请求数据失败');
                    }
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
               
            },
            showRoute(){
                this.$https.fetchGet(this.$api.route.showRoute.url).then((resp) => {
                    if (resp.data.status == 200) {
                    this.dataCount = resp.data.data.length
                    this.data1 = resp.data.data;
                    Object.assign(this.data3, this.data1)
                    for(var i in this.data1){
                        if(this.data1[i].state == "disable"){
                            this.data1[i]["state"] = "已禁用";
                            this.data1[i]["color"] = "red";
                            this.data1[i]["iconName"] = "ios-pause";
                        }else {
                            this.data1[i]["state"] = "启用中";
                            this.data1[i]["color"] = "green";
                            this.data1[i]["iconName"] = "ios-play";
                        }
                    }
                    } else {
                        this.$Message.info('请求数据失败');
                    }
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            },
            updateState(index){
                if(this.data3[index]["state"] == "已禁用" || this.data3[index]["state"] == "disable"){
                    this.stateTitle = "启用路由"
                    this.stateContent = "确定要启用此路由吗?"
                    this.api = this.$api.route.startRoute.url;
                }else {
                    this.stateTitle = "禁用路由"
                    this.stateContent = "确定要禁用此路由吗?"
                    this.api = this.$api.route.stopRoute.url;
                }
                this.modal.form.dstent = this.data3[index]["dstent"];
                this.modal.form.subent = this.data3[index]["subent"];
                // alert(this.data3[index]["subent"]);
                // this.modal.form.subent =  this.data3[index]["subent"].replace("\"","").replace("\"","");
                this.modal.form.interface_dev = this.data3[index]["interface_dev"];
                this.modal.form.gateway = this.data3[index]["gateway"];
                this.modal.form.descr = this.data3[index]["descr"];
                this.modal.form.id = this.data3[index]["id"];
                console.log(this.modal.form)
                this.$Modal.confirm({
                    title: this.stateTitle,
                    content: '<p>'+this.stateContent+'</p>',
                    onOk: () => {
                        this.$refs['info_form'].validate((valid) => {
                            if (!valid)
                                return;
                                if(this.data1[index]["state"] == "已禁用" || this.data1[index]["state"] == "disable"){
                                    this.modal.form.state = "enable"
                                }else {
                                    this.modal.form.state = "disable"
                                }
                            this.$https.fetchPost(this.api, this.modal.form).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '路由配置成功', desc: "正在刷新界面", duration: 2.5});
                                    setTimeout(() => {
                                        this.reload();
                                    }, 250);
                                } else {
                                    this.$Notice.error({
                                        title: '路由配置失败',
                                        desc: "错误：" + resp.data.desc,
                                        duration: 5
                                    });
                                    this.$Modal.remove()
                                }
                                // if(this.data1[index]["state"] == "已禁用" || this.data1[index]["state"] == "disable"){
                                //         this.modal.form.state = "disable"
                                //     }else {
                                //         this.modal.form.state = "enable"
                                //     }
                                    
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                console.log(err)
                            });
                        });
                    }
                });
            },
            deleteRoute(index,i) {
                if(this.data3[i].state == "启用中" || this.data3[i].state== "enable"){
                    this.$Notice.error({title: '启用中无法修改', duration: 2.5});
                    return
                }
                this.$Modal.confirm({
                    title: '删除路由',
                    content: '<p>当前操作将会导致该静态路由被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.route.delRoute.url, {key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({
                                        title: '路由配置删除失败',
                                        desc: "错误：" + resp.data.desc,
                                        duration: 5
                                    });
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        })
                    }
                });
            },
            updateRoute(index) {
                if(this.data3[index].state == "启用中" || this.data3[index].state== "enable"){
                    this.$Notice.error({title: '启用中无法修改', duration: 5});
                    return
                }
                this.modal.show = true;
                this.modal.form.dstent = this.data3[index]["dstent"];
                this.modal.form.subent = parseInt(this.data3[index]["subent"]);
                this.modal.form.interface_dev = this.data3[index]["interface_dev"];
                this.modal.form.gateway = this.data3[index]["gateway"];
                this.modal.form.descr = this.data3[index]["descr"];
                this.modal.form.state = this.data3[index]["state"];
                this.modal.form.id = this.data3[index]["id"];
                // this.$set(this.modal.form,"subent",this.data1[index]["subent"])
                // this.$refs['info_form'].model.subent = this.data1[index]["subent"];
                console.log(this.$refs['info_form'])
            },
            push(){
                for(let i=1; i<=32; i++){
                    this.mackList.push(i)

                }
            },
            restForm() {
                this.$refs['info_form'].resetFields();
                this.modal.form.subent = 24
                this.modal.form.dstent = ''
            },
            addForm() {

                
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.modal.form.interface_dev){
                        if(this.modal.form.state == "已禁用" || this.modal.form.state == "disable"){
                        this.modal.form.state = "disable";
                        }else{
                            this.modal.form.state = "enable";
                        }
                        this.$https.fetchPost(this.$api.route.updateRoute.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '路由配置修改成功', desc: "正在刷新界面", duration: 5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '路由配置修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    });
                    } else{
                        this.$Modal.warning({
                            title: "warning",
                            content: "请选择端口号"
                        })
                    }
                    
                });
            },

        }
    }
</script>

<style scoped>
</style>