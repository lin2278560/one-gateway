<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <!-- <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote> -->
                <Tabs value="name1">
                    <TabPane label="dest_info.cnf" name="name1">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">dest_info.cnf</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr v-for="(v,i) in list" :key="i" style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;">{{i}}</span></td>
                                <td>
                                    <!-- <div style="display:flex"> -->
                                        
                                        <textarea :value="v"></textarea>
                                    <!-- </div> -->
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="dmond.json" name="name2">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">dmond.json</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="gap_info.json" name="name3">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">gap_info.json</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="send_task.json" name="name4">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">send_task.json</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="wsg_cli_proxyd.cnf" name="name5">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">wsg_cli_proxyd.cnf</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="wsg_dev_sendd.cnf" name="name6">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">wsg_dev_sendd.cnf</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="wsg_fsendd.json" name="name7">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">wsg_fsendd.json</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="wsg_in_recvd.cnf" name="name8">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">wsg_in_recvd.cnf</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td>
                                    <div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                    <TabPane label="wsg_workd.cnf" name="name9">
                    <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:120px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">wsg_workd.cnf</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 45px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;"></span></td>
                                <td><div v-for="(v,i) in list" :key="i" style="display:flex">
                                        <span>{{i}}:</span>
                                        <textarea :value="v"></textarea>
                                    </div>
                                    <Button type="primary">提交</Button></td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>    
                    </TabPane>
                </Tabs>
            </div>
            
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "Ceshitest",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],
                links: [
                    {name: "双机热备配置", to: "/availability/carpSetting"}
                ],
                list:{},
            }
        },
        mounted: function() {
            let name = "dmond.json"
            let Users = "/Users/yanchubo/"+name
            this.checkUserAuthority(Users);
        },
        methods: {
            checkUserAuthority(name){
                this.$https.getAxios().get('https://192.168.104.114:10001/wsg/findFileInfo', {
                    params: {
                    name: name,
                    }
                })
                .then( (response) =>{
                    console.log(response.data.data);
                    this.list = response.data.data
                    // this.$set(this,"list",response.data.data)
                    console.log(this.list)
                    // for(let i in data){
                        
                    // }
                })
                .catch(function (error) {
                    console.log(error);
                });
            },
        }
    }
</script>

<style scoped>
</style>