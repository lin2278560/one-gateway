<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <taskConfig style="float: right"></taskConfig>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateFtpProxy(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteFtpProxy(row.id)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>


        <Drawer title="FTP代理配置" v-model="modal.show" width="1000">
            <Form ref="info_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="业务名" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="modal.business_name" />
                </FormItem>
                <FormItem label="服务名" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="modal.service_name" />
                </FormItem>
                <FormItem label="任务名" prop="password" style="margin-bottom: 0px;">
                    <Input disabled v-model="modal.form.task_name" />
                </FormItem>
                <FormItem label="任务ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.task_id" />
                </FormItem>
                <FormItem label="目标任务ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.dst_task_id" />
                </FormItem>
                <FormItem label="根目录" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.root_dir" />
                </FormItem>
                <FormItem label="同步后源文件处理方式" prop="password" style="margin-bottom: 0px;">
                    <Select v-model="modal.form.sync_type">
                        <Option value="none">不做处理</Option>
                        <Option value="copy">复制到...</Option>
                        <Option value="delete">同步后删除</Option>
                    </Select>
                </FormItem>
                <FormItem label="目标端文件冲突处理方式" prop="password" style="margin-bottom: 0px;">
                    <Select v-model="modal.form.wr_policy">
                        <Option value="direct">不做处理</Option>
                        <Option value="update">覆盖</Option>
                        <Option value="omit">忽略</Option>
                        <Option value="rename">重命名</Option>
                    </Select>
                </FormItem>
                <FormItem label="复制到..." prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.cp_root" />
                </FormItem>
                <FormItem label="同步子目录" prop="password" style="margin-bottom: 0px;">
                    <Checkbox v-model="modal.form.recurse_disable" />
                </FormItem>
                <FormItem label="过滤策略ID" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.policy_id" />
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
    import taskConfig from "./TestTaskConfigAdd";
    export default {
        name: "TestTaskConfig",
        components: {
            jk_tabs: JkTabs,taskConfig
        },
        data(){
            return {
                columns1: [
                    {title: '任务名', key: 'task_name', align: 'center'},
                    {title: '任务ID', key: 'task_id', align: 'center'},
                    {title: '目标ID', key: 'dst_task_id', align: 'center'},
                    {title: '根目录', key: 'root_dir', align: 'center'},
                    {title: '同步后源文件处理方式', key: 'sync_type', align: 'center', tooltip: true},
                    {title: '目标端文件冲突处理方式', key: 'wr_policy', align: 'center', ellipsis: true},
                    {title: '复制到...', key: 'cp_root', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "任务配置", to: "/test/taskConfig"}
                ],
                modal: {
                    show: false,
                    business_name: null,
                    service_name: null,
                    form: {
                        id: null,
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
                },
                data1: [
                    {
                        "task_name": "my_task1",
                        "task_id": "1234",
                        "dst_task_id": "4567",
                        "root_dir": "/disk/ftp/",
                        "sync_type": "deletedeletedeletedeletedeletedelete",
                        "wr_policy": "update",
                        "cp_root": "/home/tc/",
                        "recurse_disable":"1",
                        "policy_id":"-1"
                    }
                ],
            }
        },
        mounted: function() {
            // this.showProxy();
        },
        methods: {
            showProxy(){
                this.$https.fetchGet(this.$api.test.taskInfo.url).then((resp) => {
                    console.log(resp);
                    this.data1 = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },

            deleteFtpProxy(index) {
                this.$Modal.confirm({
                    title: '删除任务配置',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.test.delTask.url, {key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Message.info('任务配置删除失败');
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
                this.modal.form.task_name = this.data1[index].task_name;
                this.modal.form.task_id = this.data1[index].task_id;
                this.modal.form.dst_task_id = this.data1[index].dst_task_id;
                this.modal.form.root_dir = this.data1[index].root_dir;
                this.modal.form.sync_type = this.data1[index].sync_type;
                this.modal.form.wr_policy = this.data1[index].wr_policy;
                this.modal.form.cp_root = this.data1[index].cp_root;
                // this.modal.form.recurse_disable = this.data1[index].recurse_disable;
                this.modal.form.policy_id = this.data1[index].policy_id;

                if(this.data1[index].recurse_disable == 0) {
                    this.modal.form.recurse_disable = false
                }else {
                    this.modal.form.recurse_disable = true
                }
            },

            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },
            addPlatForm() {
                if(this.modal.business_name != null && this.modal.service_name != null) {
                    this.modal.form.task_name = this.modal.business_name + "_" + this.modal.service_name;
                }
                this.modal.form.recurse_disable == false ? this.modal.form.recurse_disable = "0" : this.modal.form.recurse_disable = "1";
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.test.updateTask.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '任务配置修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '任务配置修改失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
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