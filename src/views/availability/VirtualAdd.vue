<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="新增虚拟IP组" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <!-- <FormItem label="网口" prop="interfaces" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.interfaces">
                        <Option @click.native="copy(item)" v-for="item in testList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="关联网口" prop="interfaceses" style="margin-bottom: 15px;">
                    <Select multiple v-model="platForm.form.interfaceses">
                        <Option v-for="item in testList1" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem> -->
                <FormItem label="虚拟IP地址组" prop="virtualIps" style="margin-bottom: 5px;">
                    <div v-for="(item,i) in IpGroup" :key="i">
                        <Input style="width: 31%;" v-model="IpGroup[i].ipaddress"/>&nbsp; / &nbsp;
                        <Select style="width: 20%;" v-model="IpGroup[i].subnet">
                            <Option v-for="index in 32" :value="index" :key="index">{{ index }}</Option>
                        </Select>
                        <i-button style="margin:0 10px;" size="small" @click="delvarIP(i)">删除</i-button>
                    </div>
                    <i-button size="small" @click="addvarIP" icon="md-add">添加</i-button>
                </FormItem>
                <FormItem label="VHID组ID" prop="vrid" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.vrid"/>
                </FormItem>
                <FormItem label="VHID组密码" prop="vridPassword" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.vridPassword"/>
                </FormItem>
                <FormItem label="心跳间隔(秒)" prop="advert" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.advert" style="width:100%">
                        <Option v-for="item in oneToTen" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <div v-for="(value,index) in IPlistdata" :key="index">
                    <FormItem :label="value" prop="interfaces" style="margin-bottom: 15px;">
                        <div>
                            <span style="width:5%;font-weight:bold;color: #515a6e;margin-right:33px;">{{index==0?'主机':'备机'}}网口</span>
                            <Select v-if="index==0?true:false" v-model="platForm.form.subVirtualIps[index].interfaces" style="width:86%">
                                <Option @click.native="copy(item)" v-for="item in testList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Input v-if="index!=0?true:false" style="width:86%" v-model="platForm.form.subVirtualIps[index].interfaces"/>
                        </div>
                        <div>
                            <span style="width:5%;font-weight:bold;color: #515a6e;margin-right:10px;">{{index==0?'主机':'备机'}}关联网口</span>
                            <Select multiple v-if="index==0?true:false" v-model="platForm.form.subVirtualIps[index].interfaceses" style="width:86%">
                                <Option @click.native="copy(item)" v-for="item in testList1" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Input v-if="index!=0?true:false" style="width:86%" v-model="platForm.form.subVirtualIps[index].interfaceses"/>
                            <span v-if="index!=0?true:false" style="color:red;font-size:12px;">注:多个关联网口用逗号隔开</span>
                        </div>
                    </FormItem>
                </div>
                
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
        inject: ["reload"],
        name: "VirtualAdd",
        props: {
            IPlistdata: Array,
        },
        components: {},
        data() {
            return {

                IpGroup:[
                    {subnet:24}
                ],
                platForm: {
                    show: false,
                    form: {
                        advert: 1,
                        id: "",
                        priority: 50,
                        subVirtualIps: [
                            {
                            interfaces: "",//网口
                            interfaceses: "",//关联网口
                            machineIp: ""
                            },  
                        ],
                        virtualIps: [],
                        vrid: '',
                        vridPassword: ""
                    },
                    rules: {
                        ipaddress:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                        vrid:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                        vridPassword:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                    }
                },
                oneToTen:[1,2,3,4,5,6,7,8,9],
                testList: [],
                testList1: [],
            }
        },
        computed: {},
        methods: {
            showAddDrawer() {
                this.platForm.show = true;
                //传入进来的ip列表长度
                console.log(this.IPlistdata.length)
                if(this.IPlistdata.length>=2){
                    for(let i=1 ; i<this.IPlistdata.length ;i++){
                        this.platForm.form.subVirtualIps.push(
                            {
                            interfaces: "",
                            interfaceses: '',
                            machineIp: ""
                            },  
                        )
                    }
                }
                for(let i in this.IPlistdata){
                    this.platForm.form.subVirtualIps[i].machineIp = this.IPlistdata[i]
                } 
            },

            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                    return;
                let arr = []
                for(let i in this.IpGroup){
                    if(!this.$util.queryDevIP4(this.IpGroup[i].ipaddress) && !this.$util.queryDevIP6(this.IpGroup[i].ipaddress)){
                        this.$Notice.error({title: '新增失败', desc: "虚拟IP组请填写正确的ipv4或ipv6", duration: 5});
                        return
                    }
                    arr.push(this.IpGroup[i].ipaddress +'/'+this.IpGroup[i].subnet)
                }
                console.log(this.platForm.form,'this.platForm.form')
                this.platForm.form.virtualIps = arr
                let obj = JSON.parse(JSON.stringify(this.platForm.form))
                for(let i = 1;i<obj.subVirtualIps.length;i++){
                    console.log(obj.subVirtualIps[i].interfaceses,'obj.subVirtualIps[i].interfaceses')
                    if(obj.subVirtualIps[i].interfaceses.indexOf(",") == -1){
                        obj.subVirtualIps[i].interfaceses = [obj.subVirtualIps[i].interfaceses]
                    }else{
                        obj.subVirtualIps[i].interfaceses = obj.subVirtualIps[i].interfaceses.split(',')
                        console.log(obj.subVirtualIps[i].interfaceses)
                        if(typeof(obj.subVirtualIps[i].interfaceses)=='string'){
                            let str = obj.subVirtualIps[i].interfaceses
                            obj.subVirtualIps[i].interfaceses = []
                            obj.subVirtualIps[i].interfaceses.push(str)
                        }
                    }
                    
                }
                                
                console.log(obj,'obj')
                this.$https.fetchPost(this.$api.avail.addVirtualIp.url,obj).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '添加成功', duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else
                        this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
                })
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                this.IpGroup = [
                    {}
                ]
                this.platForm.form.interfaceses = []
            },
            //get网口列表
            getUSBList (){
                let obj = {name:"common"}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                    if (resp.data.status == 200) {
                        this.testList = resp.data.data
                        this.testList1 = resp.data.data
                    } else
                        this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            
            //赋值默认网口
            copy(item){
            //     for(let i in this.platForm.form.interfaceses){
            //         if(this.platForm.form.interfaceses[i] == item){
            //             return
            //         }
            //     }
            //     this.platForm.form.interfaceses.push(item)
            },
            //增加虚拟ip组框
            addvarIP (){
                this.IpGroup.push({subnet:24})
            },
            //删除虚拟ip框
            delvarIP (i){
                if(this.IpGroup.length<=1){
                    return
                }else{
                    this.IpGroup.splice(i,1)
                }
                
            },
            
        },
        mounted: function() {
            this.getUSBList()
            
        },
    };
</script>
<style scoped lang="less">
</style>