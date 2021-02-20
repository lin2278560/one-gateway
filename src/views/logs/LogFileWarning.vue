<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <Button style="margin-right:15px;float:right;font-size:13px;" @click="clearAll" type="warning">清空日志</Button>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">查询条件</span>
                    <div style="margin: 15px 10px;">
                        <div style="display:flex;flex-wrap: wrap">
                            <div style="width: 28%;margin:10px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp; 业务ID：
                                <Select style="width:170px" clearable v-model="taskID" @click.native="gettaskIDs()">
                                    <Option v-for="item in taskIDs" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:10px;font-size: 12px;">
                                告警模块：
                                <Select style="width:170px" clearable v-model="Model" >
                                    <Option value="5">文件过滤</Option>
                                    <Option value="6">病毒扫描</Option>
                                    <Option value="7">文件同步</Option>
                                    <Option value="8">文件名过滤</Option>
                                    <Option value="9">恶意代码检测</Option>
                                    <Option value="10">通道</Option>
                                    <Option value="11">安全代理</Option>
                                    <Option value="12">客户身份认证</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:10px;font-size: 12px;">
                                告警级别：
                                <Select v-model="level" style="width:170px" clearable>
                                    <Option value="0">告警</Option>
                                    <Option value="1">错误</Option>
                                </Select>
                            </div>
                            <!-- <div style="width: 28%;margin:10px;font-size: 12px;">
                                IP地址：
                                <Input v-model="ipaddr" style="width: 170px;" />
                            </div> -->
                            <!-- <div style="width: 28%;margin:10px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;描述：
                                <Input style="width: 170px;" />
                            </div> -->
                            <div style="width: 500px; margin:10px;font-size: 12px;">
                                时间范围：
                                <DatePicker v-model="time" type="daterange" placement="bottom-end" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" style="width: 300px"></DatePicker>
                                <Button :loading="searchLoading" style="margin-left:15px;" @click="search" type="warning">查询</Button>
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
        name: "LogFileWarning",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                searchLoading:false,
                columns: [
                    {title: '序号', key: '', align: 'center',width: 72,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '业务ID', align: 'center',key: 'taskID'},
                    // {title: '设备IP', align: 'center',key: 'ipaddr'},
                    {title: '消息', align: 'center',key: 'msg',
                        render: (h, params) => {
                            let texts=params.row.msg;   //这里的params.row.msg  是  key值
                            if(params.row.msg !=null){
                                if(params.row.msg.length>15){
                                texts=params.row.msg.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.msg
                                }
                            }
                            return h('div', [
                                h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    transfer: true,
                                    maxWidth:"350"
                                }
                                },[texts,h('span',{
                                slot:'content',
                                style:{
                                    whiteSpace:'normal'
                                },
                                on: {
                                    click: () => {
                                        this.$copyText(texts).then(
                                        () => {
                                            this.$Notice.success({title: '内容黏贴成功', duration: 2.5});
                                        })
                                    }
                                }
                                },params.row.msg)
                                ])
                            ])
                        }
                    },
                    {title: '事件', align: 'center',key: 'event',
                        render: (h, params) => {
                            let texts=params.row.event;   //这里的params.row.event  是  key值
                            if(params.row.event !=null){
                                if(params.row.event.length>15){
                                texts=params.row.event.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.event
                                }
                            }
                            return h('div', [
                                h('Tooltip', {
                                props: {
                                    placement: 'top',
                                    transfer: true,
                                    maxWidth:"350"
                                }
                                },[texts,h('span',{
                                slot:'content',
                                style:{
                                    whiteSpace:'normal'
                                },
                                on: {
                                    click: () => {
                                        this.$copyText(texts).then(
                                        () => {
                                            this.$Notice.success({title: '内容黏贴成功', duration: 2.5});
                                        })
                                    }
                                }
                                },params.row.event)
                                ])
                            ])
                        }
                    },
                    {title: '告警级别', align: 'center',key: 'level',
                        render:(h, params) => {
                            if(params.row.level == 0){
                                return h('div', [
                                    h('span', {
                                        },"告警")
                                    ]);
                            }else{
                                return h('div', [
                                    h('span', {
                                        }, "错误")
                                    ]);
                            }
                            
                        }
                    },
                    {title: '状态', align: 'center',key: 'status',
                        render:(h, params) => {
                            if(params.row.status == 0){
                                return h('div', [
                                    h('span', {
                                        },"成功")
                                    ]);
                            }else{
                                return h('div', [
                                    h('span', {
                                        }, "失败")
                                    ]);
                            }
                            
                        }
                    },
                    {title: '告警模块', align: 'center',key: 'type',
                        render:(h, params) => {
                            if(params.row.type == 5){
                                return h('div', [
                                    h('span', {
                                        },"文件过滤")
                                    ]);
                            }else if(params.row.type == 6){
                                return h('div', [
                                    h('span', {
                                        }, "病毒扫描")
                                    ]);
                            }else if(params.row.type == 7){
                                return h('div', [
                                    h('span', {
                                        }, "文件同步")
                                    ]);
                            }else if(params.row.type == 8){
                                return h('div', [
                                    h('span', {
                                        }, "文件名过滤")
                                    ]);
                            }else if(params.row.type == 9){
                                return h('div', [
                                    h('span', {
                                        }, "恶意代码检测")
                                    ]);
                            }else if(params.row.type == 10){
                                return h('div', [
                                    h('span', {
                                        }, "通道")
                                    ]);
                            }else if(params.row.type == 11){
                                return h('div', [
                                    h('span', {
                                        }, "安全代理")
                                    ]);
                            }else if(params.row.type == 12){
                                return h('div', [
                                    h('span', {
                                        }, "客户身份认证")
                                    ]);
                            }
                            
                        }
                    },
                    {title: '告警时间', align: 'center',key: 'time'}
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
                    {name: "告警日志", to: "/logs/logFileWarning"}
                ],
                Model:'',
                taskID:'',
                taskIDs:[],
                ipaddr:'',
                level:'',
                time:[],
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            
            //加载任务名名
            gettaskIDs(){
                if(this.taskID){
                    return
                }
                this.$https.fetchGet(this.$api.log.getWarningTaskIds.url).then((resp) => {
                    this.taskIDs = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.findFileWarningOperStatus.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
                            {
                                filed:"",
                                type:"",
                                params:""
                            },   
                        ],
                        sorts:[
                            {
                                filed:"time",
                                order:false
                            }
                        ]
                    }
                }
            },
            search() {
                this.resetFileters()
                if(this.level){
                    this.page.form.filters[0].type = "equal"
                    this.page.form.filters[0].filed = "level"
                    this.page.form.filters[0].params = this.level
                }
                if(this.Model){
                    this.page.form.filters[2].type = "equal"
                    this.page.form.filters[2].filed = "type"
                    this.page.form.filters[2].params = this.Model
                }
                if(this.taskID){
                    this.page.form.filters[3].type = "equal"
                    this.page.form.filters[3].filed = "taskID"
                    this.page.form.filters[3].params = this.taskID
                }
                if(this.time[0] != ""){
                    this.time[0] = this.$util.time_format(new Date(this.time[0]), 'yyyy-MM-dd hh:mm:ss')
                    this.time[1] = this.$util.time_format(new Date(this.time[1]), 'yyyy-MM-dd hh:mm:ss')
                    this.page.form.filters[1].type = "between"
                    this.page.form.filters[1].filed = "time"
                    this.page.form.filters[1].params = this.time
                }
                this.page.form.page = 1
                console.log(this.page.form)
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.findFileWarningOperStatus.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
            statusChange(val){
                // console.log(val)
                // console.log(this.status)
            },
            clearAll(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<p>是否要清空全部告警日志</p>',
                    onOk: () => {
                        this.$https.fetchGet(this.$api.log.delWarningLog.url).then((resp) => {
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
        float: right;
    }

</style>