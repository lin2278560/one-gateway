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
<!--                    <span style=" background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center">同步程序定时</span>-->
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">配置生效:</span></td>
                                <td style="font-size: 12px;">
                                    <Button style="margin-left:15px;" :loading="ButtonLoading" @click="submit">重启服务</Button>
                                </td>
                            </tr>

                        </table>
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "DataServiceRestart",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                ButtonLoading:false,
                textareaShow:false,
                value:'',
                form:{

                },
                links: [
                    {name: "业务/服务列表", to: "/data/test2"},
                    {name: "配置生效", to: "/data/serviceRestart"}
                ],
            }
        },
        mounted() {
            
        },
        methods: {
            submit(){
                let config = {  
                    timeout: 60 * 1000,
                }
                console.log(this.form)
                this.ButtonLoading = true
                this.$https.fetchPost(this.$api.data.loadServe.url,{},config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.ButtonLoading = false
                        // this.textareaShow = true
                        this.$Notice.success({title: "重启成功",desc: resp.data.desc,duration: 2.5});
                        // setTimeout(() => {
                        //     // location.reload();
                        // }, 250);
                    } else {
                        this.ButtonLoading = false
                        this.$Notice.error({title: "重启失败",desc: "错误:" + resp.data.desc,duration: 5});
                        // this.textareaShow = false
                    }
                    }).catch((error) =>{
                        this.ButtonLoading = false
                        this.$Notice.error({title: '重启失败', desc: error, duration: 5});
                        // this.textareaShow = false
                    });
            },
        }
    }
</script>

<style scoped>
</style>