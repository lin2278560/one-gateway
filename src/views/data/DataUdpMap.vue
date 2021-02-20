<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;">服务名称:</span></td>
                            <td><Input placeholder="240" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;">任务sid:</span></td>
                            <td><Input placeholder="240" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;">网闸地址:</span></td>
                            <td><Select v-model="aa" style="width: 150px;margin-left: 15px;">
                                    <Option label="TCP" value="tcp"></Option>
                                    <Option label="UDP" value="udp"></Option>
                                    <Option label="ICMP" value="icmp"></Option>
                                </Select>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;">转发端口:</span></td>
                            <td><Input placeholder="admin" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                    </table>
                </div>
                <Button type="primary" @click="addPlatForm">确认</Button>
                <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "DataUdpMap",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                indeterminate: false,
                checkAll: false,
                isWhenShow: true,
                isDayShow: false,
                isWeeksShow: false,
                isMonthShow: false,
                checkAllGroup: [],
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
                    {value: "all",label: "所有"},
                    {value: "user",label: "用户与登录设置"},
                    {value: "interface",label: "接口配置"},
                    {value: "gateway",label: "网关配置"},
                    {value: "route",label: "静态路由"},
                    {value: "availability",label: "高可用性"},
                    {value: "control",label: "访问控制"},
                    {value: "ftp",label: "FTP服务"},
                    {value: "smb",label: "SMB服务"},
                    {value: "nfs",label: "NFS服务"},
                    {value: "data",label: "数据资源"},
                    {value: "business",label: "业务与服务"}
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
                    {name: "UDP映射服务", to: "/data/udpMap"}
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
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = ['用户管理', '登录管理', '静态路由', '虚拟IPS', '访问控制', '强制访问控制', 'FTP服务',
                        'SMB服务', '数据资源', '业务与服务'];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                if (data.length === 10) {
                    this.indeterminate = false;
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.indeterminate = true;
                    this.checkAll = false;
                } else {
                    this.indeterminate = false;
                    this.checkAll = false;
                }
            },
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