<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            <Button type="primary" size="small" style="margin-right: 5px" @click="updateInterface(index)">修改</Button>

            新增
        </Button>
        <Drawer title="本地FTP服务" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="用户名" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.username" />
                </FormItem>
                <FormItem label="密码" type="password" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.password" />
                </FormItem>
                <!--                <FormItem label="强制访问用户组" prop="password" style="margin-bottom: 0px;">-->
                <!--                    <Select v-model="platForm.form.interface">-->
                <!--                        <Option label="无" value="none"></Option>-->
                <!--                        <Option label="1" value="1"></Option>-->
                <!--                        <Option label="2" value="2"></Option>-->
                <!--                        <Option label="3" value="3"></Option>-->
                <!--                        <Option label="4" value="4"></Option>-->
                <!--                    </Select>-->
                <!--                </FormItem>-->
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
        name: "LocalFtpUpda",
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
                }
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

                    this.platForm.form.path = "/home/ftp/"+this.platForm.form.username;
                    this.$https.fetchPost(this.$api.local.addFtp.url,
                        this.platForm.form
                        // {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: 'FTP服务添加成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                        this.reload();
                                    }, 250);
                        } else
                            this.$Notice.error({title: 'FTP服务添加失败', desc: "错误：" + resp.data.desc, duration: 5});
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