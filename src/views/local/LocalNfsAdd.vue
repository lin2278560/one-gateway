<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="本地NFS服务" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="服务名" prop="interface" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.uname"/>
                </FormItem>
                <FormItem label="NFS目录" prop="subnet" style="margin-bottom: 0px;">
                    <Input style="width: 90%;" v-model="platForm.form.password"/><span style="color: red;margin-left: 15px;">(eg:"/test")</span>
                </FormItem>
                <FormItem label="IP过滤" prop="vhid" style="margin-bottom: 0px;">
                    <Input disabled v-model="platForm.form.filter"/>
                </FormItem>
                <FormItem label="权限" prop="password" style="margin-bottom: 0px;">
                    <Input disabled v-model="platForm.form.permissions"/>
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
        name: "LocalNfsAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        filter: "*",
                        permissions: "可读可写",

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

            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            }
        }
    };
</script>
<style scoped lang="less">
</style>