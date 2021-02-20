<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header" style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <interface_add style="float: right;"></interface_add>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data3">
                    <template slot-scope="{ row, index }" slot="state">
<!--                        <strong>{{ row.name }}</strong>-->
                        <Button v-if="data3[index].iconName" :icon="data3[index].iconName" size="small" style="margin:0 auto;width:80px" @click="updateState(index)">
                                <span :style="{'color':data3[index].color}">
                                    {{ row.state }}
                                </span>
                        </Button>
                        <div v-if="!data3[index].iconName">
                            <span :style="{'color':data3[index].color}">
                                {{ row.state }}
                            </span>
                        </div>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateInterface(index,row.state)">修改</Button>
                        <Button type="error" size="small" @click="deleteInterface(row.id,row.state)">删除</Button>
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

        <Drawer title="修改接口" v-model="modal.show" width="50%">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="状态" prop="status" style="margin-bottom: 15px;">
                    <RadioGroup v-model="modal.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="网口" prop="dev" style="margin-bottom: 15px;">
                    <Select v-model="modal.form.real_interface">
                        <Option v-for="i in testList" :value="i" :key="i">{{ i }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="接口类型" prop="type" style="margin-bottom: 15px;">
                    <Select v-model="modal.form.type">
                        <Option v-for="type in typeList" :value="type.val" :key="type.val" @click.native="updateType(type.val)">{{ type.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用途类型" prop="devType" style="margin-bottom: 15px;">
                    <Select v-model="modal.form.interface_type">
                        <Option v-for="type in interfaceTypeList" :value="type.val" :key="type.val" @click.native="updatedevType(type.val)">{{ type.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="IP地址/掩码" prop="ipaddr" style="margin-bottom: 15px;" v-show="ipAddr">
                    <Input v-model="modal.form.ipaddr" style="width: 350px;" />/
                    <FormItem prop="subent" style="margin-bottom: 0px;display:inline-block">
                        <Select v-model="modal.form.subent" style="width: 70px;">
                            <Option v-for="mack in mackList" :value="mack" :key="mack" @click.native="updatePort(mack)">{{ mack }}</Option>
                        </Select>
                    </FormItem>
                </FormItem>
                <FormItem>
                    <!--                    <Button type="primary" @click="addPlatForm">确认</Button>-->
                    <Button type="primary" @click="addForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    let Base64 = require('js-base64').Base64
    import JkTabs from "@/components/JkTabs.vue";
    import interface_add from "./NetworkInterfaceAdd";
    export default {
        name: "NetworkInterface",
        components: {
            jk_tabs: JkTabs,interface_add
        },
        inject: ["reload"],
        data(){
            return {
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 10,
                spipShow:true,
                spIpaddr:'',
                columns1: [
                    {title: '序号', key: 'id',align: 'center', size: '12',render: (h, params) => {
                        return h("span", params.index + 1);
                    }},
                    // {title: '接口名称', key: 'display_interface',align: 'center'},
                    {title: '接口类型', key: 'type',align: 'center'},
                    {title: '网络接口', key: 'real_interface',align: 'center'},
                    {title: '类型', key: 'interface_type',align: 'center'},
                    {title: 'IP地址', key: 'ipaddr',align: 'center'},
                    {title: '子网掩码', key: 'subent',align: 'center'},
                    {title: '状态', slot: 'state',align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                modal: {
                    show: false,
                    form: {
                        real_interface: "eth0",
                        ipaddr: "",
                        subent: 24,
                        type: "STATIC",
                        interface_type: "common",
                        state: "已禁用",
                        id: "",
                    },
                    rules: {
                        ipaddr:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                        // subent:[{ required: true, message: '不能为空', trigger: 'blur' },]
                    }
                },
                mackList:[],
                ipAddr: true,
                ipv4:[],
                ipv6:[],
                testList:[],
                typeList:[{name:"静态IPv4",val:"STATIC"},{name:"静态IPv6",val:"STATICIPv6"},{name:"DHCP",val:"DHCP"}],
                interfaceTypeList:[{name:"业务口",val:"common"},{name:"管理口",val:"manage"},{name:"通道口",val:"channel"}],
                interfaceList:[{name:"eth0",val:"eth0"},{name:"eth1",val:"eth1"}],
                data1: [],
                data2 : [{
                    "devType": "common",
                    "dev": "eth2",
                    "state": "disable",
                    "ipaddr": "192.168.11.32",
                    "ipType": "static",
                    "mask": "255.255.255.0"
                },
                    {
                        "devType": "common",
                        "dev": "eth1",
                        "state": "enable",
                        "ipaddr": "192.168.11.31",
                        "ipType": "static",
                        "mask": "255.255.255.0"
                    }],
                data3 : [],
                stateTitle: "",
                stateContent: "",
                links: [
                    {name: "接口列表", to: "/network/interface"},
                    {name: "端口聚合", to: "/network/portTrunking"},
                    // {name: "带宽设置", to: "/network/bandwidth"},
                    {name: "Mac地址", to: "/network/mac"},
                ],
                iconName: null
            }
        },
        mounted: function() {
            this.showIpAddr();
            this.test();
            this.push();
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
            findspIpAddr(){
                this.$https.fetchGet(this.$api.network.findSPIpaddr.url).then((resp) => {
                        if (resp.data.status == 200) {
                            
                            this.spIpaddr = resp.data.data
                            console.log(this.spIpaddr,"spip")
                            for(let i in this.data3){
                            if(this.data3[i].ipaddr == this.spIpaddr){
                                console.log(this.data3[i])
                                this.data3[i].state = '当前访问'
                                this.data3[i]["color"] = "green";
                                this.data3[i]["iconName"] = ""
                            }
                            // console.log(this.data1[i].ipaddr)
                        }
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            //改变用途类型
            updatedevType (val){
                if(val == "common"){
                    this.getUSBList (val)
                }else if(val == "manage"){
                     this.getUSBList (val)
                }else if(val == "channel"){
                     this.getUSBList (val)
                }
            },
            //get网口列表
            getUSBList (val){
                // console.log(val)
                let obj = {name:val}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.testList = resp.data.data
                            
                            // console.log(this.testList)
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            //get另外一个网口列表
            test(){
                this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
                    this.testList = resp.data.data;
                    console.log(this.testList)
                }).catch(err => {
                    console.log(err)
                })
            },
            push(){
                for(let i=1; i<=32; i++){
                    this.ipv4.push(i)
                }
                for(let i=1; i<=128; i++){
                    this.ipv6.push(i)
                }
                this.mackList = this.ipv4
            },
            showIpAddr(){
                this.$https.fetchGet(this.$api.network.showIPAddr.url).then((resp) => {
                    console.log(resp,"resp");
                    this.dataCount = resp.data.data.length
                    this.findspIpAddr();
                    this.data1 = resp.data.data;
                    this.data3 = this._.cloneDeep(resp.data.data)
                    for(let i in this.data3){
                        if(this.data3[i].state == "disable"){
                            this.data3[i]["state"] = "已禁用";
                            this.data3[i]["color"] = "red";
                            this.data3[i]["iconName"] = "ios-pause";
                        }else {
                            this.data3[i]["state"] = "启用中";
                            this.data3[i]["color"] = "green";
                            
                            this.data3[i]["iconName"] = "ios-play";
                        }
                        if(this.data3[i]["type"] == "STATIC"){
                            this.data3[i]["type"] = "静态ipv4"
                        }else if(this.data3[i]["type"] == "STATICIPv6"){
                            this.data3[i]["type"] = "静态ipv6"
                        }else {
                            this.data3[i]["type"] = "DHCP"
                        }
                        if(this.data3[i]["interface_type"] == "common"){
                            this.data3[i]["interface_type"] = "业务口"
                        }else if (this.data3[i]["interface_type"] == "channel"){
                            this.data3[i]["interface_type"] = "通道口"
                        }else {
                            this.data3[i]["interface_type"] = "管道口"
                        }
                    }
                    
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteInterface(index,state) {
                if (state=="启用中") {
                    this.$Modal.info({
                    title: "warning",
                    content: "接口启用时无法操作，请将接口状态调整为禁用后再操作",
                    // loading: true,
                    // on: {}
                })
                }else{
                    this.$Modal.confirm({
                    title: '删除接口',
                    content: '<p>当前操作将会导致该网口接口被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.network.delIpaddr.url, {key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('接口配置删除成功');
                                setTimeout(() => {
                                    this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({
                                        title: '接口配置删除失败',
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
            updateState(index){
                
                if(this.data1[index]["state"] == "已禁用" || this.data1[index]["state"] == "disable"){
                    this.stateTitle = "启用接口";
                    this.stateContent = "确定要启用此接口吗?";
                    this.modal.form.state = "enable";
                    this.api = this.$api.network.startIpaddr.url;
                }else {
                    this.stateTitle = "禁用接口";
                    this.stateContent = "确定要禁用此接口吗?";
                    this.modal.form.state = "disable";
                    this.api = this.$api.network.stopIpaddr.url;
                }
                this.modal.form.real_interface = this.data1[index]["real_interface"];
                this.modal.form.ipaddr = this.data1[index]["ipaddr"];
                this.modal.form.subent = parseInt(this.data1[index]["subent"]);
                this.modal.form.type = this.data1[index]["type"];
                this.modal.form.interface_type = this.data1[index]["interface_type"];
                this.modal.form.id = this.data1[index]["id"];
                this.$Modal.confirm({
                    title: this.stateTitle,
                    content: '<p>'+this.stateContent+'</p>',
                    loading: true,
                    onOk: () => {
                        this.modal.form.subent = parseInt(this.data1[index].subent);
                        console.log(this.modal.form)
                        this.$https.fetchPost(this.api, this.modal.form).then((resp) => {

                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '接口配置成功', desc: "正在刷新界面", duration: 5});
                                setTimeout(() => {
                                    this.$Modal.remove();
                                        this.reload();
                                    }, 250);
                            } else
                                this.$Notice.error({
                                    title: '接口配置失败',
                                    desc: "错误：" + resp.data.desc,
                                    duration: 5
                                });
                                console.log(resp)
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        });
                    }
                });
            },

            updateInterface(index,state) {
                console.log(this.data1)
                if (state=="启用中") {
                    this.$Modal.info({
                    title: "warning",
                    content: "接口启用时无法操作，请将接口状态调整为禁用后再操作",
                })
                }else{
                    this.modal.show = true;
                    this.modal.form.real_interface = this.data1[index]["real_interface"];
                    this.modal.form.ipaddr = this.data1[index]["ipaddr"];
                    this.modal.form.subent = parseInt(this.data1[index]["subent"]);
                    this.modal.form.type = this.data1[index]["type"];
                    this.modal.form.interface_type = this.data1[index]["interface_type"];
                    if(this.data1[index]["state"] == "disable"){
                        this.data1[index]["state"] = "已禁用"
                    }
                    this.modal.form.state = this.data1[index]["state"];
                    this.modal.form.id = this.data1[index]["id"];
                    this.getUSBList(this.data1[index]["interface_type"])
                    if(this.modal.form.ipaddr == this.spIpaddr){
                        this.spipShow = false
                        this.$Notice.warning({title: '您正在修改当前IP接口', desc: "如若修改了IP地址页面可能出现卡死情况，请稍后刷新", duration: 5});
                    }else{
                        this.spipShow = true
                    }
                } 
            },
            updateType(val){
                if(val == "ipv6"){
                    this.mackList = this.ipv6
                    this.ipAddr = true
                    this.platForm.form.mack = 64
                }else if(val == "ipv4"){
                    this.mackList = this.ipv4
                    this.ipAddr = true
                    this.platForm.form.mack = 24
                }else if(val == "dhcp"){
                    this.ipAddr = false
                }
            },
            restForm() {
                this.$refs['info_form'].resetFields();
                this.modal.form.ipaddr = ''
                this.modal.form.subent = 24
                this.modal.form.interface_type = 'common'
            },
            addForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.modal.form.subent){
                        if (this.$util.queryDevIP4(this.modal.form.ipaddr) && this.modal.form.type =="STATICIPv6"){
                            this.$Modal.warning({
                            title: "warning",
                            content: "你填写的ip地址不符合ipv6地址规范"
                        })
                        this.modal.form.state = "disable";
                        return
                        }
                        if (this.$util.queryDevIP6(this.modal.form.ipaddr) && this.modal.form.type == "STATIC"){
                            this.$Modal.warning({
                            title: "warning",
                            content: "你填写的ip地址不符合ipv4地址规范"
                        })
                        this.modal.form.state = "disable";
                        return
                        }
                        if (!this.$util.queryDevIP4(this.modal.form.ipaddr) && !this.$util.queryDevIP6(this.modal.form.ipaddr)){
                            this.$Modal.warning({
                            title: "warning",
                            content: "你填写的ip地址不符合ipv4或ipv6地址规范"
                        })
                        this.modal.form.state = "disable";
                        return
                        }
                        if(this.modal.form.state == "已禁用" || this.modal.form.state == "disable"){
                            this.modal.form.state = "disable";
                        }else{
                            this.modal.form.state = "enable";
                        }
                        if(this.spipShow){
                            this.$https.fetchPost(this.$api.network.updateIpaddr.url, this.modal.form).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '接口配置修改成功', desc: "正在刷新界面", duration: 5});
                                    setTimeout(() => {
                                        this.reload();
                                    }, 250);
                                } else
                                    this.$Notice.error({title: '接口配置修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                                }).catch(err => {
                                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                    console.log(err)
                                });
                        }else if(!this.spipShow && this.modal.form.ipaddr != this.spIpaddr){
                            
                            this.$https.fetchPost(this.$api.network.onLineIP.url, this.modal.form).then((resp) => {
                                if (resp.data.status == 200) {
                                    console.log(resp)
                                    this.$Notice.success({title: '接口配置修改成功', desc: "正在刷新界面", duration: 5});
                                    setTimeout(() => {
                                        this.reload();
                                    }, 250);
                                } else
                                    this.$Notice.error({title: '接口配置修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                                }).catch(err => {
                                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                    console.log(err)
                                });
                        }
                        
                    }else{
                       this.$Modal.warning({
                            title: "warning",
                            content: "请选择端口号"
                        })
                    }        
                });
            },
            updatePort(index){
                this.modal.form.subent = index
                console.log(this.modal.form.subent)
            },

        }
    }
</script>

<style scoped>
    .ivu-table {
        font-size: 8px !important;
    }

    .ivu-table-header thead tr th {
        padding: 0px !important;
        height: 26px;
        line-height: 26px;
    }

    .ivu-table-fixed-header thead tr th {
        padding: 0px !important;
        height: 26px;
        line-height: 26px;
        font-size: 12px;
    }

    .ivu-table-fixed-right-header {
        height: 29px !important;
    }

    .ivu-table-cell {
        white-space: nowrap !important;
        padding-left: 8px !important;
        padding-right: 8px !important;
    }

    .ivu-table td, .ivu-table th {
        height: 26px;
        line-height: 26px;
    }
    .modal-body{
        width: 100%;
    }
</style>