<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="编辑默认网关" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="状态" prop="state" style="margin-bottom: 0px;">
                    <RadioGroup v-model="platForm.form.state">
                        <Radio label="禁用"></Radio>
                        <Radio label="启用" disabled></Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="名称" prop="name">
                    <Input v-model="platForm.form.name" />
                </FormItem>
                <FormItem label="默认网关IP" prop="ipaddr" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.ipaddr" />
                    <span style="color: red;">注:请填写一个IPv4或IPv6地址</span>
                </FormItem>
                <FormItem label="类型" prop="type" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.type">
                        <Option v-for="type in typeList" :value="type.val" :key="type.val">{{ type.name }}</Option>
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
        name: "NetworkInterfaceAdd",
        components: {},
        inject: ["reload"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        name: "",
                        ipaddr: "",
                        type: "default",
                        state:"禁用",
                    },
                    // rules: {
                    //     gwName: {
                    //         required: true, trigger: 'change', min: 1, max: 16, message: '请输入1~16位的设备名称'
                    //     },
                    //     defaultGWIP: {
                    //         required: false, type: 'number', trigger: 'change', message: '请输入选择应用位置'
                    //     },
                    //     dsc: {required: false, trigger: 'change', min: 1, max: 16, message: '请输入1~16位的设备编号'},
                    //     ipv4: {
                    //         required: true,
                    //         trigger: 'change',
                    //         message: '请输入合法的ipv4地址',
                    //         pattern: '^(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)(\\.(25[0-5]|2[0-4]\\d|[0-1]?\\d?\\d)){3}$'
                    //     },
                    //     state: {required: true, trigger: 'change', message: '请选择设备类型'},
                    // },
                },
                typeList:[{name:"默认",val:"default"},{name:"常规",val:"common"}],
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
                    //
                    // formData.append("state", this.platForm.form.state);
                    // formData.append("gwName", this.platForm.form.gwName);
                    //
                    // formData.append("defaultGWIP", this.platForm.form.defaultGWIP);
                    // formData.append("dsc", this.platForm.form.dsc);
                    if(!this.platForm.form.name){
                        this.$Modal.warning({
                                title: "warning",
                                content: "请填写名称"
                            })
                    }else{
                        
                        if(this.$util.queryDevIP4(this.platForm.form.ipaddr) || this.$util.queryDevIP6(this.platForm.form.ipaddr)){
                            if(this.platForm.form.state == "禁用" || this.platForm.form.state == "disable"){
                                this.platForm.form.state = "disable";
                            }else{
                                this.platForm.form.state = "enable";
                            }
                        this.$https.fetchPost(this.$api.gateway.addGateway.url,
                            this.platForm.form
                        ).then((resp) => {
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
                        }else{
                            this.$Modal.warning({
                                title: "warning",
                                content: "请正确填写合法的ipv4或ipv6"
                            })
                        }
                    }
                    });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                this.platForm.form.ipaddr = ''
            }
        }
    };
</script>
<style scoped lang="less">
</style>