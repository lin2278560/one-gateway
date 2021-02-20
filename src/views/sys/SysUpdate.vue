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
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">固件升级</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">升级包日期:</span></td>
                                <td><div style="margin-left:15px;" :value="firmwaretime">{{firmwaretime}}</div></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">MD5值:</span></td>
                                <td><div style="margin-left:15px;" :value="firmwaremd5">{{firmwaremd5}}</div></td>
                            </tr>
                            <!-- <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">固件版本号:</span></td>
                                <td><div style="margin-left:15px;" :value="firmwareversion">{{firmwareversion}}</div></td>
                            </tr> -->
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">固件升级包:</span></td>
                                <td>
                                    <div>
                                        <Upload multiple style="margin: 7px 0 0 15px;width:200px;height:40px" 
                                        type="drag"
                                        :before-upload="handleUpload"
                                        :action="uploadurl"
                                        :format="['gz']"
                                        :max-size="1024"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :on-success="handleSuccess"
                                        >
                                        <Button style="width:100%;height:100%" icon="ios-cloud-upload-outline">点击或拖曳选择文件</Button>
                                        </Upload>
                                        <div style="margin-left:15px;margin-top:10px;" v-if="file !== null">您上传的升级包是: {{ file.name }}
                                            <Button style="background:#e86429;color:white;font-size: 12px;" @click="firmwareupload(file)" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button>
                                        </div>
                                        <Progress style="margin-left:15px;" v-if="progressshow" :percent="percent" :stroke-width="5" />                       
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;margin-bottom:15px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">内核升级</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">升级包日期:</span></td>
                                <td><div style="margin-left:15px;" :value="coretime">{{coretime}}</div></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">MD5值:</span></td>
                                <td><div style="margin-left:15px;" :value="coreMD5">{{coreMD5}}</div></td>
                            </tr>
                            <!-- <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">内核版本号:</span></td>
                                <td><div style="margin-left:15px;" :value="coreVersion">{{coreVersion}}</div></td>
                            </tr> -->
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">内核升级包:</span></td>
                                <td>
                                    <div>
                                        <Upload multiple style="margin: 7px 0 0 15px;width:200px;height:40px" 
                                        type="drag"
                                        :before-upload="handleUpload1"
                                        :action="uploadurl1"
                                        :format="['gz']"
                                        :max-size="512000"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :on-success="handleSuccess"
                                        >
                                        <Button style="width:100%;height:100%" icon="ios-cloud-upload-outline">点击或拖曳选择文件</Button>
                                        </Upload>
                                        <div style="margin-left:10px;margin-top:10px;" v-if="file1 !== null">您上传的升级包是: {{ file1.name }}
                                            <Button style="background:#e86429;color:white;font-size: 12px;" @click="coreupload(file1)" :loading="loadingStatus1">{{ loadingStatus1 ? 'Uploading' : '点击上传' }}</Button>
                                        </div>
                                        <Progress style="margin-left:15px;" v-if="progressshow1" :percent="percent1" :stroke-width="5" />
                                        <!-- <Upload
                                            multiple
                                            type="drag"
                                            :action="uploadurl1">
                                            <div style="padding: 20px 0">
                                                <Icon type="ios-cloud-upload" size="32" style="color: #3399ff"></Icon>
                                                <p>Click or drag files here to upload</p>
                                            </div>
                                        </Upload>                             -->
                                        </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <Modal
                    v-model="modal1"
                    title="操作成功"
                    
                    >
                    <div style="width:100%;margin:0 auto;font-size:14px;">
                        升级功能必须重启系统后设备才会完成升级
                    </div>
                <div slot="footer">
                    <Button @click="modal1 = false">稍后重启</Button>    
                    <Button @click="reboot" type="primary">立即重启</Button>
                </div>
                </Modal>
                    <!-- <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysUpdate",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                modal1:false,
                loadingStatus: null,
                loadingStatus1: null,
                file: null,
                file1: null,
                firmwaretime:'',
                coretime:'',
                coreMD5:'',
                coreVersion:'',
                firmwaremd5:'',
                firmwareversion:'',
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],
                bagdata:'',
                uploadurl:'',
                uploadurl1:'',
                isWhenShow: true,
                isDayShow: false,
                isWeeksShow: false,
                isMonthShow: false,                
                links: [
                    {name: "系统升级", to: "/sys/update"}
                ],
                percent:0,
                progressshow:false,
                percent1:0,
                progressshow1:false,
            }
        },
        mounted: function() {
            this.getUpgradePackMessageinfo();
            // this.uploadurl1 = this.$https.getAxiosBaseurl()+this.$api.user.coreUpload.url
            this.uploadurl = this.$api.user.softwareUpload.url
            // console.log(this.$https.getAxiosBaseurl()+this.uploadurl1)
        },
        methods: {
            reboot(){
                setTimeout(() => {
                    this.$https.fetchGet(this.$api.sys.reboot.url).then((resp) => {})
                    this.$router.replace('/login');
                }, 500);
            },
            handleSuccess(response, file, fileList){
                return false
                console.log(response)
                // this.$Notice.success({title: '备份文件上传成功', desc: "需要重启系统才生效", duration: 2.5});
            },
            handleUpload (file) {
                console.log(file)
                let fileName = file.name
                this.file = file;
                if(file.size >= 1024*1024*1024){
                    this.handleMaxSize(file)
                }
                let flag = fileName.match(/^upgrade.rootfs-t/)
                if(flag != undefined && flag!=""){  
                    flag = true
                } else {  
                    flag = false
                } 
                console.log(flag)
                // if(file.type != "application/json" && !flag){
                //     this.handleFormatError(file)
                // }
                return false
            },
            handleUpload1 (file) {
                console.log(file)
                let fileName = file.name
                this.file1 = file;
                if(file.size >= 524288000){
                    this.handleMaxSize(file)
                }
                let flag = fileName.match(/^upgrade.vmlinuz-bzImage/)
                if(flag != undefined && flag!=""){  
                    flag = true
                } else {  
                    flag = false
                } 
                console.log(flag)
                // if(file.type != "application/json" && !flag){
                //     this.handleFormatError(file)
                // }
                return false
            },
            firmwareupload(file){
                this.progressshow = true
                let obj = {}
                obj.file = file
                let param = new FormData(); // 创建form对象
                param.append('file', file); // 将文件存入file下面
                let config = {  
                    headers: {'Content-Type': 'multipart/form-data'},
                    timeout: 3 * 60 * 1000,
                    onUploadProgress: progressEvent => {
                        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        this.percent = complete
                        console.log(this.percent)
                    }
                }
                console.log(param)
                this.$https.fetchPost(this.$api.user.softwareUpload.url, param,config).then((resp) => {
                    if (resp.data.status == 200) {
                            this.modal1 = true
                            // this.$Notice.success({title: '文件上传成功', desc: "重启系统后设备才会完成升级", duration: 2.5});
                        } else
                            this.$Notice.error({title: '文件上传失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        setTimeout(() => {
                            this.progressshow1 = false
                        }, 3000);
                        console.log(err)
                    });
            },
            coreupload(file){
                this.progressshow1 = true
                let obj = {}
                obj.file = file
                let param = new FormData(); // 创建form对象
                param.append('file', file); // 将文件存入file下面
                let config = {  
                    headers: {'Content-Type': 'multipart/form-data'},
                    timeout: 3 * 60 * 1000,
                    onUploadProgress: progressEvent => {
                        let complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        this.percent1 = complete
                        console.log(this.percent1)
                    }
                }
                console.log(param)
                // this.$Spin.show({
                //     render: (h) => {
                //         return h('div', [
                //             h('Icon', {
                //                 'class': 'demo-spin-icon-load',
                //                 props: {
                //                     type: 'ios-loading',
                //                     size: 18
                //                 }
                //             }),
                //             h('div', '上传中,请稍后')
                //         ])
                //     }
                // });
                this.$https.fetchPost(this.$api.user.coreUpload.url, param,config).then((resp) => {
                    // setTimeout(() => {
                    //     this.progressshow1 = false
                    // }, 3000);
                    if (resp.data.status == 200) {
                            this.modal1 = true
                            // this.$Notice.success({title: '文件上传成功', desc: "重启系统后设备才会完成升级", duration: 2.5});
                        } else
                            this.$Notice.error({title: '文件上传失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        setTimeout(() => {
                            this.progressshow1 = false
                        }, 3000);
                        console.log(err)
                    });
            },
            handleMaxSize (file) {
                this.$Notice.error({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 500M。'
                });
                this.file = null
                this.file1 = null
                return false
            },
            handleFormatError(){
                this.$Notice.error({title: '文件格式不正确', desc: "请上传系统升级包", duration: 5});
                this.file = null
                this.file1 = null
                return false
            },
            getUpgradePackMessageinfo(){
                this.$https.fetchGet(this.$api.user.getUpgradePackMessage.url).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data.data)
                        this.bagdata = resp.data.data
                        console.log(this.bagdata)
                        this.coretime = this.bagdata.coreBuildTime
                        this.firmwareversion = this.bagdata.softwareVersion
                        this.firmwaremd5 = this.bagdata.softwareMD5
                        this.coreMD5 = this.bagdata.coreMD5
                        this.firmwaretime = this.bagdata.softwareBuildTime
                        this.coreVersion = this.bagdata.coreVersion
                    } else {
                        this.$Notice.error({title: '获取更新包资源失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
        }
    }
</script>

<style scoped>
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
    /deep/ .ivu-modal-footer {
        border-top: 1px solid #e8eaec;
        padding: 12px 18px 12px 18px;
        text-align: center;
    }
</style>