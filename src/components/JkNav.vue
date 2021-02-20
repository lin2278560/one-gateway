<template>
<!-- topheader -->
    <div class="nav">
        <img style="cursor:pointer" @click="toSysinfo('/sys/info')" class="nav-log" src="../../public/logo.png"/>
        <!-- <h3 class="nav-title">ViGap安全隔离与信息单向导入系统V3.0-外端</h3> -->
        <h3 class="nav-title">{{this.title}}</h3>

        <Dropdown trigger=click class="nav-dropdown" :style='{float:"right",margin:"27px 30px  27px 40px"}'>
            <a style="font-size: 14px;" href="javascript:void(0)">{{users}}
                <Icon type="ios-arrow-down"></Icon>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem @click.native="reboot" >
                    <div style="width:100%;height:100%">重启系统</div>
                </DropdownItem>
                <DropdownItem @click.native="shutdown">
                    <div style="width:100%;height:100%" >关闭系统</div>
                </DropdownItem>
                <DropdownItem @click.native="modal = true">
                    <div style="width:100%;height:100%" >修改密码</div>
                </DropdownItem>
                <DropdownItem @click.native="logout">
                    <div style="width:100%;height:100%" >退出</div>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        <!-- 弹窗框 -->
        <Modal v-model="modal" title="修改当前用户密码" width="300" >
            <Form ref="form" :model="login" :rules="rule" >
                <FormItem prop="password">
                    <Input v-model="login.password" prefix="md-person" type="password" placeholder="原密码"/>
                </FormItem>
                <FormItem prop="newPassWord">
                    <Input v-model="login.newPassWord" prefix="md-lock" type="password" placeholder="新密码"/>
                </FormItem>
                <FormItem prop="repeatPwd">
                    <Input v-model="login.repeatPwd" prefix="md-lock" type="password" placeholder="确认密码"/>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button @click="cancel">重置</Button>
                <Button type="primary" @click="updatePass">确定</Button>
            </div>
        </Modal>
        <!--<div class="nav-time" >
          系统运行时间:<Time :time="time" type="datetime" :interval="1"/>
        </div>-->

    </div>
</template>
<script>
    import Utils from './test.js';
    export default {
        data(){
            return {
                title:'',
                modal: false,
                users: null,
                loading: true,
                login: {
                    password: "",
                    newPassWord: "",
                    repeatPwd: "",
                    name:''
                },
                rule: {
                    password: [//6-18
                        {required: true, message: '请输入原密码', trigger: "blur"},
                        // {type: "string", min: 6, max: 18, message: '请输入长度为6-18个密码字符', trigger: "blur"}
                    ],
                    newPassWord: [//6-18
                        {required: true, message: '请输入新密码', trigger: "blur"},
                        // {type: "string", min: 6, max: 18, message: '请输入长度为6-18个密码字符', trigger: "blur"}
                    ],
                    repeatPwd: [//6-18
                        {required: true, message: '请输入确认密码', trigger: "blur"},
                        {
                            required: false, trigger: "blur", validator: (rule, value, callback) => {
                                if (this.login.newPassWord != value)
                                    callback(new Error("新密码和确认密码不一致"));
                                else
                                    callback();

                            }
                        }
                    ]
                }
            }
        },
        mounted: function() {
            this.showPermission();
            this.gettile()
        },
        methods: {
            toSysinfo(e){
                this.$router.push({ path: e});
                Utils.$emit('demo1',e);
            },
            gettile(){
                this.$https.fetchPost(this.$api.sys.getSystemName.url).then((response) => {
                    this.title = response.data.data;
                    // console.log(this.title)
                }).catch(function (error) {
                    console.log(error);
                });
            },
            showPermission() {
                let users = this.$storage.getStorage("users");
                if(users != null) {users  = users.replace("\"","").replace("\"","");}
                if(users == "admins") {
                    this.users = "系统管理员";
                }else if(users == "logauditor") {
                    this.users = "日志管理员";
                }else {
                    this.users = "用户管理员";
                }
            },
            logout(){
                this.$https.fetchGet(this.$api.user.cleanSession.url).then((response) => {
                    if (response.data.status == 200) {
                        sessionStorage.removeItem("user");
                        this.$Notice.info({
                            title: "退出成功"
                        });
                        this.$router.push({path: "/login"});
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            updatePass(){
                this.$refs['form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.login.name = this.$storage.getStorage("username")
                    console.log(this.login)
                    this.$https.fetchPost(this.$api.user.updatePassWord.url, {
                        name:JSON.parse(this.login.name),
                        password:this.login.password,
                        newPassWord:this.login.newPassWord,
                        }).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: "修改成功", desc: "请重新登录"});
                            this.logout()
                        } else {
                            this.$Notice.error({title: "修改失败", desc: resp.data.data});
                        }
                    }).catch(err => {
                        console.log(err);
                        // this.$Notice.error({title: "请求失败", desc: err});
                    });
                })
            },
            cancel(){
                this.$refs["form"].resetFields();
            },
            reboot(){
                this.$Modal.confirm({
                    title: "注意:重启系统将中断当前操作，请谨慎操作",
                    content: '<p>确定要重启系统吗</p>',
                    loading: true,
                    onOk: () => {
                        this.$Notice.success({title: '正在重启系统', desc: "5秒后退出至登陆页面", duration: 5});
                        this.$Modal.remove()
                        setTimeout(() => {
                            this.$https.fetchGet(this.$api.sys.reboot.url).then((resp) => {})
                            this.$router.replace('/login');
                        }, 5000);
                    }
                })
            },
            shutdown(){
                this.$Modal.confirm({
                    title: "注意:关闭系统将中断当前操作，请谨慎操作",
                    content: '<p>确定要关闭系统吗</p>',
                    loading: true,
                    onOk: () => {
                        this.$Notice.success({title: '正在关闭系统', desc: "5秒后退出至登陆页面", duration: 5});
                        console.log(this.$Modal)
                        this.$Modal.remove()
                        setTimeout(() => {
                            this.$https.fetchGet(this.$api.user.systemStop.url).then((resp) => {})
                            this.$router.replace('/login');
                        }, 5000);
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .nav {
        width: 100%;
        height: 80px;
        background-color: #4e4e4e;
        /*background-color: #4e4e4e;*/
    }

    .nav-log {
        float: left;
        height: 70px;
        width: 90px;
        padding: 0;
        margin: 5px 16px 5px 30px;
    }

    .nav-title {
        float: left;
        color: white;
        font-size: 18px;
        margin: 28px 0;
        line-height: 1;
        font-family: 'Source Sans Pro',Arial,sans-serif;
        font-weight: 600;
    }

    .nav-time {
        float: right;
        color: white;
        font-size: 14px;
        line-height: 1;
        margin: 28px 0;
    }

    .nav-dropdown a {
        color: white;
        font-size: 16px;
        line-height: 1;
    }
</style>

