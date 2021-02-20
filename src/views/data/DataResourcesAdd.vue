<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="数据资源配置" v-model="platForm.show" width=70%>
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <div style="display:flex;flex-wrap: wrap">
                    <FormItem style="width:47%" label="资源名称" prop="sourcealias" >
                        <Input v-model="platForm.form.sourcealias"/>
                    </FormItem>
                    <FormItem style="width:47%" label="资源描述" prop="dbdesc" >
                        <Input v-model="platForm.form.dbdesc"/>
                    </FormItem>
                    <FormItem style="width:47%" label="资源类型" prop="sourcetype" >
                        <Select v-model="platForm.form.sourcetype">
                            <Option label="数据库服务器" value="数据库服务器">
                            </Option>
                        </Select>
                    </FormItem>
                    <FormItem style="width:47%" label="数据库类型" prop="dbtype" >
                        <Select v-model="platForm.form.dbtype">
                            <Option v-for="dbType in dbTypeList" :value="dbType.val" :key="dbType.name" @click.native="updatePort(dbType.port)">{{ dbType.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="width:47%" label="IP地址" prop="dbip">
                        <Input v-model="platForm.form.dbip"/>
                    </FormItem>
                    <FormItem style="width:47%" label="端口" prop="dbport" >
                        <Input v-model="platForm.form.dbport"/>
                    </FormItem>
                    <FormItem style="width:47%" label="同步账号用户名" prop="username" >
                        <Input v-model="platForm.form.username"/>
                    </FormItem>
                    <FormItem style="width:47%" label="同步账号密码" prop="userpass" >
                        <Input type="password" v-model="platForm.form.userpass"/>
                    </FormItem>
                    <FormItem style="width:47%" label="业务账号用户名" prop="initusername" >
                        <Input v-model="platForm.form.initusername"/>
                    </FormItem>
                    <FormItem style="width:47%" label="业务账号密码" prop="inituserpass" >
                        <Input type="password" v-model="platForm.form.inituserpass"/>
                    </FormItem>
                    <FormItem style="width:47%" label="数据库名" prop="dbname" >
                        <Input v-model="platForm.form.dbname"/>
                    </FormItem>
                    <FormItem style="width:47%" label="模式名" prop="schemaname" >
                        <Input v-model="platForm.form.schemaname"/>
                    </FormItem>
                    <FormItem style="width:47%" label="临时表前缀" prop="logtablenameprefix" >
                        <Input v-model="platForm.form.logtablenameprefix"/>
                    </FormItem>
                    <FormItem style="width:47%" label="触发器前缀" prop="triggernameprefix" >
                        <Input v-model="platForm.form.triggernameprefix"/>
                    </FormItem>
                </div>
                
                <FormItem style="margin-top:20px">
                    <Button style="margin-right: 8px" :loading="testloading" type="primary" @click="testPlatForm">连接测试</Button>
                    <Button v-if="checkshowbtn" :loading="addloading" type="primary" @click="addPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "DataResourcesAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                testloading:false,
                addloading:false,
                //验证后才出现确定btn
                checkshowbtn: false,
                platForm: {
                    show: false,
                    form: {
                        sourcealias:null,
                        dbdesc:null,
                        in:"in",
                        sourcetype:"数据库服务器",
                        dbtype:"oracle",
                        dbip:null,
                        dbport:"1521",
                        username:null,
                        userpass:null,
                        initusername:null,
                        inituserpass:null,
                        dbname:null,
                        schemaname:null,
                        logtablenameprefix:"SYNCD_",
                        triggernameprefix:"SYNCD_TR_",
                        useSSL:"false",
                        // resType: "数据库服务器",
                        // dbType: "oracle",
                        // port: "1521",
                        //
                        // idplatform:null,
                        // idinnerlink:null,
                        // idbiz:null,
                        // unitname:null,
                        // systemname:null,
                        // projecttype:"00000",
                        // projectopt:"0000",
                        // leadername:null,
                        //
                        // leaderphone:null,
                        // leaderemail:null,
                        // leaderothercontact:null,
                        // passunit:null,
                        // passtime:null,
                        // passnumber:null,
                        // passFile:null,
                        // regtime:null,
                        // transferdirect:"1",
                        // baseprotocol:"0001",
                        // ifrealtime:"1",
                        // propamount:null,
                        // ifregist:"1",
                        // registunitname:null,
                        // linkimageFile:null,

                    },
                    rules: {
                        sourcealias: [
                            { required: true, pattern: /^[a-zA-Z0-9_\s\u4e00-\u9fa5_]*$/, message: '请输入数字或英文或中文或下划线或它们的组合', trigger: 'blur' },
                            {  max:30, message: '长度不超过30', trigger: 'blur' },
                            {  min:3, message: '长度请大于3', trigger: 'blur' }
                        ],
                        sourcetype: [
                            { required: true, message: '请选择资源类型', trigger: 'blur' }
                        ],
                        dbtype: [
                            { required: true, message: '请选择数据库类型', trigger: 'blur' }
                        ],
                        dbip: [
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                        dbport: [
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '请正确输入端口', trigger: 'blur' }
                        ],
                        username: [
                            { required: true,  message: '请输入同步账号用户名', trigger: 'blur' }
                        ],
                        userpass: [
                            { required: true,  message: '请输入账号密码', trigger: 'blur' }
                        ],
                        initusername: [
                            { required: true,  message: '请输入业务账号用户名', trigger: 'blur' }
                        ],
                        inituserpass: [
                            { required: true,  message: '请输入业务账号密码', trigger: 'blur' }
                        ],
                        dbname: [
                            { required: true,  message: '请输入数据库名', trigger: 'blur' }
                        ]
                    }
                },
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
                resourceList:[{name:"本地FTP"},{name:"本地SMB"},{name:"本地NFS"},{name:"光碟塔"},{name:"Client"},{name:"认证同步"}],
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
                dbTypeList: [{name:"Oracle",val:"oracle",port:"1521"},{name:"SQLServer",val:"sqlserver",port:"1433"},{name:"MySQL",val:"mysql",port:"3306"},
                    {name:"DB2",val:"db2",port:"50000"},{name:"SYBase",val:"sybase",port:"5000"},{name:"DM",val:"dm",port:"5236"},{name:"OSCAR",val:"oscar",port:"2003"},
                    {name:"KingbaseES",val:"kingbasees",port:"54321"},{name:"GBASE",val:"gbase",port:"5258"}]
            }
        },
        computed: {},
        methods: {
            updatePort(dbport){
                console.log(dbport);
                this.platForm.form.dbport = dbport;
                // this.$set(this.platForm.form,"port",p)
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
                    if(this.$util.queryDevIP4(this.platForm.form.dbip)){
                        console.log(this.$util.queryDevIP4(this.platForm.form.dbip))
                        this.addloading = true
                        this.$https.fetchPost(this.$api.data.addDsn.url, this.platForm.form,{timeout: 300 * 1000}).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '添加成功', desc: "添加成功", duration: 2.5});
                            this.platForm.show = false;
                            this.reload();
                            this.addloading = false
                        } else{
                            this.addloading = false
                            this.$Notice.error({title: '添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                        }    
                        }).catch(err => {
                            this.addloading = false
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }else{
                            this.$Modal.warning({
                                title: "warning",
                                content: "请正确填写合法的ipv4或ipv6"
                            })
                        }
                    
                });

            },
            // 链接接口
            testPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    console.log(valid)
                    if (!valid)
                        {
                            return;
                        }
                    this.testloading = true
                    if(this.$util.queryDevIP4(this.platForm.form.dbip)){
                        console.log(this.$util.queryDevIP4(this.platForm.form.dbip))
                        this.$https.fetchPost(this.$api.data.testConnection.url, this.platForm.form,{timeout: 300 * 1000}).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '测试连接成功', desc: "测试连接成功", duration: 2.5});
                            this.checkshowbtn = true
                            //location.reload();
                        } else{
                            this.$Notice.error({title: '测试连接失败', desc: "错误：" + resp.data.desc, duration: 5});
                        }
                        this.testloading = false   
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        this.testloading = false 
                        console.log(err)
                    });
                    }else{
                            this.$Modal.warning({
                                title: "warning",
                                content: "请正确填写合法的ipv4或ipv6"
                            })
                        }
                      
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