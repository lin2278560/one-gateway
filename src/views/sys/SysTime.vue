<template>
<!-- 未有数据 -->
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
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">系统时间</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">系统日期:</span></td>
                                <td>
                                    <DatePicker type="datetime" v-model="value1" format="yyyy-MM-dd HH:mm:ss" style="width: 200px;margin-left: 15px;"></DatePicker>
                                    <!-- <DatePicker type="date" :value="value1" placeholder="Select date" style="width: 200px;margin-left: 15px;"></DatePicker> -->
                                </td>
                            </tr>
                            <!-- <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">系统时间:</span></td>
                                <td><TimePicker :value="value2" format="HH点mm分ss秒" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                            </tr> -->
                        </table>
                    </div>
                </div>
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:140px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">从管理机更新时间</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">管理机当前时间:</span></td>
                                <td><span style="margin-left: 15px;font-size: 12px;">{{date|formatDate(this)}}</span></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">从管理机更新时间:</span></td>
                                <td><a @click="submit" style="margin-left:15px;font-size: 12px;">同步到系统时间</a></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <div @click="submittime" class="btn btn-sm btn-custom add_fontclient" style="margin: 10px 50%;">确认</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysTime",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                links: [
                    {name: "设置系统时间", to: "/sys/time"}
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
                },
                value1: new Date(),
                value2:'',
                date: new Date()
            }
        },
        methods: {
            setZero(a) {
                return a < 10 ? "0" + a : a;
            },
            submit() {
                this.value1 = this.date
                let obj = {time:this.value1}
                obj.time = this.$util.time_format(obj.time,"yyyy-MM-dd hh:mm:ss")
                console.log(obj)
                this.$https.fetchPost(this.$api.user.changTime.url,obj).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '同步到系统时间成功', desc: resp.data.desc, duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else {
                        this.$Notice.error({title: '更改系统时间失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(function (error) {
                        console.log(error);
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    });
            },
            submittime() {
                let obj = {time:this.value1}
                obj.time = this.$util.time_format(obj.time,"yyyy-MM-dd hh:mm:ss")
                console.log(obj)
                this.$https.fetchPost(this.$api.user.changTime.url,obj).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '同步到系统时间成功', desc: resp.data.desc, duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else {
                        this.$Notice.error({title: '更改系统时间失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(function (error) {
                        console.log(error);
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    });
            },
            findTime() {
                this.$https.fetchGet(this.$api.user.findTime.url).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data.data)
                        let date = new Date(resp.data.data)
                        console.log(date)
                        this.value1 = date
                        // this.value1 = resp.data
                    } else {
                         this.$Notice.error({title: '获取系统时间失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
        },
        mounted() {
            let _this = this; // 声明一个变量指向Vue实例this，保证作用域一致
            this.timer = setInterval(() => {
                _this.date = new Date(); // 修改数据date
            }, 1000)
            this.findTime()
        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
            }
        },
        filters: {
            formatDate(date, vm) {  //当前时间格式化处理
                var str = "";
                var weekDay = [
                    "星期天",
                    "星期一",
                    "星期二",
                    "星期三",
                    "星期四",
                    "星期五",
                    "星期六"
                ];
                str += vm.setZero(date.getFullYear()) + "年"; //获取年份
                str += vm.setZero(date.getMonth() + 1) + "月"; //获取月份
                str += vm.setZero(date.getDate()) + "日"; //获取日
                str += " " + weekDay[date.getDay()]; //获取星期
                str += " " + vm.setZero(date.getHours()) + ":"; //获取时
                str += " " + vm.setZero(date.getMinutes()) + ":"; //获取分
                str += vm.setZero(date.getSeconds()); //获取秒
                return str;
            },
        },
    }
</script>

<style scoped>
</style>