<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                <!--                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">-->
                <!--                    <span style=" background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center">同步程序定时</span>-->
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">锁缓存列表:</span></td>
                            <td>
                                <p style="margin-left: 15px;font-size: 12px;">SUCCESS/[查看客户端模式同步锁缓存]</p>
                                <p style="margin-left: 15px;font-size: 12px;">锁命令报文:</p>
                                <p style="margin-left: 15px;font-size: 12px;">同步锁线程中锁命令报文:</p>
                                <p style="margin-left: 15px;font-size: 12px;">锁命令解释:</p>
                                <p style="margin-left: 15px;font-size: 12px;">本地目标数据资源:</p>
                                <p style="margin-left: 15px;font-size: 12px;">远程目标数据资源: <Button size="small" type="warning" style="margin-left: 10%;">刷新</Button></p>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">清除缓存:</span></td>
                            <td>
                                <CheckboxGroup v-model="clearCache">
                                    <Checkbox style="margin-left: 15px;" label="锁命令报文队列"></Checkbox>
                                    <Checkbox style="margin-left: 15px;" label="同步锁线程中锁命令报文队列"></Checkbox>
                                    <Checkbox style="margin-left: 15px;" label="锁命令解释队列"></Checkbox>
                                    <Checkbox style="margin-left: 15px;" label="本地目标数据资源队列"></Checkbox>
                                    <Checkbox style="margin-left: 15px;" label="远程目标数据资源队列"></Checkbox>
                                </CheckboxGroup>
                                <Button size="small" type="warning" style="margin-left: 10px;">清除</Button>
                            </td>
                        </tr>
                        <tr style="height: 40px;" v-show="isShow">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;">清除缓存:</span></td>
                            <td><Input v-model="clientIP" placeholder="240" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr v-show="isShow">
                            <td style="background-color: #eee;">
                                <div style="width: 100%;height: 40px;"><span style="float: right;margin: 10px 15px 0 0;">设备1内端(T端):</span></div>
                                <div style="width: 100%;height: 40px;"><span style="float: right;margin: 10px 15px 0 0;">设备1外端(NT端):</span></div>
                                <div style="width: 100%;height: 40px;"><span style="float: right;margin: 10px 15px 0 0;">设备2内端(T端):</span></div>
                                <div style="width: 100%;height: 40px;"><span style="float: right;margin: 10px 15px 0 0;">设备2外端(NT端):</span></div>
                            </td>
                            <td>
                                <RadioGroup v-model="animal">
                                    <div style="width: 100%;height: 40px;"><Input placeholder="240" style="width: 150px;margin: 5px 0 0 15px;" /><Radio label="1" style="margin-left: 5px;"><span></span></Radio></div>
                                    <div style="width: 100%;height: 40px;"><Input placeholder="240" style="width: 150px;margin: 5px 0 0 15px;" /><Radio label="2" style="margin-left: 5px;"><span></span></Radio></div>
                                    <div style="width: 100%;height: 40px;"><Input placeholder="240" style="width: 150px;margin: 5px 0 0 15px;" /><Radio label="3" style="margin-left: 5px;"><span></span></Radio></div>
                                    <div style="width: 100%;height: 40px;"><Input placeholder="240" style="width: 150px;margin: 5px 0 0 15px;" /><Radio label="4" style="margin-left: 5px;"><span></span></Radio></div>
                                </RadioGroup>
                            </td>
                        </tr>
                    </table>
                </div>
                <!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "DataLockCache",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                clearCache: ["锁命令报文队列","同步锁线程中锁命令报文队列","锁命令解释队列","本地目标数据资源队列","远程目标数据资源队列"],


                type: "native",
                typeList: [
                    {label: "原生", value: "native"},
                    {label: "Client", value: "client"}
                ],
                clientIP: "127.0.0.1",
                isShow: false,

                ishostShow: false,
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
                    {name: "通讯配置", to: "/data/comm"},
                    {name: "同步模式", to: "/data/sync"},
                    {name: "同步锁配置", to: "/data/syncLock"},
                    {name: "同步锁缓存", to: "/data/lockCache"}
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
            configData(e){
                // console.log(index);
                // let optionV = this.$refs.select.value;
                // console.log(this.headData[index].value);
                // let checked = e.target.checked;
                if(e == "client"){
                    this.isShow = true;
                }else{
                    this.isShow = false;
                }
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
    .ivu-btn-warning {
        color: #fff;
        background-color: #e66534;
        border-color: #e66534;
    }
</style>