<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <ipormac_add style="float: right"></ipormac_add>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateIpMac(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteIpMac(row.id,index)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>
        <Drawer title="编辑IP/MAC绑定" v-model="platForm.show" width="50%">
            <div style="margin-left:80px;color:red;">注意，如果您填写的IP地址与MAC地址不是您现在使用电脑相匹配的地址，修改成功后系统会退回登陆界面</div>
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="120">
                <FormItem label="IP地址" prop="ipaddr" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.ipaddr" style="width: 100%;" />
                </FormItem>
                <FormItem label="MAC地址" prop="mac" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.mac" style="width: 100%;" />
                </FormItem>
                <FormItem label="描述" prop="desc" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.desc" style="width: 100%;" />
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
    import ipormac_add from "./NetworkIpOrMacAdd";
    export default {
        name: "NetworkIpOrMac",
        components: {
            jk_tabs: JkTabs,ipormac_add
        },
        inject: ["reload"],
        data(){
            return {
                columns1: [
                    {title: '序号', key: '', align: 'center',width: 63,
                    render: (h, params) => {
                        return h(
                            "span", params.index + 1
                        );
                    }},
                    {title: '描述',align: 'center', key: 'desc'},
                    {title: 'IP地址',align: 'center', key: 'ipaddr'},
                    {title: 'MAC地址',align: 'center', key: 'mac'},
                    {title: '操作',align: 'center',slot: 'action'}
                ],
                links: [
                    {name: "IP/MAC绑定", to: "/network/ipormac"}
                ],
                platForm: {
                    show: false,
                    form: {
                        ipaddr:'',
                        mac:'',
                        desc:''
                    },
                    rules: {
                        mac:{ required: true,message: '请填写mac地址'},
                        ipaddr:{ required: true,pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)|(^$)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                    }
                },
                data1:[],
            }
        },
        mounted: function() {
            this.getinfo()
        },
        methods: {
            getinfo(){
                this.$https.fetchGet(this.$api.network.findIpMac.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data)
                    this.data1 = resp.data.data
                } else
                    this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.platForm.show = true;
            },
            updateIpMac(index) {
                this.platForm.show = true;
                this.platForm.form.desc = this.data1[index]["desc"];
                this.platForm.form.id = this.data1[index]["id"]
                this.platForm.form.ipaddr = this.data1[index]["ipaddr"];
                this.platForm.form.mac = this.data1[index]["mac"];
            },
            deleteIpMac(index,row) {
                console.log(index,row)
                this.$Modal.confirm({
                    title: '删除ip/mac规则',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchPost(this.$api.network.delIpMac.url,{key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: 'ip/mac删除成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: 'ip/mac删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            addPlatForm() {
               this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                        console.log(this.platForm.form)
                        this.$https.fetchPost(this.$api.network.updateIpMac.url,this.platForm.form).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: 'ip/mac修改成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.reload();
                                }, 250);
                            } else
                                this.$Notice.error({title: 'ip/mac修改失败', desc: "错误：" + resp.data.desc, duration: 5});
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
    }
</script>

<style scoped>
</style>