<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <ftpProxyAdd style="float: right"></ftpProxyAdd>
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
                <input type="hidden" v-model="modal.form.id">
                <FormItem label="代理IP" prop="subnet" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.proxy_addr_str" />
                </FormItem>
                <FormItem label="代理端口" prop="vhid" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.proxy_port" />
                </FormItem>
                <FormItem label="服务器IP" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.real_addr_str" />
                </FormItem>
                <FormItem label="服务器端口" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.real_port" />
                </FormItem>
                <FormItem label="服务器根目录" prop="password" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.vroot_dir" />
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
    import ftpProxyAdd from "./TestFtpProxyAdd";
    export default {
        name: "TestFtpProxy",
        components: {
            jk_tabs: JkTabs,ftpProxyAdd
        },
        data(){
            return {
                columns1: [
                    {title: '序号', key: 'id', align: 'center'},
                    {title: '代理IP', key: 'proxy_addr_str', align: 'center'},
                    {title: '代理端口', key: 'proxy_port', align: 'center'},
                    {title: '服务器IP', key: 'real_addr_str', align: 'center'},
                    {title: '服务器端口', key: 'real_port', align: 'center'},
                    {title: '服务器根目录', key: 'vroot_dir', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "FTP代理配置", to: "/test/ftpProxy"}
                ],
                modal: {
                    show: false,
                    form: {
                        id: null,
                        proxy_addr_str: null,
                        proxy_port: null,
                        real_addr_str: null,
                        real_port: null,
                        vroot_dir: null
                    }
                },
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
                this.$https.fetchGet(this.$api.test.proxyInfo.url).then((resp) => {
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
                        this.$https.fetchGet(this.$api.test.delProxy.url, {key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                location.reload();
                            } else {
                                this.$Modal.remove();
                                this.$Message.info('代理配置删除失败');
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
                this.modal.form.proxy_addr_str = this.data1[index].proxy_addr_str;
                this.modal.form.proxy_port = this.data1[index].proxy_port;
                this.modal.form.real_addr_str = this.data1[index].real_addr_str;
                this.modal.form.real_port = this.data1[index].real_port;
                this.modal.form.vroot_dir = this.data1[index].vroot_dir;
            },

            restPlatForm() {
                this.$refs['info_form'].resetFields();
            },
            addPlatForm() {
                this.$refs['info_form'].validate((valid) => {
                    if (!valid)
                        return;
                    this.$https.fetchPost(this.$api.test.updateProxy.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '代理配置修改成功', desc: "正在刷新界面", duration: 2.5});
                            location.reload();
                        } else
                            this.$Notice.error({title: '代理配置修改失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
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