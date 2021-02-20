<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="新增用户配置" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="启用" prop="subnet" style="margin-bottom: 17px;">
                    <Checkbox v-model="platForm.form.status" />
                </FormItem>
                <FormItem label="用户名" prop="name" style="margin-bottom: 17px;">
                    <Input v-model="platForm.form.name" />
                </FormItem>
                <FormItem label="密码" prop="password" style="margin-bottom: 17px;">
                    <Input type="password" v-model="pwd" />
                    <div class='input_span'>
                        <span id="one" style="margin: auto;"></span>
                        <span id="two"></span>
                        <span id="three"></span>
                    </div>
                </FormItem>
                <FormItem label="确认密码" prop="confirm" style="margin-bottom: 17px;">
                    <Input type="password" v-model="platForm.form.confirm" />
                </FormItem>
<!--                <FormItem label="确认密码" prop="password" style="margin-bottom: 17px;">-->
<!--                    <Input type="password" v-model="platForm.form.password" />-->
<!--                </FormItem>-->
                <FormItem label="角色" prop="groupid" style="margin-bottom: 17px;">
                    <Select v-model="platForm.form.groupid">
                        <Option label="系统管理员" value="NUM1"></Option>
                        <Option label="用户管理员" value="NUM2"></Option>
                        <Option label="日志审计员" value="NUM3"></Option>
                    </Select>
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
        name: "UserConfigAdd",
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        status: false,
                        name: null,
                        password: null,
                        groupid: "NUM1",
                        confirm:null,
                    },
                    rules:{
                        confirm:{ required: true, message: '不能为空', trigger: 'blur' },
                        name:{ required: true, message: '不能为空', trigger: 'blur' },
                        // password:{ required: true, message: '不能为空', trigger: 'blur' },
                    }
                },
                msgText: '',
                pwd: ''
            }
        },
        computed: {},
        methods: {
            showAddDrawer() {
                this.platForm.show = true;
            },
            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(!this.pwd){
                        this.$Notice.error({title: '新增失败', desc: "密码不能为空", duration: 2.5});
                        return
                    }
                    if(this.pwd != this.platForm.form.confirm){
                        this.$Notice.error({title: '新增失败', desc: "两次密码不一致", duration: 2.5});
                        return
                    }
                    // let formData = new FormData();
                    //
                    // formData.append("proxy_addr_str", this.platForm.form.proxy_addr_str);
                    // formData.append("proxy_port", this.platForm.form.proxy_port);
                    //
                    // formData.append("real_addr_str", this.platForm.form.real_addr_str);
                    // formData.append("real_port", this.platForm.form.real_port);
                    // formData.append("vroot_dir", this.platForm.form.vroot_dir);

                    this.platForm.form.password = this.pwd;
                    this.$https.fetchPost(this.$api.user.addUser.url,this.platForm.form// {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '用户信息添加成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                location.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '用户信息失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            },
            checkStrong(sValue) {
                var modes = 0;
                //正则表达式验证符合要求的
                if (sValue.length < 1) return modes;
                if (/\d/.test(sValue)) modes++; //数字
                if (/[a-z]/.test(sValue)) modes++; //小写
                if (/[A-Z]/.test(sValue)) modes++; //大写
                if (/\W/.test(sValue)) modes++; //特殊字符

                //逻辑处理
                switch (modes) {
                    case 1:
                        return 1;
                        break;
                    case 2:
                        return 2;
                        break;
                    case 3:
                    case 4:
                        return sValue.length < 4 ? 3 : 4;
                        break;
                }
                return modes;
            }
        },
        watch: {
            pwd(newValue, oldValue) {
                this.msgText = this.checkStrong(newValue);
                if(this.msgText > 1 || this.msgText == 1) {
                    document.getElementById("one").style.background = "red";
                } else {
                    document.getElementById("one").style.background = "#eee";
                }
                if(this.msgText > 2 || this.msgText == 2) {
                    document.getElementById("two").style.background = "orange";
                } else {
                    document.getElementById("two").style.background = "#eee";
                }
                if(this.msgText == 4) {
                    document.getElementById("three").style.background = "#00D1B2";
                } else {
                    document.getElementById("three").style.background = "#eee";
                }
            }
        }
    }
</script>
<style scoped lang="less">
    .input_span span {
        display: inline-block;
        width: 85px;
        height: 10px;
        background: #eee;
        line-height: 20px;
    }

    #one {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-right: 0px solid;
        margin-left: 20px;
        margin-right: 3px;
    }

    #two {
        border-left: 0px solid;
        border-right: 0px solid;
        margin-left: -5px;
        margin-right: 3px;
    }

    #three {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        border-left: 0px solid;
        margin-left: -5px;
    }
</style>