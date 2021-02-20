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
                        <div style="display:flex; flex-wrap: wrap;align-items:center">
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                管理员：
                                <!-- <Input v-model="name" style="width: auto" /> -->
                                <Select v-model="name" clearable  style="width:155px;" @click.native="getNames()">
                                    <Option v-for="item in Names" :value="item" :key="item">{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                级别：
                                <Select v-model="level" clearable style="width:155px;">
                                    <Option value="0">成功</Option>
                                    <Option value="1">失败</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;源IP：
                                <Input v-model="ipparams" style="width: auto" />
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;事件：
                                <Input v-model="eventparams"  style="width: auto" />
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                消息：
                                <Input v-model="msgparams"  style="width: auto" />
                            </div>
                            
                            <div style="margin:5px;font-size: 12px;">
                                时间范围：
                                <DatePicker v-model="times" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 280px;margin:5px;"></DatePicker>
                                <Button @click="search()" :loading="searchLoading" style="height:32px;" type="warning">查询</Button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Table size="small" border :loading="loading" :columns="columns" :data="data" style="margin-top: 30px;"/>
                <div class="foot">
                    <span class="desc" style="font-size: 13px;">查询{{total}}条，当前第{{page.form.page}}页</span>
                    <Page class="btn" @on-change="pageChange" :current="page.form.page" :total="total" :page-size="page.form.size" show-elevator />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import {formatDate} from "@/util/date";
    export default {
        name: "LogCommond",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                searchLoading:false,
                Names:'',
                level:'',
                name:'',
                msgparams:"",
                eventparams:"",
                ipparams:"",
                times:[],
                platfrom:{
                    role:'',
                },
                columns: [
                    {title: '序号', key: '', align: 'center',width: 70,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '管理员', key: 'name', align: 'center'},
                    {title: '源IP', key: 'accessIp', align: 'center'},
                    {title: '事件', key: 'title', align: 'center',
                        render:(h, params) => {
                            return h('div', [
                            h('span', {
                                style: {display: 'inline-block', 
                                        width: '100%',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', 
                                        whiteSpace: 'nowrap'},
                                domProps: {title: params.row.title},
                                on:{click:(e) => { e.stopPropagation();}}
                            }, params.row.title)
                            ]);
                        }
                    },
                    {title: '消息', key: 'desc', align: 'center',
                        render: (h, params) => {
                            let texts=params.row.desc;   //这里的params.row.desc  是  key值
                            if(params.row.desc !=null){
                                if(params.row.desc.length>15){
                                texts=params.row.desc.slice(0,14)+'...'  //进行数字截取
                                }else{
                                texts=params.row.desc
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
                                },params.row.desc)
                                ])
                            ])
                        }
                    },
                    {title: '级别', key: 'level', align: 'center', width: 90,
                        render:(h, params) => {
                            if(params.row.level == 0){
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
                    {title: '配置时间', key: 'accessTime', align: 'center'}
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
                                fieldType:"long",
                            },  
                            {
                                filed:"",
                                type:"",
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:0
                            }, 
                        ],
                        sorts: [
                            {
                            filed: "accessTime",
                            order: false
                            }
                        ]
                    },
                },

                links: [
                    {name: "管理操作日志", to: "/logs/logCommond"}
                ]
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            // rowclick(data,index){
                
            //     // console.log(data,index)
            // },
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
                                fieldType:"long",
                            },  
                            {
                                filed:"",
                                type:"",
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:0
                            }, 
                        ],
                        sorts: [
                            {
                            filed: "accessTime",
                            order: false
                            }
                        ]
                    },
                }
            },
            search() {
                this.resetFileters()
                if(this.ipparams){
                    this.page.form.filters[0].type = "like"
                    this.page.form.filters[0].filed = "accessIp"
                    this.page.form.filters[0].params = this.ipparams
                }
                if(this.eventparams){
                    this.page.form.filters[1].params = this.eventparams
                    this.page.form.filters[1].type = "like"
                    this.page.form.filters[1].filed = "title"
                }
                if(this.name){
                    this.page.form.filters[4].params = this.name
                    this.page.form.filters[4].type = "equal"
                    this.page.form.filters[4].filed = "name"
                }
                
                this.page.form.filters[5].params = this.level
                if(!this.page.form.filters[5].params){
                    this.page.form.filters[5].params = 0
                }
                this.page.form.filters[5].type = "equal"
                this.page.form.filters[5].filed = "level"
                if(this.times[0] != ""){
                    this.times[0] = this.times[0].getTime();
                    this.times[1] = this.times[1].getTime();
                    this.page.form.filters[3].type = "between"
                    this.page.form.filters[3].filed = "accessTime"
                    this.page.form.filters[3].params = this.times
                }
                this.page.form.page = 1
                console.log(this.page.form)
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.operationLog.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
                    this.searchLoading = false
                    this.loading = false
                    this.data = resp.data.data.data;
                    this.total = resp.data.data.count;
                    for(var i in this.data) {
                        this.data[i].accessTime = this.formatDate(this.data[i].accessTime )
                    }
                    this.$Notice.success({title: '查询成功', desc: "", duration: 2.5});
                }).catch(err => {
                    console.log(err)
                    this.searchLoading = false
                    this.loading = false
                })
            },
            //获取任务名
            getNames(){
                if(this.Names){
                    return
                }
                this.$https.fetchGet(this.$api.log.getNames.url).then((resp) => {
                    this.Names = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.operationLog.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
                    this.data = resp.data.data.data;
                    this.total = resp.data.data.count;
                    this.loading = false
                    for(var i in this.data) {
                        this.data[i].accessTime = this.formatDate(this.data[i].accessTime )
                    }
                }).catch(err => {this.loading = false
                    console.log(err)

                })
            },
            pageChange(page){
                this.page.form.page = page;
                this.showProxy();
            },
            formatDate(time) {
                var date = new Date(time);
                return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
            },
            clearAll(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<p>是否要清空全部管理操作日志</p>',
                    onOk: () => {
                        this.$https.fetchGet(this.$api.log.delOperationLog.url).then((resp) => {
                            if (resp.data.status == 200) {
                                console.log(resp)
                                this.$Notice.success({title: '删除成功', desc: "正在刷新界面", duration: 2.5});
                                setTimeout(() => {
                                    this.showProxy()
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