<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="margin-bottom:25px;">
                <div style="margin-bottom:25px;">
                    <Table border :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
                </div>
                <div v-if="host" style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">常规设置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">启用双机热备:</span></td>
                                <td>
                                    <!-- <Checkbox v-model="action" style="margin-left: 15px;"></Checkbox> -->
                                    <i-switch style="margin-left:12px" @on-change="checkaction" :loading="loading" v-model="action" size="large">
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                </td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">主机IP:</span></td>
                                <td>
                                    <span style="margin:0 5px 0 12px">ip</span><Input v-model="master.ip" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 12px">端口</span><Input v-model="master.port" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 12px">优先级</span><Input v-model="master.priority" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 12px">HA口:</span><Input v-model="master.broadcastAddress" style="width: 13%;"/>
                                </td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">备机IP组:</span></td>
                                <td><span v-if="backupIp.length == 0" style="margin-left:15px;font-size: 12px;margin-top:5px;">暂无配置</span>
                                    <div style="margin-top:5px;" v-for="(item,i) in backupIp" :key="i">
                                        <span style="margin:0 5px 0 12px">ip</span><Input v-model="backupIp[i].ip" style="width: 13%;margin-right: 15px;" />
                                        <span style="margin:0 5px 0 12px">端口</span><Input v-model="backupIp[i].port" style="width: 13%;margin-right: 15px;" />
                                        <span style="margin:0 5px 0 12px">优先级</span><Input v-model="backupIp[i].priority" style="width: 13%;margin-right: 15px;" />
                                        <span style="margin:0 5px 0 12px">HA口:</span><Input v-model="backupIp[i].broadcastAddress" style="width: 13%;"/>
                                        <i-button style="margin-left:5px;" size="small" @click="delvarIP(i)">删除</i-button>
                                    </div>
                                    <i-button style="margin:10px 0 5px 30px;" icon="md-add" size="small" @click="addvarIP">添加</i-button>
                                    </td>
                            </tr>
                            <tr style="height: 40px;">
                                <!-- <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">是否抢占资源:</span></td>
                                <td>
                                    <i-switch style="margin-left:12px" v-model="isPreempt" size="large">
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                </td> -->
                            </tr>
                            <!-- <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">备机用户名:</span></td>
                                <td><Input v-model="backupIp" placeholder="" style="width: 200px;margin-left: 15px;" /></td>
                            </tr> -->
                            <!-- <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">备机密码:</span></td>
                                <td><Input placeholder="" style="width: 200px;margin-left: 15px;" /></td>
                            </tr> -->
                        </table>
                    </div>
                </div>
                <div v-if="host" style="border:1px solid #666;width:100%;position:relative;float: left;margin: 20px 0;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">配置同步选项</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">全选/取消:</span></td>
                                <td><Checkbox style="margin-left: 15px;"
                                        :indeterminate="indeterminate"
                                        :value="checkAll"
                                        @click.prevent.native="handleCheckAll">全选/反选</Checkbox></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">用户管理:</span></td>
                                <td>
                                    <CheckboxGroup style="margin-left: 15px;" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                                        <span v-for="(val,index) in checkboxList" :key="index">
                                            <span><Checkbox v-model="val.state" :label="val.cname"></Checkbox></span>
                                        </span>
                                        
                                        <!-- <Checkbox label="用户管理"></Checkbox>
                                        <Checkbox label="登录管理"></Checkbox>
                                        <Checkbox label="静态路由"></Checkbox>
                                        <Checkbox label="虚拟IPS"></Checkbox>
                                        <Checkbox label="访问控制"></Checkbox>
                                        <Checkbox label="强制访问控制"></Checkbox>
                                        <Checkbox label="FTP服务"></Checkbox>
                                        <Checkbox label="SMB服务"></Checkbox>
                                        <Checkbox label="数据资源"></Checkbox>
                                        <Checkbox label="业务与服务"></Checkbox> -->
                                    </CheckboxGroup>
                                </td>
                            </tr>
                        </table>
                        <i-button @click="updateDoubleBackups" style="display:block;width:60px;margin:10px auto" type="primary">提交</i-button>
                    </div>
                </div>
                <div v-if="!host" style="border:1px solid #666;width:100%;position:relative;float: left;margin: 20px 0;">        
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">常规设置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 17.5%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设置主机IP:</span></td>
                                <td>
                                    <span style="margin:0 5px 0 15px">ip</span><Input v-model="master.ip" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 15px">端口</span><Input v-model="master.port" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 15px">优先级</span><Input v-model="master.priority" style="width: 13%;margin-right: 15px;" />
                                    <span style="margin:0 5px 0 15px">HA口:</span><Input v-model="master.broadcastAddress" style="width: 13%;"/>
                                </td>
                            </tr>
                        </table>
                        <i-button @click="updateDoubleBackups" style="display:block;width:60px;margin:10px auto" type="primary">提交</i-button>
                    </div>
                </div>
            </div> 
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "CarpSetting",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                loading:false,
                actionBackup:false,
                isPreempt:false,
                host:false,
                data1:[],//原有table
                copydata:[],//被串改tabledata
                columns1: [
                    {title: '序号', key: 'ID', align: 'center',width: 70,
                        render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: 'IP', align: 'center',key: 'ip',
                        render: (h, params) => {
                            if(params.row.nowMachine){
                                return h('span',{style: {fontWeight:'bold'}}, params.row.ip+' [当前设备]');
                            }else{
                                return h('span', params.row.ip);
                            }
                        }
                    },
                    {title: '端口', align: 'center',key: 'port'},
                    {title: '优先度', align: 'center',key: 'priority'},
                    {title: '状态', align: 'center',key: 'state',
                        render: (h, params) => {
                            if(params.row.state == 0){
                                return h('span',{style: {padding:'5px 10px',color: '#fff',background: '#ce8282' ,borderRadius: '10px',display: 'inline-block'}}, '主机' );
                            }else{
                                return h('span', '备机');
                            }
                        }
                    }
                ],
                broadcastAddress:'',
                action:false,//启用双机热备按钮值
                backupIp:[{}],//备机ip
                master:{
                    priority:'',
                    ip:'',
                    port:'10000',
                    broadcastAddress:'',
                    id:'',
                    nowMachine:''
                },//主机ip
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],//被选择的chechbox组
                checkboxList:[],
                links: [
                    {name: "双机热备配置", to: "/availability/carpSetting"}
                ],
                form:{
                    master:[],
                    
                    isPreempt:0,
                    // backupIps:["127.0.0.1","127.0.0.2"],//备机ip
                    backupIps:[{}],//备机ip
                    action:1,//是否启用双机热备 0是，1否
                    models:[
                        // {
                        //     name:"ssh",//可选项名称
                        //     cname:"用戶",//可选项中文名称
                        //     state:0//此可选项是否启动双机热备
                        // },
                        // {
                        //     name:"group",
                        //     cname:"角色",
                        //     state:0
                        // },
                        // {
                        //     name:"interfaces",
                        //     cname:"ip配置",
                        //     state:0
                        // },  
                        // {
                        //     name:"user",
                        //     cname:"用戶",
                        //     state:0
                        // }
                    ],
                    virtualIp:[],
                    // master:{//主机的ip
                    //     ip:"192.168.6.97",//
                    //     port:'8080',//端口
                    //     priority:100,//优先级
                    //     state:'0'
                    // },
                } 
            }
        },
        mounted: function() {
            // this.isHost()
            this.host = true
            this.getCheckBoxList() //获取配置同步项列表
            this.getMachineState() //获取配置列表数据
        },
        methods: {
            getMachineState(){
                let config = {  
                    timeout: 120 * 1000,
                }
                this.$https.fetchPost(this.$api.avail.getMachineState.url,{},config).then((resp) => {
                if (resp.data.status == 200) {
                    // console.log(resp.data.data,"双机热备状态数据")
                    this.data1 = resp.data.data
                    // this.copydata = _.cloneDeep(this.data1)
                    // for(let i in this.data1){
                    //     if(this.data1[i].state == 0){
                    //         this.data1[i].state = "主机"
                    //     }else
                    // }
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                })
                // .catch(err => {
                //     this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                //     console.log(err)
                // })
            },
            //热备开关change事件
            checkaction(){
                this.loading = true
                if(this.action){
                    this.$https.fetchGet(this.$api.avail.startHotBackup.url).then((resp) => {
                        if (resp.data.status == 200) {
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                            this.$Notice.success({title: '热备启动成功', desc: "正在刷新页面", duration: 2.5});
                        } else{
                            this.action = false
                            this.$Notice.error({title: '热备启动失败', desc:  resp.data.desc, duration: 5});
                        }
                        this.loading = false
                        }).catch(err => {
                            this.loading = false
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            this.action = false
                            console.log(err)
                        })
                }else{
                    this.$https.fetchGet(this.$api.avail.stopHotBackup.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '热备关闭成功', desc: "正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 1000);
                        } else{
                            this.action = true
                            this.$Notice.error({title: '热备关闭失败', desc:  resp.data.desc, duration: 5});
                        }
                        this.loading = false
                        }).catch(err => {
                            this.loading = false
                            this.action = true
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                }
            },
            //判断是否为主机,true就是主机
            isHost(){
                this.$https.fetchGet(this.$api.avail.isHost.url).then((resp) => {
                if (resp.data.status == 200) {
                    this.host = resp.data.data
                    // console.log(resp.data.data)
                } else
                    this.$Notice.error({title: '获取数据失败', desc: resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            //删除虚拟ip框
            delvarIP (i){
                // this.$https.fetchPost(this.$api.avail.deleteBackupIp.url,{}).then((resp) => {
                // if (resp.data.status == 200) {
                //     this.$Notice.success({title: '获取数据成功', desc: '正在刷新页面', duration: 2.5});
                // this.backupIp.splice(i,1)
                // } else
                //     this.$Notice.error({title: '获取数据失败', desc: resp.data.desc, duration: 5});
                // }).catch(err => {
                //     this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                //     console.log(err)
                // })


                // if(this.backupIp.length>1){
                    this.backupIp.splice(i,1)
                // }else{
                //     this.$Notice.error({title: '删除失败', desc: '备机IP组不能为空', duration: 5});
                //     return
                // }
            },
            //增加虚拟ip框
            addvarIP (){
                console.log(this.backupIp)
                this.backupIp.push({state:0,port:10000})
            },
            //获取双击热备数据
            getCheckBoxList (){
                this.$https.fetchGet(this.$api.avail.getDoubleBackups.url).then((resp) => {
                if (resp.data.status == 200) {
                    // console.log(resp.data.data,"双机热备数据")
                    // this.master = resp.data.data.master
                    let arr = []
                    for(let i in resp.data.data.backupIps){
                        arr.push(resp.data.data.backupIps[i].ip)
                    }
                    // this.form.backupIps = resp.data.data.backupIps
                    this.backupIp = resp.data.data.backupIps
                    if(resp.data.data.master == null){

                    }else{
                        this.master = resp.data.data.master
                    }
                    
                    // this.backupIp = arr
                    this.checkboxList = resp.data.data.models
                    this.form.models = resp.data.data.models
                    for(let i in this.checkboxList){
                        if(this.checkboxList[i].state == 1){
                            this.$set(this.checkboxList[i],"state",false)
                        }else if(this.checkboxList[i].state == 0){
                            this.$set(this.checkboxList[i],"state",true)
                            this.checkAllGroup.push(this.checkboxList[i].cname)
                        }
                    }
                    if(this.checkAllGroup.length !=0){
                        this.indeterminate = true
                    }
                   
                    if(this.checkAllGroup.length == this.checkboxList.length){
                        this.checkAll = true
                    }
                    if(resp.data.data.action == 0){
                        this.action = true
                        this.actionBackup = true
                    }else if(resp.data.data.action == 1){
                        this.action = false
                        this.actionBackup = false
                    }
                    this.actionBackup
                    if(resp.data.data.isPreempt == 0){
                        this.isPreempt = true
                    }else if(resp.data.data.isPreempt == 1){
                        this.isPreempt = false
                    }
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            //提交按钮
            updateDoubleBackups(){
                let arr = _.cloneDeep(this.form)
                console.log(this.checkAllGroup)
                console.log(arr.models)
                arr.backupIps = this.backupIp
                for(let i in arr.models){
                    if(arr.models[i].state == true){
                        arr.models[i].state = 0
                    }else if(arr.models[i].state == false){
                        arr.models[i].state = 1
                    }
                }
                if(this.action == true){
                    arr.action = 0
                }else{
                    arr.action = 1
                }
                if(this.isPreempt == true){
                    arr.isPreempt = 0
                }else{
                    arr.isPreempt = 1
                }
                arr.master = this.master
                // arr.master.broadcastAddress = this.broadcastAddress
                console.log(arr)

                //数据校验
                if(!this.$util.queryDevIP4(arr.master.ip) && !this.$util.queryDevIP6(arr.master.ip)){
                    this.$Notice.error({title: '修改失败', desc: '主机ip请输入正确的ip格式', duration: 5});
                    return
                }
                else if(!this.$util.testportnumber(arr.master.port)){
                    this.$Notice.error({title: '修改失败', desc: '主机端口请输入正确的端口格式', duration: 5});
                    return
                }
                else if(arr.master.priority<1 || arr.master.priority>255){
                    this.$Notice.error({title: '修改失败', desc: '主机优先级范围为1-255', duration: 5});
                    return
                }
                if(arr.master.broadcastAddress){
                    if(!this.$util.queryDevIP4(arr.master.broadcastAddress) && !this.$util.queryDevIP6(arr.master.broadcastAddress)){
                        this.$Notice.error({title: '修改失败', desc: '主机HA口ip请输入正确的ip格式', duration: 5});
                        return
                    }
                }
                if(this.host){
                    if(arr.backupIps.length >= 1){

                    }else{
                        for(let i in arr.backupIps){
                            if(!this.$util.queryDevIP4(arr.backupIps[i].ip) && !this.$util.queryDevIP6(arr.backupIps[i].ip)){
                                this.$Notice.error({title: '修改失败', desc: '备机组请输入正确的ip格式', duration: 5});
                                return
                            }
                            else if(!this.$util.testportnumber(arr.backupIps[i].port)){
                                    this.$Notice.error({title: '修改失败', desc: '备机组端口请输入正确的端口格式', duration: 5});
                                    return
                            }
                            else if(arr.backupIps[i].priority<1 || arr.backupIps[i].priority>255){
                                    this.$Notice.error({title: '修改失败', desc: '备机组优先级范围为1-255', duration: 5});
                                    return
                            }
                            if(arr.backupIps[i].broadcastAddress){
                                if(!this.$util.queryDevIP4(arr.backupIps[i].broadcastAddress) && !this.$util.queryDevIP6(arr.backupIps[i].broadcastAddress)){
                                    this.$Notice.error({title: '修改失败', desc: '备机组HA口ip请输入正确的ip格式', duration: 5});
                                    return
                                }
                            }
                        }
                    }
                }
                if(this.actionBackup != this.action){
                    this.checkaction()
                }
                
                this.$https.fetchPost(this.$api.avail.updateHotBackups.url,arr).then((resp) => {
                if (resp.data.status == 200) {
                    this.$Notice.success({title: '双击热备配置成功', desc: "正在刷新界面", duration: 2.5});
                    setTimeout(() => {
                        this.reload();
                    }, 250);

                } else
                    this.$Notice.error({title: '双击热备配置失败', desc: resp.data.desc, duration: 10});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 10});
                })
            },
            //全选反选
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    let list = []
                    for(let i in this.checkboxList){
                        list.push(this.checkboxList[i].cname)
                    }
                    // this.checkAllGroup = ['用户管理', '登录管理', '静态路由', '虚拟IPS', '访问控制', '强制访问控制', 'FTP服务',
                    // 'SMB服务', '数据资源', '业务与服务'];
                    this.checkAllGroup = list
                    for(let i in this.checkboxList){
                        this.checkboxList[i].state = true
                    }
                } else {
                    this.checkAllGroup = [];
                    for(let i in this.checkboxList){
                        this.checkboxList[i].state = false
                    }
                }
                console.log(this.checkAllGroup,"checkAllGroup")
            },
            checkAllGroupChange (data) {
                console.log(data,"data")
                if (data.length == this.checkboxList) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
            rowClassName (row, index) {
                if (row.nowMachine) {
                    return 'demo-table-info-row';
                }
                return '';
            }
        }
    }
</script>

<style scoped>
/deep/ .ivu-table .demo-table-info-row td{
        background-color: #eeeeee;
        color: black;
    }
</style>