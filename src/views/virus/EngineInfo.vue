<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
<!--                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">-->
<!--                    <span style=" background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center">邮件服务器设置</span>-->
<!--                    <div style="margin: 15px 10px;">-->
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">病毒库日期:</span></td>
                                <td><span style="margin-left:15px;">{{ date }}</span></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">病毒库版本:</span></td>
                                <td><span style="margin-left:15px;">{{ virusDataVersion }}</span></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">升级病毒库:</span></td>
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
                                            <Button style="background:#e86429;color:white;font-size: 12px;" @click="virusupload(file)" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button>
                                        </div>
                                        <Progress style="margin-left:15px;" v-if="progressshow" :percent="percent" :stroke-width="5" />                       
                                    </div>
                                </td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">启动杀毒引擎:</span></td>
                                <td>
                                    <i-switch style="margin-left:12px" :loading="switchloading" v-model="single" @on-change="statuschange" size="large">
                                        <span slot="open">开启</span>
                                        <span slot="close">关闭</span>
                                    </i-switch>
                                    <span style="margin-left:12px;color:red;font-size:12px;">注意:启停时请先检查文件同步业务中是否有启用病毒扫描功能，以免产生同步过程中病毒查杀功能失效</span>
                                    <!-- <Checkbox v-model="single" @on-change="statuschange" style="margin-left: 15px;"></Checkbox> -->
                                </td>
                            </tr>
                        </table>
<!--                    </div>-->
<!--                </div>-->
                <div>
                    <!-- <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 0 0 50%;">保存</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "EngineInfo",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                switchloading:false,
                single:false,
                links: [
                    {name: "杀毒引擎信息", to: "/virus/engineInfo"}
                ],
                data1:[],
                virusDataVersion:'',
                date:'',
                progressshow:false,
                percent:0,
                file:null,
                uploadurl:'',
                loadingStatus:false,
            }
        },
        mounted: function() {
            this.getinfo();
        },
        methods: {
            virusupload(file){
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
                this.$https.fetchPost(this.$api.virus.upgradeVirusData.url, param,config).then((resp) => {
                    if (resp.data.status == 200) {
                            this.$Notice.success({title: '病毒库升级成功', desc: "", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '病毒库升级失败', desc: "错误：" + resp.data.status, duration: 5});
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
                this.$Notice.error({title: '文件格式不正确', desc: "请上传病毒库升级包", duration: 2.5});
                this.file = null
                this.file1 = null
                return false
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
                let flag = fileName.match(/.cvd$/) || fileName.match(/.cld$/)
                if(!flag){  
                    this.handleFormatError(file)
                }
                // console.log(flag)
                // if(file.type != "application/json" && !flag){
                //     this.handleFormatError(file)
                // }
                return false
            },
            statuschange(){
                console.log(this.single)
                this.switchloading = true
                if(this.single){
                    this.$https.fetchGet(this.$api.virus.startVirusCheck.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Message.info('开启病毒库引擎成功');
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else {
                            this.$Notice.error({title: '关闭病毒库引擎失败', desc: resp.data.desc, duration: 2.5});
                            this.single = false
                            this.switchloading = false
                        }
                        }).catch(function (error) {
                            this.single = false
                            this.switchloading = false
                            this.$Notice.error({title: '关闭病毒库引擎失败', desc: resp.data.desc, duration: 2.5});
                        });
                }else{
                    this.$https.fetchGet(this.$api.virus.stopVirusCheck.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Message.info('关闭病毒库引擎成功');
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else {
                            this.$Notice.error({title: '关闭病毒库引擎失败', desc: resp.data.desc, duration: 2.5});
                            this.single = true
                            this.switchloading = false
                        }
                        }).catch(function (error) {
                            this.single = true
                            this.switchloading = false
                            this.$Notice.error({title: '关闭病毒库引擎失败', desc: resp.data.desc, duration: 2.5});
                        });
                }
            },
            getinfo(){
                this.$https.fetchGet(this.$api.virus.getVirusDataMessage.url).then((resp) => {
                    // this.data1 = resp.data.data;
                    console.log(resp.data.data)
                    let data = resp.data.data
                    this.virusDataVersion = data.virusDataVersion
                    this.date = data.updateTime
                    if(data.action == 0){
                        this.single = true
                    } 
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>
</style>