<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <udpAdd style="float: right"></udpAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Checkbox v-model="play">启用</Checkbox>
                <Button v-show="playshow" size="small" type="primary" @click="add">确认</Button>
                <Table size="small" border :columns="columns1" :data="data1" style="margin-top: 5px;">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="update(index)">修改</Button>
                        <Button type="error" size="small" @click="delDb(row.id)">删除</Button>
                    </template>
                </Table>
                <Page :current.sync="currentPage"
                            :total="dataCount"
                            show-elevator
                            :page-size="pageSize"
                            :show-total="true"
                            style="margin-top:10px;"
                            @on-change="changepage" />
            </div>
        </div>
        <Drawer title="UDP通信协议" v-model="platForm.show" width="50%">
            <Form ref="plat_form"  :model="platForm.form" :rules="platForm.rules"
                  :label-width="150">
                <FormItem label="启用" prop="subnet" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.disabled">启用此规则</Checkbox>
                </FormItem>
                <FormItem label="网闸IP" prop="gapip" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.gapip">
                        <Option v-for="item in typeList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                    <!-- <Input  v-model="platForm.form.gapip"/> -->
                </FormItem>
                <!-- <FormItem label="目标服务器端口" prop="targetport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.targetport"/>
                </FormItem> -->
                <FormItem label="端口" prop="gapport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.gapport"/>
                </FormItem>
                <FormItem label="启用转源" prop="subnet" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.snat">启用此规则</Checkbox>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import udpAdd from "./LocalUdpAdd";
    export default {
        name: "LocalUdp",
        components: {
            jk_tabs: JkTabs,udpAdd
        },
        inject: ["reload"],
        data(){
            return {
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 10,
                columns1: [
                    {title: '序号', key: 'id', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    // {title: '序号', key: ''},
                    // { width: 60, value:"UDP", align: 'center' },
                    // {title: '协议', key: '',value:"UDP"},
                    {title: '网闸IP', key: 'gapip', align: 'center'},
                    {title: '转发端口', key: 'gapport', align: 'center'},
                    // {title: '目标服务器端口', key: 'targetport', align: 'center'},
                    {title: '转源', key: 'snat', align: 'center'},
                    {title: '启用', key: 'disabled', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                playshow: true,
                play: false,
                platForm: {
                    show: false,
                    form: {
                        id:null,
                        gapip:null,
                        gapport:null,
                        snat:true,
                        disabled:true,
                        targetport:null
                    },
                    rules: {
                        // targetport:{ required: true,message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // gapport:{ required: true,message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // gapip:{ required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                    }
                },
                data1:[],
                data3:[],
                links: [
                    {name: "访问控制", to: "/local/acl"},
                    {name: "UDP协议通信", to: "/local/udp"},
                    // {name: "TCP协议通信", to: "/local/tcp"}
                    {name: "抗攻击", to: "/local/antiAttack"}
                ],
                typeList:[],
            }
        },
        mounted: function() {
            this.getyesnoinfo();
            this.test();
            this.getips();
        },
        methods: {
            //分页下一页点击事件
            changepage(index) {
                // this.currentPage = index;
                // var _start = (index - 1) * this.pageSize;
                // var _end = index * this.pageSize;
                // this.data3 = this.data1.slice(_start, _end);
                // for(let i in this.data3){
                //         if(this.data3[i].state == "disable"){
                //             this.data3[i]["state"] = "禁用";
                //             this.data3[i]["color"] = "red";
                //             this.data3[i]["iconName"] = "ios-play";
                //         }else {
                //             this.data3[i]["state"] = "启用中";
                //             this.data3[i]["color"] = "green";
                //             this.data3[i]["iconName"] = "ios-pause";
                //         }
                //     }
            },
            getips(){
                this.$https.fetchGet(this.$api.local.findUdpIP.url).then((resp) => {
                    console.log(resp.data.data)
                    // this.typeList = resp.data.data
                    let arr = []
                    for(let i in resp.data.data){
                        let obj = {}
                        obj.name = resp.data.data[i]
                        obj.val = resp.data.data[i].split(":")[1]
                        arr.push(obj) 
                    }
                    // let name = resp.data.data[0].substring(resp.data.data[0].lastIndexOf(":")+1);
                    // name = resp.data.data[0].split(":")[0] 
                    this.typeList = arr
                    console.log(arr)
                }).catch(err => {
                    console.log(err)
                })
            },
            getyesnoinfo(){
                this.$https.fetchGet(this.$api.local.findDisableFilter.url).then((resp) => {
                        if (resp.data.status == 200) {
                            // this.play = this.resp.data
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
            test(){
                this.$https.fetchGet(this.$api.udp.findUdpNatInfo.url).then((resp) => {
                    this.data1 = resp.data.data;
                    this.data3 = this._.cloneDeep(resp.data.data)
                    this.dataCount = resp.data.data.length
                    console.log(this.data1,"1")
                    for(let i in this.data1){
                        if(this.data1[i].disabled == "true"){
                            this.data1[i].disabled ="启用中"
                        }else{
                            this.data1[i].disabled ="已禁用"
                        }
                    }
                    for(let i in this.data1){
                        if(this.data1[i].snat == "true"){
                            this.data1[i].snat ="是"
                        }else{
                            this.data1[i].snat ="否"
                        }
                    }
                })
            },
            update(index){
                // console.log(this.data1[index].disabled == "true");
                this.platForm.show=true;
                this.platForm.form.id=this.data1[index].id;
                this.platForm.form.gapip=this.data1[index].gapip;
                this.platForm.form.gapport=this.data1[index].gapport;
      
                this.platForm.form.targetport=this.data1[index].targetport;
                if(this.data3[index].disabled == "true"){
                    this.platForm.form.disabled = true
                }else{
                    this.platForm.form.disabled = false
                }
                if(this.data1[index].snat == "是"){
                    this.platForm.form.snat = true
                }else{
                    this.platForm.form.snat = false
                }
                console.log(this.platForm.form)
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
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
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
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
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        }) 
                }
            },
            addPlatForm(){
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                        let name = this.platForm.form.gapip.substring(this.platForm.form.gapip.lastIndexOf(":")+1);
                                let obj = {
                                    id:'',
                                    gapip:'',
                                    targetport:'',
                                    gapport:'',
                                    snat:true,
                                    disabled:true
                                }
                                obj.gapip = name
                                obj.id= this.platForm.form.id
                                obj.gapport= this.platForm.form.gapport
                                obj.disabled= this.platForm.form.disabled
                                obj.snat= this.platForm.form.snat
                    this.$https.fetchPost(this.$api.udp.updateUdpNat.url, obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '修改成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            },
            delDb(index){
                this.$Modal.confirm({
                    title: '删除规则',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.udp.delUdpNat.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                setTimeout(() => {
                                this.reload();
                                this.$Modal.remove();
                            }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '规则删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },

        },
        watch:{
            play:function(newval,oldval){
                // console.log("当前应取到的值："+newval,"这是之前的值："+oldval);
                this.playshow = true
            }
        }
    }
</script>

<style scoped>
</style>