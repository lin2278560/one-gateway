<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="访问控制" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form" :label-width="150">
                <FormItem label="动作" prop="type" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.type">
                        <Option v-for="item in typeList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="启用" prop="disabled" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.disabled">启用此规则</Checkbox>
                </FormItem>
                <FormItem label="协议" prop="protocol1" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.protocol">
                        <Option v-for="item in resourceList" :value="item.val" :key="item.val" @click.native="checkType(item.val)">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="源类型" prop="srctype"  style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.srctype">
                        <Option v-for="item in resourceList1" :value="item.val" :key="item.val" @click.native="checkType1(item.val)">{{ item.name }}</Option>
                        
                    </Select><br/>
                    <!--地址:<Input disabled v-model="platForm.form.srcip" style="width: 95%;margin-left: 13px;"/>-->
                    <!--端口:<Input disabled v-model="platForm.form.srcport" style="width: 95%;margin-left: 13px;"/>-->
                </FormItem>
                <FormItem label="源地址" v-show="any" prop="srcip" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.srcip"/>
                </FormItem>
                <FormItem label="源端口"  v-show="icmp" prop="srcport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.srcport"/>
                </FormItem>
                <FormItem label="本地服务" prop="dsttype" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.dsttype" >
                        <Option v-for="item in resourceList2" :value="item.val" :key="item.val" @click.native="checkType2(item.val)">{{ item.name }}</Option>
                        
                    </Select><br/>
                    <!--地址:<Input disabled v-model="platForm.form.dstip" style="width: 95%;margin-left: 13px;"/>-->
                    <!--端口:<Input disabled v-model="platForm.form.dstport" style="width: 95%;margin-left: 13px;"/>-->
                </FormItem>
                <FormItem label="本地地址" v-show="any1" prop="dstip" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.dstip"/>
                </FormItem>
                <FormItem label="本地端口"  v-show="icmp" prop="dstport" style="margin-bottom: 15px;">
                    <Input  v-model="platForm.form.dstport"/>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addPlatForm">确认</Button>
                    <!-- <Button style="margin-left: 8px" @click="restPlatForm">重置</Button> -->
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "LocalAclAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        type:"ACCEPT",
                        protocol:"tcp",
                        srctype:"any",
                        srcip:'',//源地址
                        srcport:'',
                        dsttype:"any",
                        dstip:'',
                        dstport:'',//本地地址
                        disabled:true,
                    },
                    rules: {
                        srcip:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.platForm.form.srctype == "single"){
                                        if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                                            callback(new Error('ip地址格式不正确'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        dstip:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.platForm.form.dsttype == "single"){
                                        if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                                            callback(new Error('ip地址格式不正确'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        dstport:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(!this.$util.testportnumber(value)){
                                        if(value=="" || value=="*"){
                                            callback()
                                        }
                                        callback(new Error('端口格式不正确'))
                                    }
                                    else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        srcport:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(!this.$util.testportnumber(value)){
                                        if(value=="" || value=="*"){
                                            callback()
                                        }
                                        callback(new Error('端口格式不正确'))
                                    }
                                    else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        // srcport:{ message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // dstport:{ message: '请正确填写端口号',pattern:/^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/},
                        // srcip:{ pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|(^$)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        // dstip:{ pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|(^$)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                    }
                },
                any:false,
                any1:false,
                icmp:true,
                resourceList:[{name:"UDP", val:"udp"},{name:"TCP", val:"tcp"},{name:"ICMP", val:"icmp"}],
                resourceList1:[{name:"any", val:"any"},{name:"单个主机", val:"single"}],
                resourceList2:[{name:"any", val:"any"},{name:"单个主机", val:"single"}],
                typeList:[{name:"ACCEPT",val:"ACCEPT"},{name:"DROP",val:"DROP"},{name:"REJECT",val:"REJECT"}],

                transferdirectList :[{title:"1", name:"单入"},{title:"2", name:"单出"},
                    {title:"3", name:"双向"}],
                baseprotocolList :[{title:"0001", name:"TCP/IP"},{title:"0002", name:"SSL"},
                    {title:"0003", name:"IPSEC"},{title:"0004", name:"FTP"},
                    {title:"0005", name:"H323"},{title:"0006", name:"H320"},
                    {title:"0007", name:"SNMP"},{title:"0008", name:"UDP"},
                    {title:"0009", name:"其他"}],
                flagList:[{title:"1", name:"是"}, {title:"0", name:"否"}],
                passFileName:"",
                linkimageFileName:"",
                innerlinkList:[],
               // resourceList:[{name:"本地FTP"},{name:"本地SMB"},{name:"本地NFS"},{name:"光碟塔"},{name:"Client"},{name:"认证同步"}],
                directoryList:[],
                levelList:[{name:"1"},{name:"2"}],
                codingList:[{name:"UTF-8"}],
                operationList:[{name:"删除"},{name:"复制"},{name:"备份"}],
                idplatformList:[{name:"不审计"},{name:"白名单"},{name:"黑名单"}],
                filterTypeList:[{name:"白名单"},{name:"黑名单"}],
                virusList:[{name:"删除"},{name:"隔离"}],
                channelList:[{name:"channel01"},{name:"channel02"}],
                aaList:[{name:"同步子目录"},{name:"只同步当前目录"}],


                interfaceList: [{name:"eth2"}],
                // subnet_bits_list: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32]
            }
        },
        computed: {},
        mounted: function() {
            
        },
        methods: {
            checkType(val){
                this.$refs['plat_form'].resetFields();
                this.any = false
                this.any1 = false
                this.platForm.form.protocol = val
                if (val=="icmp"){
                    this.icmp=false;
                }else{
                    this.icmp=true;
                }
            },
            checkType1(val){
                // this.$refs['plat_form'].resetFields();
                this.platForm.form.srcip = ''
                this.platForm.form.srcport = ''
                this.platForm.form.srctype = val
                if (val=="any"){
                    this.any=false;
                }else if(val=="single"){
                    this.any=true;
                }
            },
            checkType2(val){
                this.platForm.form.dstip = ''
                this.platForm.form.dstport = ''
                this.platForm.form.dsttype = val
                if (val=="any"){
                    this.any1=false;
                }else if(val=="single"){
                    this.any1=true;
                }
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
            },
            
            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => { 
                    if (!valid)
                        return;
                    if((this.platForm.form.srctype == "single" && this.platForm.form.srcip == null)||(this.platForm.form.dsttype == "single" && this.platForm.form.dstip == null)){
                        this.$Modal.warning({
                                title: "warning",
                                content: "当类型为单个主机时地址不能为空"
                            })
                    }else{
                        let obj ={}
                        Object.assign(obj, this.platForm.form);
                        if(this.platForm.form.dstip == ""){
                            obj.dstip = "*"
                        }
                        if(this.platForm.form.dstport == ""){
                            obj.dstport = "*"
                        }
                        if(this.platForm.form.srcip == ""){
                            obj.srcip = "*"
                        }
                        if(this.platForm.form.srcport == ""){
                            obj.srcport =  "*"
                        }
                        console.log(obj)
                        this.$https.fetchPost(this.$api.filter.addFilter.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '添加成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                                setTimeout(() => {
                                    this.reload();
                                }, 250);
                            } else
                                this.$Notice.error({title: '添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        }) 
                        }
                })
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                if (this.platForm.form.resourceList =="icmp"){
                    this.icmp=false;
                }else{
                    this.icmp=true;
                }
            }
        }
    };
</script>
<style scoped lang="less">
</style>