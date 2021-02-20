<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                <table class="table" style="width:100%;border: 1px solid #dcdee2;font-size: 12px;color: #515a6e;">
                    <thead>
                    <tr id="first">
                        <th>业务/服务名</th>
                        <th>服务ID</th>
                        <th>服务类型</th>
                        <th>服务状态</th>
                        <th>主管部门</th>
                        <th>主管人</th>
                        <th>联系电话</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <!-- 隐藏的服务列表 -->
                    <tbody v-if="showData" v-for="(d,idx) in data1" :key="d.id" >
                        <tr class="gradeX">
                            <td @click="addPlatForm(idx)"><Icon :type="data1[idx].iconType" style="float: left;" />
                            <div style="text-align:left;margin-left:25%">
                                <img src="../../assets/images/service.png" style="width:24px;height:24px;margin-right:5px;" />{{d.taskname}}
                            </div>
                            </td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>{{d.department}}</td>
                            <td>{{d.master}}</td>
                            <td>{{d.contact}}</td>
                            <td>
                                <Dropdown trigger="click" class="nav-dropdown" transfer>
                                    <Button type="primary">配置管理&nbsp;<span class="caret"></span></Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem @click.native="addRoutes1(d.id,d.taskname)">
                                            <!--<db @click.native="byBusinessID(d.id)"></db>-->
                                            <div style="width:80px;height:30px;">数据库同步</div>
                                        </DropdownItem>
                                        <DropdownItem >
                                            <!-- 配置管理文件同步 <div @click.native="1">文件同步</div>-->
                                            <dbsync :taskId="filetaskId" @click.native="byBusinessID(d.id)"></dbsync>
                                            <!-- <div @click.native="tofiledsyn()" style="width:80px;height:30px;" >文件同步</div> -->
                                        </DropdownItem>
                                        <DropdownItem @click.native="updateBusiness(idx)">
                                            <div style="width:80px;height:30px;">修改业务</div>
                                        </DropdownItem>
                                        <DropdownItem @click.native="deleteBusiness(d.id)">
                                            <div style="width:80px;height:30px;">删除业务</div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr class="gradeX test" v-for="(i,j) in d.filesync"  :class="{'open-dropdown-menu':i.class_true}" :key="i.id" >
                            <td>{{i.servicename}}</td>
                            <td>{{i.out_task_id}}</td>
                            <td><img src="../../assets/images/file.png" style="width:24px;height:24px;margin-right:12px;" />{{"文件同步"}}</td>
                            <td :style="{'color':i.color}">{{i.runstate}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Dropdown transfer class="nav-dropdown">
                                    <Button icon="md-folder">配置管理&nbsp;<span class="caret"></span></Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem @click.native="startService(idx,j)">
                                            <div style="width:80px;height:30px;">服务启停</div>
                                        </DropdownItem>
                                        <DropdownItem>
                                            <dbsync_file_update :updateflietaskid = updateflietaskid @click.native="byFileIndex(idx,j)"></dbsync_file_update>
                                        </DropdownItem>
                                        <DropdownItem @click.native="deleteService(d.id,j,i)">
                                            <div style="width:80px;height:30px;">删除服务</div>
                                        </DropdownItem>
                                        <DropdownItem @click.native="showService(idx,j)">
                                            <div style="width:80px;height:30px;">查看文件配置</div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                        <tr class="gradeX test" v-for="(i,j1) in d.dbsync" :key="j1.id"  :class="{'open-dropdown-menu1':i.class_true}">
                            <td>{{i.maintask.servicename}}</td>
                            <td>{{i.maintask.oid}}</td>
                            <td><img src="../../assets/images/database.png" style="width:29px;height:29px;margin-right:1px;" />{{"数据库同步"}}</td>
                            <td :style="{'color':i.color}">{{i.maintask.runstate}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>
                                <Dropdown transfer class="nav-dropdown">
                                    <Button><img src="../../assets/images/database1.png" style="width:12px;height:12px;margin-right:5px;" />配置管理&nbsp;<span class="caret"></span></Button>
                                    <DropdownMenu slot="list">
                                        <DropdownItem @click.native="dbstartService(idx,j1,i,d)">
                                            <div>数据库同步服务启停</div>
                                        </DropdownItem>
                                        <DropdownItem @click.native="byDBIndex(idx,j1,d.id,d,i)">
                                            <div>修改数据库同步服务</div>
                                        </DropdownItem>
                                        <DropdownItem @click.native="deletedbService(d.id,j1,i)">
                                            <div>删除服务</div>
                                        </DropdownItem>
                                        <DropdownItem @click.native="showdbService(idx,j1,i,d)">
                                            <div>查看数据库同步配置</div>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </Dropdown>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-if="!showData">
                        <tr class="gradeX" style="height:40px;text-align:center;font-weight:bold;cursor:pointer">
                        <td @click="$router.push({ path: '/data/businessRegister'})" colspan="8">
                            暂无业务
                        </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <Modal
                title="数据库同步信息"
                v-model="modal12"
                :scrollable = true
                :transfer = false
                width=75%
                >
            <div style="padding 32px 16px !important;">
                <div style="padding 32px 16px;font-size:20px">基本信息:</div>
                <div style="height: 40px;padding 32px 16px !important;">
                    <span style="width: 25%;float: left;" v-for="(i,j) in data2" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</span>
                </div>

                <div style="font-size:20px;margin-top:18px;">源:</div>
                <div style="height: 40px;padding 32px 16px !important;">
                    <span style="width: 25%;float: left;" v-for="(i,j) in data4" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</span>
                </div>
                    <Table style="width: 100%;margin:10px 0;" :columns="columns8" border :data="historyData"></Table> 
                    <Page :current.sync="currentPage" :total="dataCount" show-elevator :page-size="pageSize" :show-total="true"  @on-change="changepage" @on-page-size-change="changepagesize"></Page>
            </div>
            <div slot="footer"></div>
        </Modal>

        <Modal
                title="文件同步信息"
                v-model="modal10"
                :scrollable = true
                width=80%
                >
            <div class="modal-body" style="padding 32px 16px;">
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#ffffff; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">基础配置</span>
                    <div style="margin:30px 20px;display:flex;flex-wrap: wrap;">
                        <div style="width: 30%;margin-left:20px;font-size:14px;" v-for="(i,j) in data2" v-show=i.val :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</div>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#ffffff; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">详细配置</span>
                    <div style="margin:30px 20px;display:flex;flex-wrap: wrap;">
                        <div style="width: 30%;margin-left:20px;font-size:14px;" v-for="(i,j) in data2second" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</div>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#ffffff; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">文件过滤</span>
                    <div style="margin:30px 20px;display:flex;flex-wrap: wrap;">
                        <div style="width: 30%;margin-left:20px;font-size:14px;" v-for="(i,j) in data2third" :key="j">{{i.name}}:&nbsp;&nbsp;&nbsp;&nbsp;{{i.val}}</div>
                    </div>
                </div>
            </div>    
            <div slot="footer"></div>
        </Modal>

        <Modal
                title="服务运行状态"
                :mask-closable=false cancel-text=""
                v-model="modal11" :ok-text="stateService" @on-ok="ok" :loading="modal11loading"
                class-name="vertical-center-modal" width="400">
            <p style="text-align: center;">服务运行状态</p>
            <p style="text-align: center;color:red;">*注：启停操作，请耐心等候</p>
            <p style="text-align: center;"><img src="../../assets/images/settingfile.png"></p>
            <p style="text-align: center;" v-for="(i,j) in data3" :key="j">状态:[<span :style="{'color':i.color}">{{ i.val }}</span>]</p>
        </Modal>

        <Modal
                title="服务运行状态"
                :mask-closable=false cancel-text=""
                v-model="modal15" :loading="modal15loading" :ok-text="stateService" @on-ok="dbok"
                class-name="vertical-center-modal" width="400">
            <p style="text-align: center;">服务运行状态</p>
            <p style="text-align: center;color:red;">*注：启停操作，请耐心等候</p>
            <p style="text-align: center;"><img src="../../assets/images/settingfile.png"></p>
            <p style="text-align: center;" v-for="(i,j) in data7" :key="j">状态:[<span :style="{'color':i.color}">{{ i.val }}</span>]</p>
            <!-- <div slot="footer"></div> -->
        </Modal>

        <Modal
                title="源表字段名"
                v-model="modal13"
                :scrollable = true
                width="70%"
                >
            <div style="height: 450px;">
                <Table border :columns="columns1"  :height="460" :data="data8"></Table>
            </div>
            <div slot="footer"></div>
        </Modal>

        <Modal
                title="目的表字段名"
                v-model="modal14"
                :scrollable = true
                >
            <div style="height: 450px;">
                <span style="width: 200px;float: left;" v-for="(i,j) in data6" :key="j">{{i}}</span>
            </div>
            <div slot="footer"></div>
        </Modal>


        <!-- 业务注册 -->
        <Drawer title="业务注册" v-model="register.show" width="1000">
            <Form ref="info_form" :rules="register.rules" :model="register.form"
                  :label-width="150">
                <FormItem label="业务名称" prop="taskname" style="margin-bottom: 15px;">
                    <Input v-model="register.form.taskname" />
                </FormItem>
                <FormItem label="主管部门" prop="department" style="margin-bottom: 15px;">
                    <Input v-model="register.form.department" />
                </FormItem>
                <FormItem label="主管人" prop="master" style="margin-bottom: 15px;">
                    <Input v-model="register.form.master" />
                </FormItem>
                <FormItem label="联系电话" prop="contact" style="margin-bottom: 15px;">
                    <Input v-model="register.form.contact" />
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addregisterForm">确认</Button>
                    <!--                    <Button style="margin-left: 8px" @click="restregisterForm">重置</Button>-->
                </FormItem>
            </Form>
        </Drawer>
        
    </div>
</template>

<script>
    // @ is an alias to /src
    import JkTabs from "@/components/JkTabs.vue";
    import dbsync from "./dbsync_file_edit2";
    import dbsync_file_update from "./dbsync_file_edit_update";
    // import dbsync_db_update from "./dbsync_db_edit_update";
    export default {
        components: {
            jk_tabs: JkTabs,dbsync,dbsync_file_update
        },
        inject: ["reload"],
        data() {
            return {
                //显示暂无数据
                showData:false,
                channel_transmission_mode:'',
                index: null,
                iconType: "ios-arrow-forward",
                // isServiceShow: false,
                links: [
                    {name: "业务/服务列表", to: "/data/test2"},
                    {name: "配置生效", to: "/data/serviceRestart"}
                ],
                register: {
                    show: false,
                    form: {
                        id: null,
                        taskname: null,
                        department: null,
                        master: null,
                        contact: null
                    },
                    rules: {
                        rules: {
                        taskname:[{ required: true , message: '请填写业务名称',},{  max:10, message: '长度不超过10', trigger: 'blur' },],
                        department:[{ required: true , message: '请填写主管部门',},{  max:10, message: '长度不超过10', trigger: 'blur' },],
                        master:[{ required: true , message: '请填写主管人',},{  max:10, message: '长度不超过10', trigger: 'blur' },],
                        contact:[{ required: true , message: '请填写联系电话',},{  max:15, message: '长度不超过15', trigger: 'blur' },],
                    }
                    }
                },
                file: {
                    form: {
                        tools:"",
                        runstate: "",
                        in_task_id: '',
                        servicename: '',
                        type: "",
                        username: '',
                        password: '',
                        ipaddress: '',
                        remoteport: '',
                        path: "",
                        level: "1",
                        iocharset: "",
                        operation: '',
                        time_interval: 3,
                        taskId: '',
                        workGroup:'',
                        smbVersion:"",
                        sftpKey:'',
                        syntime:'',
                        keyword_type:'',
                        filter_picture_keyword:'',
                        idbiz1:false,
                        idbiz2:false,
                        idbiz3:false,
                        idbiz4:false,
                        idbiz5:false,
                        idbiz6:false,
                        settimesyn:false,
                        filter_min_size:'',
                        filter_max_size:'',
                        filter_min_size_unit:"",
                        filter_max_size_unit:"",
                        suffix_type:'',
                        filter_keyword:'',
                        copy_move:'',
                        filter_after_opt_path:'',
                        filter_filename:'',
                        filename_type:'',
                        filter_suffix:'',
                        virus_opt:'',
                        filter_feature:'',
                        feature_type:'',
                        filter_after_opt:'',
                        file_root:"/",
                        // is_copy:'1',
                        is_psvn:'0',
                        data_timeout:1,
                        connection_timeout:30,
                        filter_size:'',
                        filter_size_type:'',
                        is_put_in_storage:"1",
                        ftp_sync_mode:"",
                        imgsync_enable:'no',
                        direction:"nt2t",
                    },
                    api: null
                },
                db: {
                    form: {},
                    api: null
                },
                size_show: null,
                data1: [],
                data2: [],
                data3: [],
                data4: [],
                data5: [],
                data6: [],
                data7: [],
                d:[],
                modal10: false,
                modal11: false,
                modal11loading:true,
                modal15loading:true,
                modal12: false,
                modal13:false,
                modal14:false,
                modal15:false,
                stateService: null,
                sourcedata:[],
                selectsourcedata:[],
                dataCount:0,
                ajaxHistoryData:[],
                pageSize:5,
                historyData: [],
                currentPage:1,
                columns1:[
                    {title: '序号', key: 'id', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: '源数据库表字段名', align: 'center', key: 'scolumnnamestring'},
                    {title: '数据类型', align: 'center', key: 'sdatatypestring'},
                    {title: '目的数据库表字段名', align: 'center', key: 'tcolumnnamestring'},
                    {title: '同步顺序', align: 'center', key: 'sort'},
                    {title: '标识列', align: 'center', key: 'index'},
                ],
                columns8: [
                    {title: '序号', key: 'id', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span',params.index + (this.currentPage-1)*this.pageSize + 1);
                        }
                    },
                    {title: '源表', align: 'center',key: 'stablename'},
                    {title: '目标表', align: 'center',key: 'ttablename'},
                    {title: '表字段数', align: 'center',key: 'length',width: 120,},
                    {title: '条件表达式', align: 'center', key: 'swhere'},
                    {title: '分解update', align: 'center', key: 'updatebreak'},
                    {title: '源端监控类型', align: 'center', key: 'striggerEventType'},
                    {title: '表结构', align: 'center', key: 'identical',width: 120,},  
                    {title: '表字段', align: 'center',key: 'detail',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        console.log(params)
                                        this.showdetail(params)
                                    }
                                }
                            }, '点击详情')
                        ]);
                        }
                    }
                ],
                data8: [],
                data2second:[],
                data2third:[],
                filetaskId:"",
                updateflietaskid:{},
                updateflieindex:"",
                addPlatFormindex:null,
            }
        },
        computed: {},
        created: function() {
            //拿业务列表
            this.showSyncTaskInfo()
            //拿数据库资源
            this.getInfo()
        },
        mounted: function() {
            
        },
        methods: {
            tofiledsyn(){
                this.$router.push({ path: '/data/filesyncadd',})
            },
            getInfo(){
                this.$https.fetchGet(this.$api.data.findDsnInfo.url).then((resp) => {
                    
                    if (resp.data.status == 200) {
                        this.sourcedata = resp.data.data
                        console.log(this.sourcedata)
                    } else {
                        this.$Message.info('获取数据库资源失败');
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
                
            },
            // 跳转到数据库同步页面
            addRoutes1 (id,taskname) {
                this.$router.push({ path: '/data/dbsync', query: { id:id ,taskname:taskname} })
            },
            addPlatForm(idx) {
                // console.log(idx,this.data1[idx].filesync,'this.data1[idx].filesync')
                if(Object.keys(this.data1[idx].filesync).length==0 && Object.keys(this.data1[idx].dbsync).length==0){
                    this.$Message.info('此业务并没添加任何任务');
                    return
                }
                for (let i in this.data1[idx].filesync) {
                    // this.$forceUpdate();
                    if (this.data1[idx].filesync[i].class_true) {
                        this.$set(this.data1[idx].filesync[i],"class_true",false);
                        this.$set(this.data1[idx],"iconType","ios-arrow-forward");
                    }else {
                        this.$set(this.data1[idx].filesync[i],"class_true",true);
                        this.$set(this.data1[idx],"iconType","ios-arrow-down");
                    }
                }
                for (let i in this.data1[idx].dbsync) {
                    // this.$forceUpdate();
                    if (this.data1[idx].dbsync[i].class_true) {
                        this.$set(this.data1[idx].dbsync[i],"class_true",false);
                        this.$set(this.data1[idx],"iconType","ios-arrow-forward");
                    }else {
                        this.$set(this.data1[idx].dbsync[i],"class_true",true);
                        this.$set(this.data1[idx],"iconType","ios-arrow-down");
                    }
                }
                this.$storage.setStorage("addPlatFormindex", idx);
                if(this.data1[idx].iconType == "ios-arrow-forward"){
                    this.$storage.removeStorage("addPlatFormindex")
                }
                this.addPlatFormindex = this.$storage.getStorage("addPlatFormindex")
            },
            byBusinessID(id) {
                console.log("set")
                this.$storage.setStorage("businessID", id);
                this.filetaskId = id
                console.log(this.filetaskId,"set")
            },
            byFileIndex(idx,index) {
                console.log("set")
                this.$storage.setStorage("businessIndex", idx);
                this.$storage.setStorage("FileIndex", index);
            },
            byDBIndex(idx,index,id,d,i) {
                if(i.maintask.runstate == "run" || i.maintask.runstate == "启用"){
                    this.$Notice.error({title: '启用中无法修改', duration: 5});
                    return
                }
                // console.log(idx,index,id,d.dbsync[index].subtask[0].ssyncdsn)
                let str = d.dbsync[index].subtask[0].ssyncdsn
                index = index.toString()
                // JSON.stringify(this.data1[idx].dbsync[index])
                this.$router.push({ path: '/data/dbsync', query: { taskId:index,id:id,ssyncdsn:str,taskname:d.taskname} })
            },
            gotolink(){
                //点击跳转至上次浏览页面
                // this.$router.go(-1)
                //指定跳转地址
                // this.$router.replace('/login')
                this.$router.replace('/network/channel');
            },
            //查看文件同步详情
            showService(idx,index) {
                //基本配置
                this.data2 = [
                    {name: "外端服务ID",val: this.data1[idx].filesync[index].out_task_id},
                    {name: "服务名称",val: this.data1[idx].filesync[index].servicename},
                    ];
                if(this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2.push({name: "根目录",val: this.data1[idx].filesync[index].file_root},
                    {name: "用户名",val: this.data1[idx].filesync[index].username},
                    {name: "密码",val: this.data1[idx].filesync[index].password},
                    {name: "IP地址",val: this.data1[idx].filesync[index].ipaddress},
                    {name: "端口",val: this.data1[idx].filesync[index].remoteport},)
                }else{
                    this.data2.push({name: "目录",val: this.data1[idx].filesync[index].path})
                }
                if(this.data1[idx].filesync[index].type == "ftp"){
                    this.data2.push({name: "资源类型",val: "远程ftp"},)
                }
                if(this.data1[idx].filesync[index].type == "smb"){
                    this.data2.push({name: "资源类型",val: "远程smb"},)
                }
                if(this.data1[idx].filesync[index].type == "sftp"){
                    this.data2.push({name: "资源类型",val: "远程sftp"},)
                }
                if(this.data1[idx].filesync[index].type == "nfs"){
                    this.data2.push({name: "资源类型",val: "远程nfs"},)
                }
                if(this.data1[idx].filesync[index].type == "localftp"){
                    this.data2.push({name: "资源类型",val: "本地ftp"},)
                }
                if(this.data1[idx].filesync[index].type == "localsmb"){
                    this.data2.push({name: "资源类型",val: "本地smb"},)
                }
                if(this.data1[idx].filesync[index].type == "localsftp"){
                    this.data2.push({name: "资源类型",val: "本地sftp"},)
                }   
                if(this.data1[idx].filesync[index].type == "localnfs"){
                    this.data2.push({name: "资源类型",val: "本地nfs"},)
                }
                //详细配置模块

                if(this.data1[idx].filesync[index].channel_transmission_mode == "common"){
                    this.channel_transmission_mode = "常规"
                }else{
                    this.channel_transmission_mode = "高速"
                }
                this.data2second = [
                    {name: "通道传输模式",val: this.channel_transmission_mode},
                    ];
                if(this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb") && this.data1[idx].filesync[index].channel_transmission_mode == "common"){
                    this.data2second.push({name: "等级",val: this.data1[idx].filesync[index].level})
                }
                if(this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2second.push({name: "线程数",val: this.data1[idx].filesync[index].tools},
                    {name: "间隔",val: this.data1[idx].filesync[index].time_interval+"秒"},
                    {name: "编码",val: this.data1[idx].filesync[index].iocharset}   )
                }
                let data_timeout = this.data1[idx].filesync[index].data_timeout
                let connection_timeout = this.data1[idx].filesync[index].connection_timeout
                if(this.data1[idx].filesync[index].type == "ftp"){
                    this.data2second.push({name: "传输超时时间",val: data_timeout/1000+"秒"},
                    {name: "连接超时时间",val: connection_timeout/1000+"秒"},)
                }
                if(this.data1[idx].filesync[index].is_psvn == "0" && this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2second.push({name: "传输模式",val: "被动模式"})
                }
                if(this.data1[idx].filesync[index].is_psvn == "1" && this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2second.push({name: "传输模式",val: "主动模式"})
                }
                if(this.data1[idx].filesync[index].is_put_in_storage == "1" && this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2second.push({name: "异常日志是否入库",val: "否"})
                }
                if(this.data1[idx].filesync[index].is_put_in_storage == "0" && this.data1[idx].filesync[index].type == ("ftp"||"sftp"||"nfs"||"smb")){
                    this.data2second.push({name: "异常日志是否入库",val: "是"})
                }
                if(this.data1[idx].filesync[index].operation == "del"){
                    this.data2second.push({name: "文件同步后操作",val: "剪切"})
                }
                if(this.data1[idx].filesync[index].operation == "copy"){
                    this.data2second.push({name: "文件同步后操作",val: "复制"})
                }
                

                //文件过滤模块
                this.data2third = [];
                // this.data2third.push({name: "test",val: this.data1[idx].filesync[index].ftp_sync_mode})
                    if(this.data1[idx].filesync[index].filter_keyword || this.data1[idx].filesync[index].filter_picture_keyword != ""){
                        this.data2third.push({name: "内容关键字",val: this.data1[idx].filesync[index].filter_keyword})
                        this.data2third.push({name: "图像内容关键字",val: this.data1[idx].filesync[index].filter_picture_keyword})
                        this.data2third.push({name: "内容关键字过滤方式",val: this.data1[idx].filesync[index].keyword_type})
                    }
                    if(this.data1[idx].filesync[index].virus_opt != ""){
                        if(this.data1[idx].filesync[index].virus_opt == "move"){
                            this.data2third.push({name: "病毒查杀操作模式",val: "隔离"})
                        }else if(this.data1[idx].filesync[index].virus_opt == "Remove"){
                            this.data2third.push({name: "病毒查杀操作模式",val: "删除"})
                        }
                    }
                    if(this.data1[idx].filesync[index].filter_min_size || this.data1[idx].filesync[index].filter_max_size != ""){
                        if(filesync[index].filter_min_size_unit == '1'){
                            let minsize = 'B'
                        }else if(filesync[index].filter_min_size_unit == '1000'){
                            let minsize = 'KB'
                        }else if(filesync[index].filter_min_size_unit == '1000000'){
                            let minsize = 'MB'
                        }else{
                            let minsize = 'GB'
                        }
                        if(filesync[index].filter_max_size_unit == '1'){
                            let maxsize = 'B'
                        }else if(filesync[index].filter_max_size_unit == '1000'){
                            let maxsize = 'KB'
                        }else if(filesync[index].filter_max_size_unit == '1000000'){
                            let maxsize = 'MB'
                        }else{
                            let maxsize = 'GB'
                        }
                        this.data2third.push({name: "文件最小值过滤",
                        val: this.data1[idx].filesync[index].filter_min_size+minsize})
                        this.data2third.push({name: "文件最大值过滤",
                        val: this.data1[idx].filesync[index].filter_max_size+maxsize})
                        // this.data2third.push({name: "文件大小过滤类型",val: this.data1[idx].filesync[index].filter_size_type})
                    }
                    if(this.data1[idx].filesync[index].filter_filename != ""){
                        this.data2third.push({name: "文件名过滤",val: this.data1[idx].filesync[index].filter_filename})
                        this.data2third.push({name: "文件名过滤方式",val: this.data1[idx].filesync[index].filename_type})
                    }
                    if(this.data1[idx].filesync[index].filter_suffix != ""){
                        this.data2third.push({name: "后缀过滤",val: this.data1[idx].filesync[index].filter_suffix})
                        this.data2third.push({name: "后缀过滤方式",val: this.data1[idx].filesync[index].suffix_type})
                    }
                    // if(this.data1[idx].filesync[index].syntime == undefined){
                    //     this.data2third.push({name: "同步时间段",val: this.data1[idx].filesync[index].syntime})  
                    // }
                    if(this.data1[idx].filesync[index].filter_feature != ""){
                        this.data2third.push({name: "文件特征过滤",val: this.data1[idx].filesync[index].filter_feature})
                        this.data2third.push({name: "文件特征过滤方式",val: this.data1[idx].filesync[index].feature_type})
                    }
                    if(this.data2third.length !=0){
                        if(this.data1[idx].filesync[index].filter_after_opt == "0"){
                            this.data2third.push({name: "敏感文件操作",val: "保留"})
                        if(this.data1[idx].filesync[index].copy_move == "1")
                            this.data2third.push({name: "敏感文件复制到平台",val:"复制"})
                        if(this.data1[idx].filesync[index].copy_move == "0")
                            this.data2third.push({name: "敏感文件复制到平台",val:"不复制"})
                        }
                        if(this.data1[idx].filesync[index].filter_after_opt == "2"){
                            this.data2third.push({name: "敏感文件操作",val: "转移"})
                            this.data2third.push({name: "敏感文件转移路径",val: this.data1[idx].filesync[index].filter_after_opt_path})
                        }
                        if(this.data1[idx].filesync[index].filter_after_opt == "1"){
                            this.data2third.push({name: "敏感文件操作",val: "删除"})
                        }
                    }else{
                        this.data2third.push({name: "暂无过滤"})
                    }
                    this.data2third.forEach(element => {
                        if(element.val == "blacklist"){
                            element.val = "黑名单"
                        }
                        if(element.val == "whitelist"){
                            element.val = "白名单"
                        }
                    })
                this.modal10 = true;
            },

            showdbService(idx,index,i,d) {
                console.log(idx,"idx")
                console.log(index,"index")
                console.log(i,"i")
                console.log(d.id,"d.id")
                this.d = d
                // console.log(this.data1[idx].dbsync[index].subtask[0].ssyncdsn)
                console.log(this.data1[idx].dbsync[index],'this.data1[idx].dbsync[index]')
                let val = this.data1[idx].dbsync[index].subtask[0].ssyncdsn
                for(let i in this.sourcedata){
                    console.log(this.sourcedata[i].sourcealias)
                    // console.log("1",val)
                    if(this.sourcedata[i].sourcealias == val){
                        this.selectsourcedata = []
                        this.selectsourcedata = this.sourcedata[i]
                    }
                }
                let str1 = this.data1[idx].dbsync[index].maintask.cronexpression
                let num1 = str1.replace(/[^\d]/g,' ');
                // console.log(this.data1[idx].dbsync[index].maintask.cronexpression,"maintask")
                let check = this.data1[idx].dbsync[index].maintask.synctype
                let synctype = true
                if(check == '1'){
                    synctype = '触发器增量同步'
                }else if(check == '4'){
                    synctype = '触发器单表同步'
                }else{
                    synctype = '普通全表'
                }
                let taskdescribe = true
                if(this.data1[idx].dbsync[index].maintask.taskdescribe == ''){
                    taskdescribe = '无'
                }else{
                    taskdescribe = this.data1[idx].dbsync[index].maintask.taskdescribe
                }
                console.log(this.data1[idx].dbsync[index].maintask)
                this.data2 = [
                    {name: "同步方法",val: synctype},
                    {name: "服务ID",val: this.data1[idx].dbsync[index].maintask.oid},
                    {name: "服务名称",val: this.data1[idx].dbsync[index].maintask.servicename},
                    {name: "描述",val: taskdescribe},
                    {name: "时间间隔(秒)",val: num1},
                    {name: "是否启用连接池",val: this.data1[idx].dbsync[index].maintask.enabledbpool?"是":"否"},
                    {name: "是否随系统自启动",val: this.data1[idx].dbsync[index].maintask.autorun?"是":"否"},
                    // {name: "停止时间",val: this.data1[idx].dbsync[index].maintask.stoptime}
                    ];
                    
                this.data4 = [
                    {name: "使用资源",val: this.data1[idx].dbsync[index].subtask[0].ssyncdsn},
                    {name: "数据库类型",val: this.selectsourcedata.dbtype},
                    {name: "IP地址",val: this.selectsourcedata.dbip},
                    {name: "端口",val: this.selectsourcedata.dbport},
                    {name: "业务账号用户名",val: this.selectsourcedata.initusername},
                    {name: "同步账号用户名",val: this.selectsourcedata.username},
                    {name: "数据库名",val: this.data1[idx].dbsync[index].subtask[0].stablename}];
                console.log(this.selectsourcedata,"data4")
                let data=i.subtask
                //         var data=[
                //     {name:'领导',age:18},
                //     {name:'领导',age:19},
                //     {name:'领导',age:20},
                //     {name:'小兵',age:20},
                //     {name:'小兵',age:22},
                //     {name:'cto',age:15},
                // ];
                // console.log("data",data)
                // let json={};
                //     for(var i in data){
                //         var node=data[i];
                //         if(json[node.stablename]){
                //             json[node.stablename].push(node);
                //         }else {
                //             json[node.stablename]=[node];
                //         }
                //     }
                
                this.data5 = data
                this.d =  this.data5
                let obj = {}
                let data1 = []
                
                for(let i in this.data5){
                    obj = {
                        stablename:'',
                        ttablename:'',
                        length:0,
                        idsdatatypestringlen:'',
                        detail:'点击详情',
                        identical:'',
                        swhere:'',
                        updatebreak:'',
                        striggerEventType:'',
                    }
                    console.log(this.data5[i],'data5')
                    if(this.data5[i].swhere=='' || this.data5[i].swhere==undefined || this.data5[i].swhere==null){
                        obj.swhere = '无'
                    }else{
                        obj.swhere = this.data5[i].swhere
                    }
                    if(this.data5[i].identical==true){
                        obj.identical = '一致'
                    }else{
                        obj.identical = '不一致'
                    }
                    if(this.data5[i].updatebreak=='true'){
                        obj.updatebreak = '是'
                    }else{
                        obj.updatebreak = '否'
                    }
                    if(synctype == '普通全表'){
                        obj.updatebreak = '否'
                    }
                    if(this.data5[i].striggerEventType == '' || this.data1[idx].dbsync[index].maintask.synctype=='2'){
                        obj.striggerEventType = '无'
                    }else{
                        let striggerEventType = this.data5[i].striggerEventType.split("|")
                        for(let j in striggerEventType){
                            if(striggerEventType[j] == 'INSERT'){
                                obj.striggerEventType = obj.striggerEventType +'|'+'插入'
                            }
                            if(striggerEventType[j] == 'UPDATE'){
                                obj.striggerEventType = obj.striggerEventType +'|'+'修改'
                            }
                            if(striggerEventType[j] == 'DELETE'){
                                obj.striggerEventType = obj.striggerEventType +'|'+'删除'
                            }
                        }                       
                        obj.striggerEventType = obj.striggerEventType.substr(1)
                    }
                    obj.stablename = this.data5[i].stablename
                    obj.ttablename = this.data5[i].ttablename
                    this.data5[i].length = (this.data5[i].scolumnnamestring.split("|").length)
                    obj.length = this.data5[i].length
                    data1.push(obj)
                }
                this.data5 = []
                this.data5 = data1
                this.historyData =this.data5
                this.handleListApproveHistory()
                console.log("data5",this.data5)
                this.modal12 = true;
                this.currentPage = 1
            },
            showSyncTaskInfo(){
                this.$https.fetchGet(this.$api.data.syncTaskInfo.url).then((resp) => {
                    // console.log(resp.data.data[0].dbsync.NUM1.maintask.oid);
                    this.data1 = resp.data.data;
                    if(this.data1.length == 0){
                        this.showData = false
                    }else{
                        this.showData = true
                    }
                    for (let i in this.data1) {
                        this.$set(this.data1[i],"iconType","ios-arrow-forward");
                        for (let j in this.data1[i].filesync) {
                            // this.data1[i].filesync[j].class_true = false;
                            this.$set(this.data1[i].filesync[j],"class_true",false);
                            if (this.data1[i].filesync[j].runstate == "stop" || this.data1[i].filesync[j].runstate == "禁用") {
                                this.data1[i].filesync[j].runstate = "禁用";
                                this.data1[i].filesync[j].color = "red";
                            }else {
                                this.data1[i].filesync[j].runstate = "启用";
                                this.data1[i].filesync[j].color = "green";
                            }
                        }

                        for (let j in this.data1[i].dbsync) {
                            this.$set(this.data1[i].dbsync[j],"class_true",false);
                            if (this.data1[i].dbsync[j].maintask.runstate == "stop" || this.data1[i].dbsync[j].maintask.runstate == "禁用") {
                                this.data1[i].dbsync[j].maintask.runstate = "禁用";
                                this.data1[i].dbsync[j].color = "red"; 
                            }else {
                                this.data1[i].dbsync[j].maintask.runstate = "启用";
                                this.data1[i].dbsync[j].color = "green";
                            }
                        }
                    }
                    this.addPlatFormindex = this.$storage.getStorage("addPlatFormindex")
                    console.log(typeof(this.addPlatFormindex),'typeof')
                    
                    console.log(this.addPlatFormindex,'this.addPlatFormindex')
                    if(this.addPlatFormindex){
                        this.addPlatFormindex = this.addPlatFormindex.replace(/\"/g,'')
                        this.addPlatForm(this.addPlatFormindex)
                    }
                    // this.$storage.removeStorage("addPlatFormindex")
                }).catch(err => {
                    console.log(err)
                });
            },
            updateBusiness(index) {
                this.register.show = true;
                this.register.form.id = this.data1[index].id;
                this.register.form.taskname = this.data1[index].taskname;
                this.register.form.department = this.data1[index].department;
                this.register.form.master = this.data1[index].master;
                this.register.form.contact = this.data1[index].contact;
            },
            addregisterForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.data.updateSyncTask.url, this.register.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '业务修改成功', desc: "正在刷新界面", duration: 5});
                            setTimeout(() => {
                                document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                    this.reload()
                                }, 250);
                        } else
                            this.$Notice.error({title: '业务修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    });
                });
            },
            deleteBusiness(index) {
                this.$Modal.confirm({
                    title: '删除业务',
                    content: '<p>当前操作将会导致该业务被删除，请确认删除</p>',
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.delSyncTask.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('业务删除成功');
                                setTimeout(() => {
                                    document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                    this.reload()
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '业务删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                            this.$Modal.remove();
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        })
                    }
                });
            },
            deleteService(idx,index,i) {
                if(i.runstate == "启用") {
                    this.$Notice.error({title: '启用中无法修改', duration: 5});
                    return
                }
                this.$Modal.confirm({
                    title: '删除服务',
                    content: '<p>当前操作将会导致该服务被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.delFileTask.url, {taskId: idx,id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Message.info('服务删除成功');
                                setTimeout(() => {
                                    document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                    this.reload()
                                    this.$Modal.remove();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                
                                this.$Notice.error({title: '服务删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                            console.log(err)
                        })
                    }
                });
            },
            startService(idx,index) {
                this.file.form = _.cloneDeep(this.data1[idx].filesync[index])
                this.data3 = [{color: this.data1[idx].filesync[index].color, val: this.data1[idx].filesync[index].runstate, idx: idx, index: index}];
                if(this.data1[idx].filesync[index].runstate == "禁用" || this.data1[idx].filesync[index].runstate == "stop") {
                    this.stateService = "启用";
                    this.file.form.runstate = "run";
                    this.file.api = this.$api.data.startFileTask.url;
                }
                else {
                    this.stateService = "禁用";
                    this.file.form.runstate = "stop";
                    this.file.api = this.$api.data.stopFileTask.url;
                }

                this.file.form.id = this.data1[idx].filesync[index].id;
                this.file.form.out_task_id = this.data1[idx].filesync[index].out_task_id;
                this.file.form.servicename = this.data1[idx].filesync[index].servicename;
                this.file.form.type = this.data1[idx].filesync[index].type;
                this.file.form.username = this.data1[idx].filesync[index].username;
                this.file.form.password = this.data1[idx].filesync[index].password;
                this.file.form.ipaddress = this.data1[idx].filesync[index].ipaddress;
                this.file.form.remoteport = this.data1[idx].filesync[index].remoteport;
                this.file.form.path = this.data1[idx].filesync[index].path;
                this.file.form.level = this.data1[idx].filesync[index].level;
                this.file.form.iocharset = this.data1[idx].filesync[index].iocharset;
                this.file.form.operation = this.data1[idx].filesync[index].operation;
                this.file.form.time_interval = this.data1[idx].filesync[index].time_interval;
                this.file.form.taskId = this.data1[idx].id;
                this.modal11 = true;
            },
            dbstartService(idx,index,i,d){
                this.data7 = [{color: this.data1[idx].dbsync[index].color, val: this.data1[idx].dbsync[index].maintask.runstate, idx: idx, index: index}];
                this.db.form = _.cloneDeep(this.data1[idx].dbsync[index])
                this.db.form.runstate = this.data1[idx].dbsync[index].runstate
                this.$set(this.db.form,"runstate",this.data1[idx].dbsync[index].runstate)
                if(this.data7[0].val == "禁用" || this.data7[0].val == "stop") {
                    this.stateService = "启用";
                    this.db.form.maintask.runstate = "run";
                    this.db.api = this.$api.data.startdbTask.url.toString();
                }
                if(this.data7[0].val == "启用" ||this.data7[0].val == "run") {
                    this.stateService = "禁用";
                    this.db.form.maintask.runstate = "stop";
                    this.db.api = this.$api.data.stopdbTask.url.toString();
                }
                this.db.form.taskId = d.id
                this.modal15 = true;
            },
            //文件同步服务启停
            ok() {
                this.modal11 = true
                let config = {  
                    timeout: 300 * 1000,
                }
                console.log(this.file.form,'this.file.form')
                this.$https.fetchPost(this.$api.data.loadServe.url,{},config).then((resp) => {
                    }).catch((error) =>{
                });
                
                this.$https.fetchPost(this.file.api, this.file.form,config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '文件同步启停成功', desc: "正在刷新界面", duration: 5});
                        setTimeout(() => {
                            document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                            this.reload()
                            // //拿业务列表
                            // this.showSyncTaskInfo()
                            // //拿数据库资源
                            // this.getInfo()
                            // this.modal11 = false 
                        }, 250);
                    } else
                    {
                        this.$Notice.error({title: '文件同步启停失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }
                    this.modal11loading = false  
                     
                }).catch(err => {
                    this.modal11loading = false  
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                });
            },
            dbok() {
                console.log(this.db.api,"1")
                let config = {  
                    timeout: 300 * 1000,
                }
                this.$https.fetchPost(this.$api.data.loadServe.url,{},config).then((resp) => {
                    }).catch((error) =>{
                });
                this.$https.fetchPost(this.db.api, this.db.form,config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '数据库同步启停成功', desc: "正在刷新界面", duration: 5});
                        setTimeout(() => {
                                document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                    this.reload()
                                }, 250);
                    } else{
                        this.$Notice.error({title: '数据库同步启停失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }
                    this.modal15loading = false    
                }).catch(err => {
                    this.modal15loading = false  
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                });
            },
            deletedbService(taskId1,id1,i) {
                if(i.maintask.runstate == "run" || i.maintask.runstate == "启用"){
                        this.$Notice.error({title: '启用中无法修改', duration: 5});
                        return
                }
                let obj = {taskId:taskId1,id:id1}
                this.$Modal.confirm({
                    title: '删除服务',
                    content: '<p>当前操作将会导致该服务被删除，请确认删除</p>',
                    onOk: () => {
                        this.$https.fetchGet(this.$api.data.deldbsycn.url, obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Modal.remove();
                                this.$Notice.success({title: '删除数据库同步成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '服务删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                                
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            showdetail(index){
                let d = this.d
                this.data6=[]
                this.modal13 = true
                console.log(d[index.index],'d[index.index]')
                let arr = []
                arr.push(d[index.index].scolumnnamestring.split("|"))
                let arr1 = []
                arr1.push(d[index.index].sdatatypestring.split("|"))
                let sortarr = d[index.index].sort.split("|")
                sortarr = sortarr.filter(function (el) {
                    return el != "";
                });
                let indexarr = d[index.index].index

                arr = arr[0]
                arr1 = arr1[0]
                this.data8 = []
                console.log(indexarr[4],'indexarr')
                for(let i =0;i<arr.length;i++){
                    let obj = {
                        scolumnnamestring:'',
                        sdatatypestring:'',
                        tcolumnnamestring:'',
                        sort:'',
                        index:'否',
                    }
                    obj.index = indexarr[i]!=undefined?"是":'否'
                    obj.scolumnnamestring = arr[i]
                    obj.sdatatypestring = arr1[i]
                    obj.tcolumnnamestring = arr[i]
                    obj.sort = sortarr[i]
                    this.data8.push(obj)
                }
            },
            showdetail1(d){
                this.data6=[]
                this.modal14 = true
                for(let i in d){
                    this.data6=d.tcolumnnamestring.split("|")
                } 
            },
            changepage(index){
                this.currentPage = index
                var _start = ( index - 1 ) * this.pageSize;
                var _end = index * this.pageSize;
                this.historyData = this.ajaxHistoryData.slice(_start,_end);              
            },
            changepagesize(pageSize){
                this.currentPage = pageSize;
                this.handleListApproveHistory()
            },
            handleListApproveHistory(){
                this.ajaxHistoryData = this.data5
                this.dataCount = this.data5.length;
                // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
                if(this.data5.length < this.pageSize){
                    this.historyData = this.ajaxHistoryData;
                }else{
                    this.historyData = this.ajaxHistoryData.slice(0,this.pageSize);
                }
            },
        }
    };
</script>
<style scoped lang="less">
    .test {
        display: none;
    }
    .test1 {
        height: 20px;
        overflow:auto;
    }
    .open-dropdown-menu {
        display: table-row;
    }
    .open-dropdown-menu1 {
        display: table-row;
    }
    #first th {
        border-right: 1px solid #e8eaec;
        background-color: #f8f8f9;
    }
    td {
        border-right: 1px solid #e8eaec;
    }
    // /deep/.ivu-modal {
    //     top:10px !important;  
    // }
</style>