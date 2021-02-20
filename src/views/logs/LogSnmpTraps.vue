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
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">启动SNMP Traps:</span></td>
                            <td>
                                <i-switch style="margin-left:12px" v-model="data.state" @on-change="checkSnmp" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <!-- <Checkbox v-model="start_snmp" style="margin-left: 15px;" @click.native="checkSnmp(start_snmp)"></Checkbox> -->
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">SNMP Traps:</span></td>
                            <td>
                                <table style="margin-left: 15px;">
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">集控地址:</td><td><Input v-model="data.jkIp" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">集控端口:</td><td><Input v-model="data.jkPort" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">共同体:</td><td><Input v-model="data.community" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">trap周期:</td><td><Input v-model="data.time" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">在线检测网口:</td><td><Input v-model="data.so" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">CPU使用率OID:</td><td><Input v-model="data.cpuOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">磁盘使用率OID:</td><td><Input v-model="data.diskOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">内存使用率OID:</td><td><Input v-model="data.memOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">接口流量OID:</td><td><Input v-model="data.flowOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">属性OID:</td><td><Input v-model="data.attributeOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">在线状态OID:</td><td><Input v-model="data.stateOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">任务状态OID:</td><td><Input v-model="data.taskOid" style="width: 150px;margin-left: 15px;" :disabled="disabled_val" /></td></tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </div>

                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" @click="submit" data-toggle="modal" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "LogSnmpTraps",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                disabled_val: true,
                start_snmp: false,
                data: {
                    state: false,
                    jkIp: '',
                    jkPort: "162",
                    community: 'public',
                    time: "1",
                    so: '',
                    cpuOid: '',
                    diskOid: '',
                    memOid: '',
                    flowOid: '',
                    attributeOid: '',
                    stateOid: '',
                    taskOid: ''
                },
                links: [
                    {name: "日志常规设置", to: "/logs/logSetting"},
                    {name: "Syslog服务", to: "/logs/logSyslog"},
                    {name: "SNMP Traps服务", to: "/logs/logSnmpTraps"},
                    // {name: "同步程序日志设置", to: "/logs/logSyncPrograms"}
                ]
            }
        },
        mounted: function() {
            this.getinfo() //获取snmp数据
        },
        methods: {
            submit(){
                console.log(this.data)
                 //数据校验
                if(!this.$util.queryDevIP4(this.data.jkIp) && !this.$util.queryDevIP6(this.data.jkIp)){
                    if(this.data.jkIp == null || this.data.jkIp){
                        console.log(this.data.jkIp)
                    }else{
                        this.$Notice.error({title: '修改失败', desc: '集控地址请输入正确的ip格式', duration: 5});
                        return
                    }
                }
                else if(!this.$util.testportnumber(this.data.jkPort)){
                    if(this.data.jkPort == null || this.data.jkPort){

                    }else{
                        this.$Notice.error({title: '修改失败', desc: '集控端口请输入正确的端口格式', duration: 5});
                        return
                    }
                }
                else if(!this.data.community && this.data.state){
                    this.$Notice.error({title: '修改失败', desc: '共同体不能为空', duration: 5});
                    return
                }
                else if(!this.data.time && this.data.state){
                    this.$Notice.error({title: '修改失败', desc: 'trap周期不能为空', duration: 5});
                    return
                }
                this.$https.fetchPost(this.$api.log.addSnmpInfo.url,this.data).then((resp) => {
                if (resp.data.status == 200) {
                    this.$Notice.success({title: '提交成功', desc: "正在刷新界面", duration: 2.5});
                    setTimeout(() => {
                        this.getinfo() 
                    }, 250);
                } else
                    this.$Notice.error({title: '提交失败', desc: resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                })
            },
            getinfo(){
                this.$https.fetchGet(this.$api.log.findSnmpInfo.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data,"snmp数据")
                    this.data = resp.data.data
                    this.checkSnmp()
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            checkSnmp() {
                if (this.data.state == true) {
                    this.disabled_val = false
                } else {
                    this.disabled_val = true   
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