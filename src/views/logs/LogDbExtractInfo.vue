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
                        <div style="display:flex;flex-wrap: wrap">
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                &nbsp;&nbsp;&nbsp;&nbsp; 业务名：
                                <Select clearable style="width:170px;" v-model="BusinessName" @click.native="getBusinessNames()">
                                    <Option v-for="item in BusinessNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                服务名：
                                <Select clearable style="width:170px;" v-model="DegServiceName" @click.native="getDegServiceNames()">
                                    <Option v-for="item in DegServiceNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <div style="width: 28%;margin:5px;font-size: 12px;">
                                抽取表名：
                                <Select clearable style="width:170px;" v-model="ExtractTableName" @click.native="getExtractTableNames()">
                                    <Option v-for="item in ExtractTableNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div>
                            <!-- <div style="width: 28%;margin:5px;font-size: 12px;">
                                加载表名：
                                <Select clearable style="width:170px;" v-model="LoadTableName" @click.native="getLoadTableNames()">
                                    <Option v-for="item in LoadTableNames" :value="item" :key="item" >{{ item }}</Option>
                                </Select>
                            </div> -->
                            <div style="margin:5px;font-size: 12px;">
                                时间范围：
                                <DatePicker v-model="times" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="选择时间" style="width: 290px;margin:5px;"></DatePicker>
                                <Button :loading="searchLoading" @click="search()" style="margin-left:15px;" type="warning">查询</Button>
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
        name: "LogDbExtractInfo",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                searchLoading:false,
                times:'',
                columns: [
                    {title: '序号', key: '', align: 'center',width: 60,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '业务名', align: 'center',key: 'degBusinessName'},
                    {title: '服务名', align: 'center',key: 'degServiceName'},
                    {title: '抽取表名', align: 'center',key: 'degExtractTableName'},
                    {title: '插入记录数', align: 'center',key: 'degInsertCount',width:'85px'},
                    {title: '更新记录数', align: 'center',key: 'degUpdateCount',width:'85px'},
                    {title: '删除记录数', align: 'center',key: 'degDeleteCount',width:'85px'},
                    {title: '抽取成功(条) ', align: 'center',key: 'degSucceedExtractCount',width:'100px'},
                    {title: '抽取失败(条)', align: 'center',key: 'degFailedExtractCount',width:'100px'},
                    {title: '耗时', align: 'center',key: 'degConsumingTime',width:'100px'},
                    {title: '时间', align: 'center',key: 'degTime',
                    // render: (h, params) => {
                    //     return h('div',
                    //         this.$util.time_format(new Date(params.row.time), 'yyyy-MM-dd hh:mm:ss')
                    //     )
                    // }
                    },
                    // {title: '配置时间', align: 'center',key: ''}
                ],
                BusinessName:'',
                ExtractTableName:'',
                DegServiceName:'',
                LoadTableName:'',
                BusinessNames:'',
                ExtractTableNames:'',
                DegServiceNames:'',
                LoadTableNames:'',
                indeterminate: false,
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
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:"",
                                fieldType:"datetime",
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
                    {name: "数据库抽取日志", to: "/logs/logDbExtractInfo"}
                ],
            }
        },
        mounted: function() {
            this.showProxy();
            // this.getTableNames()
        },
        methods: {
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
                                params:""
                            },
                            {
                                filed:"",
                                type:"",
                                params:"",
                                fieldType:"datetime",
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
                if(this.BusinessName){
                    this.page.form.filters[0].type = "equal"
                    this.page.form.filters[0].filed = "degBusinessName"
                    this.page.form.filters[0].params = this.BusinessName
                }
                if(this.DegServiceName){
                    this.page.form.filters[1].type = "equal"
                    this.page.form.filters[1].filed = "degServiceName"
                    this.page.form.filters[1].params = this.DegServiceName
                }
                if(this.ExtractTableName){
                    this.page.form.filters[2].type = "equal"
                    this.page.form.filters[2].filed = "degExtractTableName"
                    this.page.form.filters[2].params = this.ExtractTableName
                }
                if(this.LoadTableName){
                    this.page.form.filters[3].type = "equal"
                    this.page.form.filters[3].filed = "degLoadTableName"
                    this.page.form.filters[3].params = this.LoadTableName
                }
                if(this.times[0] != ""){
                    this.times[0] = this.$util.time_format(new Date(this.times[0]), 'yyyy-MM-dd hh:mm:ss')
                    this.times[1] = this.$util.time_format(new Date(this.times[1]), 'yyyy-MM-dd hh:mm:ss')
                    this.page.form.filters[4].type = "between"
                    this.page.form.filters[4].filed = "degTime"
                    this.page.form.filters[4].params = this.times
                }
                this.page.form.page = 1
                console.log(this.page.form)
                this.searchLoading = true
                this.loading = true
                this.$https.fetchPost(this.$api.log.findExtractInfo.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
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
            pageChange(page){
                // console.log(page)
                this.page.form.page = page;
                this.showProxy();
            },
            getBusinessNames(){
                if(this.BusinessNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.getBusinessNames.url).then((resp) => {
                    this.BusinessNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            //加载表名
            getLoadTableNames(){
                if(this.LoadTableNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.getLoadTableNames.url).then((resp) => {
                    this.LoadTableNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            getDegServiceNames(){
                if(this.DegServiceNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.getDegServiceNames.url).then((resp) => {
                    this.DegServiceNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            getExtractTableNames(){
                if(this.ExtractTableNames){
                    return
                }
                this.$https.fetchGet(this.$api.log.getExtractTableNames.url).then((resp) => {
                    this.ExtractTableNames = resp.data.data
                }).catch(err => {
                    console.log(err)
                })
            },
            showProxy() {
                this.loading = true
                this.$https.fetchPost(this.$api.log.findExtractInfo.url, this.page.form,{timeout: 300 * 1000}).then((resp) => {
                    console.log(resp.data.data);
                    this.data = resp.data.data.data;
                    this.total = resp.data.data.count;
                    this.loading = false
                }).catch(err => {
                    console.log(err)
                    this.loading = false
                })
            },
            clearAll(){
                this.$Modal.confirm({
                    title: "提示",
                    content: '<p>是否要清空全部日志</p>',
                    onOk: () => {
                        this.$https.fetchPost(this.$api.log.delAllExtractInfo.url).then((resp) => {
                            if (resp.data.status == 200) {
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
        /* display: inline-block; */
        float:right;
        vertical-align: middle;
    }

</style>