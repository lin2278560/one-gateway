<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="文件同步过滤策略" v-model="platForm.show" width="1000">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <FormItem label="病毒查杀" prop="subnet" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.virus_check" />
                </FormItem>

                <FormItem label="大小过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.size_check" @on-change="checkSizeShow" />
                </FormItem>
                <FormItem label="大小过滤类型" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Select v-model="platForm.form.size_white">
                        <Option value="1">大小过滤白名单</Option>
                        <Option value="0">大小过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="最小值" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Input v-model="platForm.form.size_space_low"/>
                </FormItem>
                <FormItem label="最大值" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Input v-model="platForm.form.size_space_high"/>
                </FormItem>

                <FormItem label="文件名过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.name_check" @on-change="checkNameShow" />
                </FormItem>
                <FormItem label="文件名过滤类型" prop="password" style="margin-bottom: 0px;" v-show="name_show">
                    <Select v-model="platForm.form.name_white">
                        <Option value="1">文件名过滤白名单</Option>
                        <Option value="0">文件名过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件名" prop="password" style="margin-bottom: 0px;" v-show="name_show">
                    <Input v-model="platForm.form.name"/>
                </FormItem>

                <FormItem label="文件后缀过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.suffix_check" @on-change="checkSuffixShow" />
                </FormItem>
                <FormItem label="文件后缀过滤类型" prop="password" style="margin-bottom: 0px;" v-show="suffix_show">
                    <Select v-model="platForm.form.suffix_white">
                        <Option value="1">文件后缀过滤白名单</Option>
                        <Option value="0">文件后缀过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件后缀" prop="password" style="margin-bottom: 0px;" v-show="suffix_show">
                    <Input v-model="platForm.form.suffix"/>
                </FormItem>

                <FormItem label="文件类型过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="platForm.format_check" @on-change="checkFormatShow" />
                </FormItem>
                <FormItem label="文件类型过滤类型" prop="password" style="margin-bottom: 0px;" v-show="format_show">
                    <Select v-model="platForm.form.format_white">
                        <Option value="1">文件类型过滤白名单</Option>
                        <Option value="0">文件类型过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件类型" prop="password" style="margin-bottom: 0px;" v-show="format_show">
                    <Input v-model="platForm.form.format"/>
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
        name: "TestFileSyncFilterAdd",
        components: {},
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        virus_check: null,
                        size_check: null,
                        size_white: null,
                        size_space_low: null,
                        size_space_high: null,
                        name_check: null,
                        name_white: null,
                        name: null,
                        suffix_check: null,
                        suffix_white: null,
                        suffix: null,
                        format_check: null,
                        format_white: null,
                        format: null
                    },
                    virus_check: false,
                    size_check: false,
                    name_check: false,
                    suffix_check: false,
                    format_check: false,
                },
                size_show: false,
                name_show: false,
                suffix_show: false,
                format_show: false,
            }
        },
        computed: {},
        methods: {
            checkSizeShow() {
                this.size_show = !this.size_show;
            },
            checkNameShow() {
                this.name_show = !this.name_show;
            },
            checkSuffixShow() {
                this.suffix_show = !this.suffix_show;
            },
            checkFormatShow() {
                this.format_show = !this.format_show;
            },
            showAddDrawer() {
                this.platForm.show = true;
            },
            addPlatForm() {
                this.platForm.virus_check == false ? this.platForm.form.virus_check = "0" : this.platForm.form.virus_check = "1";
                this.platForm.size_check == false ? this.platForm.form.size_check = "0" : this.platForm.form.size_check = "1";
                this.platForm.name_check == false ? this.platForm.form.name_check = "0" : this.platForm.form.name_check = "1";
                this.platForm.suffix_check == false ? this.platForm.form.suffix_check = "0" : this.platForm.form.suffix_check = "1";
                this.platForm.format_check == false ? this.platForm.form.format_check = "0" : this.platForm.form.format_check = "1";


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

                    this.$https.fetchPost(this.$api.test.addPolicy.url,
                        this.platForm.form
                        // {headers: {'Content-Type': 'multipart/form-data'}}
                    ).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '同步过滤策略添加成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '同步过滤策略添加失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
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