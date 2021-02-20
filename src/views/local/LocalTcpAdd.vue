<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="TCP协议通信" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <!--                <FormItem label="动作" prop="interface" style="margin-bottom: 0px;">-->
                <!--                    <Select v-model="platForm.form.interface">-->
                <!--                        <Option label="ACCEPT" value="accept"></Option>-->
                <!--                        <Option label="DROP" value="drop"></Option>-->
                <!--                        <Option label="REJECT" value="reject"></Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
                <FormItem label="禁用" prop="subnet" style="margin-bottom: 0px;">
                    <Checkbox>禁用此规则</Checkbox>
                </FormItem>
                <FormItem label="入口IP" prop="vhid" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.interface">
                        <Option label="TCP" value="tcp"></Option>
                        <Option label="UDP" value="udp"></Option>
                        <Option label="ICMP" value="icmp"></Option>
                    </Select>
                </FormItem>
                <FormItem label="入口端口" prop="password" style="margin-bottom: 0px;">
                    <Input />
                </FormItem>
                <FormItem label="出口IP" prop="password" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.interface">
                        <Option label="TCP" value="tcp"></Option>
                        <Option label="UDP" value="udp"></Option>
                        <Option label="ICMP" value="icmp"></Option>
                    </Select>
                </FormItem>
                <FormItem label="目的IP" prop="password" style="margin-bottom: 0px;">
                    <Input />
                </FormItem>
                <FormItem label="目的端口" prop="password" style="margin-bottom: 0px;">
                    <Input />
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
        name: "LocalTcpAdd",
        components: {},
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