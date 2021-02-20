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
            <div class="modal-body">
                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:160px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">文件同步定时维护</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">是否启动:</span></td>
                                <td>
                                    <Checkbox v-model="form.maintainModels[0].action" @on-change="Fileshowchange" style="margin-left: 15px;font-size: 12px;"></Checkbox>
                                </td>
                            </tr>
                            <!-- <tr v-if="Fileshow" style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">Corn表达式:</span></td>
                                <td><Input v-model="form.maintainModels[0].cron" style="margin-left: 15px;font-size: 12px;width:400px;" /></td>
                            </tr> -->
                            <tr v-if="Fileshow" style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时间单位:</span></td>
                                <td>
                                    <Select v-model="Fileform.cycleVal1" style="width:200px;margin-left: 15px;">
                                        <Option v-for="cycle in cycleList1" :value="cycle.value" :key="cycle.value" @click.native="fileconfigData(cycle.value)">{{ cycle.label }}</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr v-if="Fileshow">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时/分:</span></td>
                                <td v-show="FileisWhenShow"><TimePicker v-model="Fileform.FileHourtime" confirm format="HH:mm" :disabled-hours="hours" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="FileisDayShow"><TimePicker v-model="Fileform.FileDaytime" confirm format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="FileisWeeksShow">
                                    <TimePicker v-model="Fileform.FileWeekstime" format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <CheckboxGroup style="display:inline-block" v-model="Fileform.weeksday">
                                        <Checkbox label=1>周一</Checkbox>
                                        <Checkbox label=2>周二</Checkbox>
                                        <Checkbox label=3>周三</Checkbox>
                                        <Checkbox label=4>周四</Checkbox>
                                        <Checkbox label=5>周五</Checkbox>
                                        <Checkbox label=6>周六</Checkbox>
                                        <Checkbox label=7>周日</Checkbox>
                                    </CheckboxGroup>
                                    
                                </td>
                                <td v-show="FileisMonthShow">
                                    <TimePicker v-model="Fileform.FileMonthtime" format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <Tooltip content="输入范围为1-31，多个以逗号分隔，例：1,28代表每月1号和28号">
                                        <Input v-model="Fileform.Filemonthday" style="width: 360px" />
                                    </Tooltip>
                                </td>
                            </tr>
                            <tr v-if="Fileshow" style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">周期:</span></td>
                                <td style="padding-left:15px;">
                                    <span v-show="FileisWhenShow">
                                        <Input v-model="Fileform.FileHourspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{Fileform.FileHourspan==''?'（周期）':Fileform.FileHourspan+'个'}}小时的{{Fileform.FileHourtime==''?'（时/分）':Fileform.FileHourtime}}的运行
                                    </span>
                                    <span v-show="FileisDayShow">
                                        <Input v-model="Fileform.FileDayspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{Fileform.FileDayspan==''?'（周期）':Fileform.FileDayspan+'个'}}天的{{Fileform.FileDaytime==''?'（时/分）':Fileform.FileDaytime}}的运行
                                    </span>
                                    <span v-show="FileisWeeksShow">
                                        <Input v-model="Fileform.FileWeekspan" disabled style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{Fileform.FileWeekspan==''?'（周期）':Fileform.FileWeekspan+'个'}}周的{{Fileform.FileWeekstime==''?'（时/分）':Fileform.FileWeekstime}}的运行
                                    </span>
                                    <span v-show="FileisMonthShow">
                                        <Input v-model="Fileform.Filemonthspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{Fileform.Filemonthspan==''?'（周期）':Fileform.Filemonthspan+'个'}}月的{{Fileform.FileMonthtime==''?'（时/分）':Fileform.FileMonthtime}}的运行
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="Fileshow" style="height: 40px;">
                                <td colspan='2'>
                                    <div style="display:flex;justify-content: center;align-items: center;">
                                        <Button type="primary" @click="submitFile" style="margin:0 10px;;">提交</Button>
                                        <Button @click="resetFile" style="">重置</Button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div>
                    <!-- <div class="btn btn-sm btn-custom add_fontclient" @click="submitFile" style="margin: 10px 50%;">提交</div> -->
                    
                </div>

                <div style="border:1px solid #666;width:100%;position:relative;float: left;margin: 20px 0;">
                    <span style="background:#faf8f7; display:block; height:20px; width:160px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">数据库同步定时维护</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">是否启动:</span></td>
                                <td><Checkbox  @on-change="DBshowchange" v-model="form.maintainModels[1].action" style="margin-left: 15px;font-size: 12px;"></Checkbox></td>
                            </tr>
                            <!-- <tr v-if="DBshow" style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">Corn表达式:</span></td>
                                <td><Input v-model="form.maintainModels[1].cron" style="margin-left: 15px;font-size: 12px;width:400px;" /></td>
                            </tr> -->
                            <tr v-if="DBshow" style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时间单位:</span></td>
                                <td>
                                    <Select v-model="DBform.cycleVal1" style="width:200px;margin-left: 15px;">
                                        <Option v-for="cycle in cycleList1" :value="cycle.value" :key="cycle.value" @click.native="configData(cycle.value)">{{ cycle.label }}</Option>
                                    </Select>
                                </td>
                            </tr>
                            <tr v-if="DBshow">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时/分:</span></td>
                                <td v-show="DBisWhenShow"><TimePicker v-model="DBform.DBHourtime" confirm format="HH:mm" :disabled-hours="hours" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="DBisDayShow"><TimePicker v-model="DBform.DBDaytime" confirm format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="DBisWeeksShow">
                                    <TimePicker v-model="DBform.DBWeekstime" format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <CheckboxGroup style="display:inline-block" v-model="DBform.weeksday">
                                        <Checkbox label=1>周一</Checkbox>
                                        <Checkbox label=2>周二</Checkbox>
                                        <Checkbox label=3>周三</Checkbox>
                                        <Checkbox label=4>周四</Checkbox>
                                        <Checkbox label=5>周五</Checkbox>
                                        <Checkbox label=6>周六</Checkbox>
                                        <Checkbox label=7>周日</Checkbox>
                                    </CheckboxGroup>
                                    
                                </td>
                                <td v-show="DBisMonthShow">
                                    <TimePicker v-model="DBform.DBMonthtime" format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <Input v-model="DBform.DBmonthday" style="width: 360px" />
                                </td>
                            </tr>
                            <tr v-if="DBshow" style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">周期:</span></td>
                                <td style="padding-left:15px;">
                                    <span v-show="DBisWhenShow">
                                        <Input v-model="DBform.DBHourspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{DBform.DBHourspan==''?'（周期）':DBform.DBHourspan+'个'}}小时的{{DBform.DBHourtime==''?'（时/分）':DBform.DBHourtime}}的运行
                                    </span>
                                    <span v-show="DBisDayShow">
                                        <Input v-model="DBform.DBDayspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{DBform.DBDayspan==''?'（周期）':DBform.DBDayspan+'个'}}天的{{DBform.DBDaytime==''?'（时/分）':DBform.DBDaytime}}的运行
                                    </span>
                                    <span v-show="DBisWeeksShow">
                                        <Input v-model="DBform.DBWeekspan" disabled style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{DBform.DBWeekspan==''?'（周期）':DBform.DBWeekspan+'个'}}周的{{DBform.DBWeekstime==''?'（时/分）':DBform.DBWeekstime}}的运行
                                    </span>
                                    <span v-show="DBisMonthShow">
                                        <Input v-model="DBform.DBmonthspan" style="width: 50px;" />
                                        &nbsp;&nbsp;&nbsp;每间隔{{DBform.DBmonthspan==''?'（周期）':DBform.DBmonthspan+'个'}}月的{{DBform.DBMonthtime==''?'（时/分）':DBform.DBMonthtime}}的运行
                                    </span>
                                </td>
                            </tr>
                            <tr v-if="DBshow" style="height: 40px;">
                                <td colspan='2'>
                                    <div style="display:flex;justify-content: center;align-items: center;">
                                        <Button type="primary" @click="submitDB" style="margin:0 10px;;">提交</Button>
                                        <Button @click="resetDB" style="">重置</Button>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <!-- <div v-if="false" style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">同步程序定时</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">定时维护:</span></td>
                                <td><Checkbox style="margin-left: 15px;font-size: 12px;">启用</Checkbox></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">周期:</span></td>
                                <td><Select v-model="cycleVal" style="width:200px;margin-left: 15px;">
                                    <Option v-for="cycle in cycleList" :value="cycle.value" :key="cycle.value">{{ cycle.label }}</Option>
                                </Select></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时间:</span></td>
                                <td><TimePicker confirm format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div v-if="false" style="border:1px solid #666;width:100%;position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:140px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">空目录过期清理</span>
                    <div style="margin: 15px 10px;">
                        <table border="1" style="width: 100%;">
                            <tr style="height: 40px;">
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">空目录清理:</span></td>
                                <td><Checkbox style="margin-left: 15px;">启用</Checkbox></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">周期:</span></td>
                                <td><Select v-model="cycleVal1" style="width:200px;margin-left: 15px;">
                                    <Option v-for="cycle in cycleList1" :value="cycle.value" :key="cycle.value" @click.native="configData(cycle.value)">{{ cycle.label }}</Option>
                                </Select></td>
                            </tr>
                            <tr>
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">时间:</span></td>
                                <td v-show="isWhenShow"><TimePicker confirm format="HH:mm" :disabled-hours="hours" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="isDayShow"><TimePicker confirm format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;"></TimePicker></td>
                                <td v-show="isWeeksShow">
                                    <TimePicker format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <Checkbox>周一</Checkbox>
                                    <Checkbox>周二</Checkbox>
                                    <Checkbox>周三</Checkbox>
                                    <Checkbox>周四</Checkbox>
                                    <Checkbox>周五</Checkbox>
                                    <Checkbox>周六</Checkbox>
                                    <Checkbox>周日</Checkbox>
                                </td>
                                <td v-show="isMonthShow">
                                    <TimePicker format="HH:mm" placeholder="Select time" style="width: 200px;margin-left: 15px;margin-right: 15px;"></TimePicker>
                                    <Input placeholder="输入范围为1-31，多个以逗号分隔，例：1,28代表每月1号和28号" style="width: 360px" />
                                </td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">空目录过期时间:</span></td>
                                <td>
                                    <Select v-model="cycleVal2" style="width:95px;margin-left: 15px;">
                                        <Option v-for="cycle in cycleList2" :value="cycle" :key="cycle">{{ cycle }}</Option>
                                    </Select>
                                    <Select v-model="cycleVal3" style="width:95px;margin-left: 10px;">
                                        <Option v-for="cycle in cycleList3" :value="cycle.value" :key="cycle.value" @click.native="overTime(cycle.value)">{{ cycle.label }}</Option>
                                    </Select>
                                    <Poptip trigger="hover" content="选择清理多久前的空目录">
                                        <i style="margin-left:3px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                                    </Poptip>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> -->
                <!-- <div>
                    <div class="btn btn-sm btn-custom add_fontclient" @click="submitDB" style="margin: 10px 50%;">提交</div>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "SysMaintain",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                weeksList:[
                    {value: 1,label: "周一"},
                    {value: 2,label: "周二"},
                    {value: 3,label: "周三"},
                    {value: 4,label: "周四"},
                    {value: 5,label: "周五"},
                    {value: 6,label: "周六"},
                    {value: 7,label: "周七"},
                ],
                DBform:{
                    DBMonthtime:"",
                    DBHourtime:'',
                    DBWeekstime:'',
                    DBDaytime:'',
                    weeksday:[],
                    cycleVal1:'hours',
                    DBHourspan:'',
                    DBDayspan:'',
                    DBWeekspan:'1',
                    DBmonthspan:'',
                    DBmonthday:'',
                },
                Fileform:{
                    Filemonthday:'',
                    FileMonthtime:"",
                    FileHourtime:'',
                    FileWeekstime:'',
                    FileDaytime:'',
                    weeksday:[],
                    cycleVal1:'hours',
                    FileHourspan:'',
                    FileDayspan:'',
                    FileWeekspan:'1',
                    Filemonthspan:'',
                },
                form:{
                    maintainModels: [
                    {
                        name: "FILE_SYNC",
                        chineseName: "文件同步定时维护",
                        action: false,
                        cronParams: {
                            count: 0,
                            unit: "",
                            appointTimes: ''
                        },
                        cron: null
                    },
                    {
                        name: "DB_SYNC",
                        chineseName: "数据库同步定时维护",
                        action: false,
                        cronParams: {
                            count: 0,
                            unit: "",
                            appointTimes: ''
                            },
                        cron: null
                    },
                    
                    ]
                },
                DBisWhenShow: true,
                DBisDayShow: false,
                DBisWeeksShow: false,
                DBisMonthShow: false,
                FileisWhenShow: true,
                FileisDayShow: false,
                FileisWeeksShow: false,
                FileisMonthShow: false,
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
                    {name: "设置维护", to: "/sys/maintain"}
                ],
                DBshow:false,
                Fileshow:false,
            }
        },
        mounted: function() {

            this.getinfo()
        },
        methods: {
            Fileshowchange(){
             if(this.form.maintainModels[0].action){
                 this.Fileshow = true
             }   
            },
            DBshowchange(){
             if(this.form.maintainModels[1].action){
                 this.DBshow = true
             }   
            },
            resetFile(){
                this.Fileform={
                    Filemonthday:'',
                    FileMonthtime:"",
                    FileHourtime:'00:00',
                    FileWeekstime:'',
                    FileDaytime:'',
                    weeksday:[],
                    cycleVal1:'hours',
                    FileHourspan:'1',
                    FileDayspan:'',
                    FileWeekspan:'',
                    Filemonthspan:'',
                }
                this.fileconfigData('hours')
                this.Fileform.cycleVal1 = 'hours'
            },
            resetDB(){
                this.DBform={
                    DBMonthtime:"",
                    DBHourtime:'00:00',
                    DBWeekstime:'',
                    DBDaytime:'',
                    weeksday:[],
                    cycleVal1:'hours',
                    DBHourspan:'1',
                    DBDayspan:'',
                    DBWeekspan:'',
                    DBmonthspan:'',
                    DBmonthday:'',
                }
                this.configData('hours')
                this.DBform.cycleVal1 = 'hours'
            },
            getinfo(){
                this.$https.fetchGet(this.$api.sys.getMaintainModel.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data,"23")
                    this.form = resp.data.data
                    if(this.form.maintainModels[0].cronParams.unit == "HOUR"){
                        this.fileconfigData('hours')
                        this.Fileform.cycleVal1 = 'hours'
                        this.Fileform.FileHourspan = this.form.maintainModels[0].cronParams.count
                        this.Fileform.FileHourtime = this.form.maintainModels[0].cronParams.appointTime.replace("-",":")
                    }else if(this.form.maintainModels[0].cronParams.unit == "DAY"){
                        this.Fileform.cycleVal1 = 'day'
                        this.fileconfigData('day')
                        this.Fileform.FileDayspan = this.form.maintainModels[0].cronParams.count
                        this.form.maintainModels[0].cronParams.appointTime = this.form.maintainModels[0].cronParams.appointTime.replace("0-","")
                        this.Fileform.FileDaytime = this.form.maintainModels[0].cronParams.appointTime.replace("-",":")
                        this.Fileform.FileDaytime = this.Fileform.FileDaytime.split(":").reverse()
                        this.Fileform.FileDaytime = this.Fileform.FileDaytime[0]+':'+this.Fileform.FileDaytime[1]
                    }else if(this.form.maintainModels[0].cronParams.unit == "WEEK"){
                        this.Fileform.cycleVal1 = 'weeks'
                        this.fileconfigData('weeks')
                        this.Fileform.FileWeekspan = this.form.maintainModels[0].cronParams.count
                        this.form.maintainModels[0].cronParams.appointTime = this.form.maintainModels[0].cronParams.appointTime.replace("0-","")
                        let weeks = this.form.maintainModels[0].cronParams.appointTime.substr(this.form.maintainModels[0].cronParams.appointTime.lastIndexOf("-")+1);
                        this.Fileform.FileWeekstime = this.form.maintainModels[0].cronParams.appointTime.split("-")
                        this.Fileform.FileWeekstime = this.Fileform.FileWeekstime[1] +':'+this.Fileform.FileWeekstime[0]
                        this.Fileform.weeksday = weeks.split(",")
                    }else{
                        this.Fileform.cycleVal1 = 'month'
                        this.fileconfigData('month')
                        this.Fileform.Filemonthspan = this.form.maintainModels[0].cronParams.count
                        this.form.maintainModels[0].cronParams.appointTime = this.form.maintainModels[0].cronParams.appointTime.replace("0-","")
                        this.Fileform.FileMonthtime = this.form.maintainModels[0].cronParams.appointTime.split("-")
                        this.Fileform.FileMonthtime = this.Fileform.FileMonthtime[1] +':'+this.Fileform.FileMonthtime[0]
                        let month = this.form.maintainModels[0].cronParams.appointTime.substr(this.form.maintainModels[0].cronParams.appointTime.lastIndexOf("-")+1);
                        this.Fileform.Filemonthday = month
                    }

                    if(this.form.maintainModels[1].cronParams.unit == "HOUR"){
                        this.DBform.cycleVal1 = 'hours'
                        this.DBform.DBHourspan = this.form.maintainModels[1].cronParams.count
                        this.DBform.DBHourtime = this.form.maintainModels[1].cronParams.appointTime.replace("-",":")
                        this.DBform.DBWeektime = this.DBform.DBHourtime
                    }else if(this.form.maintainModels[1].cronParams.unit == "DAY"){
                        this.DBform.cycleVal1 = 'day'
                        this.configData('day')
                        this.DBform.DBDayspan = this.form.maintainModels[1].cronParams.count
                        this.form.maintainModels[1].cronParams.appointTime = this.form.maintainModels[1].cronParams.appointTime.replace("0-","")
                        this.DBform.DBDaytime = this.form.maintainModels[1].cronParams.appointTime.replace("-",":")
                        this.DBform.DBDaytime = this.DBform.DBDaytime.split(":").reverse()
                        this.DBform.DBDaytime = this.DBform.DBDaytime[0]+':'+this.DBform.DBDaytime[1]
                        this.DBform.DBWeektime = this.DBform.DBDaytime
                    }else if(this.form.maintainModels[1].cronParams.unit == "WEEK"){
                        this.DBform.cycleVal1 = 'weeks'
                        this.configData('weeks')
                        this.DBform.DBWeekspan = this.form.maintainModels[1].cronParams.count
                        this.form.maintainModels[1].cronParams.appointTime = this.form.maintainModels[1].cronParams.appointTime.replace("0-","")
                        let weeks = this.form.maintainModels[1].cronParams.appointTime.substr(this.form.maintainModels[1].cronParams.appointTime.lastIndexOf("-")+1);
                        this.DBform.DBWeekstime = this.form.maintainModels[1].cronParams.appointTime.split("-")
                        this.DBform.DBWeekstime = this.DBform.DBWeekstime[1] +':'+this.DBform.DBWeekstime[0]
                        this.DBform.weeksday = weeks.split(",")
                        this.DBform.DBWeektime = this.DBform.DBWeekstime
                    }else{
                        this.DBform.cycleVal1 = 'month'
                        this.configData('month')
                        this.DBform.DBmonthspan = this.form.maintainModels[1].cronParams.count
                        this.form.maintainModels[1].cronParams.appointTime = this.form.maintainModels[1].cronParams.appointTime.replace("0-","")
                        this.DBform.DBMonthtime = this.form.maintainModels[1].cronParams.appointTime.split("-")
                        this.DBform.DBMonthtime = this.DBform.DBMonthtime[1] +':'+this.DBform.DBMonthtime[0]
                        let month = this.form.maintainModels[1].cronParams.appointTime.substr(this.form.maintainModels[1].cronParams.appointTime.lastIndexOf("-")+1);
                        this.DBform.DBmonthday = month
                        this.DBform.DBMonthtime = this.DBform.DBMonthtime
                    }
                    if(this.form.maintainModels[1].action){
                        this.DBshow = true
                    }
                    if(this.form.maintainModels[0].action){
                        this.Fileshow = true
                    }
                } else
                    this.$Notice.error({title: '获取数据失败', desc:  resp.data.desc, duration: 5});
                }).catch(err => {
                    // this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    // console.log(err)
                })
            },
            fileconfigData(index){
                if (index == "day"){
                    this.FileisDayShow = true;
                    this.FileisWhenShow = false;
                    this.FileisWeeksShow = false;
                    this.FileisMonthShow = false;
                }else if (index == "hours"){
                    this.FileisDayShow = false;
                    this.FileisWhenShow = true;
                    this.FileisWeeksShow = false;
                    this.FileisMonthShow = false;
                }else if (index == "weeks"){
                    this.FileisDayShow = false;
                    this.FileisWhenShow = false;
                    this.FileisWeeksShow = true;
                    this.FileisMonthShow = false;
                }else if (index == "month") {
                    this.FileisDayShow = false;
                    this.FileisWhenShow = false;
                    this.FileisWeeksShow = false;
                    this.FileisMonthShow = true;
                }
            },
            configData(index){
                if (index == "day"){
                    this.DBisDayShow = true;
                    this.DBisWhenShow = false;
                    this.DBisWeeksShow = false;
                    this.DBisMonthShow = false;
                }else if (index == "hours"){
                    this.DBisDayShow = false;
                    this.DBisWhenShow = true;
                    this.DBisWeeksShow = false;
                    this.DBisMonthShow = false;
                }else if (index == "weeks"){
                    this.DBisDayShow = false;
                    this.DBisWhenShow = false;
                    this.DBisWeeksShow = true;
                    this.DBisMonthShow = false;
                }else if (index == "month") {
                    this.DBisDayShow = false;
                    this.DBisWhenShow = false;
                    this.DBisWeeksShow = false;
                    this.DBisMonthShow = true;
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
            },
            submitFile(){
                console.log(this.form.maintainModels[0])
                let appointTime = "0"
                if(this.Fileform.cycleVal1 == "hours"){
                    let FileHourtime = this.Fileform.FileHourtime
                    FileHourtime = FileHourtime.split(":")
                    appointTime += "-"+Number(FileHourtime[1])
                    this.form.maintainModels[0].cronParams.unit = 'HOUR'
                    this.form.maintainModels[0].cronParams.count = this.Fileform.FileHourspan
                }else if(this.Fileform.cycleVal1 == "day"){
                    let FileDaytime = this.Fileform.FileDaytime
                    FileDaytime = FileDaytime.split(":").reverse()
                    for(let i in FileDaytime){
                        appointTime += "-"+Number(FileDaytime[i])
                    }
                    this.form.maintainModels[0].cronParams.unit = 'DAY'
                    this.form.maintainModels[0].cronParams.count = this.Fileform.FileDayspan
                }else if(this.Fileform.cycleVal1 == "weeks"){
                    let FileWeekstime = this.Fileform.FileWeekstime
                    FileWeekstime = FileWeekstime.split(":").reverse()
                    for(let i in FileWeekstime){
                        appointTime += "-"+Number(FileWeekstime[i])
                    }
                    this.form.maintainModels[0].cronParams.unit = 'WEEK'
                    this.form.maintainModels[0].cronParams.count = this.Fileform.FileWeekspan
                    this.Fileform.weeksday = this.Fileform.weeksday.filter(function (s) {
                    return s && s.trim();
                    });
                    for(let i in this.Fileform.weeksday){
                        if(i==0){
                            appointTime += "-"+Number(this.Fileform.weeksday[i])
                        }else{
                            appointTime += ","+Number(this.Fileform.weeksday[i])
                        }
                    }
                }else if(this.Fileform.cycleVal1 == "month"){
                    let FileMonthtime = this.Fileform.FileMonthtime
                    FileMonthtime = FileMonthtime.split(":").reverse()
                    for(let i in FileMonthtime){
                        appointTime += "-"+Number(FileMonthtime[i])
                    }
                    this.form.maintainModels[0].cronParams.unit = 'MONTH'
                    this.form.maintainModels[0].cronParams.count = this.Fileform.Filemonthspan
                    appointTime = appointTime+'-'+this.Fileform.Filemonthday
                }
                this.form.maintainModels[0].cronParams.appointTime = appointTime
                this.$https.fetchPost(this.$api.sys.updateMaintainModel.url,this.form.maintainModels[0]).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '文件同步定时维护修改成功', desc: resp.data.desc, duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else{
                        this.$Notice.error({title: '文件同步定时维护修改失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
            submitDB(){
                console.log(this.form.maintainModels[1])
                console.log(this.DBform)
                let appointTime = "0"
                if(this.DBform.cycleVal1 == "hours"){
                    let DBHourtime = this.DBform.DBHourtime
                    DBHourtime = DBHourtime.split(":")
                    appointTime += "-"+Number(DBHourtime[1])
                    this.form.maintainModels[1].cronParams.unit = 'HOUR'
                    this.form.maintainModels[1].cronParams.count = this.DBform.DBHourspan
                }else if(this.DBform.cycleVal1 == "day"){
                    let DBDaytime = this.DBform.DBDaytime
                    DBDaytime = DBDaytime.split(":").reverse()
                    for(let i in DBDaytime){
                        appointTime += "-"+Number(DBDaytime[i])
                    }
                    this.form.maintainModels[1].cronParams.unit = 'DAY'
                    this.form.maintainModels[1].cronParams.count = this.DBform.DBDayspan
                }else if(this.DBform.cycleVal1 == "weeks"){
                    let DBWeekstime = this.DBform.DBWeekstime
                    DBWeekstime = DBWeekstime.split(":").reverse()
                    for(let i in DBWeekstime){
                        appointTime += "-"+Number(DBWeekstime[i])
                    }
                    for(let i in this.DBform.weeksday){
                        if(i==0){
                            appointTime += "-"+Number(this.DBform.weeksday[i])
                        }else{
                            appointTime += ","+Number(this.DBform.weeksday[i])
                        }
                    }
                    this.form.maintainModels[1].cronParams.unit = 'WEEK'
                    this.form.maintainModels[1].cronParams.count = this.DBform.DBWeekspan
                }else if(this.DBform.cycleVal1 == "month"){
                    let DBMonthtime = this.DBform.DBMonthtime
                    DBMonthtime = DBMonthtime.split(":").reverse()
                    for(let i in DBMonthtime){
                        appointTime += "-"+Number(DBMonthtime[i])
                    }
                    this.form.maintainModels[1].cronParams.unit = 'MONTH'
                    this.form.maintainModels[1].cronParams.count = this.DBform.DBmonthspan
                    appointTime += '-'+this.DBform.DBmonthday
                }
                this.form.maintainModels[1].cronParams.appointTime = appointTime
                console.log(appointTime)
                this.$https.fetchPost(this.$api.sys.updateMaintainModel.url,this.form.maintainModels[1]).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '数据库同步定时维护修改成功', desc: resp.data.desc, duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else{
                        this.$Notice.error({title: '数据库同步定时维护修改失败', desc:  resp.data.desc, duration: 5});
                    }
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
            },
        }
    }
</script>

<style scoped>
/deep/ .ivu-tooltip-inner {
        max-width: 400px !important;
        z-index: 999 !important;
        min-height: 34px;
        padding: 8px 12px;
        color: #fff;
        text-align: left;
        text-decoration: none;
        background-color: rgba(70, 76, 91, .9);
        border-radius: 4px;
        -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, .2);
        box-shadow: -2 1px 6px rgba(0, 0, 0, .2);
        white-space: nowrap;
    }
</style>