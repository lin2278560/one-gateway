<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <resources style="float: right"></resources>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data3">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateDb(index)">修改</Button>
                        <Button type="error" size="small" @click="delDb(row.sourcealias,index)">删除</Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action1">
                        <Button v-if="!data3[index].restartloading" size="small" style="margin-right: 5px" @click="updateD(index)">重新加载</Button>
                        <Button v-if="data3[index].restartloading" size="small" style="margin-right: 5px" >加载中...</Button>
                        <Button size="small" style="margin-right: 5px" @click="restartPool(row.sourcealias)">重置连接池</Button>
                        <Button size="small" @click="showService(index)">资源属性</Button>
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
        <Drawer title="修改数据库资源" v-model="modal.show" width="1000">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <div style="display:flex;flex-wrap: wrap">
                <FormItem label="资源名称" prop="sourcealias" style="width:47%;">
                    <Input disabled v-model="modal.form.sourcealias"/>
                </FormItem>
                <FormItem label="资源类型" prop="subnet" style="width:47%;">
                    <Select v-model="modal.form.sourcetype">
                        <Option label="数据库服务器" value="数据库服务器"></Option>
                    </Select>
                </FormItem>
                <FormItem label="资源描述" style="width:47%;" prop="dbdesc" >
                    <Input v-model="modal.form.dbdesc"/>
                </FormItem>
                <FormItem label="数据库类型" prop="vhid" style="width:47%;">
                    <Select v-model="modal.form.dbtype">
                        <Option v-for="dbType in dbTypeList" :value="dbType.val" :key="dbType.val" @click.native="updatePort(dbType.port)">{{ dbType.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="IP地址" prop="dbip" style="width:47%;">
                    <Input v-model="modal.form.dbip"/>
                </FormItem>
                <FormItem label="端口" prop="dbport" style="width:47%;">
                    <Input v-model="modal.form.dbport"/>
                </FormItem>
                <FormItem label="同步账号用户名" prop="username" style="width:47%;">
                    <Input v-model="modal.form.username"/>
                </FormItem>
                <FormItem label="同步账号密码" prop="userpass" style="width:47%;">
                    <Input type="password" v-model="modal.form.userpass"/>
                </FormItem>
                <FormItem label="业务账号用户名" prop="initusername" style="width:47%;">
                    <Input v-model="modal.form.initusername"/>
                </FormItem>
                <FormItem label="业务账号密码" prop="inituserpass" style="width:47%;">
                    <Input type="password" v-model="modal.form.inituserpass"/>
                </FormItem>
                <FormItem label="数据库名" prop="dbname" style="width:47%;">
                    <Input v-model="modal.form.dbname"/>
                </FormItem>
                <FormItem label="模式名" prop="schemaname" style="width:47%;">
                    <Input v-model="modal.form.schemaname"/>
                </FormItem>
                <FormItem label="临时表前缀" prop="logtablenameprefix" style="width:47%;">
                    <Input v-model="modal.form.logtablenameprefix"/>
                </FormItem>
                <FormItem label="触发器前缀" prop="triggernameprefix" style="width:47%;">
                    <Input v-model="modal.form.triggernameprefix"/>
                </FormItem>
                <FormItem>
                    <Button style="margin-right: 8px" type="primary" @click="testPlatForm">连接测试</Button>
                    <Button type="primary" :loading="btnloading" @click="addPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
                </div>
            </Form>
        </Drawer>
        <Modal
                title="详情"
                v-model="modal10"
                class-name="vertical-center-modal">
            <div style="height: 120px;">
                <span style="width: 49%;float: left;" v-for="(i,j) in data2" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</span>
            </div>
        </Modal>
    </div>

</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import resources from "./DataResourcesAdd";
    export default {
        name: "DataResources",
        components: {
            jk_tabs: JkTabs,resources
        },
        inject: ["reload"],
        data(){
            return {
                //重新加载的btn loading
                restartloading:false,
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 10,
                btnloading:false,
                columns1: [
                    {title: '序号', key: 'id', align: 'center',width: 80,
                    render: (h, params) => {
                            return h('span',params.index + (this.currentPage - 1) * this.pageSize +1)
                        }
                    },
                    {title: '资源名称', key: 'sourcealias', align: 'center'},
                    {title: '资源类型', key: 'sourcetype', align: 'center',width: 140,},
                    {title: '运行状态', key: 'runstate',width: 290,align: 'center'},
                    {title: '资源配置', slot: 'action1', width: 290, align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                data1: [],
                modal10: false,
                data2: [],
                data3:[],
                dbTypeList: [{name:"Oracle",val:"oracle",port:"1521"},{name:"SQLServer",val:"sqlserver",port:"1433"},{name:"MySQL",val:"mysql",port:"3306"},
                    {name:"DB2",val:"db2",port:"50000"},{name:"SYBase",val:"sybase",port:"5000"},{name:"DM",val:"dm",port:"5236"},{name:"OSCAR",val:"oscar",port:"2003"},
                    {name:"KingbaseES",val:"kingbasees",port:"54321"},{name:"GBASE",val:"gbase",port:"5258"}],
                modal: {
                    show: false,
                    form: {
                        oldId:null,
                        sourcealias:null,
                        in:"in",
                        sourcetype:null,
                        dbtype:null,
                        dbip:null,
                        dbport:null,
                        username:null,
                        userpass:null,
                        initusername:null,
                        inituserpass:null,
                        dbname:null,
                        schemaname:null,
                        logtablenameprefix:null,
                        triggernameprefix:null,
                        useSSL:"false",
                        dbdesc:''
                    },
                     rules: {
                        sourcealias: [
                            { required: true, pattern: /^[a-zA-Z0-9_\s]*$/, message: '资源名称请输入数字或英文或下划线', trigger: 'blur' },
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
                indeterminate: false,
                checkAll: false,
                isWhenShow: true,
                isDayShow: false,
                isWeeksShow: false,
                isMonthShow: false,
                checkAllGroup: [],
                links: [
                    {name: "资源列表", to: "/data/resources"}
                ],
                tap: {
                    items: [
                        // {to:"/index/home", img:"../../../static/img/nav/menu_05.png", title:"监控总览"},
                        // {to:"/index/alarm", img:"../../../static/img/nav/menu_04.png", title:"故障告警"},
                        // {to:"/index/data", img:"../../../static/img/nav/menu_03.png", title:"数据对账"},
                        // {to:"/index/log", img:"../../../static/img/nav/menu_02.png", title:"日志审计"},
                        // {to:"/index/monitor", img:"../../../static/img/nav/menu_06.png", title:"资源监控"},
                        // {to:"/index/interface", img:"../../../static/img/nav/menu_07.png", title:"接口管理"},
                        // {to:"/index/sys", img:"../../../static/img/nav/menu_01.png", title:"系统管理"}
                        {no:"1", uname:"fyb", directory:"/fyb", state: "运行中"}
                    ]
                }
            }
        },
        mounted: function() {
            // this.showIpAddr();
            // this.$Spin.show()
            this.getInfo();
            
        },
        methods: {
            //分页下一页点击事件
            changepage(index) {
                this.currentPage = index;
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.data3 = this.data1.slice(_start, _end);
                for(let i in this.data3){
                    this.$set(this.data3[i],"runstate","未被占用")
                    this.$set(this.data3[i],"restartloading",false)
                }
                this.getState()
            },
            //重置连接池
            restartPool(sourcealias){
                let string = '4003***'
                string = string + sourcealias
                //4003***资源名
                console.log(string)
                this.$https.fetchPost(this.$api.data.resetConnection.url, {string}).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '命令发送成功', desc: resp.data.desc, duration: 5});
                        } else
                            this.$Notice.error({title: '操作失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    });
            },
            getState(){
                this.$https.fetchGet(this.$api.data.syncTaskInfo.url).then((resp) => {
                if (resp.data.status == 200) {
                        let data = resp.data.data;
                        console.log(data,"data")
                        let arr = []
                        let obj ={
                                    ssyncdsn : '',
                                    taskname : '',
                                    oid : '',
                                };
                        for (let i in data){
                            for (let j in data[i].dbsync) {
                                obj ={
                                    ssyncdsn : '',
                                    taskname : '',
                                    oid : ''
                                }
                                obj.taskname = data[i].taskname
                                obj.ssyncdsn = data[i].dbsync[j].subtask[0].ssyncdsn
                                obj.oid = data[i].dbsync[j].maintask.oid
                                arr.push(obj)
                            }
                        }
                        for(let i=0;i<arr.length;i++){
                            for(let j=i+1;j<arr.length;j++){
                                if(arr[i].ssyncdsn == arr[j].ssyncdsn){
                                    arr.splice(j,1);
                                }
                            }
                        }
                        console.log(arr,"arr")
                        for(let i in arr){
                            for(let j in this.data1){
                                if(this.data1[j].sourcealias == arr[i].ssyncdsn){
                                    // this.data1[j].runstate == arr[i].taskname
                                    this.$set(this.data1[j],"runstate","被["+arr[i].taskname+"]业务下的["+arr[i].oid+"]数据库同步服务占用")
                                    console.log(arr[i].taskname)
                                    console.log(this.data1[j].runstate)
                                }
                            }
                        }
                        console.log(this.data1,"1")
                    } else {
                        this.$Notice.error({title: '请求数据失败', desc: "错误代码：" + resp.data.desc, duration: 5});
                    }
                    // this.$Spin.hide()   
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                        // this.$Spin.hide() 
                    
            })
            // this.push();
            },
            addPlatForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.btnloading = true
                    this.$https.fetchPost(this.$api.data.updateDsn.url, this.modal.form,{timeout: 300 * 1000}).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '修改成功', desc: "修改成功，正在刷新页面", duration: 2.5});
                            setTimeout(() => {
                                this.btnloading = false
                                this.reload();
                                }, 250);
                        } else{
                            this.$Notice.error({title: '修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                            this.btnloading = false
                        }
                            
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                        this.btnloading = false
                    });
                });

            },
            testPlatForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.data.testConnection.url, this.modal.form,{timeout: 300 * 1000}).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '测试连接成功', desc: "测试连接成功", duration: 2.5});
                        } else
                            this.$Notice.error({title: '测试连接失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });

            },
            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },

            updatePort(prot){
                console.log(prot);
                this.platForm.form.port = prot;
            },
            getInfo(){
                this.$https.fetchGet(this.$api.data.findDsnInfo.url).then((resp) => {
                    if (resp.data.status == 200) {
                        this.data1 = resp.data.data;
                        this.dataCount = resp.data.data.length
                        this.data3 = this._.cloneDeep(resp.data.data)
                        // for(let i in this.data3){
                        //     this.$set(this.data3[i],"runstate","未被占用")
                        // }
                        this.changepage(1)
                        console.log(this.data1,"data1")
                    } else
                        this.$Notice.error({title: '请求数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            showService(index) {
                let dbdesc = this.data3[index].dbdesc
                if(this.data3[index].dbdesc==''){
                    dbdesc = '无'
                }
                this.data2 = [{name: "资源名称",val: this.data3[index].sourcealias},
                    {name: "资源类型",val: this.data3[index].sourcetype},
                    {name: "资源描述",val: dbdesc},
                    {name: "数据库类型",val: this.data3[index].dbtype},
                    {name: "IP地址",val: this.data3[index].dbip},
                    {name: "端口",val: this.data3[index].dbport},
                    {name: "同步账号用户名",val: this.data3[index].username},
                    // {name: "同步账号密码",val: this.data3[index].userpass},
                    {name: "业务账号用户名",val: this.data3[index].initusername},
                    // {name: "业务账号密码",val: this.data3[index].inituserpass},
                    {name: "数据库名",val: this.data3[index].dbname},
                    {name: "模式名",val: this.data3[index].schemaname},
                    {name: "临时表前缀",val: this.data3[index].logtablenameprefix},
                    {name: "触发器前缀",val: this.data3[index].triggernameprefix}]
                this.modal10 = true;
            },
            updateDb(index){
                // console.log(this.data1[index],'this.data1[index]')
                // if(this.data3[index].runstate=='未被占用'){
                    this.modal.show=true;
                    this.modal.form.dbdesc = this.data3[index].dbdesc;
                    this.modal.form.oldId = this.data3[index].sourcealias;
                    this.modal.form.sourcealias = this.data3[index].sourcealias;
                    this.modal.form.in = this.data3[index].in;
                    this.modal.form.sourcetype = this.data3[index].sourcetype;
                    this.modal.form.dbtype = this.data3[index].dbtype;
                    this.modal.form.dbip = this.data3[index].dbip;
                    this.modal.form.dbport = this.data3[index].dbport;
                    this.modal.form.username = this.data3[index].username;
                    this.modal.form.userpass = this.data3[index].userpass;
                    this.modal.form.initusername = this.data3[index].initusername;
                    this.modal.form.inituserpass = this.data3[index].inituserpass;
                    this.modal.form.dbname = this.data3[index].dbname;
                    this.modal.form.schemaname = this.data3[index].schemaname;
                    this.modal.form.logtablenameprefix = this.data3[index].logtablenameprefix;
                    this.modal.form.triggernameprefix = this.data3[index].triggernameprefix;
                    this.modal.form.useSSL = this.data3[index].useSSL;
                // }else{
                //     this.$Notice.warning({title: '操作失败', desc: "此数据库资源被占用中" , duration: 5});
                // }
                
            },
            updateD(index){
                this.data3[index].restartloading = true
                this.modal.form.sourcealias = this.data3[index].sourcealias;
                this.modal.form.in = this.data3[index].in;
                this.modal.form.sourcetype = this.data3[index].sourcetype;
                this.modal.form.dbtype = this.data3[index].dbtype;
                this.modal.form.dbip = this.data3[index].dbip;
                this.modal.form.dbport = this.data3[index].dbport;
                this.modal.form.username = this.data3[index].username;
                this.modal.form.userpass = this.data3[index].userpass;
                this.modal.form.initusername = this.data3[index].initusername;
                this.modal.form.inituserpass = this.data3[index].inituserpass;
                this.modal.form.dbname = this.data3[index].dbname;
                this.modal.form.schemaname = this.data3[index].schemaname;
                this.modal.form.logtablenameprefix = this.data3[index].logtablenameprefix;
                this.modal.form.triggernameprefix = this.data3[index].triggernameprefix;
                this.modal.form.useSSL = this.data3[index].useSSL;
               
                this.$https.fetchPost(this.$api.data.updateDsnInfo.url, this.modal.form,{timeout: 300 * 1000}).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '重新加载成功', desc: "重新加载成功", duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                            }, 250);
                    } else{
                        this.data3[index].restartloading = false
                        this.$Notice.error({title: '重新加载失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }    
                }).catch(err => {
                    this.data3[index].restartloading = false
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                });
                
            },

            delDb(name,index){
                console.log(this.data3[index],'this.data3[index].runstate')
                if(this.data3[index].runstate=='未被占用'){
                    this.$Modal.confirm({
                    title: '删除访问规则',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.delDsn.url, {id: name}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('数据库资源删除成功');
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '数据库资源删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
                }else{
                    this.$Notice.warning({title: '操作失败', desc: "此数据库资源被占用中" , duration: 5});
                }
            },
        }
    }
</script>

<style scoped>
</style>