<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="本地SMB服务" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="用户名" prop="username" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.username"/>
                </FormItem>
                <FormItem label="密码" prop="password" style="margin-bottom: 15px;">
                    <Input type="password"  v-model="platForm.form.password"/>
                </FormItem>
                <FormItem label="协议" prop="protect" style="margin-bottom: 15px;">
                    <Input disabled v-model="protect" />
                </FormItem>
                <!-- <FormItem label="权限" prop="" style="margin-bottom: 15px;">
                    <Checkbox v-model="platForm.form.browseable">读</Checkbox>
                    <Checkbox v-model="platForm.form.writable">写</Checkbox>
                </FormItem> -->
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
        name: "LocalSmbAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        state: "stop",
                        username: null,
                        password: null,
                        path: null,
                        browseable: "true",
                        writable: "true"
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
                protect: "SMB",
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

                    this.platForm.form.path = "/home/"+this.platForm.form.username;
                    console.log(this.platForm.form)
                    this.$https.fetchPost(this.$api.local.addSam.url,
                        this.platForm.form
                        // {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: 'Smb服务添加成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                        this.reload();
                                    }, 250);
                        } else
                            this.$Notice.error({title: 'Smb服务添加失败', desc: "错误代码：" + resp.data.desc, duration: 5});
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