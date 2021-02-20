<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <Button style="margin-right:15px;float:right;font-size:13px;" type="warning">清空日志</Button>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">查询条件</span>
                    <div style="margin: 15px 10px;">
                        <div style="display:flex;flex-wrap: wrap">
                            <div style="width: 250px;font-size: 12px;">
                                业务ID：
                                <Select style="width:170px">
                                    <!-- <Option>所有</Option>
                                    <Option>消息</Option>
                                    <Option>告警</Option> -->
                                </Select>
                            </div>
                            <div style="width: 250px;font-size: 12px;">
                                IP地址：
                                <Input placeholder="Enter name" style="width: auto" />
                            </div>
                            <div style="width: 250px;font-size: 12px;">
                                描述：
                                <Input placeholder="Enter name" style="width: auto" />
                            </div>
                            <div style="width: 400px;font-size: 12px;">
                                时间范围：
                                <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
                                <Button style="margin-left:15px;" type="warning">查询</Button>
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
        name: "LogTrustAuth",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                columns: [
                    {title: '序号', key: '', align: 'center',width: 65,
                    render: (h, params) => {
                        return h(
                            "span", params.index +(this.page.form.page - 1) * this.page.form.size + 1
                        );
                    }},
                    {title: '设备IP', align: 'center',key: ''},
                    {title: '业务流程名', align: 'center',key: ''},
                    {title: '事件', align: 'center',key: ''},
                    {title: '等级', align: 'center',key: ''},
                    {title: '时间', align: 'center',key: ''},
                    {title: '配置时间', align: 'center',key: ''}
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
                        // filters:[
                        //     {
                        //         filed:"",
                        //         type:"",
                        //         params:""
                        //     },
                        //     {
                        //         filed:"",
                        //         type:"",
                        //         params:"",
                        //         fieldType:"datetime",
                        //     },   
                        // ],
                        // sorts: [
                        //     {
                        //     filed: "time",
                        //     order: false
                        //     }
                        // ]
                    },
                },
                

                links: [
                    {name: "认证状态日志", to: "/logs/logTrustAuth"}
                ],
            }
        },
        methods: {
          

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
        display: inline-block;
        vertical-align: middle;
    }

</style>