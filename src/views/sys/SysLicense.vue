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
            <div class="modal-body" style="height: 600px;">
                <div style="float: left;width: 100%;">

                    <div style="border:1px solid #666;position: relative;margin-top: 20px;">
                        <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">注册信息</span>
                        <div style="margin: 15px 10px;">
                            <table border="1" style="width: 100%;">
                                <tr style="height: 35px;" v-for="(item, index) in content" :key="index">
                                    <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">{{item.name}}</span></td>
                                    <td><span style="margin-left: 15px;font-size: 12px;">{{item.val}}</span></td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div style="border:1px solid #666;position: relative;margin-top: 20px;">
                        <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">授权验证</span>
                        <div style="margin: 15px 10px;">
                            <table border="1" style="width: 100%;">
                                <tr style="height: 150px;">
                                    <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">授权信息:</span></td>
                                    <td>
                                        <div style="margin: 7px 0;"><span style="margin-left: 15px;font-size: 12px;">授权天数:<span style="margin-left: 56px;">{{licenseInfo.data}}</span></span></div>
                                        <div style="border: 1px solid #ababaa;"></div>
                                        <div style="margin: 7px 0;"><span style="margin-left: 15px;font-size: 12px;">设备识别号:<span style="margin-left: 45px;">{{licenseInfo.dev}}&nbsp;&nbsp;</span></span></div>
                                        <div style="border: 1px solid #ababaa;"></div>
                                        <div style="margin: 7px 0;"><span style="margin-left: 15px;font-size: 12px;">授权类型:<span style="margin-left: 57px;color: red;">{{licenseInfo.type}}</span></span></div>
                                        <div style="border: 1px solid #ababaa;" v-if="licenseInfo.type != '正式'"></div>
                                        <div style="margin: 7px 0;" v-if="licenseInfo.type != '正式'"><span style="margin-left: 15px;font-size: 12px;">已使用时间:<span style="margin-left: 45px;color: red;">{{licenseInfo.time}}</span></span></div>
                                    </td>
                                </tr>
                                <tr style="height: 35px;">
                                    <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">授权文件:</span></td>
                                    <td>
                                        <Upload
                                                :before-upload="handleUpload"
                                                :action="url" style="float: left;margin:15px 0 0 15px;">
                                            <Button style="float: left;" icon="ios-cloud-upload-outline">点击选择文件</Button>
                                            <div style="float: left;margin: 6px 0 0 20px;" v-if="file !== null">Upload file: {{ file.name }}</div>
                                        </Upload>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div>
                        <Button type="primary" style="margin: 10px 50%;" :loading="loading" @click="upload">上传</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysLicense",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                content: [
                    {name: "单位名称:", title: "companyName", val: ""},
                    {name: "联系电话:", title: "iphone", val: ""},
                    {name: "单位座机:", title: "special", val: ""},
                    {name: "单位地址:", title: "site", val: ""},
                    {name: "邮件地址:", title: "email", val: ""},
                    {name: "购买日期:", title: "data", val: ""},
                    {name: "单位联系人:", title: "linkman", val: ""},
                    {name: "所在部门:", title: "branch", val: ""},
                    {name: "供应商:", title: "provider", val: ""}
                ],
                licenseInfo: {
                    code: "",
                    dev:"",
                    type: "",
                    data: '',
                    expireDate: '',
                },
                url: '',
                file: null,
                loading: false,
                links: [
                    {name: "授权验证", to: "/sys/license"}
                ]
            }
        },
        mounted() {
            this.showData();
        },
        methods: {
            showData() {
                this.$https.fetchGet(this.$api.sys.licenseInfo.url).then((resp) => {
                    for(let i in this.content){
                        for(let j in resp.data.data){
                            if(this.content[i].title == j){
                                this.content[i].val = resp.data.data[j]
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
                this.$https.fetchGet(this.$api.sys.licenseIn.url).then((resp) => {
                    console.log(resp.data.data)
                    this.licenseInfo = resp.data.data
                    if(this.licenseInfo != "试用期"){
                        
                    }
                    // if(resp.data.data.currentLicenseState == 'UNREGISTERED') {this.licenseInfo.currentLicenseState = '未注册'}
                    // else if(resp.data.data.currentLicenseState == 'EXPIRED') {this.licenseInfo.currentLicenseState = '已过期'}
                    // else if(resp.data.data.currentLicenseState == 'NORMAL') {this.licenseInfo.currentLicenseState = '正常'}
                    // else if(resp.data.data.currentLicenseState == 'ABNORMAL') {this.licenseInfo.currentLicenseState = '异常'}

                    // let data = this.$util.time_stamp2time_date(resp.data.data.expireDate * 1000);
                    // this.licenseInfo.expireDate = data.format("yyyy-MM-dd hh:mm:ss");

                    // let type = resp.data.data.license.type == "OFFICIAL" ? "正式" : "试用 ("+resp.data.data.license.trialDays+") 天";
                    // this.licenseInfo.type = type;
                    // for(let i in this.content) {
                    //     let title = this.content[i].title;
                    //     this.content[i].val = resp.data.data.license.register[title];
                    // }
                }).catch(err => {
                    console.log(err)
                })
            },
            handleUpload (file) {
                console.log(file)
                let suffix = file.name.match(/.dat$/)
                console.log(suffix)
                if(suffix != undefined && suffix!=""){  
                    this.file = file;
                } else {  
                    this.$Notice.error({title: '上传失败', desc: "文件格式不正确", duration: 5});
                    this.file = null
                } 
                return false;
            },
            upload () {
                if(this.file == null) {
                    this.$Notice.error({title: '未选择文件', desc: "请重新选择文件", duration: 5});
                }else {
                    let formData = new FormData();
                    formData.append('file',this.file);
                    this.$Modal.confirm({
                        title: "提示",
                        content: '<div>确定要上传license文件吗</div>',
                        onOk: () => {
                            this.loading = true;
                            this.$https.fetchPost(this.$api.sys.licensefile.url, formData).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '上传license文件成功', desc: "正在刷新界面", duration: 3});
                                    this.reload();
                                    this.$Modal.remove();
                                } else{
                                    this.$Modal.remove();
                                    this.$Notice.error({title: '上传license文件失败', desc: resp.data.desc, duration: 5});
                                }
                                this.loading = false;
                            }).catch(err => {
                                this.$Modal.remove();
                                this.$Notice.error({title: '请求失败',desc: err, duration: 2.5});
                                console.log(err)
                            });
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped>
</style>