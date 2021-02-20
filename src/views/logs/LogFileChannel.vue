<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <Button @click="clearAll()" style="margin-right:15px;float:right;font-size:13px;" type="warning">清空日志</Button>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">查询条件</span>
                    <div style="margin: 15px 10px;">
                        <div style="display:flex;flex-wrap: wrap;align-items:center;">
                            <div style="width: 250px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;业务ID：
                                <!-- <Select style="width:170px">
                                    <Option value="1">所有</Option>
                                    <Option value="2">消息</Option>
                                    <Option value="3">告警</Option>
                                </Select> -->
                                <Input  v-model="serviceID" style="width: 170px;" />
                            </div>
                            <div style="width: 250px;font-size: 12px;">
                                描述：
                                <Input  v-model="desc" style="width: 170px;" />
                            </div>
                            <div style="width: 500px;font-size: 12px;">
                            <div style="display:flex;width:100%;align-items:center;">
                                时间范围：
                                <DatePicker v-model="times" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 280px;margin:5px;"></DatePicker>
                                <Button :loading="searchLoading" style="margin:5px;" type="warning" @click="search()">查询</Button>
                            </div>
                        </div>
                        </div>
                        
                    </div>
                </div>
                <Table size="small" border :loading="loading" :columns="columns" :data="data" style="margin-top: 30px;"/>
                <div class="foot">
                    <span class="desc" style="font-size: 13px;">查询{{total}}条，当前第{{page.form.page}}页</span>
                    <Page class="btn" @on-change="pageChange" :current="page.form.page" :total="total" :page-size="page.form.size" simple/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "LogDbChannel",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                searchLoading:false,
                serviceID:'',
                times:[],
                desc:'',
                columns: [
                    {title: '序号', key: 'id', align: 'center',width: 63,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }
                    },
                    {title: '业务ID', key: 'taskID', align: 'center',width:180},
                    {title: '描述', key: 'desc', align: 'center'},
                    {title: '时间', key: 'time', align: 'center',width:210,
                    render: (h, params) => {
                        return h('div',
                            this.$util.time_format(new Date(params.row.time), 'yyyy-MM-dd hh:mm:ss')
                        )
                    }}
                ],
                loading: false,
                data: [],
                total: 0,
                page: {
                    form: {
                        page: 1,
                        size: 10,
                        filters:[
                            {
                                filed:"",
                                type:"",
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:"",
                                fieldType:"datetime",
                            },
                            {
                                filed:"",
                                type:"",
                                params:""
                            },   
                        ],
                        sorts: [
                            {
                            filed: "time",
                            order: false
                            }
                        ]
                    },
                },
                links: [
                    {name: "通道操作日志", to: "/logs/logFileChannel"}
                ]
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.channelLog.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
                    console.log(resp.data.data);
                    this.data = resp.data.data.data;
                    this.total = resp.data.data.count;
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
            },
            pageChange(page){
                // console.log(page)
                this.page.form.page = page;
                this.showProxy();
            },
            //重置排序条件
            resetFileters(){
                this.page = {
                    form: {
                        page: 1,
                        size: 10,
                        filters:[
                            {
                                filed:"",
                                type:"",
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:"",
                                fieldType:"datetime",
                            },
                            {
                                filed:"",
                                type:"",
                                params:""
                            },   
                        ],
                        sorts: [
                            {
                            filed: "time",
                            order: false
                            }
                        ]
                    },
                }
            },
            search() {
                this.resetFileters()
                if(this.desc){
                    this.page.form.filters[0].type = "like"
                    this.page.form.filters[0].filed = "desc"
                    this.page.form.filters[0].params = this.desc
                }
                if(this.serviceID){
                    this.page.form.filters[2].type = "equal"
                    this.page.form.filters[2].filed = "taskID"
                    this.page.form.filters[2].params = this.serviceID
                }
                if(this.times[0] != ""){
                    this.times[0] = this.$util.time_format(new Date(this.times[0]), 'yyyy-MM-dd hh:mm:ss')
                    this.times[1] = this.$util.time_format(new Date(this.times[1]), 'yyyy-MM-dd hh:mm:ss')
                    this.page.form.filters[1].type = "between"
                    this.page.form.filters[1].filed = "time"
                    this.page.form.filters[1].params = this.times
                }
                this.page.form.page = 1
                console.log(this.page.form)
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.channelLog.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
                    this.searchLoading = false
                    this.loading = false
                    console.log(resp.data.data);
                    this.data = resp.data.data.data;
                    this.total = resp.data.data.count;
                    this.$Notice.success({title: '查询成功', desc: "", duration: 2.5});
                }).catch(err => {
                    console.log(err)
                    this.searchLoading = false
                    this.loading = false
                })
            },
            clearAll(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<p>是否要清空全部通道操作日志</p>',
                    onOk: () => {
                        this.$https.fetchPost(this.$api.log.delAllChannelLogs.url).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '删除成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.showProxy();
                                }, 250);
                            } else
                                this.$Notice.error({
                                    title: '删除失败',
                                    desc: "错误：" + resp.data.desc,
                                    duration: 5
                                });
                        }).catch(err => {
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        });
                    }
                });
            },
        }
    }
</script>

<style scoped>

    .ivu-btn-warning {
        color: #fff;
        background-color: #e66534;
        border-color: #e66534;
    }

    .foot {
        padding: 16px 0;
    }

    .desc {
        display: inline-block;
        vertical-align: middle;
    }

    .btn {
        vertical-align: middle;
        float: right
    }

</style>