<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">启动SNMP服务器:</span></td>
                            <td><Checkbox v-model="SNMPform.bl" style="margin-left: 15px;" @click.native="checkSnmpStatus(SNMPform.bl)"></Checkbox></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">监听端口:</span></td>
                            <td><Input v-model="SNMPform.port" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备位置:</span></td>
                            <td><Input v-model="SNMPform.dev" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">共同体:</span></td>
                            <td><Input v-model="SNMPform.community" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">SNMPv3:</span></td>
                            <td><Checkbox v-model="SNMPform.snmpV3" :disabled="disabled_val" @click.native="checkSnmpsnmpV3(SNMPform.snmpV3)" style="margin-left: 15px;"></Checkbox></td>
                        </tr>
                         <tr v-if="SnmpsnmpV3Show" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">用户名:</span></td>
                            <td><Input v-model="SNMPform.username" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td>
                        </tr>
                        <tr v-if="SnmpsnmpV3Show" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">安全级别:</span></td>
                            <td>
                                <Select :disabled="disabled_val" v-model="SNMPform.level" @on-change="checkSnmplevel(SNMPform.level)" style="width:150px;margin-left: 15px;">
                                    <Option value="authPriv">authPriv</Option>
                                    <Option value="authNoPriv">authNoPriv</Option>
                                    <Option value="noAuthNoPriv">noAuthNoPriv</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr v-if="SnmpsnmpV3Show && SnmpauthPrivShow" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">验证协议:</span></td>
                            <td>
                                <Select :disabled="disabled_val" v-model="SNMPform.protocol" style="width:150px;margin-left: 15px;">
                                    <Option value="MD5">MD5</Option>
                                    <Option value="SHA">SHA</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr v-if="SnmpsnmpV3Show && SnmpauthPrivShow" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">验证字符串:</span></td>
                            <td><Input v-model="SNMPform.password" type="password" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" />
                            </td>
                        </tr>
                        <tr v-if="SnmpsnmpV3Show && SnmpauthNoPrivShow" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">加密协议:</span></td>
                            <td>
                                <Select :disabled="disabled_val" v-model="SNMPform.encrypt" style="width:150px;margin-left: 15px;">
                                    <Option value="DES">DES</Option>
                                    <Option value="AES">AES</Option>
                                </Select>
                            </td>
                        </tr>
                         <tr v-if="SnmpsnmpV3Show && SnmpauthNoPrivShow" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">加密字符串:</span></td>
                            <td><Input v-model="SNMPform.encryptString" type="password" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td>
                        </tr>
                        
                    </table>
                </div>
                <!-- <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">当前日志存储空间:</span></td>
                            <td><span style="width: 150px;margin-left: 15px;font-size: 12px;">30760KB</span></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">报警阀值:</span></td>
                            <td style="font-size: 12px;"><Input style="width: 150px;margin-left: 15px;" /> KB</td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">日志存档:</span></td>
                            <td>
                                <Select style="width:170px;margin-left: 15px;">
                                    <Option>系统日志</Option>
                                    <Option>管理操作日志</Option>
                                    <Option>数据库抽取日志</Option>
                                    <Option>数据库基本信息日志</Option>
                                    <Option>文件同步日志</Option>
                                    <Option>通道操作日志</Option>
                                    <Option>告警日志</Option>
                                </Select>
                                <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin-left: 10px;">下载</div>
                            </td>
                        </tr>
                    </table>
                </div> -->
                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" @click="sumbit" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "LogSettings",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                SnmpauthPrivShow:false,
                SnmpauthNoPrivShow:false,
                SnmpsnmpV3Show:false,
                needSyncTables:[],
                needSyncTablesList:[],
                passshow:false,
                addTitle:false,
                disabled_val: true,
                start_snmp: false,
                start_log: true,
                remote_server: [],
                action:false,
                dataFormatTypeList:[
                    {name: "默认类型", value: 0},
                    {name: "json类型", value: 1},
                    {name: "xml类型", value: 2}
                ],
                encryptTypeList:[
                    {name: "不加密", value: 0},
                    {name: "base64加密", value: 1},
                    {name: "aes加密", value: 2}
                ],
                links: [
                    {name: "日志常规设置", to: "/logs/logSetting"},
                    {name: "Syslog服务", to: "/logs/logSyslog"},
                    {name: "SNMP Traps服务", to: "/logs/logSnmpTraps"},
                    // {name: "同步程序日志设置", to: "/logs/logSyncPrograms"}
                ],
                SNMPform:{
                    bl: false,
                    port: null,
                    dev: null,
                    community: null,
                    snmpV3: false,
                    username: null,
                    level: null,
                    protocol: null,
                    password: null,
                    encrypt: null,
                    encryptString: null
                },
                form:{
                    encryptType:0,
                    aesPassword:'',
                    dataFormatType:0,
                    intervalTime:'',
                    needSyncTables:[
                        {
                            action:0,
                            tableName: "",
                            tableChineseName: "",
                            selectType: 0,
                            tag: "",
                            tagValue: ""

                        }
                    ],
                    machines: [
                        {
                            ip:'',
                            port:'',
                            desc:'',
                        }
                    ]
                },
            }
        },
        mounted: function() {
            // this.getsysloginfo() //获取syslog数据
            this.getSNMPinfo() //获取syslog数据
        },
        methods: {
            getSNMPinfo(){
                this.$https.fetchGet(this.$api.log.findSnmpServe.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data,"snmp数据")
                    this.SNMPform = resp.data.data
                    if(this.SNMPform == null){
                        return
                    }
                    if(this.SNMPform.bl){
                        this.disabled_val = false
                    }else{
                        this.disabled_val = true
                    }
                    if(this.SNMPform.snmpV3){
                        this.SnmpsnmpV3Show = true
                    }else{
                        this.SnmpsnmpV3Show = false
                    }
                    if(this.SNMPform.level == 'authNoPriv'){
                    this.SnmpauthPrivShow=true
                    this.SnmpauthNoPrivShow=false
                }else if(this.SNMPform.level == 'authPriv'){
                    this.SnmpauthPrivShow=true
                    this.SnmpauthNoPrivShow=true
                }else{
                    this.SnmpauthPrivShow=false
                    this.SnmpauthNoPrivShow=false
                }
                } else
                    this.$Notice.error({title: '获取snmp配置数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            sumbit(){
                if(!this.$util.testportnumber(String(this.SNMPform.port))){
                    this.$Notice.error({title: '修改失败', desc: '端口请输入正确的端口格式', duration: 5});
                    return
                }
                else if(!this.SNMPform.dev){
                    this.$Notice.error({title: '修改失败', desc: '设备位置不能为空', duration: 5});
                    return
                }else if(!this.SNMPform.community){
                    this.$Notice.error({title: '修改失败', desc: '共同体不能为空', duration: 5});
                    return
                }
                this.$https.fetchPost(this.$api.log.addSnmpServe.url,this.SNMPform).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: 'snmp配置修改成功', desc: resp.data.desc, duration: 2.5});
                        setTimeout(() => {
                            this.getSNMPinfo()
                        }, 250);
                    } else{
                        this.$Notice.error({title: 'snmp配置修改失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            passchange(item){
                if(item ==2){
                    this.passshow = true
                }else{
                    this.passshow = false
                }
            },
            getsysloginfo(){
                this.$https.fetchGet(this.$api.log.getSysLog.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data,"syslog数据")
                    let obj = resp.data.data
                    this.form = obj
                    if(obj.action == 1){
                        this.action = false
                    }else{
                        this.action = true
                    }
                    if(obj.encryptType == 2){
                        this.passshow = true
                    }
                    for(let i in obj.needSyncTables){
                        // let data = obj.needSyncTables[i]
                        this.needSyncTablesList.push(obj.needSyncTables[i])
                    }
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            //开关change事件
            checkaction(){
                console.log(this.action)
                if(this.action){
                    this.$https.fetchGet(this.$api.log.action.url).then((resp) => {
                        if (resp.data.status == 200) {
                            setTimeout(() => {
                                this.getSNMPinfo()
                            }, 250);
                            this.$Notice.success({title: '日志记录启动成功', desc: "正在刷新页面", duration: 2.5});
                        } else{
                            this.action = false
                            this.$Notice.error({title: '日志记录启动失败', desc:  resp.data.desc, duration: 5});
                        }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            this.action = false
                            console.log(err)
                        })
                }else{
                    this.$https.fetchGet(this.$api.log.stop.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '日志记录关闭成功', desc: "正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                this.getSNMPinfo()
                            }, 250);
                        } else{
                            this.action = true
                            this.$Notice.error({title: '日志记录关闭失败', desc:  resp.data.desc, duration: 5});
                        }
                        }).catch(err => {
                            this.action = true
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                }
            },
            checkSnmpStatus(e){
                if(e == true){
                    this.disabled_val = true
                }else {
                    this.disabled_val = false
                }
            },
            checkSnmpsnmpV3(e){
                console.log(e)
                if(e == true){
                    this.SnmpsnmpV3Show = false
                }else {
                    this.SnmpsnmpV3Show = true
                }
            },
            checkSnmplevel(e){
                console.log(e)
                if(e == 'authNoPriv'){
                    this.SnmpauthPrivShow=true
                    this.SnmpauthNoPrivShow=false
                }else if(e == 'authPriv'){
                    this.SnmpauthPrivShow=true
                    this.SnmpauthNoPrivShow=true
                }else{
                    this.SnmpauthPrivShow=false
                    this.SnmpauthNoPrivShow=false
                }
            },
            add_remote_server() {
                this.addTitle = true
                this.remote_server.push({port:514,ip:'',desc:''});
                
            },
            del_remote_server(index) {
                this.remote_server.splice(index,1);
                if (this.remote_server.length == 0){
                    this.addTitle = false
                }
            }
        }
    }
</script>

<style scoped>

    .ivu-btn-warning {
        color: #fff;
        background-color: #e66534;
        border-color: #e66534;
    }

</style>