<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增单向通道
        </Button>
        <Drawer title="新增单向通道" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="内端IP地址" prop="ipaddr" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.ipaddr" />
                    <!-- <span style="color: red;">注:请填写一个IPv4或IPv6地址</span> -->
                </FormItem>
                <FormItem label="内端MAC地址" prop="macaddr" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.macaddr" />
                    <!-- <span style="color: red;">注:请填写一个IPv4或IPv6地址</span> -->
                </FormItem>
                <!-- <FormItem label="通讯端口" prop="port" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.port" />
                </FormItem> -->
                <!-- <FormItem label="通讯端口2" prop="dsc" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.dsc" />
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
        name: "NetworkChannelAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        ipaddr:"",
                        macaddr: "",
                        port: "",
                        id:""
                    },
                    rules: {
                        // port: [
                        //     { required: true, message: '不能为空', trigger: 'blur' },
                        //     { required: true, pattern: /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/, message: '请正确输入端口', trigger: 'blur' }
                        // ],
                        macaddr:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            // { required: true, message: '请正确填写mac地址', trigger: 'blur', pattern:/^[A-F0-9]{2}([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})$/},
                        ],
                        ipaddr:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                    },
                },
            }
        },
        computed: {},
        mounted: function() {

        },
        methods: {
            showAddDrawer() {
                this.platForm.show = true;
            },
            addPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    // let formData = new FormData();
                    // formData.append("state", this.platForm.form.state);
                    // formData.append("macaddr", this.platForm.form.macaddr);
                    // formData.append("port", this.platForm.form.port);
                    // formData.append("dsc", this.platForm.form.dsc);
                    // formData.append("ipaddr", this.platForm.form.ipaddr);
                    console.log(this.platForm.form)
                    this.$https.fetchPost(this.$api.network.addChannel.url,this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '业务添加成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                        this.reload();
                                    }, 250);
                        } else
                            this.$Notice.error({title: '业务添加失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
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