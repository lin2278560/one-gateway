<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="新增接口" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="状态" prop="status" style="margin-bottom: 15px;">
                    <RadioGroup v-model="platForm.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="网口" prop="dev" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.real_interface">
                        <Option v-for="i in testList" :value="i" :key="i">{{ i }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="接口类型" prop="type" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.type">
                        <Option v-for="type in typeList" :value="type.val" :key="type.val" @click.native="updateType(type.val)">{{ type.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="用途类型" prop="devType" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.interface_type">
                        <Option v-for="type in interfaceTypeList" :value="type.val" :key="type.val" @click.native="updatedevType(type.val)">{{ type.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="IP地址/掩码" prop="ipaddr" style="margin-bottom: 15px;" v-show="ipAddr">
                
                    <Input v-model="platForm.form.ipaddr" style="width: 350px;" />/
                    
                    <Select v-model="platForm.form.subent" style="width: 70px;">
                        <Option v-for="mack in mackList" :value="mack" :key="mack" @click.native="updatePort(mack)">{{ mack }}</Option>
                    </Select>
                </FormItem>
                
                <FormItem>
<!--                    <Button type="primary" @click="addPlatForm">确认</Button>-->
                    <Button type="primary" @click="addTest">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    export default {
        inject: ["reload"],
        name: "NetworkInterfaceAdd",
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        real_interface: "",
                        ipaddr: "",
                        subent: 24,
                        type: "STATIC",
                        interface_type: "common",
                        state: "禁用"
                    },
                    // rules:{
                    //     ipaddr: { required: true, message: '请选择一项', trigger: 'change',type:'number',min:1},
                    //     }
                },
                mackList:[],
                ipAddr: true,
                ipv4:[],
                ipv6:[],
                testList:[],
                typeList:[{name:"静态IPv4",val:"STATIC"},{name:"静态IPv6",val:"STATICIPv6"},{name:"DHCP",val:"DHCP"}],
                interfaceTypeList:[{name:"业务口",val:"common"},{name:"管理口",val:"manage"},{name:"通道口",val:"channel"}],
                interfaceList:[{name:"eth0",val:"eth0"},{name:"eth1",val:"eth1"}]
            }
        },
        computed: {},
        mounted: function() {
            
            //获取ipv4列表掩码
            this.push()
            let val = "common"
            let obj = {name:val}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.testList = resp.data.data
                            this.platForm.form.real_interface = this.testList[0]
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
        },
        methods: {
            //get另外一个新的网口列表
            test(){
                this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
                    this.testList = resp.data.data;
                    // console.log(this.testList)
                }).catch(err => {
                    console.log(err)
                })
            },
            //改变用途类型
            updatedevType (val){
                if(val == "common"){
                    this.getUSBList (val)
                }else if(val == "manage"){
                     this.getUSBList (val)
                }else if(val == "channel"){
                     this.getUSBList (val)
                }
            },
            //get网口列表
            getUSBList (val){
                console.log(val)
                let obj = {name:val}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.testList = resp.data.data
                            this.platForm.form.real_interface = this.testList[0]
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            //添加用户
            addTest(){
                this.$refs['plat_form'].validate((valid) => {
                    // if (!valid){
                    //      return;
                    // }
                    // let formData = new FormData();
                    //
                    // formData.append("dev", this.platForm.form.dev);
                    // formData.append("ip", this.platForm.form.ip);
                    //
                    // formData.append("mack", this.platForm.form.mack);
                    // formData.append("type", this.platForm.form.type);
                    // formData.append("devType", this.platForm.form.devType);
                    // formData.append("ipType", this.platForm.form.ipType);
                    // formData.append("state", this.platForm.form.state);
                    
                    if(this.$util.queryDevIP4(this.platForm.form.ipaddr) || this.$util.queryDevIP6(this.platForm.form.ipaddr)){
                        if (!this.$util.queryDevIP6(this.platForm.form.ipaddr) && this.platForm.form.type =="STATICIPv6"){
                            this.$Modal.warning({
                            title: "warning",
                            content: "你填写的ip地址不符合ipv6地址规范"
                        })
                        this.modal.form.state = "disable";
                        return
                        }
                        if (!this.$util.queryDevIP4(this.platForm.form.ipaddr) && this.platForm.form.type == "STATIC"){
                            this.$Modal.warning({
                            title: "warning",
                            content: "你填写的ip地址不符合ipv4地址规范"
                        })
                            this.modal.form.state = "disable";
                            return
                        }
                        if(this.platForm.form.state == "禁用" || this.platForm.form.state == "disable"){
                            this.platForm.form.state = "disable";
                        }else{
                            this.platForm.form.state = "enable";
                        }
                        this.$https.fetchPost(this.$api.network.addIpaddr.url,
                        this.platForm.form
                        ).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '接口添加成功', desc: "正在刷新界面", duration: 2.5});
                                this.reload();
                            } else
                                this.$Notice.error({title: '接口添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }).catch(err => {
                                this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                                console.log(err)
                            })
                    }
                    else{
                        this.$Modal.warning({
                            title: "warning",
                            content: "请正确填写合法的ipv4或ipv6"
                        })
                      
                    }
                });
            },
            //获取网口列表
            // getUSBList(){
            //     this.$https.fetchGet(this.$api.network.showIfconfig.url).then((resp) => {
            //         this.testList = resp.data.data;
            //     }).catch(err => {
            //         console.log(err)
            //     })
            // },
            //获取ipv4列表掩码
            push(){
                for(let i=1; i<=32; i++){
                    this.ipv4.push(i)
                }
                for(let i=1; i<=128; i++){
                    this.ipv6.push(i)
                }
                this.mackList = this.ipv4
            },
            updateType(val){
                if(val == "ipv6"){
                    this.mackList = this.ipv6
                    this.ipAddr = true
                    this.platForm.form.mack = 64
                }else if(val == "ipv4"){
                    this.mackList = this.ipv4
                    this.ipAddr = true
                    this.platForm.form.mack = 24
                }else if(val == "dhcp"){
                    this.ipAddr = false
                }
            },

            updatePort(prot){
                console.log(prot);
                this.platForm.form.port = prot;
            },



            getPassTime(dateTime){
                this.platForm.form.passtime = dateTime;
            },
            getRegTime(dateTime){
                this.platForm.form.regtime = dateTime;
            },
            handlePassfile(passfile){
                this.passFileName = passfile.name;
                this.platForm.form.passFile = passfile;
                return false;
            },
            handleLinkimage(linkimage){
                this.linkimageFileName = linkimage.name;
                this.platForm.form.linkimageFile = linkimage;
                return false;
            },
            showAddDrawer() {
                this.platForm.show = true;
                //获取网口列表
                this.getUSBList("common")
            },

            addPlatForm() {

            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                this.platForm.form.ipaddr = ''
                this.platForm.form.subent = 24
                this.platForm.form.interface_type = 'common'
                // this.platForm.form.mack = 24
            }
        }
    };
</script>
<style scoped lang="less">
</style>