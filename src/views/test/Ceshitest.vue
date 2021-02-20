<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <!-- <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote> -->
                <Tabs value="send_task.json" @on-click="handleTabClick">
                    <TabPane label="send_task.json" name="send_task.json">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>  
                    </TabPane>
                    <TabPane label="wsg_dev_sendd.cnf" name="wsg_dev_sendd.cnf">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>   
                    </TabPane>
                    <TabPane label="dmond.json" name="dmond.json">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>  
                    </TabPane>
                    <TabPane label="dest_info.cnf" name="dest_info.cnf">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div>  -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>   
                    </TabPane>
                    
                    <TabPane label="gap_info.json" name="gap_info.json">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>  
                    </TabPane>
                    
                    <TabPane label="wsg_cli_proxyd.cnf" name="wsg_cli_proxyd.cnf">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>   
                    </TabPane>
                    <TabPane label="wsg_in_recvd.cnf" name="wsg_in_recvd.cnf">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>   
                    </TabPane>
                    <TabPane label="wsg_fsendd.json" name="wsg_fsendd.json">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>  
                    </TabPane>
                    
                    <TabPane label="wsg_workd.cnf" name="wsg_workd.cnf">
                        <!-- <div class = "routeManagement">
                            <vue-json-editor 
                            v-model="list" :showBtns="true" lang="zh"
                            @json-change="onJsonChange" @json-save = "onJsonSave"/>
                        </div> -->
                        <textarea style="width:100%" name="" id="" cols="30" rows="25" v-model="list"></textarea>
                        <div style="display:flex;justify-content: center;align-items: center; ">
                            <i-button style="width:60px;padding:10px;border-radius:3px;margin-right:10px;" type="primary"  @click="onJsonSave">保存</i-button>
                            <i-button style="width:60px;padding:10px;border-radius:3px;" type="primary"  @click="back">返回</i-button>
                        </div>   
                    </TabPane>
                </Tabs>
            </div>
            
        </div>
    </div>
</template>

<script>

    // import vueJsonEditor from 'vue-json-editor'
    export default {
        name: "Ceshitest",
        components: {
            // vueJsonEditor
        },
        data(){
            return {
                name:'send_task.json',
                indeterminate: false,
                checkAll: false,
                list:{},
                json: {
                    msg: 'demo of jsoneditor'
                },
            }
        },
        mounted: function() {
            // let name = "dmond.json"
            // name = this.name
            // let Users = "/Users/yanchubo/"+name
            console.log(this.$storage.getStorage("conffilename"))
            
            let name = "send_task.json"
            // name = this.name
            // if(this.$storage.getStorage("conffilename") != ""){
            //     name = this.$storage.getStorage("conffilename")
            // }
            let Users = "/usr/local/ws_release/send/"+name
            this.checkUserAuthority(Users);
        },
        methods: {
            back(){
                this.$router.go(-1);
            },
            handleTabClick(name){
                this.name = name
                console.log(name)
                let Users = "/usr/local/ws_release/send/"+name
                this.checkUserAuthority(Users);
            },
            checkUserAuthority(name){
                let params = {}
                params.name = name
                this.$https.fetchGet(this.$api.test.findFileInfo.url,params).then((resp) => {
                    // console.log(resp);
                    let Base64 = require('js-base64').Base64
                    resp.data.data = Base64.decode(resp.data.data)
                    this.list = resp.data.data
                    // this.$set(this,"list",response.data.data)
                    // this.list = this.list.replace(/\n/g,"+'\n'+")
                    console.log(name)
                    // console.log(this.list,"list")
                }).catch(err => {
                    console.log(err)
                })
                // this.$https.getAxios().get('https://192.168.104.159:10000/wsg/findFileInfo', {
                //     params: {
                //         name: name,
                //     }
                // })
                // .then( (response) =>{
                //     console.log(response);
                //     let Base64 = require('js-base64').Base64
                //     response.data.data = Base64.decode(response.data.data)
                //     this.list = response.data.data
                //     // this.$set(this,"list",response.data.data)
                //     // this.list = this.list.replace(/\n/g,"+'\n'+")
                //     console.log(name)
                //     console.log(this.list,"list")
                // })
                // .catch(function (error) {
                //     console.log(error);
                // });
            },
            onJsonChange () { // 数据改变时触发
            },
            onJsonSave(){ // 点击保存触发
            
            let Users = "/usr/local/ws_release/send/"+this.name
            // console.log(Users)
            // console.log(this.list)
            console.log(this.list)
            let Base64 = require('js-base64').Base64
            let result = Base64.encode(this.list);
            let obj = {
                name: Users,
                str:result
            }
            // "name="+name+"&str="+
            this.$https.fetchPost(this.$api.test.writeFileInfo.url,obj).then((resp) => {
                    // this.$storage.setStorage("conffilename", this.name);
                    this.$Notice.success({title: '修改成功', desc: "正在刷新界面", duration: 2.5});
                    setTimeout(() => {
                        location.reload();
                    }, 250);
                }).catch(err => {
                    console.log(err)
                })
            //     this.$https.getAxios().post('https://192.168.104.159:10000/wsg/writeFileInfo',
            //     // "name="+Users+"&str="+this.list
            //     obj
            //    )
            //     .then( (response) =>{
            //         console.log(this.list)
            //         location.reload();
            //     })
            //     .catch(function (error) {
            //         console.log(error);
            //     });
            },
        }
    }
</script>

<style scoped>

</style>