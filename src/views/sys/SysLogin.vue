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
                                <td style="width: 20%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">会话超时设置:</span></td>
                                <td style="font-size: 12px;"><Input v-model="form.session_timeout" style="width: 70px;margin-left: 15px;" />分钟</td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">登录可尝试次数:</span></td>
                                <td style="font-size: 12px;"><Input v-model="form.logfail_count" style="width: 70px;margin-left: 15px;" />次</td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">封锁IP时间:</span></td>
                                <td style="font-size: 12px;"><Input v-model="form.logfail_timeout" style="width: 70px;margin-left: 15px;" />分钟</td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">远程管理主机:</span></td>
                                <td><Checkbox style="margin-left: 15px;" v-model="ishostclick" @click.native="configData($event)">选中,则启用远程管理主机</Checkbox></td>
                            </tr>
                            <tr style="height: 40px;" v-show="ishostShow">
                                <td style="background-color: #eee;">
                                    <RadioGroup v-model="hostList" @on-change="hostListchange()">
                                        <Radio style="float: right;margin-right: 15px;" label="允许远程管理主机列表"></Radio>
                                        <Radio style="float: right;margin-right: 15px;" label="禁止远程管理主机列表"></Radio>
                                    </RadioGroup>
                                </td>
                                <td><Input  style="width: 370px;margin-left: 15px;" v-model="value8" type="textarea" />
                                    <br/>
                                    <div style="margin-left: 15px;font-size:12px;color:red;">提示:输入允许或禁止远程管理主机列表IP,多个输入用逗号隔开</div>
                                </td>
                            </tr>
                            <!-- <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">上传根证书:</span></td>
                                <td><Upload style="margin: 7px 0 0 15px;" multiple action="//jsonplaceholder.typicode.com/posts/"><Button icon="ios-cloud-upload-outline">选择文件</Button></Upload></td>
                            </tr> -->
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">证书认证:</span></td>
                                <td><Checkbox v-model="form.is_cert" style="margin-left: 15px;font-size: 12px;">启用证书认证</Checkbox></td>
                            </tr>
                        </table>
                    </div>
<!--                </div>-->
                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" @click="submit()" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysLogin",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                ishostclick:false,
                value8:'',
                hostList:'允许远程管理主机列表',
                ishostShow: false,
                form:{
                    logfail_count:'',
                    logfail_timeout: "",
                    session_timeout: "",
                    is_cert: false,
                    the_blacklist: '',
                    white_list: ''
                },
                links: [
                    {name: "登录设置", to: "/sys/loggingSettings"}
                ],
            }
        },
        mounted() {
            this.getinfo()
        },
        methods: {
            hostListchange(){
                // this.value8 = null
            },
            getinfo(){
                this.$https.fetchGet(this.$api.user.findSessionInfo.url).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data.data)
                        if(resp.data.data.is_cert == "true"){
                            resp.data.data.is_cert = true
                        }else{
                            resp.data.data.is_cert = false
                        }
                        this.form = resp.data.data
                        if(this.form.the_blacklist || this.form.white_list){
                            this.ishostclick = true
                            this.ishostShow = true;
                            if(this.form.the_blacklist){
                                this.value8 = this.form.the_blacklist
                                this.hostList = "禁止远程管理主机列表"
                            }else if(this.form.white_list){
                                this.value8 = this.form.white_list
                                this.hostList = "允许远程管理主机列表"
                            }
                        }
                    } else {
                        this.$Notice.error({title: "获取更新包资源失败",desc: "错误:" + resp.data.desc,duration: 5});
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            configData(e){
                let checked = e.target.checked;
                if(checked){
                    this.ishostShow = true;
                }else{
                    this.ishostShow = false;
                }
                this.value8 = ''
            },
            submit(){
                if(!this.$util.queryNum(this.form.session_timeout)){
                    this.$Notice.error({title: '修改失败', desc: '会话超时设置请填写正整数', duration: 5});
                    return
                }
                if(!this.$util.queryNum(this.form.logfail_count)){
                    this.$Notice.error({title: '修改失败', desc: '登录可尝试次数请填写正整数', duration: 5});
                    return
                }
                if(!this.$util.queryNum(this.form.logfail_timeout)){
                    this.$Notice.error({title: '修改失败', desc: '封锁IP时间请填写正整数', duration: 5});
                    return
                }
                this.form.the_blacklist = ''
                this.form.white_list = ''
                if(this.hostList == "允许远程管理主机列表" && this.ishostShow){
                    this.form.white_list = this.value8
                }else if(this.hostList == "禁止远程管理主机列表" && this.ishostShow){
                    this.form.the_blacklist = this.value8
                }
                console.log(this.form)
                this.$https.fetchPost(this.$api.user.updateSession.url,this.form).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Message.success('修改成功');
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else {
                        this.$Notice.error({title: "修改失败",desc: "错误:" + resp.data.desc,duration: 5});
                    }
                    }).catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>

<style scoped>
</style>