<template>
    <div class="container-fluid">
        <blockquote class="row margin-top clear-margin" style="border-left: groove 5px rgba(0, 0, 0, .4);color: #000000;font-size: 14px;">
               系统配置
        </blockquote>
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">编号设置</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备编号:</span></td>
                                <td><Input v-model="form.eqid" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备位置选择:</span></td>
                                <td><Select v-model="form.eqposition" style="width:95px;margin-left: 15px;">
                                    <Option v-for="list in List" :value="list.value" :key="list.value">{{ list.label }}</Option>
                                </Select></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备T1(内端)IP:</span></td>
                                <td><Input v-model="form.t1ip" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备NT1(外端)IP:</span></td>
                                <td><Input v-model="form.nt1ip" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备T2(内端)IP:</span></td>
                                <td><Input v-model="form.t2ip" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备NT2(外端)IP:</span></td>
                                <td><Input v-model="form.nt2ip" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备T1(内端)编号:</span></td>
                                <td><Input v-model="form.t1no" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备NT1(外端)编号:</span></td>
                                <td><Input v-model="form.nt1no" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备T2(内端)编号:</span></td>
                                <td><Input v-model="form.t2no" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">设备NT2(外端)编号:</span></td>
                                <td><Input v-model="form.nt2no" style="margin-left: 15px;width: 200px" placeholder="Enter something..."/></td>
                            </tr>
                        </table>
                        <span style="font-size: 12px;">注:默认NT1和T2可以连接到集控</span>
                        <div style="margin: 10px 0 10px 10px;" class="btn btn-sm btn-custom add_fontclient" data-toggle="modal">确认</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysEquipmentInfo",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                form:{
                    eqid:'',
                    eqposition:'undefined',
                    t1ip:'',
                    nt1ip:'',
                    t2ip:'',
                    nt2ip:'',
                    t1no:'',
                    nt1no:'',
                    t2no:'',
                    nt2no:'',
                },
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
                List: [
                    {value: "undefined",label: "未定义"},
                    {value: "T1",label: "T1"},
                    {value: "T2",label: "T2"}
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
                    {name: "设备信息", to: "/sys/equipmentInfo"}
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
            }
        }
    }
</script>

<style scoped>
</style>