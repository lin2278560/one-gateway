<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="任务配置" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="业务名" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="platForm.business_name" />
                </FormItem>
                <FormItem label="服务名" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="platForm.service_name" />
                </FormItem>
                <FormItem label="任务名" prop="password" style="margin-bottom: 0px;">
                    <Input disabled v-model="platForm.form.task_name" />
                </FormItem>
                <FormItem label="任务ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.task_id" />
                </FormItem>
                <FormItem label="目标任务ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.dst_task_id" />
                </FormItem>
                <FormItem label="根目录" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.root_dir" />
                </FormItem>
                <FormItem label="同步后源文件处理方式" prop="password" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.sync_type">
                        <Option value="none">不做处理</Option>
                        <Option value="copy">复制到...</Option>
                        <Option value="delete">同步后删除</Option>
                    </Select>
                </FormItem>
                <FormItem label="目标端文件冲突处理方式" prop="password" style="margin-bottom: 0px;">
                    <Select v-model="platForm.form.wr_policy">
                        <Option value="direct">不做处理</Option>
                        <Option value="update">覆盖</Option>
                        <Option value="omit">忽略</Option>
                        <Option value="rename">重命名</Option>
                    </Select>
                </FormItem>
                <FormItem label="复制到..." prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.cp_root" />
                </FormItem>
                <FormItem label="同步子目录" prop="password" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.recurse_disable" />
                </FormItem>
                <FormItem label="过滤策略ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="platForm.form.policy_id" />
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
        name: "TestTaskConfigAdd",
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    business_name: null,
                    service_name: null,
                    form: {
                        task_name: null,
                        task_id: null,
                        dst_task_id: null,
                        root_dir: null,
                        sync_type: "none",
                        wr_policy: "update",
                        cp_root: null,
                        recurse_disable: null,
                        policy_id: null
                    },
                    recurse_disable: true
                },
            }
        },
        computed: {},
        methods: {
            showAddDrawer() {
                this.platForm.show = true;
            },
            addPlatForm() {
                this.platForm.form.task_name = this.platForm.business_name + "_" + this.platForm.service_name;
                this.platForm.recurse_disable == false ? this.platForm.form.recurse_disable = "0" : this.platForm.form.recurse_disable = "1";

                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;

                    // let formData = new FormData();
                    //
                    // formData.append("proxy_addr_str", this.platForm.form.proxy_addr_str);
                    // formData.append("proxy_port", this.platForm.form.proxy_port);
                    //
                    // formData.append("real_addr_str", this.platForm.form.real_addr_str);
                    // formData.append("real_port", this.platForm.form.real_port);
                    // formData.append("vroot_dir", this.platForm.form.vroot_dir);

                    this.$https.fetchPost(this.$api.test.addTask.url,
                        this.platForm.form
                        // {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '任务配置成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '任务配置失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
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