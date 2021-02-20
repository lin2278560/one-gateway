<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <aclAdd style="float: right"></aclAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Checkbox v-model="play">启用</Checkbox>
                <Button v-show="playshow" size="small" type="primary" @click="add">确认</Button>
                <Table size="small" border :columns="columns1" :data="data1" style="margin-top: 5px;">
                <template slot-scope="{ row, index }" slot="action">
                    <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                    <Button type="error" size="small" @click="delDb(row.id)">删除</Button>
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
        <Drawer title="访问控制" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules=platForm.rules :model="platForm.form"
                  :label-width="150">
                <FormItem label="动作" prop="type1" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.type">
                        <Option v-for="item in typeList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="启用" prop="disabled1" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.disabled">启用此规则</Checkbox>
                </FormItem>
                <FormItem label="协议" prop="protocol" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.protocol">
                        <Option v-for="item in resourceList" :value="item.val" :key="item.val" @click.native="checkType(item.val)">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="源类型" prop="srctype"  style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.srctype">
                        <Option v-for="item in resourceList1" :value="item.val" :key="item.val" @click.native="checkType1(item.val)">{{ item.name }}</Option>
                        
                    </Select><br/>
                    <!--地址:<Input disabled v-model="platForm.form.srcip" style="width: 95%;margin-left: 13px;"/>-->
                    <!--端口:<Input disabled v-model="platForm.form.srcport" style="width: 95%;margin-left: 13px;"/>-->
                </FormItem>
                <FormItem label="源地址" v-show="any" prop="srcip" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.srcip"/>
                </FormItem>
                <FormItem label="源端口"  v-show="icmp" prop="srcport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.srcport"/>
                </FormItem>
                <FormItem label="本地服务" prop="dsttype" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.dsttype" >
                        <Option v-for="item in resourceList2" :value="item.val" :key="item.val" @click.native="checkType2(item.val)">{{ item.name }}</Option>
                        
                    </Select><br/>
                    <!--地址:<Input disabled v-model="platForm.form.dstip" style="width: 95%;margin-left: 13px;"/>-->
                    <!--端口:<Input disabled v-model="platForm.form.dstport" style="width: 95%;margin-left: 13px;"/>-->
                </FormItem>
                <FormItem label="本地地址" v-show="any1" prop="dstip" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.dstip"/>
                </FormItem>
                <FormItem label="本地端口"  v-show="icmp" prop="dstport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.dstport"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addPlatForm">确认</Button>
                    <!-- <Button style="margin-left: 8px" @click="restPlatForm">重置</Button> -->
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import aclAdd from "./LocalAclAdd";
    export default {
        name: "LocalAcl",
        components: {
            jk_tabs: JkTabs,aclAdd
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
                    {title: '序号', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    // {title: '序号', key: '',align: 'center'},
                    {title: '动作', key: 'type',align: 'center'},
                    {title: '协议', key: 'protocol',align: 'center'},
                    {title: '源IP', key: 'srcip',align: 'center'},
                    {title: '源端口', key: 'srcport',align: 'center'},
                    {title: '本地服务的IP地址', key: 'dstip',width: 150,align: 'center'},
                    {title: '本地服务端口号', key: 'dstport',width: 150,align: 'center'},
                    {title: '启用', key: 'disabled',align: 'center',
                       },
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                playshow:true,
                play:false,
                data1:[],
                data3:[],
                any:false,
                any1:false,
                icmp:true,
                resourceList:[{name:"UDP", val:"udp"},{name:"TCP", val:"tcp"},{name:"ICMP", val:"icmp"}],
                resourceList1:[{name:"any", val:"any"},{name:"单个主机", val:"single"}],
                resourceList2:[{name:"any", val:"any"},{name:"单个主机", val:"single"}],
                typeList:[{name:"ACCEPT",val:"ACCEPT"},{name:"DROP",val:"DROP"},{name:"REJECT",val:"REJECT"}],
                platForm: {
                    show: false,
                    form: {
                        id:null,
                        type:null,
                        protocol:null,
                        srctype:null,
                        srcip:null,
                        srcport:null,
                        dsttype:null,
                        dstip:null,
                        dstport:null,
                        disabled:true,
                    },
                    rules: {
                        srcip:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.platForm.form.srctype == "single"){
                                        if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                                            callback(new Error('ip地址格式不正确'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        dstip:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.platForm.form.dsttype == "single"){
                                        if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                                            callback(new Error('ip地址格式不正确'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        dstport:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(!this.$util.testportnumber(value)){
                                        if(value=="" || value=="*"){
                                            callback()
                                        }
                                        callback(new Error('端口格式不正确'))
                                    }
                                    else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        srcport:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(!this.$util.testportnumber(value)){
                                        if(value=="" || value=="*"){
                                            callback()
                                        }
                                        callback(new Error('端口格式不正确'))
                                    }
                                    else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        // srcport:{ message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // dstport:{ message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // srcip:{ pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|(^$)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        // dstip:{ pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|(^$)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                    }
                },

                links: [
                    {name: "访问控制", to: "/local/acl"},
                    {name: "UDP协议通信", to: "/local/udp"},
                    // {name: "TCP协议通信", to: "/local/tcp"}
                    {name: "抗攻击", to: "/local/antiAttack"}
                ],
                tap: {
                    items: [
                        // {to:"/index/home", img:"../../../static/img/nav/menu_05.png", title:"监控总览"},
                        // {to:"/index/alarm", img:"../../../static/img/nav/menu_04.png", title:"故障告警"},
                        // {to:"/index/data", img:"../../../static/img/nav/menu_03.png", title:"数据对账"},
                        // {to:"/index/log", img:"../../../static/img/nav/menu_02.png", title:"日志审计"},
                        // {to:"/index/monitor", img:"../../../static/img/nav/menu_06.png", title:"资源监控"},
                        // {to:"/index/interface", img:"../../../static/img/nav/menu_07.png", title:"接口管理"},
                        // {to:"/index/sys", img:"../../../static/img/nav/menu_01.png", title:"系统管理"}
                        {no:"1", uname:"fyb", directory:"/fyb", state: "运行中"}
                    ]
                }
            }
        },
        mounted: function() {
            this.test();
            this.getyesnoinfo();
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
            getyesnoinfo(){
                this.$https.fetchGet(this.$api.local.findDisableFilter.url).then((resp) => {
                        if (resp.data.status == 200) {
                            // this.play = this.resp.data
                            if(resp.data.data == "yes"){
                                this.play = true
                            } else {
                                this.play = false
                            }
                            // console.log(this.play)
                        }   
                    }).catch(err => {
                        this.$Notice.error({title: '请求数据失败', desc: err, duration: 2.5});
                    });
            },
            test(){
                this.$https.fetchGet(this.$api.filter.findFilterInfo.url).then((resp) => {
                    this.data1 = resp.data.data;
                    this.dataCount = resp.data.data.length
                    for(let i in this.data1){
                        if(this.data1[i].disabled == "true"){
                            this.data1[i].disabled ="启用中"
                        }else{
                            this.data1[i].disabled ="已禁用"
                        }
                    }
                })
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            },
            addPlatForm(){
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if((this.platForm.form.srctype == "single" && this.platForm.form.srcip == null)||(this.platForm.form.dsttype == "single" && this.platForm.form.dstip == null)){
                        this.$Modal.warning({
                                title: "warning",
                                content: "当类型为单个主机时地址不能为空"
                            })
                    }else{
                        let obj ={}
                        Object.assign(obj, this.platForm.form);
                        if(this.platForm.form.dstip == ""){
                            obj.dstip = "*"
                        }
                        if(this.platForm.form.dstport == ""){
                            obj.dstport = "*"
                        }
                        if(this.platForm.form.srcip == ""){
                            obj.srcip = "*"
                        }
                        if(this.platForm.form.srcport == ""){
                            obj.srcport =  "*"
                        }
                        console.log(obj)
                        this.$https.fetchPost(this.$api.filter.updateFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '修改成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                            } else
                                this.$Notice.error({title: '修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        });
                    }
                });
                
            },

            add(){
                this.playshow = false
                console.log(this.play)
                if (this.play == true) {
                    let obj = {
                        string: "yes"
                    }
                   this.$https.fetchGet(this.$api.local.startDisableFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('启用成功');
                                setTimeout(() => {
                                this.reload();
                            }, 250);
                            } else {
                                this.$Notice.error({title: '启用失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        }) 
                } else {
                    let obj = {
                        string: "no"
                    }
                    this.$https.fetchGet(this.$api.local.stopDisableFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('启停成功');
                                setTimeout(() => {
                                this.reload();
                            }, 250);
                            } else {
                                this.$Notice.error({title: '启停失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        }) 
                }
            },
            checkType(val){
                // this.$refs['plat_form'].resetFields();
                this.platForm.form.srcip = ''
                this.platForm.form.srcport = ''
                this.platForm.form.dstip = ''
                this.platForm.form.dstport = ''
                this.any = false
                this.any1 = false
                this.platForm.form.srctype = "any"
                this.platForm.form.dsttype = "any"
                if (val=="icmp"){
                    this.icmp=false;
                } else {
                    this.icmp=true;
                }
            },
            checkType1(val){
                // this.$refs['plat_form'].resetFields();
                this.platForm.form.srcip = ''
                this.platForm.form.srcport = ''
                this.platForm.form.srctype = val
                if (val=="any"){
                    this.any=false;
                }else if(val=="single"){
                    this.any=true;
                }
            },
            checkType2(val){
                // this.$refs['plat_form'].resetFields();
                this.platForm.form.dstip = ''
                this.platForm.form.dstport = ''
                this.platForm.form.dsttype = val
                if (val=="any"){
                    this.any1=false;
                }else if(val=="single"){
                    this.any1=true;
                }
            },
            delDb(index){
                this.$Modal.confirm({
                    title: '删除访问规则',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.filter.delFilter.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('删除成功');
                                setTimeout(() => {
                                    this.$Modal.remove();
                                this.reload();
                            }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '访问规则删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            update(index){
                // console.log(this.data1[index].disabled == "true");
                console.log(this.data1[index])
                this.platForm.show=true;
                this.platForm.form.id=this.data1[index].id;
                this.platForm.form.type=this.data1[index].type;
                this.platForm.form.protocol=this.data1[index].protocol;
                this.platForm.form.srctype=this.data1[index].srctype;
                this.platForm.form.srcip=this.data1[index].srcip;
                this.platForm.form.srcport=this.data1[index].srcport;
                this.platForm.form.dsttype=this.data1[index].dsttype;
                this.platForm.form.dstip=this.data1[index].dstip;
                this.platForm.form.dstport=this.data1[index].dstport;
                if(this.platForm.form.dstip == "*"){
                    this.platForm.form.dstip = ""
                }
                if(this.platForm.form.dstport == "*"){
                    this.platForm.form.dstport = ""
                }
                if(this.platForm.form.srcip == "*"){
                    this.platForm.form.srcip = ""
                }
                if(this.platForm.form.srcport == "*"){
                    this.platForm.form.srcport =  ""
                }
                if(this.data1[index].disabled == "启用中"){
                    this.platForm.form.disabled = true
                }else{
                    this.platForm.form.disabled = false
                }
                if (this.data1[index].protocol=="icmp"){
                    this.icmp=false;
                }else{
                    this.icmp=true;
                }
                if (this.data1[index].srctype=="any"){
                    this.any=false;
                }else{
                    this.any=true;
                }
                if (this.data1[index].dsttype=="any"){
                    this.any1=false;
                }else{
                    this.any1=true;
                }
                console.log(this.platForm.form.disabled)
            },

        },
        watch:{
            play:function(newval,oldval){
                // console.log("当前应取到的值："+newval,"这是之前的值："+oldval);
                this.playshow = true
            }
        }
    }
</script>

<style scoped>
</style>