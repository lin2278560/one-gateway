<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="静态路由" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="状态" prop="state" style="margin-bottom: 0px;">
                    <RadioGroup v-model="platForm.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="目的网络" prop="network" style="margin-top: 15px;">
                    <Input v-model="platForm.form.dstent" style="width: 150px;" />/
                    <Select v-model="platForm.form.subent" style="width: 70px;">
                        <Option v-for="mack in mackList" :value="mack" :key="mack">{{ mack }}</Option>
                    </Select>
                    <span style="color: red;">*请填写一个IPv4或IPv6地址; 目的主机选择掩码32</span>
                </FormItem>
                
                <FormItem label="接口" prop="interface_dev" style="margin-bottom: 12px;">
                    <Select v-model="platForm.form.interface_dev">
                        <Option v-for="i in testList" :value="i" :key="i">{{ i }}</Option>
                    </Select>
                </FormItem>
                <span style="color: red;margin-left:150px">注:网关请填写一个IPv4或IPv6地址</span>
                <FormItem label="网关" prop="gateway" style="">
                    <Input v-model="platForm.form.gateway" />
                </FormItem>
               
                <FormItem label="描述" prop="descr" style="">
                    <Input v-model="platForm.form.descr" />
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
        name: "NetworkInterfaceAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        // type:[{name:"静态IPv4",val:""},{name:"静态IPv6",val:""},{name:"DHCP",val:""}],
                        dstent: "",//目的网络
                        subent: 24,
                        interface_dev: "eth0",
                        gateway: "",//网关
                        descr: "",
                        state:"禁用",
                    },
                },
                testList:[],
                mackList:[],
                interfaceList:[{name:"eth0",val:"eth0"},{name:"eth1",val:"eth1"}]
            }
        },
        computed: {},
        mounted: function() {
            this.push();
            this.test();
        },
        methods: {
            test(){
                this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
                    this.testList = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.platForm.show = true;
                // let axios = this.$https.getAxios();
                // axios.all([
                //     axios.get(this.$api.dev.rAllDeviceType.url)
                // ]).then(
                //     axios.spread((...resp) => {
                //         let i = resp[0].data;
                //
                //         if (i.status == 200)
                //             this.interfaceList = i.data;
                //     })
                // )
                // .catch(err => {
                //     console.log(err)
                // })
            },
            push(){
                for(let i=1; i<=32; i++){
                    this.mackList.push(i)
                }
            },
            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.$util.queryDevIP4(this.platForm.form.dstent) || this.$util.queryDevIP6(this.platForm.form.dstent)){
                        if(this.$util.queryDevIP4(this.platForm.form.gateway) || this.$util.queryDevIP6(this.platForm.form.gateway)){
                            if(this.platForm.form.state == "禁用" || this.platForm.form.state == "disable"){
                                this.platForm.form.state = "disable";
                            }else{
                                this.platForm.form.state = "enable";
                            }
                            console.log(this.platForm.form)
                            this.$https.fetchPost(this.$api.route.addRoute.url,
                                this.platForm.form
                                // this.platForm.form
                            ).then((resp) => {
                                if (resp.data.status == 200) {
                                    this.$Notice.success({title: '路由添加成功', desc: "正在刷新界面", duration: 5});
                                    setTimeout(() => {
                                        this.reload();
                                    }, 250);
                                } else
                                    this.$Notice.error({title: '路由添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                console.log(err)
                            })
                        }else{
                            this.$Modal.warning({
                                title: "warning",
                                content: "网关请正确填写合法的ipv4或ipv6"
                            })
                        }
                    }else{
                        this.$Modal.warning({
                            title: "warning",
                            content: "目的网络请正确填写合法的ipv4或ipv6"
                        })
                    }
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                this.platForm.form.subent = 24
                this.platForm.form.dstent = ''
            }
        }
    };
</script>
<style scoped lang="less">
</style>