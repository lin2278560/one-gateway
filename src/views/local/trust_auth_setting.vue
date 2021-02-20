<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">认证服务器</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">服务器网关地址:</span></td>
                                <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">服务器网关端口:</span></td>
                                <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">应用程序ID:</span></td>
                                <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">客户端HashID:</span></td>
                                <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">安全选项</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">全选/取消:</span></td>
                                <td><Checkbox style="margin-left: 15px;"
                                              :indeterminate="indeterminate"
                                              :value="checkAll"
                                              @click.prevent.native="handleCheckAll">全选</Checkbox></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">用户管理:</span></td>
                                <td>
                                    <CheckboxGroup style="margin-left: 15px;" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                                        <Checkbox label="客户端防病毒引擎"></Checkbox>
                                        <Checkbox label="客户端应用进程保护"></Checkbox>
                                        <Checkbox label="客户端注册表保护"></Checkbox>
                                    </CheckboxGroup>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "trust_auth_setting",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                indeterminate: false,
                checkAll: false,
                checkAllGroup: [],


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
                    {name: "可信接入认证", to: "/local/trust"}
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
</style>