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
                        <div style="width: 250px;float: left;font-size: 12px;">
<!--                            信息:-->
<!--                            <Input style="float: right;" placeholder="240" />-->
                            信息：
                            <Input placeholder="" style="width: auto" />
                        </div>
                        <!-- <div style="width: 400px;float: left;font-size: 12px;">
                            时间范围：
                            <Input type="date" style="width: auto" />
                            到
                            <Input type="date" style="width: auto" />
                        </div> -->
                            
                        <div>
                            <span style="font-size:12px">时间范围：</span>
                            <DatePicker type="daterange" placement="bottom-end" placeholder="选择日期" style="width: 200px"></DatePicker>
<!--                            <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>-->
                            <Button style="margin-left:15px" type="warning">查询</Button>
                        </div>
                    </div>
                </div>
                <Table size="small" border :loading="loading" :columns="columns" :data="data" style="margin-top: 30px;"/>
                <div class="foot">
                    <span class="desc" style="font-size: 13px;">查询{{total}}条，当前第{{page}}页</span>
                    <Page style="float: right;" @on-change="pageChange" :current="page" :total="total" :page-size="size" simple/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "LogSys",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                columns: [
                    {title: '序号', key: 'id', align: 'center',width: 100,
                    render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: '时间', align: 'center',key: ''},
                    {title: '信息', align: 'center',key: ''}
                ],
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],

                loading: false,
                data: [],
                total: 0,
                page: 1,
                size: 10,


                isWhenShow: true,
                isDayShow: false,
                isWeeksShow: false,
                isMonthShow: false,
                hours: [
                    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
                ],
                minutes: [
                    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
                    39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59
                ],
                day: [
                    1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31
                ],
                cycleList: [
                    {value: "day",label: "天"},
                    {value: "weeks",label: "周"},
                    {value: "month",label: "月"}
                ],
                cycleVal: "day",
                cycleList1: [
                    {value: "hours",label: "时"},
                    {value: "day",label: "天"},
                    {value: "weeks",label: "周"},
                    {value: "month",label: "月"}
                ],
                cycleVal1: "hours",
                cycleList2: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
                    39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59],
                cycleVal2: 1,
                cycleList3: [
                    {value: "minutes",label: "分钟"},
                    {value: "hours",label: "小时"},
                    {value: "day",label: "天"}
                ],
                cycleVal3: "minutes",
                links: [
                    {name: "系统日志", to: "/logs/logSys"}
                ],
                tap: {
                    items: [
                        // {to:"/index/home", img:"../../../static/img/nav/menu_05.png", title:"监控总览"},
                        // {to:"/index/alarm", img:"../../../static/img/nav/menu_04.png", title:"故障告警"},
                        // {to:"/index/data", img:"../../../static/img/nav/menu_03.png", title:"数据对账"},
                        // {to:"/index/log", img:"../../../static/img/nav/menu_02.png", title:"日志审计"},
                        // {to:"/index/monitor", img:"../../../static/img/nav/menu_06.png", title:"资源监控"},
                        // {to:"/index/interface", img:"../../../static/img/nav/menu_07.png", title:"接口管理"},
                        // {to:"/index/sys", img:"../../../static/img/nav/menu_01.png", title:"系统管理"}
                        {no:"1", uname:"fyb", directory:"/fyb", state: "运行中"}
                    ]
                }
            }
        },
        methods: {
            configData(index){
                // console.log(index);
                // let optionV = this.$refs.select.value;
                if (index == "day"){
                    this.isDayShow = true;
                    this.isWhenShow = false;
                    this.isWeeksShow = false;
                    this.isMonthShow = false;
                }else if (index == "hours"){
                    this.isDayShow = false;
                    this.isWhenShow = true;
                    this.isWeeksShow = false;
                    this.isMonthShow = false;
                }else if (index == "weeks"){
                    this.isDayShow = false;
                    this.isWhenShow = false;
                    this.isWeeksShow = true;
                    this.isMonthShow = false;
                }else if (index == "month") {
                    this.isDayShow = false;
                    this.isWhenShow = false;
                    this.isWeeksShow = false;
                    this.isMonthShow = true;
                }
                // console.log(this.headData[index].value);
            },
            overTime(index){
                if (index == "minutes"){
                    this.cycleList2 = this.minutes;
                }else if (index == "hours"){
                    this.cycleList2 = this.hours;
                }else if (index == "day"){
                    this.cycleList2 = this.day;
                }
                console.log(this.cycleList2);
            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['客户端防病毒引擎', '客户端应用进程保护', '客户端注册表保护'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 3) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            }
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
        float: right
    }

</style>