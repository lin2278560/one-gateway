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
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">接口:</span></td>
                                <td style="font-size: 12px;">
                                    <Select v-model="form.dev" style="margin-left:15px;;width:200px">
                                        <Option v-for="item in devList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">协议:</span></td>
                                <td style="font-size: 12px;">
                                    <Select v-model="form.protocol" style="margin-left:15px;width:200px">
                                        <Option v-for="item in protocolList" :value="item" :key="item">{{ item }}</Option>
                                    </Select>
                                </td>
                            </tr>
                        </table>
                    </div>
<!--                </div>-->
                <div style="width:300px;margin:10px auto;">
                    <Button @click="submit()" style="margin-right:15px;">启动抓包</Button>
                    <Button @click="stopService()" style="">停止抓包下载数据</Button>
                </div>
                <div v-if="textshow" style="width:400px;margin:0 auto;margin-top:15px;">
                    <span style="color:red;font-size:12px;margin-top:15px;">正在抓包,不手动停止抓包下载数据，5分钟后将自动停止</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysToolCatch",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                ButtonLoading:false,
                devList:[],
                protocolList:["all","ip","arp","udp","tcp"],
                textshow:false,
                form:{
                    dev:'',
                    protocol: "",
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
            this.getUSBList()
        },
        methods: {
            stopService(){
                if(!this.form.dev){
                    this.$Notice.error({title: '检测失败', desc: '请选择接口', duration: 5});
                    return
                }
                if(!this.form.protocol){
                    this.$Notice.error({title: '检测失败', desc: '请选择协议', duration: 5});
                    return
                }
                let config = {  
                    timeout: 60 * 1000,
                    responseType: 'blob'
                }
                console.log(this.form)
                this.$https.fetchPost(this.$api.sys.stopTcpDump.url,{},{
                    responseType: 'blob'
                }).then((resp) => {
                    // if (resp.data.status == 200) {
                        if(resp.data.size==0){
                            return
                        }
                        this.download(resp)
                        console.log(resp,"resp")
                        // this.textareaShow = true
                        this.textshow = false
                    // } else {
                    //     this.$Notice.error({title: "请求失败",desc: "错误:" + resp.data.desc,duration: 10});
                    //     this.textareaShow = false
                    // }
                    }).catch(function (error) {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        this.textareaShow = false
                    });
            },
            //get网口列表
            getUSBList (val){
                this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
                    this.devList = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            submit(){
                if(!this.form.dev){
                    this.$Notice.error({title: '检测失败', desc: '请选择接口', duration: 5});
                    return
                }
                if(!this.form.protocol){
                    this.$Notice.error({title: '检测失败', desc: '请选择协议', duration: 5});
                    return
                }
                let config = {  
                    timeout: 60 * 1000,
                }
                console.log(this.form)
                this.$https.fetchPost(this.$api.sys.tcpdump.url,{
                    dev:this.form.dev,
                    protocol:this.form.protocol
                },config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.textshow = true
                    } else {
                        this.$Notice.error({title: "请求失败",desc: "错误:" + resp.data.desc,duration: 5});
                        this.textareaShow = false
                    }
                    }).catch(function (error) {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        this.textareaShow = false
                    });
            },


            // 下载文件
            download (resp) {
                // let json = '.json'
                // const content = resp.data
                // const blob = new Blob([content])//构造一个blob对象来处理数据
                const fileName = resp.headers["content-disposition"]
                let headers = resp.headers
                // let fileName = resp.headers["content-disposition"].concat(json)
                
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
        }
    }
</script>

<style scoped>
.btn{
    display: inline-block;
}
</style>