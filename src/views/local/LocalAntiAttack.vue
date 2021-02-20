<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
            <Checkbox v-model="play">启用</Checkbox>
            <Button v-show="playshow" size="small" type="primary" @click="add">确认</Button>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">抗攻击</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;font-weight:bold;">TCP Flood:</span></td>
                                <td><Checkbox style="margin:0 15px 0 20px;" size="large" v-model="from.tcp"> 阈值 : </Checkbox><Input v-model="from.tcpValue" style="width: 100px" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;font-weight:bold;">UDP Flood:</span></td>
                                <td><Checkbox style="margin:0 15px 0 20px;" size="large" v-model="from.udp"> 阈值 : </Checkbox><Input v-model="from.udpValue" style="width: 100px" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;font-weight:bold;">ICMP Flood:</span></td>
                                <td><Checkbox style="margin:0 15px 0 20px;" size="large" v-model="from.icmp"> 阈值 : </Checkbox><Input v-model="from.icmpValue" style="width: 100px" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" @click="submit" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        inject: ["reload"],
        name: "LocalAntiAttack",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                playshow: true,
                play: false,
                from:{
                    tcp: false,
                    tcpValue: 150,
                    udp: false,
                    udpValue: 150,
                    icmp: false,
                    icmpValue: 150
                },
                links: [
                    {name: "访问控制", to: "/local/acl"},
                    {name: "UDP协议通信", to: "/local/udp"},
                    // {name: "TCP协议通信", to: "/local/tcp"}
                    {name: "抗攻击", to: "/local/antiAttack"}
                ],
            }
        },
        mounted: function() {
            this.getyesnoinfo();
            this.getinfo()
        },
        methods: {
            submit(){
                if(0 > Number(this.from.tcpValue) || Number(this.from.tcpValue) > 200){
                    this.$Notice.error({title: '修改失败', desc: '阈值范围为0-200', duration: 5});
                    return
                }
                if(0 > Number(this.from.udpValue) || Number(this.from.udpValue) > 200){
                    this.$Notice.error({title: '修改失败', desc: '阈值范围为0-200', duration: 5});
                    return
                }
                if(0 > Number(this.from.icmpValue) || Number(this.from.icmpValue) > 200){
                    this.$Notice.error({title: '修改失败', desc: '阈值范围为0-200', duration: 5});
                    return
                }
                this.$https.fetchPost(this.$api.local.addAttack.url, this.from).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '修改成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else
                        this.$Notice.error({title: '修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 8});
                    console.log(err)
                });
               
            },
            getinfo(){
                this.$https.fetchGet(this.$api.local.findAttack.url).then((resp) => {
                    if (resp.data.status == 200) {
                        this.from = resp.data.data 
                    }   
                }).catch(err => {
                    this.$Notice.error({title: '请求数据失败', desc: err, duration: 2.5});
                });
            },
            getyesnoinfo(){
                this.$https.fetchGet(this.$api.local.findDisableFilter.url).then((resp) => {
                    if (resp.data.status == 200) {
                        if(resp.data.data == "yes"){
                            this.play = true
                        } else {
                            this.play = false
                        }
                        console.log(this.play)
                    }   
                }).catch(err => {
                    this.$Notice.error({title: '请求数据失败', desc: err, duration: 2.5});
                });
            },
            add(){
                this.playshow = false
                console.log(this.play)
                if (this.play == true) {
                    let obj = {
                        string: "yes"
                    }
                   this.$https.fetchGet(this.$api.local.startDisableFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('启用成功');
                                setTimeout(() => {
                                this.reload();
                            }, 250);
                            } else {
                                this.$Notice.error({title: '启用失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        }) 
                } else {
                    let obj = {
                        string: "no"
                    }
                    this.$https.fetchGet(this.$api.local.stopDisableFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('启停成功');
                                setTimeout(() => {
                                this.reload();
                            }, 250);
                            } else {
                                
                                this.$Notice.error({title: '启停失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        }) 
                }
            },
        }
    }
</script>

<style scoped>
</style>