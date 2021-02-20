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
                    <div style="margin: 15px 10px;display:flex;flex-wrap: wrap;">
                        <div style="width: 28%;float: left;font-size: 12px;">
                            &nbsp;&nbsp;&nbsp; 任务名：
                            <Select style="width:170px" clearable v-model="taskName" @click.native="gettaskNames()">
                                <!-- <Option value="1">所有</Option>
                                <Option value="2">消息</Option>
                                <Option value="3">告警</Option> -->
                                <Option v-for="item in taskNames" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        </div>
                        <div style="width: 28%;float: left;font-size: 12px;">
                            文件名：
                            <Input v-model="params" style="width: 170px" />
                        </div>
                        <div style="width: 28%;float: left;font-size: 12px;">
                            操作状态：
                            <Select v-model="status" clearable @on-change="statusChange()" style="width:170px">
                                <Option v-for="item in checkData" :value="item.val" :key="item.val">{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="width: 1000px;font-size: 12px;">
                            <div style="display:flex;width:100%;align-items:center;margin-top:15px;">
                                时间范围：
                                <!-- <DatePicker v-model="times" type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px;margin:5px;"></DatePicker>
                                <TimePicker v-model="daytimes" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px;display:inline-block;margin:5px;"></TimePicker> -->
                                <DatePicker v-model="time" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 300px;margin:5px;"></DatePicker>
                                <Button :loading="searchLoading" style="margin:5px;" type="warning" @click="search()">查询</Button>
                            </div>
                        </div>
                            <!--<div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>-->
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
        name: "LogFileMonitor",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                searchLoading:false,
                taskName:'',
                time:[],
                taskNames:'',
                checkData:[{val:"-1",name:"全部"},{val:"1",name:"失败"},{val:"0",name:"成功"}],
                status:"-1",
                params:"",
                form: {
                    Oper_ID:"",
                    taskName: "",
                    SouceDirPath: "",
                    fileName:"",
                    fileSize: "",
                    startTime: "",
                    finishTime:"",
                    status: "",
                    explained: "",
                    tag:"",
                    Expand2: "",
                    Expand3: "",
                    Expand4: "",
                    Expand5: "",
                },
                columns: [
                    {title: '序号', key: '', align: 'center',width: 60,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '任务名', key: 'taskName', align: 'center'},
                    {title: '源路径', key: 'souceDirPath', align: 'center',
                        render: (h, params) => {
                            let texts=params.row.souceDirPath;   //这里的params.row.souceDirPath  是  key值
                            if(params.row.souceDirPath !=null){
                                if(params.row.souceDirPath.length>15){
                                texts=params.row.souceDirPath.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.souceDirPath
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
                                    // width:'600px',
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
                                },params.row.souceDirPath)
                                ])
                            ])
                        }
                    },
                    {title: '文件名', key: 'fileName', align: 'center',
                        render: (h, params) => {
                            let texts=params.row.fileName;   //这里的params.row.fileName  是  key值
                            if(params.row.fileName !=null){
                                if(params.row.fileName.length>15){
                                texts=params.row.fileName.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.fileName
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
                                },params.row.fileName)
                                ])
                            ])
                        }
                    },
                    {title: '文件大小', key: 'fileSize', align: 'center',
                    // render: (h, params) => {
                    //     if(params.row.fileSize > "1024"){
                    //         return h('div',
                    //             (params.row.fileSize/1024).toFixed(1)+"KB"
                    //         )
                    //     }else if(params.row.fileSize > "1048576"){
                    //         return h('div',
                    //             (params.row.fileSize/1024).toFixed(1)+"MB"
                    //         )
                    //     }else{
                    //         return h('div',
                    //             (params.row.fileSize/1024).toFixed(1)+"KB"
                    //         )
                    //     }
                    // }
                    },
                    {title: '开始时间', key: 'startTime', align: 'center',
                    render: (h, params) => {
                        return h('div',
                            this.$util.time_format(new Date(params.row.startTime), 'yyyy-MM-dd hh:mm:ss')
                        )
                    }
                    },
                    {title: '完成时间', key: 'finishTime', align: 'center',
                    render: (h, params) => {
                        return h('div',
                            this.$util.time_format(new Date(params.row.finishTime), 'yyyy-MM-dd hh:mm:ss')
                        )
                    }
                    },
                    {title: '操作状态', key: 'status', align: 'center',
                    render: (h, params) => {
                        if(params.row.status == 0){
                            return h('div',
                                "成功"
                            )
                        }else{
                            return h('div',
                                "失败"
                            )
                        } 
                    }
                    },
                    {title: '备注', key: 'explained', align: 'center'},
                    // {title: '抽取标识', key: 'tag', align: 'center',
                    // render: (h, params) => {
                    //     if(params.row.tag == "1"){
                    //         return h('div',
                    //             "已处理"
                    //         )
                    //     }else{
                    //         return h('div',
                    //             "未处理"
                    //         )
                    //     } 
                    // }
                    // }
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
                        sorts:[
                            {
                                filed:"operID",
                                order:false
                            }
                        ]
                    }
                },
                links: [
                    {name: "文件同步日志", to: "/logs/logFileMonitor"}
                ]
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            //加载任务名名
            gettaskNames(){
                if(this.taskName){
                    return
                }
                this.$https.fetchGet(this.$api.log.getTaskNames.url).then((resp) => {
                    this.taskNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.fileOperStatus.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
                this.page ={
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
                        sorts:[
                            {
                                filed:"operID",
                                order:false
                            }
                        ]
                    }
                }
            },
            search() {
                this.resetFileters()
                console.log(this.page,"this.page")
                if(this.params){
                    this.page.form.filters[0].type = "like"
                    this.page.form.filters[0].filed = "fileName"
                    this.page.form.filters[0].params = this.params
                }
                if(this.status != "-1"){
                    this.page.form.filters[1].type = "like"
                    this.page.form.filters[1].filed = "status"
                    this.page.form.filters[1].params = this.status
                }
                if(this.taskName){
                    this.page.form.filters[3].type = "equal"
                    this.page.form.filters[3].filed = "taskName"
                    this.page.form.filters[3].params = this.taskName
                }
                if(this.time[0] != ""){
                    this.time[0] = this.$util.time_format(new Date(this.time[0]), 'yyyy-MM-dd hh:mm:ss')
                    this.time[1] = this.$util.time_format(new Date(this.time[1]), 'yyyy-MM-dd hh:mm:ss')
                    this.page.form.filters[2].type = "between"
                    this.page.form.filters[2].filed = "startTime"
                    this.page.form.filters[2].params = this.time
                }
                this.page.form.page = 1
                console.log(this.page.form)
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.fileOperStatus.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
                    content: '<p>是否要清空全部文件同步操作日志</p>',
                    onOk: () => {
                        this.$https.fetchPost(this.$api.log.delAllFileOperStatusLogs.url).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '删除成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.showProxy();
                                }, 250);
                            } else
                                this.$Notice.error({
                                    title: '删除失败',
                                    desc: "错误代码：" + resp.data.desc,
                                    duration: 2.5
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