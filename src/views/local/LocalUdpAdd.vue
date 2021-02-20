<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="UDP协议通信" v-model="platForm.show" width="50%">
            <!--:rules="platForm.rules"-->
            <Form ref="plat_form"  :model="platForm.form" :rules="platForm.rules"
                  :label-width="150">
<!--                <FormItem label="动作" prop="interface" style="margin-bottom: 0px;">-->
<!--                    <Select v-model="platForm.form.interface">-->
<!--                        <Option label="ACCEPT" value="accept"></Option>-->
<!--                        <Option label="DROP" value="drop"></Option>-->
<!--                        <Option label="REJECT" value="reject"></Option>-->
<!--                    </Select>-->
<!--                </FormItem>-->
                <FormItem label="启用" prop="disabled" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.disabled">启用此规则</Checkbox>
                    
                </FormItem>
                <FormItem label="网闸地址" prop="gapip" style="margin-bottom: 15px;">
                     <Select v-model="platForm.form.gapip">
                        <Option v-for="type in typeList" :value="type" :key="type">{{ type }}</Option>
                    </Select>
                    <!-- <Input  v-model="platForm.form.gapip"/> -->
                </FormItem>
                <!-- <FormItem label="目标服务器端口" prop="targetport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.targetport"/>
                </FormItem> -->
                <FormItem label="转发端口" prop="gapport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.gapport"/>
                </FormItem>
                <FormItem label="启用转源" prop="snat" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.snat">启用转源</Checkbox>
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
    export default {
        name: "LocalUdpAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                typeList:[],
                platForm: {
                    show: false,
                    form: {
                        id:null,
                        gapip:'',
                        targetport:'',
                        gapport:'',
                        snat:true,
                        disabled:true
                    },
                    rules:{
                        gapip:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ]
                    }
                },

            }
        },
        computed: {},
        mounted: function() {
        this.getips();
        },
        methods: {
            getips(){
                this.$https.fetchGet(this.$api.local.findUdpIP.url).then((resp) => {
                    console.log(resp.data.data)
                    this.typeList = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.platForm.show = true;
            },

            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                        
                    // if(this.$util.queryDevIP4(this.platForm.form.gapip)){
                        // if(this.$util.testportnumber(this.platForm.form.targetport)){
                            if(this.$util.testportnumber(this.platForm.form.gapport)){
                                let name = this.platForm.form.gapip.substring(this.platForm.form.gapip.lastIndexOf(":")+1);
                                let obj = {
                                    id:null,
                                    gapip:'',
                                    targetport:'',
                                    gapport:'',
                                    snat:true,
                                    disabled:true
                                }
                                obj.gapip = name
                                obj.gapport= this.platForm.form.gapport
                                obj.disabled= this.platForm.form.disabled
                                obj.snat= this.platForm.form.snat
                                console.log(obj)
                            this.$https.fetchPost(this.$api.udp.addUdpNat.url, obj).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '添加成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                                    setTimeout(() => {
                                        this.reload();
                                    }, 250);
                                } else
                                    this.$Notice.error({title: '添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                                    
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                                
                            });
                        }else{
                            this.$Modal.warning({
                                title: "warning",
                                content: "请正确填写转发端口号"
                            })
                           }
                        // }
                        // else{
                        // this.$Modal.warning({
                        //     title: "warning",
                        //     content: "请正确填写目标服务器端口号"
                        // })
                        // }
                    // }else{
                    //     this.$Modal.warning({
                    //         title: "warning",
                    //         content: "目标服务器ip地址请正确填写合法的ipv4或ipv6"
                    //     })
                    // }
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            }
        }
    };
</script>
<style scoped lang="less">
</style>