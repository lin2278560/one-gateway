<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="FTP代理配置" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="代理IP" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.proxy_addr_str" />
                </FormItem>
                <FormItem label="代理端口" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.proxy_port" />
                </FormItem>
                <FormItem label="服务器IP" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.real_addr_str" />
                </FormItem>
                <FormItem label="服务器端口" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.real_port" />
                </FormItem>
                <FormItem label="服务器根目录" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.vroot_dir" />
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
        name: "TestFtpProxyAdd",
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        proxy_addr_str: null,
                        proxy_port: null,
                        real_addr_str: null,
                        real_port: null,
                        vroot_dir: null
                    },
                },
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
                    this.$https.fetchPost(this.$api.test.addProxy.url,
                        this.platForm.form
                        // {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '代理配置成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '代理配置失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
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