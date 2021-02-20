<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <!--                    <span style="color: #e86429;">FTP服务</span>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">强制访问控制</a>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">FTP安全代理</a>-->
                    <channel_add style="float: right" v-show="show1"></channel_add>
                </blockquote>
            </div>


            <div class="modal-body" style="height: 550px;">
                <span style="font-weight: 500;font-size: 12px;">外端通道接口列表</span>
                <Table size="small" border :columns="columns1" :data="data1" style="margin-bottom: 20px;" />
                <span style="font-weight: 500;font-size: 12px;">内端通道接口设置</span>
                <Table size="small" border :columns="columns2" :data="data2" style="margin-bottom: 20px;">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateInterface(index,row)">修改</Button>
                        <Button type="error" size="small" @click="deleteInterface(index,row)">删除</Button>
                    </template>
                </Table>
                <div>
                    <div style="font-weight: 500;font-size: 12px;">重启通道</div>
                    <Button type="primary" :loading="ButtonLoading" style="margin:10px 0" @click="restart()">点击重启</Button>
                </div>
                <div>
                <div style="font-weight: 500;font-size: 12px;">通道状态测试</div>
                    <Button type="primary" style="margin:10px 0" @click="test()">开始测试</Button>
                    <span :loading="ButtonLoading1" v-show="testtext" style="color:red;font-size:bold">命令发送成功</span>
                </div>
            </div>
        </div>
        <Drawer title="修改单向通道" v-model="modal.show" width="50%">
            <Form ref="plat_form" :rules="modal.rules" :model="modal.form"
                  :label-width="150">
                <FormItem label="内端IP地址" prop="ipaddr" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.ipaddr" />
                    <!-- <span style="color: red;">注:请填写一个IPv4或IPv6地址</span> -->
                </FormItem>
                <FormItem label="内端MAC地址" prop="macaddr" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.macaddr" />
                    <!-- <span style="color: red;">注:请填写一个IPv4或IPv6地址</span> -->
                </FormItem>
                <!-- <FormItem label="通讯端口" prop="port" style="margin-bottom: 15px;">
                    <Input v-model="modal.form.port" />
                </FormItem> -->
                <!-- <FormItem label="通讯端口2" prop="dsc" style="margin-bottom: 0px;">
                    <Input v-model="modal.form.dsc" />
                </FormItem> -->
                <FormItem>
                    <Button type="primary" @click="updateChannel">确认</Button>
                    <Button style="margin-left: 8px" @click="restmodal">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    // @ is an alias to /src
    //import Table from "@/components/JkTable.vue";
    import JkTabs from "@/components/JkTabs.vue";
    // import dbsync from "./dbsync_file_edit2";
    //import BusinessTools from "../up/BusinessTools";
    import channel_add from "./NetworkChannelAdd";

    export default {
        components: {
            jk_tabs: JkTabs,channel_add
        },
        inject: ["reload"],
        data() {
            return {
                ButtonLoading1:false,
                ButtonLoading:false,
                show1: true,
                testtext:false,
                data1: [],
                data2: [],
                modal: {
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
                            { required: true, pattern: /^[A-F0-9]{2}([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})([-:.]?[A-F0-9]{2})([-:]?[A-F0-9]{2})$/, message: '请正确输入mac地址', trigger: 'blur' }
                            
                        ],
                        ipaddr:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                    },
                },
                columns1: [
                    {title: '序号',align: 'center', size: '12',width:65,
                    render: (h, params) => {
                        return h("span", params.index + 1);
                    }},
                    {title: '网络接口', key: 'real_interface',align: 'center'},
                    {title: 'IP地址', key: 'ipaddr',align: 'center'},
                    {title: '子网掩码', key: 'subent',align: 'center'}
                ],
                columns2: [
                    {title: '序号',align: 'center', size: '12',
                    render: (h, params) => {
                        return h("span", params.index + 1);
                    }},
                    {title: '内端IP地址', key: 'ipaddr',align: 'center'},
                    {title: '内端MAC地址', key: 'macaddr',align: 'center'},
                    // {title: '通讯端口', key: 'port',align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                links: [
                    {name: "设置单向通道", to: "/network/channel"}
                ]
            }
        },
        computed: {},
        methods: {
            restmodal() {
                this.$refs['plat_form'].resetFields();
            },
            updateChannel() {
                console.log(this.modal)
                this.$https.fetchPost(this.$api.network.updateChannel.url,this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '数据修改成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '数据修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            updateInterface(index,row) {
                this.modal.show = true
                // this.modal.form = {...this.data2}
                // console.log(this.modal)
                console.log(this.data2[index])
                this.$set(this.modal.form,"id",this.data2[index].id)
                this.$set(this.modal.form,"ipaddr",this.data2[index].ipaddr)
                this.$set(this.modal.form,"port",this.data2[index].port)
                this.$set(this.modal.form,"macaddr",this.data2[index].macaddr)
            },
            deleteInterface(index,row) {
                let obj = {id: this.data2[index].id}
                console.log(obj)
                this.$Modal.confirm({
                    title: '删除通道',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.network.delChannel.url,obj).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '删除成功', duration: 2.5});
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            //开始测试
            
            test() {
                this.ButtonLoading1 = true
                this.$https.fetchPost(this.$api.network.testChannel.url).then((resp) => {
                        if (resp.data.status == 200) {
                            this.ButtonLoading1 = false
                            this.$Notice.success({title: '命令发送成功', duration: 2.5});
                            // this.testtext = true
                        } else{
                            this.ButtonLoading1 = false
                            this.$Notice.error({title: '命令发送失败', desc: "错误：" + resp.data.desc, duration: 5});
                        }    
                    }).catch(err => {
                        this.ButtonLoading1 = false
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            //重启
            restart() {
                let config = {  
                    timeout: 60 * 1000,
                }
                this.ButtonLoading = true
                this.$https.fetchPost(this.$api.data.loadChannel.url,{},config).then((resp) => {
                    if (resp.data.status == 200) {
                        this.ButtonLoading = false
                        this.$Notice.success({title: "重启成功",desc: resp.data.desc,duration: 2.5});
                    } else {
                        this.ButtonLoading = false
                        this.$Notice.error({title: "重启失败",desc: "错误:" + resp.data.desc,duration: 5});
                    }
                    }).catch(err=> {
                        this.ButtonLoading = false
                        this.$Notice.error({title: '重启失败', desc: err, duration: 5});
                    });
            },
            //获取外端数据
            getoutChannel() {
                this.$https.fetchGet(this.$api.network.showCommon.url).then((resp) => {
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
            //获取内端数据
            getinnerChannel() {
                this.$https.fetchGet(this.$api.network.showinnerCommon.url).then((resp) => {
                if (resp.data.status == 200) {
                    this.data2 = resp.data.data
                    console.log(this.data2)
                    if(this.data2.length == 0){
                        this.show1 = true
                    }else {
                        this.show1 = false
                    }
                } else
                    this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            }
        },
        mounted: function() {
            this.getoutChannel()
            this.getinnerChannel()
        },

    };
</script>
<style scoped lang="less">
</style>
