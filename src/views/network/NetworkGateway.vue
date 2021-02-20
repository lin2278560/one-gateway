<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <gateway_add style="float: right"></gateway_add>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="state">
                        <Button :icon="data1[index].iconName" size="small" style="margin: auto" @click="updateState(index)">
                                <span :style="{'color':data1[index].color}">
                                    {{ row.state }}
                                </span>
                        </Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateGateway(index,row.state)">修改</Button>
                        <Button type="error" size="small" @click="deleteGateway(row.id,row.state)">删除</Button>
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

        <Drawer title="修改默认网关" v-model="modal.show" width="50%">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="状态" prop="state" style="margin-bottom: 0px;">
                    <RadioGroup v-model="modal.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="modal.form.name" />
                </FormItem>
                <FormItem label="默认网关IP" prop="ipaddr" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.ipaddr" />
                    <span style="color: red;">注:请填写一个IPv4或IPv6地址</span>
                </FormItem>
                <FormItem label="类型" prop="type" style="margin-bottom: 0px;">
                    <Select v-model="modal.form.type">
                        <Option v-for="type in typeList" :value="type.val" :key="type.val" @click.native="updateType(type.val)">{{ type.name }}</Option>
                    </Select>
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
    import gateway_add from "./NetworkGatewayAdd";
    export default {
        name: "NetworkGateway",
        components: {
            jk_tabs: JkTabs,gateway_add
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
                    {title: '序号', key: 'name',align: 'center',render: (h, params) => {
                        return h("span", params.index + 1);
                    }},
                    {title: '默认网关', key: 'ipaddr',align: 'center'},
                    {title: '类型', key: 'type',align: 'center'},
                    {title: '状态', slot: 'state',align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                modal: {
                    show: false,
                    form: {
                        name: "",
                        ipaddr: "",
                        type: "default",
                        state:"禁用",
                        id: ""
                    },
                    rules: {
                        ipaddr:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                        name: [{ required: true, message: '不能为空', trigger: 'blur' },] 
                    }
                    // rules: {
                    //     gwName: {
                    //         required: true, trigger: 'change', min: 1, max: 16, message: '请输入1~16位的设备名称'
                    //     },
                    //     defaultGWIP: {
                    //         required: false, type: 'number', trigger: 'change', message: '请输入选择应用位置'
                    //     },
                    //     state: {required: false, trigger: 'change', min: 1, max: 16, message: '请输入1~16位的设备编号'},
                    //     ipv4: {
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请输入合法的ipv4地址',
                    //         pattern: '^(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}$'
                    //     },
                    //     dsc: {required: true, trigger: 'change', message: '请选择设备类型'},
                    // },
                },
                typeList:[{name:"默认",val:"default"},{name:"常规",val:"common"}],
                api: null,
                data1:[],
                data2:[
                    {
                        "gefaultGW": "192.168.10.254",
                        "dsc": "11",
                        "state": "start",
                        "gwName": "table-expand.vue"
                    },
                    {
                        "gefaultGW": "192.168.10.254",
                        "dsc": "11",
                        "state": "stop",
                        "gwName": "table-expand.vue"
                    }
                ],
                data3:[],
                stateTitle: "",
                stateContent: "",
                links: [
                    {name: "设置默认网关", to: "/network/gateway"}
                ]
            }
        },
        mounted: function() {
            this.showGateway();
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
                //             this.data3[i]["state"] = "禁用";
                //             this.data3[i]["color"] = "red";
                //             this.data3[i]["iconName"] = "ios-play";
                //         }else {
                //             this.data3[i]["state"] = "启用";
                //             this.data3[i]["color"] = "green";
                //             this.data3[i]["iconName"] = "ios-pause";
                //         }
                //     }
            },
            showGateway(){
                this.$https.fetchGet(this.$api.gateway.showGateway.url).then((resp) => {
                    this.data1 = resp.data.data;
                    this.dataCount = resp.data.data.length
                    console.log(this.data1)
                    this.data3 = _.cloneDeep(this.data1)
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
                        if(this.data1[i].type == "default"){
                            this.data1[i].type = "默认"
                        }else{
                            this.data1[i].type = "常规"
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            updateState(index){
                if(this.data3[index]["state"] == "已禁用" || this.data3[index]["state"] == "disable"){
                    this.stateTitle = "启用网关";
                    this.stateContent = "确定要启用此网关吗?";
                    this.modal.form.state = "enable";
                    this.api = this.$api.gateway.startGateway.url;
                }else {
                    this.stateTitle = "禁用网关";
                    this.stateContent = "确定要禁用此网关吗?";
                    this.modal.form.state = "disable";
                    this.api = this.$api.gateway.stopGateway.url;
                }
                
                this.modal.form.name = this.data3[index]["name"];
                this.modal.form.ipaddr = this.data3[index]["ipaddr"];
                this.modal.form.type = this.data3[index]["type"];
                this.modal.form.id = this.data3[index]["id"];
                this.$Modal.confirm({
                    title: this.stateTitle,
                    content: '<p>'+this.stateContent+'</p>',
                    loading: true,
                    // onOk: () => {
                    //     this.$https.fetchGet(this.$api.up.dBusiness.url, {uuid: uuid}).then((resp) => {
                    //         if (resp.data.status == 200) {
                    //             setTimeout(() => {
                                    //     this.reload();
                                    // }, 250);
                    //         } else {
                    //             this.$Modal.remove();
                    //             this.$Message.info('业务信息删除失败');
                    //         }
                    //     }).catch(err => {
                    //         this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    //         console.log(err)
                    //     })
                    // }
                    
                    onOk: () => {
                        this.$refs['info_form'].validate((valid) => {
                            if (!valid)
                                return;
                           
                            console.log(this.modal.form)
                            this.$https.fetchPost(this.api, this.modal.form).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '网关配置成功', desc: "正在刷新界面", duration: 2.5});
                                    setTimeout(() => {
                                        this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                                } else{
                                    this.$Notice.error({
                                        title: '网关配置失败',
                                        desc: "错误：" + resp.data.desc,
                                        duration: 5
                                    });
                                    this.$Modal.remove();
                                } 
                            }).catch(err => {
                                this.$Modal.remove();
                                this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                console.log(err)
                            });
                        });
                    }
                });
            },
            deleteGateway(index,state) {
                if (state=="启用中") {
                    this.$Modal.info({
                    title: "warning",
                    content: "网关启用时无法操作，请将接口状态调整为禁用后再操作",
                    // loading: true,
                    // on: {}
                })
                }else{
                    console.log(index);
                    this.$Modal.confirm({
                        title: '删除网关配置',
                        content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                        loading: true,
                        onOk: () => {
                            this.$https.fetchGet(this.$api.gateway.delGateway.url, {key: index}).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Message.info('网关配置删除成功');
                                    setTimeout(() => {
                                        this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                                } else {
                                    this.$Modal.remove();
                                    this.$Notice.error({
                                        title: '网关配置删除失败',
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
                }
                
            },
            updateGateway(index,state) {
                if (state=="启用中") {
                    this.$Modal.info({
                    title: "warning",
                    content: "网关启用时无法操作，请将接口状态调整为禁用后再操作",
                    // loading: true,
                    // on: {}
                })
                }else{
                    this.modal.show = true;
                    this.modal.form.name = this.data3[index]["name"];
                    this.modal.form.ipaddr = this.data3[index]["ipaddr"];
                    // this.modal.form.type = this.data3[index]["type"];
                    if(this.modal.form.type == "默认"){
                        this.data3[index]["type"] = "default"
                    }else{
                        this.data3[index]["type"] = "common"
                    }
                    this.modal.form.state = this.data3[index]["state"];
                    this.modal.form.id = this.data3[index]["id"];
                }
                
            },
            restForm() {
                this.$refs['info_form'].resetFields();
                
            },
            addForm() {
                
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.modal.form.state == "已禁用" || this.modal.form.state == "disable"){
                        this.modal.form.state = "disable";
                    }else{
                        this.modal.form.state = "enable";
                    }
                    this.$https.fetchPost(this.$api.gateway.updateGateway.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '代理配置修改成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '代理配置修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    });
                });
            },
        }
    }
</script>

<style scoped>
</style>