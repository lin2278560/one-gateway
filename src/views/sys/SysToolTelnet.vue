<template>
    <div class="container-fluid">
        <blockquote class="row margin-top clear-margin" style="border-left: groove 5px rgba(0, 0, 0, .4);color: #000000;font-size: 14px;">
               系统配置
        </blockquote>
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
<!--                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">-->
<!--                    <span style=" background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center">同步程序定时</span>-->
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">目标主机:</span></td>
                                <td style="font-size: 12px;"><Input v-model="form.ip" style="width: 30%;margin-left: 15px;" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">端口:</span></td>
                                <td style="font-size: 12px;">
                                    <Input v-model="form.port" style="width: 15%;margin-left: 15px;"/>
                                </td>
                            </tr>
                        </table>
                    </div>
<!--                </div>-->
                <div>
                    <Button :loading="ButtonLoading" @click="submit()" style="margin: 10px 50%;">确认</Button>
                </div>
                <Input v-if="textareaShow" v-model="value" type="textarea" :rows="20" placeholder="Enter something..." />
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysToolTelnet",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                ButtonLoading:false,
                textareaShow:false,
                value:'',
                form:{
                    ip:'',
                    port: "",
                },
                links: [
                    {name: "Ping", to: "/sys/toolPing"},
                    {name: "Traceroute", to: "/sys/toolTraceroute"},
                    {name: "Telnet", to: "/sys/toolTelnet"},
                    {name: "Arp", to: "/sys/toolArp"},
                    {name: "抓包", to: "/sys/toolCatch"},
                    {name: "FTP服务", to: "/sys/toolFTP"},
                    // {name: "SMB服务", to: "/sys/toolSMB"},
                ],
            }
        },
        mounted() {
            
        },
        methods: {
            submit(){
                if(!this.$util.queryDevIP4(this.form.ip) && !this.$util.queryDevIP6(this.form.ip)){
                    this.$Notice.error({title: '检测失败', desc: '目标主机ip请输入正确的ip格式', duration: 5});
                    return
                }
                if(!this.$util.testportnumber(this.form.port)){
                    this.$Notice.error({title: '检测失败', desc: '端口请输入正确的端口格式，应为0-65535', duration: 5});
                    return
                }
                let config = {  
                    timeout: 60 * 1000,
                }
                this.ButtonLoading = true
                console.log(this.form)
                this.$https.fetchPost(this.$api.sys.telnet.url,{
                    ip:this.form.ip,
                    port:this.form.port
                },config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.ButtonLoading = false
                        this.textareaShow = true
                        this.value = resp.data.data
                    } else {
                        this.$Notice.error({title: "请求失败",desc: "错误:" + resp.data.desc,duration: 5});
                        this.textareaShow = false
                    }
                    }).catch(function (error) {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2});
                        this.textareaShow = false
                    });
            },
        }
    }
</script>

<style scoped>
</style>