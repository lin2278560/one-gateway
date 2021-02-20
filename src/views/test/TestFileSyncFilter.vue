<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <fileSyncFilterAdd style="float: right"></fileSyncFilterAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="state">
                        <!--                        <strong>{{ row.name }}</strong>-->
                        <Button size="small" style="margin: auto" @click="updateState(index)">
                                <span :style="{'color':data1[index].color}">
                                    {{ row.state }}
                                </span>
                        </Button>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateFtpProxy(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteFtpProxy(row.id)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>


        <Drawer title="文件同步过滤策略" v-model="modal.show" width="1000">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="病毒查杀" prop="subnet" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.virus_check" />
                </FormItem>

                <FormItem label="大小过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.size_check" @on-change="checkSizeShow" />
                </FormItem>
                <FormItem label="大小过滤类型" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Select v-model="modal.form.size_white">
                        <Option value="1">大小过滤白名单</Option>
                        <Option value="0">大小过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="最小值" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Input v-model="modal.form.size_space_low"/>
                </FormItem>
                <FormItem label="最大值" prop="password" style="margin-bottom: 0px;" v-show="size_show">
                    <Input v-model="modal.form.size_space_high"/>
                </FormItem>

                <FormItem label="文件名过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.name_check" @on-change="checkNameShow" />
                </FormItem>
                <FormItem label="文件名过滤类型" prop="password" style="margin-bottom: 0px;" v-show="name_show">
                    <Select v-model="modal.form.name_white">
                        <Option value="1">文件名过滤白名单</Option>
                        <Option value="0">文件名过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件名" prop="password" style="margin-bottom: 0px;" v-show="name_show">
                    <Input v-model="modal.form.name"/>
                </FormItem>

                <FormItem label="文件后缀过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.suffix_check" @on-change="checkSuffixShow" />
                </FormItem>
                <FormItem label="文件后缀过滤类型" prop="password" style="margin-bottom: 0px;" v-show="suffix_show">
                    <Select v-model="modal.form.suffix_white">
                        <Option value="1">文件后缀过滤白名单</Option>
                        <Option value="0">文件后缀过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件后缀" prop="password" style="margin-bottom: 0px;" v-show="suffix_show">
                    <Input v-model="modal.form.suffix"/>
                </FormItem>

                <FormItem label="文件类型过滤-黑白名单" prop="vhid" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.format_check" @on-change="checkFormatShow" />
                </FormItem>
                <FormItem label="文件类型过滤类型" prop="password" style="margin-bottom: 0px;" v-show="format_show">
                    <Select v-model="modal.form.format_white">
                        <Option value="1">文件类型过滤白名单</Option>
                        <Option value="0">文件类型过滤黑名单</Option>
                    </Select>
                </FormItem>
                <FormItem label="文件类型" prop="password" style="margin-bottom: 0px;" v-show="format_show">
                    <Input v-model="modal.form.format"/>
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
    import fileSyncFilterAdd from "./TestFileSyncFilterAdd";
    export default {
        name: "TestFileSyncFilter",
        components: {
            jk_tabs: JkTabs,fileSyncFilterAdd
        },
        data(){
            return {
                columns1: [
                    {title: '序号', key: 'id', align: 'center'},
                    {title: '病毒查杀', key: 'virus_check', align: 'center'},
                    {title: '大小过滤最小值', key: 'size_space_low', align: 'center'},
                    {title: '大小过滤最大值', key: 'size_space_high', align: 'center'},
                    {title: '文件名过滤', key: 'name', align: 'center'},
                    {title: '文件后缀', key: 'suffix', align: 'center'},
                    {title: '文件类型', key: 'format', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "文件同步过滤策略", to: "/test/fileSyncFilter"}
                ],
                modal: {
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
                    virus_check: null,
                    size_check: null,
                    name_check: null,
                    suffix_check: null,
                    format_check: null,
                },
                size_show: null,
                name_show: null,
                suffix_show: null,
                format_show: null,
                data1: [
                    {
                        "id":"proxy1",
                        "proxy_addr_str": "192.168.110.12",
                        "proxy_port": "6677",
                        "real_addr_str": "192.168.110.12",
                        "real_port": "21",
                        "vroot_dir": "/home/file/ftp/test1"
                    },
                    {
                        "id":"proxy2",
                        "proxy_addr_str": "192.168.110.12",
                        "proxy_port": "6678",
                        "real_addr_str": "192.168.110.12",
                        "real_port": "21",
                        "vroot_dir": "/home/file/ftp/test2"
                    }
                ],
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            showProxy(){
                this.$https.fetchGet(this.$api.test.policyInfo.url).then((resp) => {
                    console.log(resp);
                    this.data1 = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },

            deleteFtpProxy(index) {
                this.$Modal.confirm({
                    title: '删除配置',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.test.delPolicy.url, {key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Message.info('配置删除失败');
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
                this.data1[index].virus_check == 0 ? this.modal.form.virus_check = false : this.modal.form.virus_check = true;
                this.data1[index].size_check == 0 ? this.modal.form.size_check = false : this.modal.form.size_check = true;
                this.modal.form.size_white = this.data1[index].size_white;
                this.modal.form.size_space_low = this.data1[index].size_space_low;
                this.modal.form.size_space_high = this.data1[index].size_space_high;
                this.data1[index].name_check == 0 ? this.modal.form.name_check = false : this.modal.form.name_check = true;
                this.modal.form.name_white = this.data1[index].name_white;
                this.modal.form.name = this.data1[index].name;
                this.data1[index].suffix_check == 0 ? this.modal.form.suffix_check = false : this.modal.form.suffix_check = true;
                this.modal.form.suffix_white = this.data1[index].suffix_white;
                this.modal.form.suffix = this.data1[index].suffix;
                this.data1[index].format_check == 0 ? this.modal.form.format_check= false : this.modal.form.format_check = true;
                this.modal.form.format_white = this.data1[index].format_white;
                this.modal.form.format = this.data1[index].format;

                if(this.modal.form.size_check) {this.size_show = true}
                if(this.modal.form.name_check) {this.name_show = true}
                if(this.modal.form.suffix_check) {this.suffix_show = true}
                if(this.modal.form.format_check) {this.format_show = true}
            },

            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },
            addPlatForm() {
                this.modal.form.virus_check == false ? this.modal.form.virus_check = "0" : this.modal.form.virus_check = "1";
                this.modal.form.size_check == false ? this.modal.form.size_check = "0" : this.modal.form.size_check = "1";
                this.modal.form.name_check == false ? this.modal.form.name_check = "0" : this.modal.form.name_check = "1";
                this.modal.form.suffix_check == false ? this.modal.form.suffix_check = "0" : this.modal.form.suffix_check = "1";
                this.modal.form.format_check == false ? this.modal.form.format_check = "0" : this.modal.form.format_check = "1";

                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.test.updatePolicy.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '配置修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '配置修改失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            },
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
        }
    }
</script>

<style scoped>
</style>