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
                        <!-- <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">启用日志记录:</span></td>
                            <td><Checkbox v-model="start_log" style="margin-left: 15px;"></Checkbox></td>
                        </tr> -->
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">启用远程syslog服务器:</span></td>
                            <td>
                                <i-switch style="margin-left:12px" v-model="action" :loading="loading"  @on-change="checkaction" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            </td>
                        </tr>
                        <tr  style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">加密方式:</span></td>
                            <td>
                                <Select  v-model="form.encryptType" clearable style="width:200px;margin-left:12px">
                                    <Option v-for="item in encryptTypeList" :value="item.value" :key="item.value" @click.native="passchange(item.value)">{{ item.name }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr v-if="passshow" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">密码:</span></td>
                            <td>
                                <Input style="width: 200px;margin-left:12px" v-model="form.aesPassword" />
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">数据的格式类型:</span></td>
                            <td>
                                <Select v-model="form.dataFormatType" clearable style="width:200px;margin-left:12px">
                                    <Option v-for="item in dataFormatTypeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">间隔时长(毫秒):</span></td>
                            <td>
                                <Input style="width: 200px;margin-left:12px;" v-model="form.intervalTime" />
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">需要同步的表:</span></td>
                            <td>
                                <Select v-model="needSyncTables" style="width:500px;margin-left:12px;" multiple >
                                    <Option v-for="item in needSyncTablesList" :value="item.tableName" :key="item.tableName">{{ item.tableChineseName }}</Option>
                                </Select>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">远程服务器主机配置:</span></td>
                            <td>
                                <table v-if="addTitle" style="margin:10px 0 5px 10px">
                                    <tr>
                                        <th style="text-align: center;font-size: 12px;padding:1px;">IP</th>
                                        <th style="text-align: center;font-size: 12px;padding:1px;">端口</th>
                                        <th style="text-align: center;font-size: 12px;padding:1px;">描述</th>
                                        <th style="text-align: center;font-size: 12px;padding:1px;">操作</th>
                                    </tr>
                                    <tr v-for="(d,index) in remote_server" :key="index" style="margin-left:-7px;">
                                        <td><Input v-model="d.ip" style="margin:5px;width: 100px;" /></td>
                                        <td><Input v-model="d.port" style="margin:5px;width: 80px;" /></td>
                                        <td><Input v-model="d.desc" style="margin:5px;width: 250px;" /></td>
                                        <td><i-button style="margin-left:5px;" size="small" @click="del_remote_server(index)">删除</i-button></td>

                                    </tr>
                                </table>
                                
                                <i-button style="margin:0 0 5px 15px;" icon="md-add" size="small" @click="add_remote_server">添加</i-button>
                            </td>
                        </tr>
                        <tr v-show="action" style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">最近一次运行记录:</span></td>
                            <td>
                                <!-- <div style="margin-left:12px;" > -->
                                    <Button @click="showdetail" style="margin-left:12px;">点击详情</Button>
                                <!-- </div> -->
                                <!-- <div style="margin-left:12px;" v-for="(item,i) in lastlog" :key="i">
                                    <span v-text="item"></span>
                                </div> -->
                            </td>
                        </tr>
                    </table>
                </div>
                
                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" @click="sumbit" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
        <Modal
            title="操作详情"
            v-model="lastdetailshow"
            :styles="{top: '100px'}">
            <div style="margin-left:12px;" v-for="(item,i) in lastlog" :key="i">
                <span v-text="item"></span>
            </div>
            <div slot="footer"></div>
        </Modal>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "LogSyslog",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                loading:false,
                lasttime:'',
                lastdetailshow:false,
                lastlog:'',
                needSyncTables:[],
                needSyncTablesList:[],
                passshow:false,
                addTitle:true,
                disabled_val: true,
                start_snmp: false,
                start_log: true,
                remote_server: [],
                action:false,
                dataFormatTypeList:[
                    // {name: "默认类型", value: 0},
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
            this.getsysloginfo() //获取syslog数据
            
        },
        methods: {
            //展示lastlog详情
            showdetail(){
                this.lastdetailshow = true
                this.getlastloginfo()
            },
            getlastloginfo(){
                // this.form.needSyncTables = []
                // this.form.machines = []
                this.$https.fetchGet(this.$api.log.getLastLog.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data,"lastlog数据")
                    this.lastlog = resp.data.data
                    let arr = this.lastlog.split(/[\n]/)
                    // arr[0] = arr[0] +" "+ arr[1]
                    // arr.splice(1,1)
                    this.lastlog = arr
                    console.log(arr)
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            },
            sumbit(){
                this.form.machines = this.remote_server
                console.log(this.needSyncTables)
                for(let j in this.form.needSyncTables){
                    this.form.needSyncTables[j].action = 1
                }
                for(let i in this.needSyncTables){
                    for(let j in this.form.needSyncTables){
                        if(this.needSyncTables[i] == this.form.needSyncTables[j].tableName){
                            this.form.needSyncTables[j].action = 0
                        }
                    }
                }
                console.log(this.form)
                this.$https.fetchPost(this.$api.log.updateSysLog.url,this.form).then((resp) => {
                if (resp.data.status == 200) {
                    this.$Notice.success({title: '提交成功', desc: "正在刷新界面", duration: 2.5});
                    setTimeout(() => {
                        location.reload()
                    }, 250);
                } else
                    this.$Notice.error({title: '提交失败', desc: resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
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
                        this.getlastloginfo() //获取syslastlog数据
                    }
                    if(obj.encryptType == 2){
                        this.passshow = true
                    }
                    if(obj.machines.length == 0){
                        this.addTitle = false
                    }else{
                        this.addTitle = true
                    }
                    for(let i in obj.needSyncTables){
                        this.needSyncTablesList.push(obj.needSyncTables[i])
                        if(obj.needSyncTables[i].action == 0){
                            this.needSyncTables.push(obj.needSyncTables[i].tableName)
                        }
                        
                    }
                    for(let i in obj.machines){
                        let data = {ip:obj.machines[i].ip,port:obj.machines[i].port,desc:obj.machines[i].desc}
                        this.remote_server.push(data)
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
                this.loading = true
                console.log(this.action)
                if(this.action){
                    this.$https.fetchGet(this.$api.log.action.url).then((resp) => {
                        if (resp.data.status == 200) {
                            setTimeout(() => {
                                // this.getsysloginfo()
                            }, 250);
                            this.$Notice.success({title: '日志记录启动成功', desc: "正在刷新页面", duration: 2.5});
                        } else{
                            this.action = false
                            this.$Notice.error({title: '日志记录启动失败', desc:  resp.data.desc, duration: 5});
                        }
                        this.loading = false
                        }).catch(err => {
                            this.loading = false
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            this.action = false
                            console.log(err)
                        })
                }else{
                    this.$https.fetchGet(this.$api.log.stop.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '日志记录关闭成功', desc: "正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                // this.getsysloginfo()
                            }, 250);
                        } else{
                            this.action = true
                            this.$Notice.error({title: '日志记录关闭失败', desc:  resp.data.desc, duration: 5});
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
            checkSnmp(e){
                if(e == true){
                    this.disabled_val = true
                }else {
                    this.disabled_val = false
                }
            },
            add_remote_server() {
                this.addTitle = true
                this.remote_server.push({port:'',ip:'',desc:''});
                
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
    .modal-body{
        /* height: 700px; */
    }
</style>