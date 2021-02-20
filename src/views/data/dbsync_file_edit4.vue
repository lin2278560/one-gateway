<template>
    <div>
        <Button type="default" @click="showAddDrawer">
            添加文件同步服务
        </Button>
        <Drawer title="文件同步目的端" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150" class="aa">
                <FormItem label="内端服务id" prop="idbiz" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.inId"/>
                </FormItem>
                <FormItem label="服务名称" prop="idbiz" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.aa"/>
                </FormItem>

                <div style="border: 1px solid gray;width: 95%;float: left;">
                    <FormItem label="类型" prop="idplatform" style="margin-bottom: 0px;">
                        <Select v-model="platForm.form.bb">
                            <Option v-for="item in resourceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="本地目录" prop="idplatform" style="margin-bottom: 0px;">
                        <Select v-model="platForm.form.cc">
                            <Option v-for="item in directoryList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="编码" prop="idplatform" style="margin-bottom: 0px;">
                        <Select v-model="platForm.form.conding">
                            <Option v-for="item in codingList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="目录端冲突检测" prop="idplatform" style="margin-bottom: 0px;">
                        <Select v-model="platForm.form.dd">
                            <Option v-for="item in ddList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                </div>
                <div style="width: 5%;float: left;">
                    <Button type="primary" class="addbto" @click="addbto">添加</Button>
                </div>

                <div v-for="(d,index) in counter" :key="index">
                    <div style="border: 1px solid gray;width: 95%;float: left;">
                        <FormItem label="类型" prop="idplatform" style="margin-bottom: 0px;">
                            <Select v-model="platForm.form.bb">
                                <Option v-for="item in resourceList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="本地目录" prop="idplatform" style="margin-bottom: 0px;">
                            <Select v-model="platForm.form.cc">
                                <Option v-for="item in directoryList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="编码" prop="idplatform" style="margin-bottom: 0px;">
                            <Select v-model="platForm.form.conding">
                                <Option v-for="item in codingList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="目录端冲突检测" prop="idplatform" style="margin-bottom: 0px;">
                            <Select v-model="platForm.form.dd">
                                <Option v-for="item in ddList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                    </div>
                    <div style="width: 5%;float: left;">
                        <Button type="primary" class="delbto" @click="delbto(index)">删除</Button>
                    </div>
                </div>



                <!--                <FormItem label="外端服务id" prop="idplatform">-->
                <!--                    <Select v-model="platForm.form.idplatform">-->
                <!--                        <Option v-for="item in idplatformList" :value="item.idplatform" :key="item.idplatform">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="资源类型" prop="idinnerlink">-->
                <!--                    <Select v-model="platForm.form.idinnerlink">-->
                <!--                        <Option v-for="item in innerlinkList" :value="item.idconnlink" :key="item.idconnlink">{{ item.linkname }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="目录" prop="idbiz">-->
                <!--                    <Input v-model="platForm.form.idbiz"/>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="业务主管部门名称" prop="unitname">-->
                <!--                    <Input v-model="platForm.form.unitname"/>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="业务应用系统名称" prop="systemname">-->
                <!--                    <Input v-model="platForm.form.systemname"/>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="业务类型" prop="projecttype">-->
                <!--                    <Select v-model="platForm.form.projecttype">-->
                <!--                        <Option v-for="item in projecttypeList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->


                <!--                <FormItem label="业务操作方式" prop="projectopt">-->
                <!--                    <Select v-model="platForm.form.projectopt">-->
                <!--                        <Option v-for="item in projectoptList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="业务主管部门主管人姓名" prop="leadername">-->
                <!--                    <Input v-model="platForm.form.leadername"/>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="业务主管部门主管人公安网Email" prop="leaderemail">-->
                <!--                    <Input v-model="platForm.form.leaderemail"/>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="业务主管部门主管人其他联系方式" prop="leaderothercontact">-->
                <!--                    <Input v-model="platForm.form.leaderothercontact"/>-->
                <!--                </FormItem>-->


                <!--                <FormItem label="审批部门名称" prop="passunit">-->
                <!--                    <Input v-model="platForm.form.passunit"/>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="审批时间" prop="passtime">-->
                <!--                    <DatePicker type="date" @on-change="getPassTime"-->
                <!--                                v-model="platForm.form.passtime" style="width: 200px"></DatePicker>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="审批批号" prop="passnumber">-->
                <!--                    <Input v-model="platForm.form.passnumber"/>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="审批材料" prop="passFile">-->
                <!--                    <Upload  :before-upload="handlePassfile" :action="this.$api.up.cPlatform.url">-->
                <!--                        <i-button icon="ios-cloud-upload-outline">上传文件</i-button>-->
                <!--                    </Upload>-->
                <!--                    <span>{{ passFileName }}</span>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="注册时间" prop="regtime">-->
                <!--                    <DatePicker type="date" @on-change="getRegTime"-->
                <!--                                v-model="platForm.form.regtime" style="width: 200px"></DatePicker>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="数据交换方向" prop="transferdirect">-->
                <!--                    <Select v-model="platForm.form.transferdirect">-->
                <!--                        <Option v-for="item in transferdirectList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="基本协议" prop="baseprotocol">-->
                <!--                    <Select v-model="platForm.form.baseprotocol">-->
                <!--                        <Option v-for="item in baseprotocolList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="是否有时性要求" prop="ifrealtime">-->
                <!--                    <Select v-model="platForm.form.ifrealtime">-->
                <!--                        <Option v-for="item in flagList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <!--                <FormItem label="是否已备案" prop="ifregist">-->
                <!--                    <Select v-model="platForm.form.ifregist">-->
                <!--                        <Option v-for="item in flagList" :value="item.title" :key="item.title">{{ item.name }}</Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->


                <!--                <FormItem label="数据估算日交换" prop="propamount">-->
                <!--                    <Input v-model="platForm.form.propamount"/>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="备案单位名称" prop="registunitname">-->
                <!--                    <Input v-model="platForm.form.registunitname"/>-->
                <!--                </FormItem>-->

                <!--                <FormItem label="具体接入拓扑图" prop="linkimageFile">-->

                <!--                    <Upload   :before-upload="handleLinkimage"  :action="this.$api.up.cPlatform.url">-->
                <!--                        <i-button icon="ios-cloud-upload-outline">上传图片</i-button>-->
                <!--                    </Upload>-->
                <!--                    <span>{{ linkimageFileName}}</span>-->
                <!--                </FormItem>-->

                <div style="width: 100%;float: left;">
                    <FormItem>
                        <Button type="primary" @click="addPlatForm">确认</Button>
                        <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                    </FormItem>
                </div>

            </Form>
        </Drawer>
    </div>
</template>

<script>

    export default {
        components: {},
        data() {
            return {
                counter:[],
                platForm: {
                    show: false,
                    form: {
                        inId:"请与外端服务id号一致",
                        conding:"请与外端编码保持一致",
                        idplatform:null,
                        idinnerlink:null,
                        idbiz:null,
                        unitname:null,
                        systemname:null,
                        projecttype:"00000",
                        projectopt:"0000",
                        leadername:null,

                        leaderphone:null,
                        leaderemail:null,
                        leaderothercontact:null,
                        passunit:null,
                        passtime:null,
                        passnumber:null,
                        passFile:null,
                        regtime:null,
                        transferdirect:"1",
                        baseprotocol:"0001",
                        ifrealtime:"1",
                        propamount:null,
                        ifregist:"1",
                        registunitname:null,
                        linkimageFile:null,
                    },
                    // rules: {
                    //
                    //     idplatform:{
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请选择平台标志'
                    //     },
                    //     idinnerlink:{
                    //         required: true,
                    //         message: '请选择链路标志'
                    //     },
                    //     idbiz: [{
                    //         required: true,
                    //         message:"请输入标识"
                    //     },{
                    //         trigger: 'change',
                    //         type: 'number',
                    //         message: '请输入有效整数',
                    //         transform(value) {
                    //             return Number(value);
                    //         }
                    //     }],
                    //     unitname: {
                    //         required: true, trigger: 'change', min: 1, max: 50, message: '请输入接入部门名称'
                    //     },
                    //     systemname: {
                    //         required: true, trigger: 'change',  min: 1, max: 50,message: '请输入系统名称'
                    //     },
                    //     projecttype:{
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请选择业务类型'
                    //     },
                    //     projectopt:{
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请选择操作方式'
                    //     },
                    //     leadername: {
                    //         required: true, trigger: 'change',  min: 1, max: 25 ,message: '请输入主管姓名'
                    //     },
                    //     leaderphone: {
                    //         required: true, trigger: 'change',  min: 1, max: 20 ,message: '请输入主管联系电话'
                    //     },
                    //     leaderemail: {
                    //         required: true, trigger: 'change',
                    //         pattern:"^[A-Za-z0-9\\u4e00-\\u9fa5]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$",
                    //         min: 1, max: 50 ,message: '请输入有效的邮箱地址'
                    //     },
                    //     leaderothercontact: {
                    //         required: true, trigger: 'change',
                    //         min: 1, max: 50 ,message: '请输入负责人其他联系方式'
                    //     },
                    //     passunit: {
                    //         required: true, trigger: 'change',
                    //         min: 1, max: 50 ,message: '请输入审批部门名称'
                    //     },
                    //     passtime: {
                    //         required: true, trigger: 'change',message: '请输入有效日期'
                    //     },
                    //     passnumber: {
                    //         required: true, trigger: 'change',
                    //         min: 1, max: 50,message: '请输入审批批号'
                    //     },
                    //     regtime: {
                    //         required: true, trigger: 'change',
                    //         message: '请输入有效日期'
                    //     },
                    //     transferdirect: {
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请选择数据交换方向'
                    //     },
                    //     baseprotocol: {
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请选择基本协议'
                    //     },
                    //
                    //     propamount: {
                    //         required: true, trigger: 'change',
                    //         min: 1, max: 50 ,message: '请输入数据估算日交换量'
                    //     },
                    //     registunitname: {
                    //         required: true, trigger: 'change',
                    //         min: 1, max: 50,message: '请输入备案单位名称'
                    //     }
                    //
                    // },
                },
                // projecttypeList:[{title:"00000", name:"其它"},{title:"01000", name:"国内安全保卫管理类"},
                //     {title:"02000", name:"经济犯罪侦查管理类"},{title:"02001", name:"经济犯罪案件信息管理类"},
                //     {title:"03000", name:"治安管理类"},{title:"03001", name:"暂住人口信息系统"},
                //     {title:"03002", name:"租赁房屋信息系统"},{title:"03003", name:"旅馆业信息系统"},
                //     {title:"03004", name:"典当业信息系统"},{title:"03005", name:"机动车修理业信息系统"},
                //     {title:"03006", name:"废旧回收业信息系统"},{title:"03007", name:"印章业信息系统"},
                //     {title:"03008", name:"印刷业信息系统"}, {title:"03009", name:"民用爆炸物物品及危险物品信息系统"},
                //     {title:"03010", name:"接处警信息系统"}, {title:"04000", name:"边防管理类"},
                //     {title:"05000", name:"刑事侦查管理类"}, {title:"06000", name:"出入境管理类"},
                //     {title:"06001", name:"公民出国境管理信息系统"}, {title:"06002", name:"港澳居民来往内地通行证签发信息系统"},
                //     {title:"07000", name:"消防管理类"}, {title:"07001", name:"消防安全重点单位信息系统"},
                //     {title:"08000", name:"警卫管理类"}, {title:"10000", name:"铁道公安管理类"},
                //     {title:"11000", name:"网络安全监察管理类"}, {title:"12000", name:"行动技术管理类"},
                //     {title:"13000", name:"监所管理类"}, {title:"13001", name:"看守所管理信息系统"},
                //     {title:"14000", name:"交通公安管理类"}, {title:"15000", name:"民航公安管理类"},
                //     {title:"16000", name:"林业公安管理类"}, {title:"17000", name:"交通管理类"},
                //     {title:"17001", name:"机动车登记管理信息系统"}, {title:"17002", name:"机动车网上查询系统"},
                //     {title:"17003", name:"驾驶人网上查询系统"}, {title:"17004", name:"122事故接/报警管理信息系统"},
                //     {title:"17005", name:"驾驶人违法信息系统"}, {title:"17006", name:"机动车/驾驶人信息查询系统"},
                //     {title:"18000", name:"法制管理类"}, {title:"19000", name:"外事管理类"},
                //     {title:"20000", name:"装备财务管理类"}, {title:"21000", name:"禁毒管理类"},
                //     {title:"21001", name:"易制毒化学品管理信息系统"}, {title:"22000", name:"科技管理类"},
                //     {title:"23000", name:"基础和综合管理类"}, {title:"23001", name:"综合查询信息系统"},
                //     {title:"23002", name:"在逃人员信息资源库"}, {title:"23003", name:"出入境人员/证件信息资源库"},
                //     {title:"24000", name:"海关公安管理类"}, {title:"26000", name:"反邪教管理类"},
                //     {title:"27000", name:"反恐怖管理类"},  {title:"31000", name:"办公管理类(指挥中心管理类)"},
                //     {title:"32000", name:"纪委监察管理类"}, {title:"34000", name:"督察管理类"},
                //     {title:"36000", name:"人事管理类"}, {title:"39000", name:"离退休干部管理类"},
                //     {title:"42000", name:"综合浏览信息类"},  {title:"50000", name:"视频接入业务"},
                //     {title:"50001", name:"视频专网接入"}
                // ],
                // projectoptList: [{title:"0000", name:"其他"}, {title:"0100", name:"数据交换"},
                //     {title:"0101", name:"文件传输"}, {title:"0102", name:"数据库传输"},
                //     {title:"0103", name:"流媒体"}, {title:"0200", name:"授权访问"},
                //     {title:"0300", name:"视频传输"}, {title:"0301", name:"视频单向传入"},
                //     {title:"0302", name:"视频单向传出"}],
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
                directoryList:[{name:"aa"},{name:"bb"}],
                levelList:[{name:"1"},{name:"2"}],
                codingList:[{name:"UTF-8"}],
                operationList:[{name:"删除"},{name:"复制"}],
                idplatformList:[{name:"不审计"},{name:"白名单"},{name:"黑名单"}],
                filterTypeList:[{name:"白名单"},{name:"黑名单"}],
                virusList:[{name:"删除"},{name:"隔离"}],
                ddList:[{name:"覆盖文件"},{name:"新覆盖旧"},{name:"大小不同则覆盖文件"},{name:"大小不同或源文件较新则覆盖文件"},{name:"重命名文件"},{name:"忽略传输"}]


            }
        },
        computed: {},
        methods: {
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

            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            },
            addbto() {
                this.counter.push({});
            },
            delbto(index) {
                this.counter.splice(index,1);
            }
        }
    };
</script>
<style scoped lang="less">
</style>
