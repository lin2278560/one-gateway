<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="update(row.name)">修改</Button>
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "TestFtpProxyParameter",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                columns1: [
                    {title: '名称', key: 'name', align: 'center'},
                    {title: '内容', key: 'content', align: 'center'},
                    {title: '默认内容', key: 'default_content', align: 'center', className: "default_content"},
                    {title: '说明', key: 'explain', align: 'center'},
                    {title: '操作', slot: 'action', width: 150, align: 'center'}
                ],
                updateVal: null,
                links: [
                    {name: "FTP代理参数配置", to: "/test/ftpProxyParameter"}
                ],
                val: null,
                data1: [
                    {
                        "name":"buffer_size",
                        "content": "",
                        "default_content": "32KB",
                        "explain": "BufferSize",
                    },
                    {
                        "name":"debug_level",
                        "content": "",
                        "default_content": "debug",
                        "explain": "DEBUG级别",
                    },
                    {
                        "name":"work_num",
                        "content": "",
                        "default_content": "2",
                        "explain": "CPU核数",
                    },
                    {
                        "name":"work_cpu_start",
                        "content": "",
                        "default_content": "-1",
                        "explain": "CPU起始",
                    },
                    {
                        "name":"xmit_srv_str",
                        "content": "",
                        "default_content": "127.0.0.1",
                        "explain": "发送侦听IP",
                    },
                    {
                        "name":"xmit_srv_port",
                        "content": "",
                        "default_content": "6688",
                        "explain": "发送侦听端口",
                    },
                    {
                        "name":"check_srv_str",
                        "content": "",
                        "default_content": "127.0.0.1",
                        "explain": "过滤侦听IP",
                    },
                    {
                        "name":"check_srv_port",
                        "content": "",
                        "default_content": "28403",
                        "explain": "过滤侦听端口",
                    },
                    {
                        "name":"check_enable",
                        "content": "",
                        "default_content": "启用",
                        "explain": "是否启用过滤",
                    },
                    {
                        "name":"task_json_file",
                        "content": "",
                        "default_content": "/opt/wsgap_frelease/task.json",
                        "explain": "任务配置",
                    },
                    {
                        "name":"proxy_json_file",
                        "content": "",
                        "default_content": "/opt/wsgap_frelease/proxy.json",
                        "explain": "是否启用过滤",
                    }
                ]
            }
        },
        mounted: function() {
            this.showIpAddr();
        },
        methods: {
            showIpAddr(){
                this.$https.fetchGet(this.$api.test.proxydInfo.url).then((resp) => {
                    for(let v in resp.data.data){
                        // console.log(resp.data.data[v]);
                        for(let i in this.data1) {
                            if (this.data1[i].name == v) {
                                this.data1[i].content = resp.data.data[v];
                            }
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            update (index) {
                this.$Modal.confirm({
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: this.value,
                                autofocus: true,
                                placeholder: 'Please enter your value...'
                            },
                            on: {
                                input: (val) => {
                                    this.val = val;
                                }
                            }
                        })
                    },
                    onOk: () => {
                        let formData = new FormData();

                        formData.append("key", index);
                        formData.append("value", this.val);
                        // this.value = val;
                        this.$https.fetchPost(this.$api.test.updateProxyd.url, formData).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '代理参数修改成功', desc: "正在刷新界面", duration: 2.5});
                                location.reload();
                            } else
                                this.$Notice.error({title: '代理参数修改失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped lang="less">
    .ivu-table-row-hover td {
        background-color: white !important;
    }
</style>