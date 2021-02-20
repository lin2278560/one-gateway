<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增服务
        </Button>
        <Drawer title="本地SFTP服务" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <!--                <FormItem label="动作" prop="interface" style="margin-bottom: 0px;">-->
                <!--                    <Select v-model="platForm.form.interface">-->
                <!--                        <Option label="ACCEPT" value="accept"></Option>-->
                <!--                        <Option label="DROP" value="drop"></Option>-->
                <!--                        <Option label="REJECT" value="reject"></Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <FormItem label="用户名" prop="username" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.username" />
                </FormItem>
                <FormItem label="密码" prop="password" style="margin-bottom: 15px;">
                    <Input type="password"  v-model="platForm.form.password" />
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
        name: "LocalSFtpAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        username: null,
                        password: null,
                        path: null,
                        state: "stop",
                    },
                    rules:{
                        username: [
                            { required: true, max:30, pattern: /^[a-zA-Z0-9_\s]*$/, message: '用户名请输入数字或英文或下划线', trigger: 'blur' },
                            {  max:30, message: '长度不超过30', trigger: 'blur' },
                            {  min:3, message: '长度请大于3', trigger: 'blur' }
                        ],
                        password: [
                            { required: true, pattern: /^[a-zA-Z0-9_\s]*$/, message: '请输入数字或英文或下划线的组合', trigger: 'blur' },
                            {  max:20, message: '长度不超过20', trigger: 'blur' },
                            {  min:6, message: '长度请大于6', trigger: 'blur' }
                        ],
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
                this.$refs['plat_form'].validate((valid) => {
                    console.log(valid)
                    if (!valid)
                        return;
                    this.platForm.form.path = "/home/local/sftp/"+this.platForm.form.username;
                    this.$https.fetchPost(this.$api.local.addSftp.url,this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: 'SFTP服务添加成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: 'SFTP服务添加失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
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