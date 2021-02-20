<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <userAdd style="float: right"></userAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table border size="small" :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateFtpProxy(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteFtpProxy(row.id)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>

        <Drawer title="用户配置" v-model="modal.show" width="50%">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="启用" prop="subnet" style="margin-bottom: 15px;">
                    <Checkbox v-model="modal.form.status" />
                </FormItem>
                <FormItem label="用户名" prop="vhid" style="margin-bottom: 15px;">
                    <Input v-if="disable" v-model="modal.form.name" />
                    <Input v-if="!disable" disabled v-model="modal.form.name" />
                    <span style="color:red">*密码不修改请留空</span>
                </FormItem>
                <FormItem label="密码" prop="password" style="margin-bottom: 15px;">
                    <Input type="password" v-model="modal.form.password" />
                    <div class='input_span'>
                        <span id="one" style="margin: auto;"></span>
                        <span id="two"></span>
                        <span id="three"></span>
                    </div>
                </FormItem>
                <!--                <FormItem label="确认密码" prop="password" style="margin-bottom: 0px;">-->
                <!--                    <Input type="password" v-model="platForm.form.password" />-->
                <!--                </FormItem>-->
                <FormItem label="角色" prop="password" style="margin-bottom: 0px;">
                    <Select v-if="disable" v-model="modal.form.groupid">
                        <Option label="系统管理员" value="NUM1"></Option>
                        <Option label="用户管理员" value="NUM2"></Option>
                        <Option label="日志审计员" value="NUM3"></Option>
                    </Select>
                    <Select v-if="!disable" disabled v-model="modal.form.groupid">
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
    import JkTabs from "@/components/JkTabs.vue";
    import userAdd from "./UserConfigAdd";
    export default {
        name: "UserConfig",
        components: {
            jk_tabs: JkTabs,userAdd
        },
        data(){
            return {
                disable:true,
                columns1: [
                    {title: '序号', align: 'center',
                        render: (h, params) => {
                            return h("span", params.index + 1);
                        }
                    },
                    {title: '用户名', key: 'name', align: 'center'},
                    {title: '状态', key: 'status', align: 'center'},
                    {title: '角色', key: 'groupid', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "用户", to: "/user/userConfig"},
                    {name: "角色", to: "/user/userRole"},
                    {name: "密码强度设置", to: "/user/userPwd"},
                ],
                modal: {
                    show: false,
                    form: {
                        id: null,
                        status: null,
                        name: null,
                        password: null,
                        groupid: null,
                    }
                },
                data1: []
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            showProxy(){
                this.$https.fetchGet(this.$api.user.showUser.url).then((resp) => {
                    console.log(resp);
                    this.data1 = resp.data.data;
                    for (let i in this.data1) {
                        if (this.data1[i].status == "false") {
                            this.data1[i].status = "已禁用"
                        } else {
                            this.data1[i].status = "启用中"
                        }
                        if (this.data1[i].groupid == "NUM1") {
                            this.data1[i].groupid = "系统管理员";
                        }else if (this.data1[i].groupid == "NUM2") {
                            this.data1[i].groupid = "用户管理员";
                        }else if (this.data1[i].groupid == "NUM3"){
                            this.data1[i].groupid = "日志管理员";
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            deleteFtpProxy(index) {
                // if(this.data1[index].name=='admin' || this.data1[index].name=='adminuser' || this.data1[index].name=='adminlog'){
                //     this.$Notice.error({title: '删除失败', desc: "", duration: 5});
                //     return
                // }
                this.$Modal.confirm({
                    title: '删除用户信息',
                    content: '<p>当前操作将会删除用户信息，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.user.delUser.url, {id: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '用户信息删除失败', desc: "错误代码：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            updateFtpProxy(index) {
                this.modal.show = true;
                this.modal.form.id = this.data1[index].id;
                this.modal.form.status = this.data1[index].status;
                this.modal.form.name = this.data1[index].name;
                if(this.data1[index].name=='admin' || this.data1[index].name=='adminuser' || this.data1[index].name=='adminlog'){
                    this.disable = false
                }else{
                    this.disable = true
                }
                // this.modal.form.password = this.data1[index].password;
                if (this.data1[index].status == "已禁用") {
                    this.modal.form.status = false;
                }else {
                    this.modal.form.status = true;
                }
                if (this.data1[index].groupid == "系统管理员") {
                    this.modal.form.groupid = "NUM1";
                }else if (this.data1[index].groupid == "用户管理员") {
                    this.modal.form.groupid = "NUM2";
                }else {
                    this.modal.form.groupid = "NUM3";
                }
            },

            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },
            addPlatForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    console.log(this.modal.form)
                    if (this.modal.form.groupid == "NUM2" && this.modal.form.status == false){
                        this.$Notice.error({title: '用户信息修改失败', desc: "用户管理者无法禁用", duration: 2.5});
                        return;
                    }
                    this.$https.fetchPost(this.$api.user.updateUser.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '用户信息修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '用户信息修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            },
        }
    }
</script>

<style scoped>
</style>