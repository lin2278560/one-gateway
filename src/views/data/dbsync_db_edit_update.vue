<template>
    <div>
<!--        <li><a @click="showAddDrawer">修改服务</a></li>-->
        <div @click="showAddDrawer">修改数据库同步服务</div>
        <Drawer title="数据库同步服务编辑" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="外端服务id" prop="idbiz" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.out_task_id"/>
                </FormItem>
                <FormItem label="服务名称" prop="idbiz" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.servicename"/>
                </FormItem>
                <FormItem label="资源类型" prop="idplatform" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.type">
                        <Option v-for="item in resourceList" :value="item.val" :key="item.val" @click.native="checkType(item.val)">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="用户名" v-show="ftpType" prop="idplatform" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.username"/>
                </FormItem>
                <FormItem label="密码" v-show="ftpType" prop="idplatform" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.password"/>
                </FormItem>




                <FormItem label="用户名" v-show="client" prop="idplatform" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.username"/>
                </FormItem>
                <FormItem label="密码" v-show="client" prop="idplatform" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.password"/>
                </FormItem>







                <FormItem label="IP地址" v-show="ftpType" prop="idplatform" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.ipaddress"/>
                </FormItem>
                <FormItem label="端口" v-show="ftpType" prop="remoteport" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.remoteport"/>
                </FormItem>

                <FormItem label="目录" prop="idplatform" v-show="localftpType" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.path">
                        <Option v-for="item in directoryList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="等级" prop="idplatform" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.level">
                        <Option v-for="item in levelList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="编码" prop="idplatform" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.iocharset">
                        <Option v-for="item in codingList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                    </Select>
                </FormItem>

                <FormItem label="显示高级设置" prop="idplatform" v-show="localftpType" style="margin-bottom: 0px;">
                    <Checkbox @on-change="checkGaoSettings"></Checkbox>
                </FormItem>

                <FormItem label="文件同步后所采取的操作" prop="idplatform" v-show="gaoSettings" class="gaoSettings_style" style="margin-bottom: 0px;display: none;">
                    <Select v-model="platForm.form.operation">
                        <Option v-for="item in operationList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="间隔" prop="idplatform" v-show="gaoSettings" class="gaoSettings_style" style="margin-bottom: 0px;display: none;">
                    <Input v-model="platForm.form.time_interval"/>
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
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        runstate: "stop",
                        out_task_id: null,
                        servicename: null,
                        type: "localftp",
                        username: null,
                        password: null,
                        ipaddress: null,
                        remoteport: null,
                        path: null,
                        level: "1",
                        iocharset: "UTF-8",
                        operation: null,
                        time_interval: null,
                        taskId: null,
                        id: null
                    },
                },
                resourceList:[{name:"本地FTP", val:"localftp"},{name:"本地SMB", val:"localsmb"},{name:"本地NFS", val:"localnfs"},{name:"远程SMB", val:"smb"},{name:"远程FTP", val:"ftp"},{name:"光碟塔", val:"disc"},{name:"Client", val:"client"},{name:"认证同步", val:"auth_nc"}],
                directoryList:[],
                levelList:[{name:"1", val:"1"},{name:"2", val:"2"}],
                codingList:[{name:"UTF-8", val:"UTF-8"}],
                operationList:[{name:"删除", val:"del"},{name:"复制", val:"copy"},{name:"备份", val:"backup"}],
                idplatformList:[{name:"不审计"},{name:"白名单"},{name:"黑名单"}],
                filterTypeList:[{name:"白名单"},{name:"黑名单"}],
                virusList:[{name:"删除"},{name:"隔离"}],
                channelList:[{name:"channel01"},{name:"channel02"}],
                aaList:[{name:"同步子目录"},{name:"只同步当前目录"}],

                ftpType: false,
                gaoSettings: false,
                localftpType:true,
                sizeFilter: false,
                nameFilter: false,
                contentFilter: false,
                suffixFilter: false,
                client:false,
                data1: []
            }
        },
        computed: {},
        mounted: function() {
            // this.showSyncTaskInfo();
            this.test();
            //this.checkType(this.platForm.form.type);
        },
        methods: {
            test(){
                this.$https.fetchGet(this.$api.local.findFtpInfo.url).then((resp) => {
                    for(var i in resp.data.data) {
                        this.directoryList.push(resp.data.data[i].path);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            showSyncTaskInfo() {
                this.$https.fetchGet(this.$api.data.syncTaskInfo.url).then((resp) => {
                    this.data1 = resp.data.data;
                    // console.log(this.data1[0].filesync["NUM1"].servicename);

                    let v = this.$storage.getStorage("businessIndex");
                    let num = this.$storage.getStorage("FileIndex").replace("\"","").replace("\"","");
                    this.platForm.form.id = this.data1[v].filesync[num].id;
                    this.platForm.form.runstate = this.data1[v].filesync[num].runstate;
                    this.platForm.form.out_task_id = this.data1[v].filesync[num].out_task_id;
                    this.platForm.form.servicename = this.data1[v].filesync[num].servicename;
                    this.platForm.form.type = this.data1[v].filesync[num].type;
                    this.platForm.form.username = this.data1[v].filesync[num].username;
                    this.platForm.form.password = this.data1[v].filesync[num].password;
                    this.platForm.form.ipaddress = this.data1[v].filesync[num].ipaddress;
                    this.platForm.form.remoteport = this.data1[v].filesync[num].remoteport;
                    this.platForm.form.path = this.data1[v].filesync[num].path;
                    this.platForm.form.level = this.data1[v].filesync[num].level;
                    this.platForm.form.iocharset = this.data1[v].filesync[num].iocharset;
                    this.platForm.form.operation = this.data1[v].filesync[num].operation;
                    this.platForm.form.time_interval = this.data1[v].filesync[num].time_interval;
                    this.platForm.form.taskId = this.data1[v].id;
                    this.checkType(this.data1[v].filesync[num].type);
                }).catch(err => {
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.showSyncTaskInfo();
                this.platForm.show = true;

            },
            addPlatForm() {
                console.log("add")
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.data.updateFileTask.url, this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '文件同步修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '文件同步修改失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            },
            checkType (val) {
                if(val == "ftp") {
                    this.ftpType = !this.ftpType;
                }else if (val =="client"){
                    this.client=true;
                    this.localftpType =false;
                }
                else {
                    this.ftpType = false;
                }
            },
            checkGaoSettings () {
                this.gaoSettings = !this.gaoSettings;
            },
            checkSizeFilter () {
                this.sizeFilter = !this.sizeFilter;
            },
            checkNameFilter () {
                this.nameFilter = !this.nameFilter;
            },
            checkContentFilter () {
                this.contentFilter = !this.contentFilter;
            },
            checkSuffixFilter () {
                this.suffixFilter = !this.suffixFilter;
            }
        }
    };
</script>
<style scoped lang="less">
    li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
        text-decoration: none;
        background-color: transparent;
    }
</style>
