<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header" style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
                <Button
                        style="float:right"
                        type="primary"
                        @click="back"
                    >返回</Button>
            </div>
            <div class="modal-body">
                <div style="border: 1px solid #bcbcbc;padding: 1em 1.4em;">
                    <Steps size="small" :current="current" style="margin: 0 0 30px 80px;">
                        <Step title="服务定义"></Step>
                        <Step title="服务属性配置"></Step>
                        <Step title="业务表管理"></Step>
                        <Step title="执行计划"></Step>
                        <Step title="总览"></Step>
                    </Steps>
                    <div v-show="show0" style="margin: 20px 0 0 30px;">
                        <div v-if="!bool">
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">服务名称</span>
                                <Input v-model="step1name" style="width: 200px;margin-left: 50px;" />
                                <span style="font-size: 12px;color: red">*(内外端需一致)</span>
                            </div>
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">服务ID</span>
                                <Input v-model="step1ID" style="width: 200px;margin-left: 62px;" />
                                <span style="font-size: 12px;color: red">*(内外端需一致)</span>
                            </div>
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">描述</span>
                                <Input v-model="postmodal.form.maintask.taskdescribe" style="width: 60%;margin-left: 75px;"/>
                            </div>
                        </div>
                        <div v-if="bool">
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">服务名称</span>
                                <Input v-model="step1name" disabled style="width: 200px;margin-left: 50px;" />
                                <span style="font-size: 12px;color: red">*(内外端需一致)</span>
                            </div>
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">服务ID</span>
                                <Input v-model="step1ID" disabled style="width: 200px;margin-left: 62px;" />
                                <span style="font-size: 12px;color: red">*(内外端需一致)</span>
                            </div>
                            <div style="height: 40px;">
                                <span style="font-size: 12px;text-align: center;">描述</span>
                                <Input v-model="postmodal.form.maintask.taskdescribe" style="width: 60%;margin-left: 75px;"/>
                            </div>
                        </div>
                    </div>

                    <!-- step2 -->
                    <div v-show="show1" style="margin: 20px 0 0 30px;">
                        <div style="height: 120px;">
                            <span style="font-size: 12px;margin-bottom: 20px;">同步方式</span>
                            <RadioGroup
                                @on-change="radiochange"
                                style="margin-left: 95px;"
                                v-model="vertical">
                                <p>
                                    <Radio label="触发器增量同步"></Radio>
                                </p>
                                <p style="font-size: 12px;">备注:触发器方式是增量同步,为了达到同步效果需保证建立任务之前两边表数据已一致</p>
                                <!-- <p><Radio label="触发器单表同步 "></Radio></p> -->
                                <p>
                                    <Radio label="触发器单表同步 "></Radio>
                                </p>
                                <!-- <p>
                                    <Radio label="普通全表"></Radio>
                                </p> -->
                            </RadioGroup>
                        </div>
                        <div style="height: 40px;">
                            <span style="font-size: 12px;text-align: center;">启用连接池</span>
                            <checkbox
                                @on-change="checkboxchange"
                                v-model="checkvalue1"
                                style="margin-left: 83px;"
                            ></checkbox>
                        </div>
                        <div style="height: 40px;">
                            <span style="font-size: 12px;text-align: center;">随系统自启动</span>
                            <checkbox
                                @on-change="checkboxchange"
                                v-model="checkvalue2"
                                style="margin-left: 71px;"
                            ></checkbox>
                        </div>
                    </div>
                    <!-- step3 -->
                    <div v-show="show2">
                        <!-- 添加同步任务表按钮 -->
                        <!-- <dbsync_task_edit_add style="margin: 0 0 10px 92%;"></dbsync_task_edit_add> -->
                        <div class="panel-select">
                            <span style="margin-left: 15px;">源端数据资源选择：</span>
                            <Select v-model="model1" style="width:200px">
                                <Option
                                    @click.native="getdDbinfoByName(item,j)"
                                    v-for="(item,j) in dbSoucreList"
                                    :value="item"
                                    :key="j"
                                >{{ item }}</Option>
                            </Select>
                            <span style="margin-left: 15px;">表名搜索：</span>
                            <Input
                                v-model="fromNameSearch"
                                placeholder="按回车搜索"
                                :search="true"
                                clearable
                                @on-enter="checkFromName"
                                style="width: 300px"
                            />
                            <Button type="primary" @click="checkFromName">搜索</Button>
                        </div>

                        <!-- 同步表单 -->
                        <Table
                            @on-selection-change="selectionchange()"
                            @on-select-all-cancel="handleCancelSelectAll"
                            @on-select-all="handleSelectAll"
                            @on-select="handleSelect"
                            @on-select-cancel="handleCancel"
                            size="small"
                            height:650px
                            border
                            :columns="columns1"
                            :data="historyData"
                            ref="selection"
                        >
                            <template slot-scope="{ row, index }" slot="state">
                                <Button
                                    :icon="data1[index].iconName"
                                    size="small"
                                    style="margin: auto"
                                    @click="updateState(index)"
                                >
                                    <span :style="{'color':data1[index].color}">{{ row.state }}</span>
                                </Button>
                            </template>
                            <template slot-scope="{ row }" slot="action">
                                <Button
                                    icon="md-create"
                                    type="primary"
                                    size="small"
                                    style="margin-right: 5px"
                                    @click="createData2(row)"
                                >配置</Button>
                            </template>
                        </Table>
                        <Button style="font-size: 12px;margin: 10px;" @click="handleSelectAll1">整个资源所有表全选</Button>
                        <Button
                            style="font-size: 12px;margin: 10px;"
                            @click="handleCancelSelectAll1"
                        >取消全选</Button>
                        <!-- <span v-if="addFormBtn">
                            <Button style="font-size: 12px;margin: 10px;" type="primary" @click="addsourceList()">添加进同步队列</Button>
                        </span>-->

                        <Page
                            :current.sync="currentPage"
                            :total="dataCount"
                            show-elevator
                            :page-size="pageSize"
                            :show-total="true"
                            @on-change="changepage"
                            @on-page-size-change="changepagesize"
                        ></Page>
                    </div>

                    <!-- step4 -->
                    <div v-show="show3" style="margin: 20px 0 0 30px;">
                        <div style="height: 120px;">
                            <span style="font-size: 12px;margin-bottom: 20px;">同步方式</span>
                            <RadioGroup style="margin-left: 95px;" v-model="timePlan">
                                <div style="height: 30px;">
                                    <span @click="checkOther(1)">
                                        <Radio label="时间间隔"></Radio>
                                        <InputNumber
                                            v-model="timespan"
                                            maxlength="2"
                                            :max="10"
                                            :min="1"
                                            style="margin-left: 15px;"
                                        ></InputNumber>
                                    </span>
                                </div>
                                <!-- <div style="height: 50px;">
                                    <span @click="checkOther(1)">
                                        <Radio label="定时"></Radio>
                                        <DatePicker
                                            type="date"
                                            placeholder="Select date"
                                            style="margin-left: 38px;"
                                        ></DatePicker>
                                    </span>
                                </div>
                                <div style="height: 50px;">
                                    <span @click="checkOther(2)">
                                        <Radio label="其它"></Radio>
                                    </span>
                                </div> -->
                            </RadioGroup>
                        </div>

                        <div v-show="otherShow"
                            style="border: 1px solid #666;height: 180px;width: 60%;position: relative;margin: 20px 0 0 130px;">
                            <span
                                style="background:#faf8f7; display:block; height:20px; width:150px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;"
                            >特殊执行周期设定</span>
                            <div style="margin: 20px 0 0 50px;">
                                <div style="height: 40px;">
                                    <span style="font-size: 12px;text-align: center;">定时类型</span>
                                    <Select
                                        v-model="cycleVal"
                                        style="width:80px;margin-left: 15px;"
                                    >
                                        <Option
                                            v-for="cycle in cycleList1"
                                            :value="cycle.value"
                                            :key="cycle.value"
                                            @click.native="configData(cycle.value)"
                                        >{{ cycle.label }}</Option>
                                    </Select>
                                </div>
                            </div>

                            <div style="border: 1px solid #666;height: 60px;width: 80%;position: relative;margin: 20px 0 0 40px;">
                                <span
                                    style="background:#faf8f7; display:block; height:20px; width:30px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;"
                                >天</span>

                                <div style="margin-top: 15px;" v-show="isDayShow">
                                    <TimePicker
                                        placeholder="Select time"
                                        style="width: 200px;margin-left: 15px;"
                                    ></TimePicker>
                                </div>
                                <div style="margin-top: 15px;" v-show="isWeeksShow">
                                    <TimePicker
                                        placeholder="Select time"
                                        style="width: 200px;margin-left: 15px;margin-right: 15px;"
                                    ></TimePicker>
                                    <checkbox>周一</checkbox>
                                    <Checkbox>周二</Checkbox>
                                    <Checkbox>周三</Checkbox>
                                    <Checkbox>周四</Checkbox>
                                    <Checkbox>周五</Checkbox>
                                    <Checkbox>周六</Checkbox>
                                    <Checkbox>周日</Checkbox>
                                </div>
                                <div style="margin-top: 15px;" v-show="isMonthShow">
                                    <TimePicker
                                        placeholder="Select time"
                                        style="width: 200px;margin-left: 15px;margin-right: 15px;"
                                    ></TimePicker>
                                    <Input placeholder="输入范围为1-31" style="width: 100px;" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-show="show4" style="margin: 20px 0 0 30px;">
                        <Row>
                            <Col>
                                <div class="show5title">1.基本配置</div>
                                <Table :columns="columns5" border :data="data5"></Table>
                            </Col>
                        </Row>

                        <Row :gutter="36">
                            <Col span="24">
                                <div class="show5title">2.外端数据库资源配置</div>
                                <Table :columns="columns6" border :data="data6"></Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div class="show5title">3.基本配置</div>
                                <Table :columns="columns8" border :data="historyData1"></Table>
                                <Page
                                    style="margin-top:5px;"
                                    :current.sync="currentPage1"
                                    :total="dataCount1"
                                    show-elevator
                                    :page-size="pageSize"
                                    :show-total="true"
                                    @on-change="changepage1"
                                    @on-page-size-change="changepagesize1"
                                ></Page>
                            </Col>
                        </Row>
                        <div v-if="this.bool">
                            <Button
                                class="addfrombtn"
                                type="primary"
                                style="font-size: 12px"
                                @click="updateForm()"
                            >修改同步任务</Button>
                        </div>
                        <div v-else>
                            <Button
                                class="addfrombtn"
                                type="primary"
                                style="font-size: 12px"
                                @click="addForm()"
                            >提交同步任务</Button>
                        </div>
                    </div>

                    <Button
                        style="margin: 30px 10px 0 0;"
                        :disabled="islast"
                        type="primary"
                        @click="last"
                    >上一步</Button>
                    <Button
                        style="margin-top: 30px;"
                        :disabled="isnext"
                        type="primary"
                        @click="next"
                    >下一步</Button>
                </div>
            </div>
        </div>

        <Modal
            v-model="modal.show"
            title="字段配置"
            :scrollable="true"
            :transfer="true"
            width="70%"
            @on-ok="updatecolumn"
            @on-cancel="cancel"
        >
            <Row :gutter="25">
                <!-- <Col span="18"> -->
                <div class="max-height">
                    <Table
                        @on-select="handleSelect2"
                        @on-select-cancel="handleCancel2"
                        style="width:100%;top:0px;overflow-y:auto;"
                        :scrollable="true"
                        :fullscreen="true"
                        size="small"
                        border
                        :columns="columns2"
                        :data="data2"
                        ref="selection1"
                    >
                        <template slot-scope="{ row, index }" slot="name">
                            <Input type="text" v-model="editName" v-if="editIndex === index" />
                            <span v-else>{{ row.tcolumnnamestring }}</span>
                        </template>
                        <template slot-scope="{ row, index }" slot="action">
                            <div v-if="editIndex === index">
                                <Button @click="handleSave(index)">保存</Button>
                                <Button @click="editIndex = -1">取消</Button>
                            </div>
                            <div v-else>
                                <Button @click="handleEdit(row, index)">操作</Button>
                            </div>
                        </template>
                    </Table>
                </div>
            </Row>
        </Modal>
    </div>
</template>

<script>
import JkTabs from "@/components/JkTabs.vue";
// import dbsync_task_edit_add from "./dbsync_task_edit_add";
import test from "../../components/test";

export default {
    name: "dbsync_task_edit",
    components: {
        jk_tabs: JkTabs,
        // dbsync_task_edit_add
    },
    data() {
        return {
            //被修改的资源名
            sourceListtablename:'',
            //标识列
            bool6:true,
            //
            updatedatalista1:[],
            //setdata3检测是否有主键
            bool5: true,
            //data2备份
            cancaeldata2:[],
            //全部的资源数据
            datalist: [],
            data2checkboindex: "",
            //保存的选中框
            updateItem: [],
            //被选择的数据库资源
            selectsourcedata: [],
            //数据库资源
            sourcedata: [],
            //时间间隔
            timespan: 3,
            addFormBtn: false,
            //判断是否为修改页面
            bool: false,
            data10: [],
            data5: [],
            data6: [],
            data7: [],
            data8: [],
            data3: [],
            data4: [],
            sidentityarray: "",
            sourceName: "",
            sourceList: [],
            tablename: "",
            data1: [],
            data2: [],
            updatesourceList: {},
            modal: {
                show: false
            },
            postmodal: {
                show: false,
                form: {
                    taskId: "",
                    id: "",
                    maintask: {
                        servicename: "",
                        oid: "",
                        multitasktype: "one2one",
                        taskdescribe: "",
                        synctype: "1",
                        runstate: "stop",
                        plantype: "1",
                        cronexpression: "*/3 * * * * ?",
                        
                        autorun: "false",
                        enabledbpool: "false",
                        stoptime: ""
                    },
                    subtask: [],
                    table: []
                }
            },
            model1: "",
            step1name: "",
            step1ID: "",
            current: 0,
            show0: true,
            show1: false,
            show2: false,
            show3: false,
            show4: false,
            checkvalue1: true,
            checkvalue2: true,
            vertical: "触发器增量同步",
            timePlan: "时间间隔",
            isAuthentication: false,
            otherShow: false,
            islast: true,
            isnext: false,
            cycleVal: "day",
            cycleList1: [
                { value: "day", label: "天" },
                { value: "weeks", label: "周" },
                { value: "month", label: "月" }
            ],
            isDayShow: true,
            isWeeksShow: false,
            isMonthShow: false,
            columns1: [
                {
                    title: "状态",
                    type: "selection",
                    align: "center",
                    width: 60
                },
                {
                    title: "序号",
                    key: "id",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        return h(
                            "span",
                            params.index +
                                (this.currentPage - 1) * this.pageSize +
                                1
                        );
                    }
                },
                { title: "外端数据库表", key: "path", align: "center" },
                { title: "映射内端表", key: "table", align: "center" },
                { title: "主键追踪", key: "state", align: "center" },
                {
                    title: "字段配置",
                    key: "action",
                    slot: "action",
                    width: 150,
                    align: "center"
                }
            ],
            columns2: [
                {
                    title: "序号",
                    align: "center" ,
                    key: "id",
                    width: 80,
                    render: (h, params) => {
                        return h("span", params.index + 1);
                    }
                },
                { title: "外端数据库表字段名", key: "scolumnnamestring" , align: "center"},
                { title: "数据类型", key: "sdatatypestring", align: "center" },
                { title: "主键", key: "key", align: "center" },
                // {
                //     title: '标识列',
                // 		align: 'center',
                // 		key: 'checkBox',
                // 		width: 80,
                // 		render: (h, params) => {
                // 			return h('div', [
                // 				h('Checkbox', {
                // 					props: {
                // 						value: params.row.checkBox
                // 					},
                // 					on: {
                // 						'on-change': (e) => {
                // 							if (e == false) {
                //                                 this.disabled = true
                //                                 // this.$set(this.data2[params.index], 'key', false)
                // 							}else{
                //                                 this.data2[params.index].checkBox = e;  //再将勾选的对象的checkBox设置为true
                //                                 // this.data2[params.index].key = true
                //                             }
                // 							// this.data2.forEach((items) => {  //先取消所有对象的勾选，checkBox设置为false
                //                             //     this.$set(items, 'checkBox', false)
                //                             //     this.$set(items, 'key', false)
                //                             // });
                // 						}
                // 					}
                // 				})
                // 			])
                // 		}
                // },
                {
                    title: "标识列",
                    type: "selection",
                    align: "center",
                    width: 60
                },

                {
                    title: "内端数据库表字段名",
                    key: "tcolumnnamestring",
                    slot: "name"
                    , align: "center" 
                },
                {
                    title: "修改内端数据库表字段名",
                    slot: "action"
                    , align: "center" 
                }
            ],
            columns3: [
                { title: "序号", key: "id" , align: "center"},
                { title: "内端数据库表字段名", key: "path" , align: "center"},
                { title: "数据类型", key: "state" , align: "center"}
            ],
            columns5: [
                { title: "序号", align: "center",
                    render: (h, params) => {
                        return h("span", params.index + 1);
                    }
                },
                { title: "服务名称", align: "center",key: "servicename" },
                { title: "服务ID",align: "center", key: "oid" },
                { title: "描述",align: "center", key: "taskdescribe" },
                { title: "同步方式",align: "center", key: "synctype" },
                { title: "启用连接池",align: "center", key: "enabledbpool" },
                { title: "随系统自启动",align: "center", key: "autorun" },
                { title: "时间间隔", align: "center",key: "cronexpression" }
            ],
            columns6: [
                { title: "序号", 
                    align: "center", 
                    render: (h, params) => {
                        return h("span", params.index + 1);
                    }
                },
                { title: "Ip地址",align: "center", key: "ip" },
                { title: "端口", align: "center",key: "port" },
                { title: "数据库", align: "center",key: "db" },
                { title: "数据库类型",align: "center", key: "dbtype" },
                { title: "同步账号用户名", align: "center",key: "initusername" },
                { title: "业务账号用户名",align: "center", key: "inituserpass" }
            ],
            columns7: [
                { title: "资源名称", key: "taskId", align: "center" },
                { title: "Ip地址", key: "ip", align: "center" },
                { title: "端口", key: "port" , align: "center"},
                { title: "数据库", key: "db", align: "center" },
                { title: "数据库类型", key: "dbtype", align: "center" }
            ],
            columns8: [
                {
                    title: "序号",
                    key: "id",
                    align: "center",
                    width: 100,
                    render: (h, params) => {
                        return h(
                            "span",
                            params.index +
                                (this.currentPage1 - 1) * this.pageSize +
                                1
                        );
                    }
                },
                { title: "源表", key: "stablename" , align: "center"},
                { title: "目标表", key: "ttablename" , align: "center"},
                { title: "方向", key: "direction" , align: "center"},
                { title: "字段数", key: "idsdatatypestringlen" , align: "center"},
                { title: "同步字段数", key: "idsdatatypestringlen1" , align: "center"}
            ],
            //columns8的page
            currentPage8:1,
            links: [{ name: "数据库同步", to: "/data/dbsync" }],
            dbSoucreList: [],
            fromNameSearch: "",
            editIndex: -1,
            ajaxHistoryData: [],
            ajaxHistoryData1: [],
            // 初始化信息总条数
            dataCount: 0,
            dataCount1: 0,
            // 每页显示多少条
            pageSize: 5,
            //被选择的数组
            selected: [],
            historyData: [],
            historyData1: [],
            currentPage: 1,
            currentPage1: 1,
            bool1: true,
            bool2: true,
            //修改字段保存的list
            updatebackList: {},
            //保存被勾选的表名
            tablescolumnnamestring: [],
            //保存两个选取data2配置的索引
            updateindex: 0,
            updateindex1: 0,
            //被修改的索引
            chuan: []
        };
    },
    computed: {},
    methods: {
        //返回业务页面
        back(){
            this.$router.push("/data/test2")
        },
        checkAuthentication() {
            this.isAuthentication = !this.isAuthentication;
        },
        checkOther(index) {
            if (index == 2) {
                this.otherShow = true;
            } else {
                this.otherShow = false;
            }
        },
        last() {
            this.current -= 1;
            if (this.current == 0) {
                this.islast = true;
                this.show1 = false;
                this.show0 = true;
            } else if (this.current == 3) {
                this.isnext = false;
                this.show4 = false;
                this.show3 = true;
                this.updateChecked();
            } else if (this.current == 2) {
                this.data3 = [];
                this.isnext = false;
                this.show3 = false;
                this.show2 = true;
                this.updateChecked();
            } else if (this.current == 1) {
                this.isnext = false;
                this.show2 = false;
                this.show1 = true;
            }
        },
        // 步骤条下一步方法
        next() {
            if (!this.step1name || !this.step1ID) {
                this.$Modal.warning({
                    title: "警告",
                    content: "请填写服务名称和服务ID"
                });
                return;
            }
            if(!this.$util.queryNum(this.step1ID)){
                    this.$Modal.warning({
                    title: "警告",
                    content: "服务ID必须为数字"
                })
                return;
            }
            if(this.step1ID == '9999'){
                    this.$Modal.warning({
                    title: "警告",
                    content: "服务ID不能为9999"
                })
                return;
            }
            if(this.timespan<1||this.timespan>10){
                    this.$Modal.warning({
                    title: "警告",
                    content: "时间间隔范围在1-10秒"
                })
                return;
                }
            this.postmodal.form.maintask.servicename = this.step1name;
            this.postmodal.form.maintask.oid = this.step1ID;
            this.current += 1;
            
            if (this.current == 4) {
                
                this.isnext = true;
                this.Setdata8();
                
                this.$set(this.data5[0], "cronexpression", this.timespan);
                this.show3 = false;
                this.show4 = true;
            }
            if (this.current == 3) {
                //忘记了为什么要加一个arr的校验
                // let arr = this.$refs.selection.getSelection();
                // console.log(arr,"arr")
                // console.log(this.selected)
                // if (this.selected.length == 0 || arr.length == 0) {
                let arr = this.$refs.selection.getSelection();
                console.log(arr,"arr")
                console.log(this.selected,"selected")
                if (this.selected.length == 0) {
                    this.selected = []
                    this.current -= 1;
                    this.$Modal.info({
                        title: "提示",
                        content: "没选择到源表添加到同步队列中"
                    });
                } else {
                    this.Setdata3();
                    //判断有没有清除标识列
                    // for(let i in this.data3){
                    //     if(!this.data3[i].sidentityarray){
                    //         this.$Modal.info({
                    //             title: "提示",
                    //             content: "你所选的"+this.data3[i].sidentityarray+"没有标识列"
                    //         });
                    //         return
                    //     }
                    // }
                    let arr = [];
                    // console.log("selected",this.selected)
                    // console.log("data4",this.data4)
                    for (let i in this.selected) {
                        for (let j in this.data4) {
                            if (
                                this.selected[i].path ==
                                this.data4[j].stablename
                            ) {
                                arr.push(this.data4[j]);
                            }
                        }
                    }
                    // console.log(arr)
                    this.data3 = arr;
                    // console.log("data3",this.data3)
                    this.getSourcedata(this.tablename);
                    this.zonglan();
                    this.show2 = false;
                    this.show3 = true;
                }
            } else if (this.current == 1) {
                this.islast = false;
                this.show1 = true;
                this.show0 = false;
            } else if (this.current == 2) {
                this.show1 = false;
                this.show2 = true;

                if (this.bool) {
                    if (this.bool1) {
                        for (let i = 0; i < this.sourceList.length; i++) {
                            for (let j = 0; j < this.updateItem.length; j++) {
                                if (
                                    this.sourceList[i].tablename ==
                                    this.updateItem[j]
                                ) {
                                    // console.log(i)
                                    this.$refs.selection.toggleSelect(i);
                                }
                            }
                        }
                    }
                    this.bool1 = false;
                }
                this.updateChecked();
            }
        },
        configData(index) {
            if (index == "day") {
                this.isDayShow = true;
                this.isWeeksShow = false;
                this.isMonthShow = false;
            } else if (index == "weeks") {
                this.isDayShow = false;
                this.isWeeksShow = true;
                this.isMonthShow = false;
            } else if (index == "month") {
                this.isDayShow = false;
                this.isWeeksShow = false;
                this.isMonthShow = true;
            }
        },
        // 修改字段
        createData2(row) {
            //判断是否为修改时的
            this.bool6 = true
            this.data2 = [];
            this.updatebackList = row;
            
            this.modal.show = true;
            this.editIndex = -1;
            this.sourceName = row.path;
            console.log(this.datalist,"datalist")
            for (let i in this.datalist) {
                for (let j in this.datalist[i].tables.table) {
                    // console.log(this.datalist[i].tables.table[j])
                    if (this.datalist[i].sourcename === this.tablename) {
                        this.updateindex = i;
                    }
                    for (let k in this.datalist[i].tables.table[j]) {
                        if (
                            this.datalist[i].tables.table[j].tablename === this.sourceName
                        ) {
                            this.updateindex1 = j;
                        }
                    }
                }
            }
            
            this.data2 = this.datalist[this.updateindex].tables.table[this.updateindex1].columns;
            this.cancaeldata2 = this.data2
            for(let i in this.chuan){
                for(let j in this.data2){
                    if(row.path == this.chuan[i].tablename && this.data2[j].ssyncdsn == this.sourceListtablename && this.chuan[i].index.length != 0){  
                        this.bool6 = false
                    }
                }
            }
            if(this.bool6){
                for (let i in this.data2) {
                    this.data2[i]._checked = false
                    if (this.data2[i].key1 == "true") {
                        this.data2[i]._checked = true;
                    }
                }
            }
                        
            console.log(this.data2,"data2")
            // console.log(this.datalist[this.updateindex].tables.table[this.updateindex1].columns,"1")
            // console.log("3",this.sourceList[row._index].fieldinfo)
            // this.findSourcesInfoName(row,false)
        },
        handleEdit(row, index) {
            this.editName = row.tcolumnnamestring;
            this.editIndex = index;
        },
        handleSave(index) {
            this.data2[index].tcolumnnamestring = this.editName;
            this.editIndex = -1;
        },
        checkFromName() {
            this.historyData = [];
            let _this = this;
            let NewItems = [];
            this.data1.map(function(item) {
                if (item.path.search(_this.fromNameSearch.trim()) != -1) {
                    NewItems.push(item);
                }
            });
            this.historyData = NewItems;
            this.ajaxHistoryData = NewItems;
            this.dataCount = NewItems.length;
            this.currentPage = 1;
            this.updateChecked();
            if (NewItems.length < this.pageSize) {
                this.historyData = this.ajaxHistoryData;
            } else {
                this.historyData = this.ajaxHistoryData.slice(0, this.pageSize);
            }
        },
        // 获取历史记录信息
        handleListApproveHistory() {
            // console.log(this.data1,"data1")
            // 保存取到的所有数据
            this.ajaxHistoryData = this.data1;
            this.dataCount = this.data1.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (this.data1.length < this.pageSize) {
                this.historyData = this.ajaxHistoryData;
            } else {
                this.historyData = this.ajaxHistoryData.slice(0, this.pageSize);
            }
        },
        handleListApproveHistory1() {
            // console.log(this.data1,"data1")
            // 保存取到的所有数据
            this.ajaxHistoryData1 = this.data8;
            this.dataCount1 = this.data8.length;
            // 初始化显示，小于每页显示条数，全显，大于每页显示条数，取前每页条数显示
            if (this.data8.length < this.pageSize) {
                this.historyData1 = this.ajaxHistoryData1;
            } else {
                this.historyData1 = this.ajaxHistoryData1.slice(
                    0,
                    this.pageSize
                );
            }
        },
        changepage(index) {
            // console.log(this.data1)
            this.currentPage = index;
            var _start = (index - 1) * this.pageSize;
            var _end = index * this.pageSize;
            this.historyData = this.ajaxHistoryData.slice(_start, _end);
            this.updateChecked();
        },
        changepagesize(pageSize) {
            this.currentPage = pageSize;
            this.handleListApproveHistory();
        },
        changepage1(index) {
            // console.log(this.data1)
            this.currentPage = index;
            var _start = (index - 1) * this.pageSize;
            var _end = index * this.pageSize;
            this.historyData1 = this.ajaxHistoryData1.slice(_start, _end);
            this.updateChecked();
        },
        changepagesize1(pageSize) {
            this.currentPage = pageSize;
            this.handleListApproveHistory1();
        },
        radiochange() {
            if (this.vertical == "触发器增量同步") {
                this.postmodal.form.maintask.synctype = '1';
            } else if(this.vertical == "触发器单表同步 "){
                this.postmodal.form.maintask.synctype = '4';
            }
            else {
                this.postmodal.form.maintask.synctype = '2';
            }
        },
        checkboxchange() {
            if (this.checkvalue1 == true) {
                this.postmodal.form.maintask.autorun = true;
            } else {
                this.postmodal.form.maintask.autorun = false;
            }
            if (this.checkvalue2 == true) {
                this.postmodal.form.maintask.enabledbpool = true;
            } else {
                this.postmodal.form.maintask.enabledbpool = false;
            }
        },
        getDbList() {
            this.$https
                .fetchGet(this.$api.getDbList.url)
                .then(resp => {
                    if (resp.data.status == 200) {
                        this.dbSoucreList = resp.data;
                        console.log(this.dbSoucreList,"dbSoucreList")
                    } else
                        this.$Notice.error({
                            title: "请求失败",
                            desc: "错误：" + resp.data.desc,
                            duration: 5
                        });
                })
                .catch(err => {
                    this.$Notice.error({
                        title: "请求失败",
                        desc: err,
                        duration: 5
                    });
                    console.log(err);
                });
        },
        getdDbinfoByName(val, index) {
            this.selected = [];
            this.data3 = [];
            this.tablename = val;
            let obj = { name: val };
            
            this.selected = [];
            // this.historyData = []
            if (this.bool) {
                let obj = [];
                for (let i in this.updatesourceList.subtask) {
                    let a1 = {
                        tablename: "",
                        sidentityarray: [],
                        index: []
                    };
                    a1.tablename = this.updatesourceList.subtask[i].stablename;
                    a1.index = this.updatesourceList.subtask[i].index;
                    a1.sidentityarray.push(
                        this.updatesourceList.subtask[i].sidentityarray.split(
                            "|"
                        )
                    );
                    a1.sidentityarray = a1.sidentityarray[0];
                    a1.sidentityarray.pop();
                    obj.push(a1);
                }
                this.chuan = obj;
                // console.log(this.chuan, "chuan");
            }
            for (let a1 in this.datalist) {
                if (this.datalist[a1].sourcename == this.tablename) {
                    
                    if (this.bool) {
                        
                        for (let i in this.datalist[a1].tables.table) {
                            for (let k in this.chuan) {
                                if (this.datalist[a1].tables.table[i].tablename == this.chuan[k].tablename) {
                                    // console.log(this.chuan[k].tablename)
                                    for(let i1 in this.datalist[a1].tables.table[i].columns){
                                        this.datalist[a1].tables.table[i].columns[i1]._checked = false
                                    }
                                    for (let j in this.datalist[a1].tables.table[i].columns) {
                                        for (let j1 in this.chuan[k].index) {
                                            if (this.chuan[k].index[j1] ==this.datalist[a1].tables.table[i].columns[j].index) {
                                                this.datalist[a1].tables.table[i].columns[j]._checked = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    // else{
                        this.sourceList = this.datalist[a1]
                        // console.log(this.datalist[a1],"a1")
                        // }
                }
            }
            // console.log(this.updatesourceList,"update")
            // console.log(this.sourceList, "sourcelist");
            let arr = [];
            let arr1 = [];
            let obj1 = {
                _checedked: false,
                selectStuas: false,
                path: "",
                table: "",
                state: "true"
            };
            // console.log(this.bool,"this.bool")
            //这一步导致了每次点击资源名时，被选中的资源阴魂不散
            if (this.bool) {
                for (let i = 0; i < this.updatesourceList.subtask.length; i++) {
                    obj1 = {
                        _checedked: false,
                        selectStuas: false,
                        path: "",
                        table: "",
                        state: "true"
                    };
                    obj1.path = this.updatesourceList.subtask[i].stablename;
                    obj1.table = obj1.path;
                    this.selected.push(obj1);
                }
                this.updatesourceList.subtask = []
            }
            for (let i = 0; i < this.sourceList.tables.table.length; i++) {
                obj1 = {
                    _checedked: false,
                    selectStuas: false,
                    path: "",
                    table: "",
                    state: "true"
                };
                obj1.path = this.sourceList.tables.table[i].tablename;
                obj1.table = obj1.path;
                arr.push(obj1);
            }
            // }

            this.data1 = arr;
            this.historyData = arr;
            // console.log(this.updatesourceList);
            this.handleListApproveHistory();
            console.log(this.selected,"this.selected")
        },
        selectionchange() {
            // console.log(this.selected)
        },
        zonglan() {
            this.data5 = [];
            this.data6 = [];
            this.data8 = [];
            this.postmodal.form.taskId = this.$route.query.id;
            this.postmodal.form.subtask = this.data3;
            let vertical;
            // console.log(this.vertical,"this.vertical")
            if (this.vertical == "触发器增量同步") {
                vertical = "触发器增量同步";
            } else if(this.vertical == "触发器单表同步 "){
                vertical = "触发器单表同步 "
            }else{
                vertical = "普通全表"
            }
            let obj = {
                taskId: this.postmodal.form.taskId,
                servicename: this.postmodal.form.maintask.servicename,
                oid: this.postmodal.form.maintask.oid,
                taskdescribe: this.postmodal.form.maintask.taskdescribe,
                synctype: vertical,
                enabledbpool: this.checkvalue2 ? "是" : "否",
                autorun: this.checkvalue1 ? "是" : "否",
                cronexpression: this.timespan
            };
            this.data5.push(obj);
            let obj1 = {
                taskId: this.postmodal.form.taskId,
                ip: this.selectsourcedata.dbip,
                port: this.selectsourcedata.dbport,
                db: this.tablename,
                dbtype: this.selectsourcedata.dbtype,
                initusername: this.selectsourcedata.initusername,
                inituserpass: this.selectsourcedata.inituserpass
            };
            this.data6.push(obj1);
        },
        addForm() {
            let arr = this.data3;
            let temp = [];
            for (let i = 0; i < arr.length; i++) {
                temp = temp.concat(arr[i]);
            }
            this.data3 = temp;

            this.postmodal.form.taskId = this.$route.query.id;
            // this.$route.query.id =''
            // this.postmodal.form.maintask.plantype = this.vertical;
            let str =  "*/"+this.timespan+" * * * * ?"
            this.postmodal.form.maintask.cronexpression = str
            // console.log(this.postmodal.form.taskId)
            this.postmodal.form.subtask = this.data3;
            this.postmodal.form.maintask.channel_transmission_mode="highSpeed"
            console.log(this.postmodal.form);
            this.$https.fetchPost(this.$api.data.submitmission.url,this.postmodal.form)
                .then(resp => {
                    if (resp.status == 200) {
                        this.$Notice.success({
                            title: "添加成功",
                            desc: "添加成功",
                            duration: 2.5
                        });
                        this.$router.push("/data/test2");

                    } else {
                        this.$Notice.error({
                            title: "添加失败",
                            desc: "错误：" + resp.data.desc,
                            duration: 5
                        });

                    }
                })
                .catch(err => {
                    this.$Notice.error({
                        title: "请求失败",
                        desc: err,
                        duration: 5
                    });
                    console.log(err);
                });
        },
        updateForm() {
            let arr = this.data3;
            let temp = [];
            for (let i = 0; i < arr.length; i++) {
                temp = temp.concat(arr[i]);
            }
            this.data3 = temp;
            this.postmodal.form.taskId = this.$route.query.id;
            this.postmodal.form.id = this.$route.query.taskId;
            let str =  "*/"+this.timespan+" * * * * ?"
            this.postmodal.form.maintask.cronexpression = str
            this.postmodal.form.subtask = this.data3;
            this.postmodal.form.maintask.autorun = this.checkvalue1;
            this.postmodal.form.maintask.enabledbpool = this.checkvalue2;
            this.postmodal.form.maintask.channel_transmission_mode="highSpeed"
            this.postmodal.form.maintask.synctype = this.postmodal.form.maintask.synctype.toString();
            console.log("form", this.postmodal.form);
            this.$https
                .fetchPost(
                    this.$api.data.updateDbmission.url,
                    this.postmodal.form
                )
                .then(resp => {
                    if (resp.status == 200) {
                        this.$Notice.success({
                            title: "修改成功",
                            desc: "修改成功",
                            duration: 2.5
                        });
                        this.$router.push("/data/test2");
                    } else {
                        this.$Notice.error({
                            title: "修改失败",
                            desc: "错误：" + resp.data.desc,
                            duration: 5
                        });
                    }
                })
                .catch(err => {
                    this.$Notice.error({
                        title: "请求失败",
                        desc: err,
                        duration: 5
                    });
                    console.log(err);
                });
        },
        concatArr(arr) {
            this.data3.push(arr);
        },
        getInfo() {
            this.$https.fetchGet(this.$api.data.findDsnInfo.url).then(resp => {
                this.sourcedata = resp.data.data;
            });
        },
        //把源数据加上_checedked字段，遍历已选项数据，更新选中状态
        updateChecked() {
            console.log(this.selected, "select");
            for (var i = 0; i < this.historyData.length; i++) {
                this.historyData[i]._checedked = false;
                this.historyData[i]._checked = false;
                for (var j = 0; j < this.selected.length; j++) {
                    if (this.selected[j].path === this.historyData[i].path) {
                        this.historyData[i]._checedked = true;
                        this.historyData[i]._checked = true;
                    }
                }
            }
        },
        handleCancel(selection, row) {
            console.log(row);
            //从已选项中去除取消项
            this._.remove(this.selected, n => {
                return n.path === row.path;
            });
        },
        handleSelect(selection, row) {
            //添加到已选项
            console.log("row", row);
            this.selected.push(row);
        },
        handleCancel2(selection, row) {},
        handleSelect2(selection, row) {
            //添加到已选项
        },
        handleSelectAll(selection) {
            //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
            // console.log(selection)
            this.selected = this._.uniqBy(
                this.selected.concat(selection),
                "path"
            );
        },
        handleCancelSelectAll(selection) {
            //从已选项中移除当页数据
            this.selected = this._.differenceBy(
                this.selected,
                this.historyData,
                "path"
            );
        },
        handleSelectAll1(selection) {
            //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下

            for (let i in this.data1) {
                this.data1[i]._checked = true;
                this.selected.push(this.data1[i]);
            }
            console.log(this.data1);
            // this.selected.push(this.data1)
            this.updateChecked();
            // console.log(this.selected)
        },
        handleCancelSelectAll1(selection) {
            //从已选项中移除当页数据
            this.selected = [];
            for (let i in this.data1) {
                this.data1[i]._checked = false;
            }
            this.updateChecked();
        },
        Setdata8() {
            let listdata = this.postmodal.form.subtask;
            let obj3 = {};
            this.data8 = [];
            for (let i = 0; i < listdata.length; i++) {
                obj3 = {
                    stablename: listdata[i].stablename,
                    ttablename: listdata[i].ttablename,
                    direction: "单向",
                    idsdatatypestringlen: listdata[i].columnslength,
                    idsdatatypestringlen1: listdata[i].columnslength
                };
                this.data8.push(obj3);
                // }
            }
            this.handleListApproveHistory1();
        },
        Setdata3() {
            let arr = this.sourceList;
            let arr1 = [];
            let arr2 = [];
            let arr3 = [];

            for (let i = 0; i < arr.tables.table.length; i++) {
                arr1.push(this.sourceList.tables.table[i].columns);
            }
            for (let i in arr1) {
                arr2.push(arr1[i]);
            }
            let a = 0;
            let obj1 = {};
            console.log(arr2, "arr2");
            for (let i = 0; i < arr2.length; i++) {
                this.bool5 = true
                obj1 = {
                    tasktype: "single",
                    taskcreateddirection: "N2NT",
                    scolumnnamestring: "", //源表字段/
                    sdatatypestring: "", //源表字段类型/
                    sidentityarray: "", //源表主键列：id/
                    ttablename: "", //目的表名
                    stablename: "", //源表名
                    ssyncdsn: "", //源表所所在的资源信息
                    tcolumnnamestring: "", //目表名字段/
                    tdatatypestring: "", //目标表字段类型/
                    tidentityarray: "", //目标表主键列/
                    tsyncdsn: "", //目标表所所在的资源信息
                    columnslength: "", //字段长
                    keys: "", //是否为主键
                    _checked: false,
                    index: []
                };
                obj1.stablename = arr2[i][0].stablename;
                obj1.ttablename = arr2[i][0].ttablename;
                obj1.ssyncdsn = arr2[i][0].ssyncdsn;
                obj1.tsyncdsn = arr2[i][0].tsyncdsn;
                obj1.sidentityarray = arr2[i][0].sidentityarray;
                obj1.tidentityarray = arr2[i][0].tidentityarray;
                obj1.columnslength = arr2[i].length;
                arr3 = arr2[i];
                // console.log(arr3,"arr3")
                for (let j = 0; j < arr2[i].length; j++) {
                    obj1._checked = arr3[j]._checked;
                    if (obj1._checked == true) {
                        obj1.index.push(arr3[j].index);
                    }
                    obj1.scolumnnamestring = obj1.scolumnnamestring+"|" +arr3[j].scolumnnamestring 
                    obj1.sdatatypestring = obj1.sdatatypestring + "|" + arr3[j].sdatatypestring
                    obj1.tcolumnnamestring = obj1.tcolumnnamestring+ "|" +arr3[j].tcolumnnamestring
                    obj1.tdatatypestring = obj1.tdatatypestring + "|" + arr3[j].tdatatypestring
                    if (arr3[j]._checked == true) {
                        // console.log(arr3[j]._checked)
                        if(this.bool5){
                            obj1.sidentityarray = ''
                            obj1.tidentityarray = ''
                            this.bool5 = false
                        }
                        obj1.sidentityarray = obj1.sidentityarray + "|" + arr3[j].scolumnnamestring
                        obj1.tidentityarray = obj1.tidentityarray + "|" + arr3[j].tcolumnnamestring
                    }
                }
                obj1.scolumnnamestring = obj1.scolumnnamestring.substr(1)
                obj1.sdatatypestring = obj1.sdatatypestring.substr(1)
                obj1.tcolumnnamestring = obj1.tcolumnnamestring.substr(1)
                obj1.tdatatypestring = obj1.tdatatypestring.substr(1)
                if(obj1.sidentityarray.charAt(0) == '|'){
                    obj1.sidentityarray = obj1.sidentityarray.substr(1)
                }
                if(obj1.tidentityarray.charAt(0) == '|'){
                    obj1.tidentityarray = obj1.tidentityarray.substr(1)
                }
                // obj1.sidentityarray = obj1.sidentityarray.substr(1)
                // obj1.tidentityarray = obj1.tidentityarray.substr(1)
                // if(!obj1.tidentityarray){
                //     obj1.tidentityarray = obj1.tidentityarray.substr(1)
                // }
                // if(!obj1.sidentityarray){
                //     obj1.sidentityarray = obj1.sidentityarray.substr(1)
                // }
                this.data3.push(obj1);
                this.data4 = this.data3;
            }
            console.log(this.data3, "data3");
        },
        cancel(){
            this.data2 = []
        },
        updatecolumn() {
            let arr1 = [];
            let arr = this.$refs.selection1.getSelection();
            // if(arr){
            //     this.$Modal.warning({
            //         title: "warning",
            //         content: "标识列不能为空"
            //     });
            //     return;
            // }
            for (let i in this.sourceList.tables.table[this.updateindex1].columns) {
                this.datalist[this.updateindex].tables.table[this.updateindex1].columns[i]._checked = false;
                this.sourceList.tables.table[this.updateindex1].columns[i]._checked = false;
                this.datalist[this.updateindex].tables.table[this.updateindex1].columns[i].key1 = "false";
                this.sourceList.tables.table[this.updateindex1].columns[i].key1 = "false";
            }
            for (let i in arr) {
                arr1.push(arr[i].index);
            }
            for (let i in arr1) {
                this.sourceList.tables.table[this.updateindex1].columns[
                    arr1[i]
                ]._checked = true;
                this.datalist[this.updateindex].tables.table[
                    this.updateindex1
                ].columns[arr1[i]]._checked = true;
                this.sourceList.tables.table[this.updateindex1].columns[arr1[i]].key1 = "true";
            }
            console.log(
                this.sourceList.tables.table[this.updateindex1].columns
            )
            // console.log(this.datalist[this.updateindex].tables.table[this.updateindex1].columns,"1")
            // console.log(this.data2,"2")
        },
        getSourcedata(val) {
            for (let i in this.sourcedata) {
                if ((this.sourcedata[i].sourcealias == val)) {
                    this.selectsourcedata = [];
                    this.selectsourcedata = this.sourcedata[i];
                    console.log(this.selectsourcedata,"this.sourcedata[i].sourcealias")
                }
            }
        },
        getTableList(index) {
            this.$https
                .fetchGet(this.$api.data.getTableList.url)
                .then(resp => {
                    if (resp.status == 200) {
                        this.datalist = resp.data.data;
                        let arr = [];
                        // console.log(this.datalist[0].tables.table[0].fieldinfo.split("*#"))
                        for (let i in this.datalist) {
                            for (let j in this.datalist[i].tables.table) {
                                this.datalist[i].tables.table[j].fieldinfo = 
                                this.datalist[i].tables.table[j].fieldinfo.split("*#");
                                let arr1 = this.datalist[i].tables.table[j]
                                    .fieldinfo;
                                // console.log("1",arr1)
                                this.$set(
                                    this.datalist[i].tables.table[j],
                                    "columns",
                                    []
                                );
                                for (let k in this.datalist[i].tables.table[j]
                                    .fieldinfo) {
                                    this.datalist[i].tables.table[j].fieldinfo[k] = this.datalist[i].tables.table[j].fieldinfo[k].split("|");

                                    let arr2 = this.datalist[i].tables.table[j]
                                        .fieldinfo[k];

                                    // console.log("2",arr2)
                                    let a = 0;
                                    let obj1 = {
                                        tasktype: "single",
                                        _checked: false,
                                        taskcreateddirection: "N2NT",
                                        scolumnnamestring: arr2[0], //源表字段
                                        sdatatypestring: arr2[1], //源表字段类型
                                        key: arr2[5], //主键true，false
                                        key1: arr2[5], //标识键初始渲染
                                        sidentityarray: "", //源表主键列：id
                                        ttablename: "", //目的表名
                                        stablename: "", //源表名
                                        ssyncdsn: "", //源表所所在的资源信息
                                        tcolumnnamestring: "", //目表名字段
                                        tdatatypestring: "", //目标表字段类型
                                        tidentityarray: "", //目标表主键列
                                        tsyncdsn: "", //目标表所所在的资源信息
                                        index: 0
                                    };
                                    if (obj1.key == "true") {
                                        // obj1._checedked = true;
                                        obj1.sidentityarray = arr2[0];
                                        obj1.tidentityarray = arr2[0];
                                    }
                                    obj1.tcolumnnamestring = arr2[0];
                                    obj1.tdatatypestring = obj1.sdatatypestring;
                                    obj1.stablename = this.datalist[
                                        i
                                    ].tables.table[j].tablename;
                                    obj1.ttablename = this.datalist[
                                        i
                                    ].tables.table[j].tablename;
                                    obj1.ssyncdsn = this.datalist[i].sourcename;
                                    obj1.tsyncdsn = this.datalist[i].sourcename;
                                    obj1.index = k;
                                    // console.log("obj1",obj1)
                                    this.datalist[i].tables.table[j].columns.push(obj1);
                                }
                            }
                        }
                        // this.$Notice.success({title: '获取成功', desc: "获取成功", duration: 2.5});
                        if (this.bool) {
                            this.getdDbinfoByName(index);
                        }
                    } else {
                        this.$Notice.error({
                            title: "获取失败",
                            desc: "错误:" + resp.data.desc,
                            duration: 5
                        });
                    }
                })
                .catch(err => {
                    this.$Notice.error({
                        title: "请求失败,请刷新页面",
                        desc: err,
                        duration: 5
                    });
                    console.log(err);
                });
        },
        getdbSoucreList() {
            this.$https.fetchGet(this.$api.data.getDbList.url).then(resp => {
                this.dbSoucreList = resp.data.data
                console.log(this.dbSoucreList,"dbSoucreList")
            });
        }
    },
    created() {
        this.handleListApproveHistory();
        this.getInfo();
        this.getdbSoucreList();
        
        if (this.$route.query.taskId == undefined) {
            // setTimeout(() => {
                this.getTableList();
            // }, 250);
            
        } else {
            let obj = {
                id: this.$route.query.taskId,
                taskId: this.$route.query.id
            };
            this.bool = true;
                  
            this.$https.fetchGet(this.$api.data.getUpdateList.url, obj).then(resp => {
                    if (resp.data.status == 200) {
                    let v = resp.data.data;
                    this.updatesourceList = v;
                    this.getTableList(this.$route.query.ssyncdsn);
                    // this.getTableList(this.updatesourceList.subtask[0].ssyncdsn);
                    console.log(v, "v.maintask.oid");
                    this.step1ID = v.maintask.oid;
                    this.step1name = v.maintask.servicename;
                    this.postmodal.form.id = this.$route.query.id;
                    this.postmodal.form.maintask.taskdescribe =v.maintask.taskdescribe;
                    this.postmodal.form.maintask.synctype = v.maintask.synctype;
                    // console.log(this.postmodal.form.maintask.synctype)
                    if (this.postmodal.form.maintask.synctype == "1") {
                        this.vertical = "触发器增量同步";
                    }
                    else if (this.postmodal.form.maintask.synctype == "4") {
                        this.vertical = "触发器单表同步 ";
                    }
                    else {
                        this.vertical = "普通全表";
                    }
                    this.postmodal.form.maintask.autorun = v.maintask.autorun;
                    this.postmodal.form.maintask.enabledbpool = v.maintask.enabledbpool;
                    this.timespan = parseInt(v.maintask.cronexpression.substr(2,2))
                    console.log(this.timespan)
                    this.sourceListtablename = v.subtask[0].ssyncdsn 
                    if(v.maintask.autorun == true){
                        this.checkvalue1 = true
                    }else{
                        this.checkvalue1 = false
                    }
                    if(v.maintask.enabledbpool == true){
                        this.checkvalue2 = true
                    }else{
                        this.checkvalue2 = false
                    }
                    let arr = [];
                    arr = v.subtask;
                    console.log(arr[0].ssyncdsn)
                    let json = {};
                    for (var i in arr) {
                        var node = arr[i];
                        if (json[node.stablename]) {
                            json[node.stablename].push(node);
                        } else {
                            json[node.stablename] = [node];
                        }
                    }
                    this.model1 = arr[0].ssyncdsn;
                    // this.updateItem = Object.keys(json);
                    
                    // this.getTableList(arr[0].ssyncdsn);
                    // console.log("subtaks",v.subtask)
                    for (let i in v.subtask) {
                        for (let j in this.data1) {
                            if (
                                v.subtask[i].stablename === this.data1[j].path
                            ) {
                                this.selected.push(this.data1[j]);
                            }
                        }
                    }
                    } else {
                        this.$Notice.error({title: '文件同步启停失败', desc: "错误：" + resp.data.desc, duration: 5});

                    }
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration:5});
                    console.log(err)
                })
        }
    },
    mounted() {
        
    }
};
</script>

<style scoped>
.panel-select {
    border: 1px solid rgb(188, 188, 188);
}
.ivu-modal-body {
    height: 300px;
}
.addfrombtn {
    position: relative;
    top: 60px;
    left: 200px;
}
.flexbox {
    display: flex;
}
.flexitem {
    justify-content: center;
    flex-direction: column;
}
.show5title {
    margin: 15px;
    font-size: 16px;
    font-weight: bold;
}
.max-height {
    max-height: 300px;
    overflow-y: auto;
}
.modal-body{
  overflow-y:auto;  
  overflow-x:hidden;
}
.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
</style>