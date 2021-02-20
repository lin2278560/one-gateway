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
            <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">备份配置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"></td>
                                <td>
                                    <p style="margin: 10px 0 0 10px;font-size: 12px;">点击下载配置按钮进行配置备份,配置为json格式.</p>
                                    <p style="margin: 10px 0 0 10px;font-size: 12px;">备份区域:<Select v-model="cycleVal2" style="width:130px;margin-left: 15px;">
                                        <Option v-for="list in List" :value="list.value" :key="list.value">{{ list.label }}</Option>
                                    </Select></p>
                                    <!-- <a @click.prevent="downloadbackup()" :href="downUrl" > -->
                                        <div @click="downloadbackup()" style="margin: 10px 0 10px 10px;" class="btn btn-sm btn-custom add_fontclient">确认</div>
                                    <!-- </a> -->
                                    
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">还原配置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"></td>
                                <td>
                                    <p style="margin: 10px 0 0 10px;font-size: 12px;">打开一个json配置文件并点击下方按钮恢复配置.</p>
                                    <p style="margin: 10px 0 0 10px;font-size: 12px;">恢复区域:<Select v-model="cycleVal4" style="width:130px;margin-left: 15px;">
                                        <Option v-for="list1 in List1" :value="list1.value" :key="list1.value">{{ list1.label }}</Option>
                                    </Select></p>
                                    <div>
                                        <!-- :name="file"
                                        :headers="{'Authorization':token}"
                                        :show-upload-list="false"
                                        :on-exceeded-size="exceededSize"
                                        :on-progress="progress"
                                        :before-upload="beforeUpload" -->
                                        <Upload multiple style="margin: 7px 0 0 15px;width:200px;height:30px" 
                                        type="drag"
                                        :format="['json']"
                                        :max-size="20480"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleUpload"
                                        :action="uploadurl"
                                        :on-success="handleSuccess"
                                        >
                                        <Button style="width:100%;height:100%" icon="ios-cloud-upload-outline">点击或拖曳选择文件</Button>
                                        </Upload>
                                        <div style="margin-left:10px;margin-top:10px;" v-if="file !== null">您上传的文件名是: {{ file.name }}
                                            <Button style="background:#e86429;color:white;font-size: 12px;" @click="upload(file)" :loading="loadingStatus">{{ loadingStatus ? 'Uploading' : '点击上传' }}</Button>
                                        </div>                            
                                        </div>
                                    <div style="margin: 10px 0 10px 10px;" class="btn btn-sm btn-custom add_fontclient" @click="backup()">还原配置</div>
                                    <span style="margin-left: 10px;font-size: 12px; color:red">注意:上传文件成功并点击还原配置按钮后,还需重启系统，还原才会生效.</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">恢复出厂配置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"></td>
                                <td>
                                    <div style="margin: 10px 0 10px 10px;" class="btn btn-sm btn-custom add_fontclient" @click="backupdeafult()">恢复出厂配置</div>
                                    <span style="margin-left: 10px;font-size: 12px;color:red">注意:设备将在恢复出厂配置后自动重启.</span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysBackupRecovery",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                cycleVal2:10,
                cycleVal4:10,
                modal1:false,
                downUrl:'',
                uploadurl:'',
                // List: [
                //     {value: "all",label: "所有"},
                //     {value: "user",label: "用户与登录设置"},
                //     {value: "interface",label: "接口配置"},
                //     {value: "gateway",label: "网关配置"},
                //     {value: "route",label: "静态路由"},
                //     {value: "availability",label: "高可用性"},
                //     {value: "control",label: "访问控制"},
                //     {value: "ftp",label: "FTP服务"},
                //     {value: "smb",label: "SMB服务"},
                //     {value: "nfs",label: "NFS服务"},
                //     {value: "data",label: "数据资源"},
                //     {value: "business",label: "业务与服务"}
                // ],
                List: [
                    {value: 10,label: "所有"},
                    {value: 0,label: "用户与登录设置"},
                    {value: 1,label: "ip配置"},
                    {value: 2,label: "网关配置"},
                    {value: 3,label: "路由配置"},
                    {value: 4,label: "角色"},
                    {value: 5,label: "密码长度"},
                    {value: 6,label: "本地FTP服务"},
                    {value: 7,label: "本地SMB服务"},
                    {value: 8,label: "数据资源"},
                    {value: 9,label: "业务与服务"}
                ],
                List1: [
                    {value: 10,label: "所有"},
                    {value: 0,label: "用户与登录设置"},
                    {value: 1,label: "ip配置"},
                    {value: 2,label: "网关配置"},
                    {value: 3,label: "路由配置"},
                    {value: 4,label: "角色"},
                    {value: 5,label: "密码长度"},
                    {value: 6,label: "本地FTP服务"},
                    {value: 7,label: "本地SMB服务"},
                    {value: 8,label: "数据资源"},
                    {value: 9,label: "业务与服务"}
                ],
                links: [
                    {name: "备份/恢复", to: "/sys/backupRecovery"}
                ],
                file: null,
                loadingStatus: false,
                uploaditem:{}
            }
        },
        mounted: function() {
            this.uploadurl = this.$https.getAxiosBaseurl()+this.$api.user.testRecover.url
            this.downUrl = this.$api.user.backup.url
        },
        // watch:{
        //     cycleVal4(val) {
        //         this.uploaditem.code = String(val)
        //     }
        // },
        methods: {
            handleUpload (file) {
                console.log(file)
                let fileName = file.name
                this.file = file;
                if(file.size >= 20971520){
                    this.handleMaxSize(file)
                }
                let flag = fileName.match(/.json$/)
                if(flag != undefined && flag!=""){  
                    flag = true
                } else {  
                    flag = false
                } 
                console.log(flag)
                if(file.type != "application/json" && !flag){
                    this.handleFormatError(file)
                }
                return false
            },
            upload (file) {
                let obj = {}
                obj.code = String(this.cycleVal4)
                console.log(obj)
                this.$https.fetchGet(this.$api.user.testRecover.url, obj).then((resp) => {
                    if (resp.data.status == 200) {
                            this.uploadfile(file)
                        } else {
                            this.$Modal.confirm({
                            title: "您已有一个备份文件存在待备份的目录中",
                            content: '<p>确定要覆盖上一个备份文件吗</p>',
                            onOk: () => {
                                this.uploadfile(file)
                            }
                        })
                        }  
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
            },
            uploadfile(file){
                let obj = {}
                obj.file = file
                obj.code = Number(this.cycleVal4)
                let param = new FormData(); // 创建form对象
                param.append('file', file); // 将文件存入file下面
                param.append('code', Number(this.cycleVal4));
                let config = {  
                    headers: {'Content-Type': 'multipart/form-data'}
                }
                console.log(param)
                this.$https.fetchPost(this.$api.user.recover.url, param,config).then((resp) => {
                    if (resp.data.status == 200) {
                            this.$Notice.success({title: '文件上传成功', desc: "请点击还原配置按钮", duration: 2.5});
                        } else
                            this.$Notice.error({title: '文件上传失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                // this.loadingStatus = true;
                // setTimeout(() => {
                //     this.file = null;
                //     this.loadingStatus = false;
                //     // this.$Message.success('Success')
                // }, 1500);
            },
            handleMaxSize (file) {
                console.log("handleMaxSize")
                this.$Notice.error({
                    title: '超出文件大小限制',
                    desc: '文件 ' + file.name + ' 太大，不能超过 20M。'
                });
                this.file = null
                return false
            },
            handleSuccess(response, file, fileList){
                return false
                console.log(response)
                // this.$Notice.success({title: '备份文件上传成功', desc: "需要重启系统才生效", duration: 2.5});
            },
            handleFormatError(){
                console.log("handhandleFormatErrorleMaxSize")
                this.$Notice.error({title: '文件格式不正确', desc: "请上传json文件", duration: 2.5});
                this.file = null
            },
            downloadbackup(){
                // if(this.cycleVal2 == 1){
                //     this.$Message.info('请选择备份区域');
                //     return
                // }
                let obj = {}
                obj.code = this.cycleVal2
                
                this.$https.fetchGet(this.$api.user.testbackup.url, obj).then((resp) => {
                    if(resp.data.status != 200){
                        this.$Notice.error({title: '文件下载失败', desc: resp.data.desc, duration: 2.5})
                    }else{
                        let obj = {}
                        obj.code = this.cycleVal2
                        let config = {}
                        config.responseType = 'blob'
                        this.$https.fetchGet(this.$api.user.backup.url, obj, config).then((resp) => {
                            console.log(resp)
                            this.download(resp)
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5})
                            console.log(err)
                        })
                    }  
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5})
                    console.log(err)
                })
            },
            // 下载文件
            download (resp) {
                let json = '.json'
                // const content = resp.data
                // const blob = new Blob([content])//构造一个blob对象来处理数据
                // const fileName = resp.headers["content-disposition"].concat(json)
                let headers = resp.headers
                let fileName = resp.headers["content-disposition"].concat(json)
                
                // const fileName = resp.headers["content-disposition"]    
                let contentType = headers['content-type']
                const blob = new Blob([resp.data], {type: contentType})
                const reader = new FileReader()
                if ('download' in document.createElement('a')) { //支持a标签download的浏览器
                    // const link = document.createElement('a')//创建a标签
                    // link.download = fileName//a标签添加属性
                    // link.style.display = 'none'
                    // link.href = URL.createObjectURL(blob)
                    // console.log(link.href)
                    // document.body.appendChild(link)
                    // link.click()//执行下载
                    // URL.revokeObjectURL(link.href) //释放url
                    // document.body.removeChild(link)//释放标签
                    reader.readAsDataURL(blob)
                    reader.onload = (e) => {
                        const a = document.createElement('a')
                        a.download = fileName
                        a.style.display = 'none'
                        a.href = e.target.result
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                    }
                } else { //其他浏览器
                    console.log(fileName,"其他浏览器")
                    navigator.msSaveBlob(blob, fileName)
                }
            },
            backup(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<div>确定要恢复设置吗</div><div style="color:red">注:恢复设置后将会自动重启</div>',
                    onOk: () => {
                        // let obj = {}
                        // obj.code = Number(this.uploaditem.code)
                        let code = "code="+ Number(this.cycleVal4)
                        console.log(code)
                        this.$https.fetchPost(this.$api.user.handleRecover.url, code).then((resp) => {
                            if (resp.data.status == 200) {
                                    this.$Notice.success({title: '还原配置成功', desc: "3秒后自动重启系统", duration: 2.5});
                                    setTimeout(() => {
                                        this.$https.fetchGet(this.$api.sys.reboot.url).then((resp) => {})
                                        this.$router.replace('/login');
                                    }, 3000);
                                } else{
                                    this.$Notice.error({title: '还原设置失败', desc: resp.data.desc, duration: 2.5});
                                }  
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                                console.log(err)
                            });
                    }
                });
            },
            backupdeafult(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<div>确定要恢复出厂设置吗</div><div style="color:red">注:恢复出厂设置后将会自动重启</div>',
                    onOk: () => {
                            this.$https.fetchPost(this.$api.user.restoreFactorySettings.url).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '恢复出厂配置成功', desc: "3秒后自动重启系统", duration: 2.5});
                                    setTimeout(() => {
                                        //    this.$https.fetchGet(this.$api.sys.reboot.url).then((resp) => {})
                                            this.$router.replace('/login');
                                        }, 3000);
                                } else
                                    this.$Notice.error({
                                        title: '恢复出厂设置失败',
                                        desc: "错误：" + resp.data.desc,
                                        duration: 5
                                    });
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                                console.log(err)
                            });
                    }
                });
            },
        }
    }
</script>

<style scoped>
</style>