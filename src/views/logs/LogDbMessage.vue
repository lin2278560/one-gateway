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
                        <div style="display:flex; flex-wrap: wrap">
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                业务名：
                                <Select clearable style="width:170px" v-model="DegServiceName" @click.native="getDegServiceNames()">
                                    <Option v-for="item in DegServiceNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;&nbsp; 服务名：
                                <!-- <Input v-model="serviceName" style="width: 170px;" /> -->
                                <Select clearable style="width:170px" v-model="serviceName" @click.native="messagegetDegBusinessNames()">
                                    <Option v-for="item in DegBusinessNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                加载表名：
                                <!-- <Input v-model="serviceName" style="width: 170px;" /> -->
                                <Select clearable style="width:170px" v-model="DegLoadTableName" @click.native="messagegetDegLoadTableNames()">
                                    <Option v-for="item in DegLoadTableNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp; 等级：
                                <Select clearable v-model="level" style="width:170px">
                                    <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.value }}</Option>
                                </Select>
                            </div>
                            
                            <div style="margin:5px;font-size: 12px;">
                                时间范围：
                                <DatePicker v-model="times" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 290px;margin:5px;"></DatePicker>
                                <Button :loading="searchLoading" style="margin-left:15px;" type="warning" @click="search()">查询</Button>
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
        name: "LogDbMessage",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                searchLoading:false,
                DegLoadTableNames:'',
                DegLoadTableName:'',
                levelList:[
                    {value:0},
                    {value:1},
                    {value:3},
                ],
                DegBusinessNames:'',
                DegBusinessName:'',
                serviceName:'',
                event:'',
                level:null,
                degServiceName:'',
                DegDiretion:'',
                DegDiretions:[],
                DegServiceName:'',
                DegServiceNames:'',
                //查询时间区间
                times:[],
                columns: [
                    {title: '序号', key: '', align: 'center',width: 63,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '业务名', align: 'center',key: 'degBusinessName'},
                    {title: '服务名', align: 'center',key: 'degServiceName'},
                    {title: '业务流程', align: 'center',key: 'degBusinessProcess'},
                    {title: '加载表名', align: 'center',key: 'degLoadTableName'},
                    {title: '事件', align: 'center',key: 'degEvent'},
                    {title: '消息内容', align: 'center',key: 'degMessageContent',
                        render: (h, params) => {
                            let texts=params.row.degMessageContent;   //这里的params.row.degMessageContent  是  key值
                            if(params.row.degMessageContent !=null){
                                if(params.row.degMessageContent.length>15){
                                texts=params.row.degMessageContent.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.degMessageContent
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
                                },params.row.degMessageContent)
                                ])
                            ])
                        }
                    },
                    {title: '等级', align: 'center',key: 'degLevel',width:'60px'},
                    {title: '时间', align: 'center',key: 'degTime',
                    // render: (h, params) => {
                    //     return h('div',
                    //         this.$util.time_format(new Date(params.row.time), 'yyyy-MM-dd hh:mm:ss')
                    //     )
                    // }
                    },
                    // {title: '配置时间', align: 'center',key: ''}
                ],
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],
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
                            {
                                filed:"",
                                type:"",
                                params:""
                            },   
                        ],
                        sorts: [
                            {
                            filed: "degId",
                            order: false
                            }
                        ]
                    },
                },
                links: [
                    {name: "数据库基本信息日志", to: "/logs/logDbMessage"}
                ],
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            messagegetDegLoadTableNames(){
                if(this.DegLoadTableNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.messagegetDegExtractTableNames.url).then((resp) => {
                    this.DegLoadTableNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            getDegServiceNames(){
                if(this.DegServiceNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.messagegetDegServiceNames.url).then((resp) => {
                    this.DegServiceNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            messagegetDegBusinessNames(){
                if(this.DegBusinessNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.messagegetDegBusinessNames.url).then((resp) => {
                    this.DegBusinessNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.findMessage.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
                this.page =  {
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
                            {
                                filed:"",
                                type:"",
                                params:""
                            },   
                        ],
                        sorts: [
                            {
                            filed: "degId",
                            order: false
                            }
                        ]
                    },
                }
            },
            search() {
                this.resetFileters()
                for(let i in this.page.form.filters){
                    this.page.form.filters[i].type = ""
                    this.page.form.filters[i].filed = ""
                    this.page.form.filters[i].params = ""
                }
                if(this.DegServiceName){
                    this.page.form.filters[0].type = "equal"
                    this.page.form.filters[0].filed = "degServiceName"
                    this.page.form.filters[0].params = this.DegServiceName
                }
                if(this.level != null){
                    this.page.form.filters[2].params = this.level
                    this.page.form.filters[2].type = "like"
                    this.page.form.filters[2].filed = "degLevel"
                }
                if(this.DegLoadTableName){
                    this.page.form.filters[3].params = this.DegLoadTableName
                    this.page.form.filters[3].type = "equal"
                    this.page.form.filters[3].filed = "degLoadTableName"
                }
                if(this.serviceName){
                    this.page.form.filters[4].params = this.serviceName
                    this.page.form.filters[4].type = "equal"
                    this.page.form.filters[4].filed = "degBusinessName"
                }
                if(this.times[0]){
                    this.times[0] = this.$util.time_format(new Date(this.times[0]), 'yyyy-MM-dd hh:mm:ss')
                    this.times[1] = this.$util.time_format(new Date(this.times[1]), 'yyyy-MM-dd hh:mm:ss')
                    this.page.form.filters[1].type = "between"
                    this.page.form.filters[1].filed = "degTime"
                    this.page.form.filters[1].params = this.times
                }
                this.page.form.page = 1
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.findMessage.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
                    content: '<p>是否要清空全部数据库基本信息日志</p>',
                    onOk: () => {
                        this.$https.fetchPost(this.$api.log.delAllMessage.url).then((resp) => {
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
        /* display: inline-block; */
        vertical-align: middle;
        float: right;
    }

</style>