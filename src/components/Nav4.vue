<template>
    <div class="layout">
<!--        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">-->
<!--        <Sider>-->
    <!-- 侧边导航栏 -->
            <Menu :active-name="value3" theme="dark" width="auto" accordion :open-names="value2" ref="side_menu">
                <Submenu name="sys" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                        <template slot="title">
                        <Icon type="ios-settings" />
                        系统配置
                    </template>
                    <MenuItem v-for="(value,i) in links1" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <Submenu name="network" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-keypad" />
                        网络配置
                    </template>
                    <MenuItem v-for="(value,i) in links2" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <!-- <Submenu name="channel" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        通道服务
                    </template>
                    <MenuItem v-for="(value,i) in links10" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu> -->
                <Submenu name="availability" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-alert-outline" />
                        高可用性
                    </template>
                    <MenuItem v-for="(value,i) in links3" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <Submenu name="local" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-albums-outline" />
                        本地服务
                    </template>
                    <MenuItem v-for="(value,i) in links4" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <Submenu name="data" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-sync" />
                        数据同步
                    </template>
                    <MenuItem v-for="(value,i) in links5" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <Submenu name="virus" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-umbrella-outline" />
                        病毒库管理
                    </template>
                    <MenuItem v-for="(value,i) in links6" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <!-- <Submenu name="test" style="background-color: #293949;font-size: 12px;" v-bind:class="{adminShow:adminStatus}">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        FTP代理服务
                    </template>
                    <MenuItem v-for="(value,i) in links7" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu> -->
                <Submenu name="logs" style="background-color: #293949;font-size: 12px;" v-bind:class="{logShow:logStatus}">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        日志与审计
                    </template>
                    <MenuItem v-for="(value,i) in links8" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
                <Submenu name="user" style="background-color: #293949;font-size: 12px;" v-bind:class="{userShow:userStatus}">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        系统配置
                    </template>
                    <MenuItem v-for="(value,i) in links9" :name="value.no" :key="i" @click.native="quick(value.to)" style="padding-left: 25px; background: #23313f !important;font-size: 12px;"><Icon type="ios-arrow-forward" />{{value.name}}</MenuItem>
                </Submenu>
            </Menu>
<!--        </Sider>-->
<!--        <Layout :style="{marginLeft: '200px'}">-->
<!--            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>-->
<!--            <Content :style="{padding: '0 16px 16px'}">-->
<!--                <Breadcrumb :style="{margin: '16px 0'}">-->
<!--                    <BreadcrumbItem>Home</BreadcrumbItem>-->
<!--                    <BreadcrumbItem>Components</BreadcrumbItem>-->
<!--                    <BreadcrumbItem>Layout</BreadcrumbItem>-->
<!--                </Breadcrumb>-->
<!--                <Card>-->
<!--                    <div style="height: 600px">Content</div>-->
<!--                </Card>-->
<!--            </Content>-->
<!--        </Layout>-->
    </div>
</template>

<script>
    import Utils from './test.js';
    export default {
        name: "Nav4",
        data () {
            return {
                adminStatus: true,
                logStatus: true,
                userStatus: true,
                value2: ['sys'],
                value3: 'info',
                links1: [
                    {name: "系统状态", to: "/sys/info", no: "info"},
                    {name: "系统时间", to: "/sys/time", no: "time"},
                    {name: "系统维护", to: "/sys/maintain", no: "maintain"},
                    {name: "登录设置", to: "/sys/loggingSettings", no: "loggingSettings"},
                    {name: "备份/恢复", to: "/sys/backupRecovery", no: "backupRecovery"},
                    {name: "系统升级", to: "/sys/update", no: "update"},
                    {name: "设备信息", to: "/sys/equipmentInfo", no: "equipmentInfo"},
                    {name: "诊断工具", to: "/sys/toolPing", no: "toolPing"},
                    {name: "授权验证", to: "/sys/license", no: "license"},
                ],
                links2: [
                    {name: "接口配置", to: "/network/interface", no: "interface"},
                    {name: "网关设置", to: "/network/gateway", no: "gateway"},
                    {name: "静态路由", to: "/network/route", no: "route"},
                    {name: "通道设置", to: "/network/channel", no: "channel"},
                    {name: "IP/MAC绑定", to: "/network/ipormac", no: "ipormac"}
                ],
                links3: [
                    {name: "双机热备", to: "/availability/carpSetting", no: "carpSetting"},
                    {name: "虚拟IP", to: "/availability/virtual", no: "virtual"},
                    // {name: "双机热备状态", to: "/availability/carpStatus", no: "carpStatus"}
                ],
                links4: [
                    {name: "通信访问控制", to: "/local/acl", no: "acl"},
                    {name: "FTP服务", to: "/local/ftp", no: "ftp"},
                    {name: "SMB服务", to: "/local/smb", no: "smb"},
                    // {name: "NFS服务", to: "/local/nfs", no: "nfs"},
                    {name: "SFTP服务", to: "/local/sftp", no: "sftp"},
                    {name: "可信接入认证", to: "/local/trust", no: "trust"},
                    {name: "邮件服务", to: "/local/mail", no: "mail"}
                ],
                links5: [
                    {name: "数据资源", to: "/data/resources", no: "resources"},
                    {name: "数据库系统配置", to: "/data/comm", no: "comm"},
                    {name: "业务注册", to: "/data/businessRegister", no: "businessRegister"},
                    // {name: "业务与服务管理", to: "/data/fileSync1", no: "fileSync1"}
                    {name: "业务与服务管理", to: "/data/test2", no: "test2"}
                ],
                links6: [
                    {name: "引擎信息", to: "/virus/engineInfo", no: "engineInfo"},
                    {name: "隔离区管理", to: "/virus/isolation", no: "isolation"}
                ],
                links7: [
                    {name: "FTP 代理配置", to: "/test/ftpProxy", no: "ftpProxy"},
                    {name: "文件同步过滤策略", to: "/test/fileSyncFilter", no: "fileSyncFilter"},
                    {name: "FTP 代理参数配置", to: "/test/ftpProxyParameter", no: "ftpProxyParameter"},
                    {name: "发送参数配置", to: "/test/sendParameter", no: "sendParameter"},
                    {name: "任务配置", to: "/test/taskConfig", no: "taskConfig"},
                ],
                links8: [
                    // {name: "系统日志", to: "/logs/logSys", no: "logSys"},
                    {name: "管理操作日志", to: "/logs/logCommond", no: "logCommond"},
                    {name: "数据库抽取日志", to: "/logs/logDbExtractInfo", no: "logDbExtractInfo"},
                    {name: "数据库基本信息日志", to: "/logs/logDbMessage", no: "logDbMessage"},
                    {name: "文件同步日志", to: "/logs/logFileMonitor", no: "logFileMonitor"},
                    {name: "文件同步异常日志", to: "/logs/LogFileCommond", no: "LogFileCommond"},
                    {name: "通道操作日志", to: "/logs/logFileChannel", no: "logFileChannel"},
                    {name: "告警日志", to: "/logs/logFileWarning", no: "logFileWarning"},
                    // {name: "认证状态日志", to: "/logs/logTrustAuth", no: "logTrustAuth"},
                    {name: "日志管理设置", to: "/logs/logSetting", no: "logSetting"}
                ],
                links9: [
                    {name: "用户配置", to: "/user/userConfig", no: "userConfig"}
                ],
                links10: [
                    {name: "通道服务", to: "/test/ceshitest", no: "ceshitest"}
                ],
            }
        },
        watch: {
            openNames() {   //监听tabbar样式高亮
                this.$nextTick(() => {
                    this.$refs.side_menu.updateOpened(); //手动更新子目录
                    this.$refs.side_menu.updateActiveName(); //手动更新当前选择项
                })
            }
        },
        mounted: function() {
            this.checkUserAuthority(null);
            // this.value2 = ['6'];
            var that = this;
            Utils.$on('demo1', function (e) {
                that.checkUserAuthority(e);
            });
        },
        methods:{
            checkUserAuthority(e) {
                // 检测用户登陆权限
                if(this.$route.path.indexOf("logs") > -1) {
                    this.logStatus = false;
                }else if(this.$route.path.indexOf("user") > -1) {
                    this.userStatus = false;
                }else {
                    this.adminStatus = false;
                }

                if(e == null) {
                    let test1 = this.$route.path.split("/");
                    // console.log(test1);  打印出路由规则
                    this.value2 = [test1[1]];
                    this.value3 = test1[2];
                    this.openNames();
                }else {
                    let test1 = e.split("/");
                    this.value2 = [test1[1]];
                    this.value3 = test1[2];
                    this.openNames();
                }
            },
            openNames() {
                this.$nextTick(() => {
                    this.$refs.side_menu.updateOpened();
                    // this.$refs.side_menu.updateActiveName();
                })
            },
            quick (e) {
                this.$router.push({ path: e });
            }
            // test2(e) {
            //     if(e.indexOf("sys") > -1){
            //         this.value2 = '1';
            //     }else if(e.indexOf("network") > -1){
            //         this.value2 = '2';
            //     }else if(e.indexOf("availability") > -1){
            //         this.value2 = '3';
            //     }else if(e.indexOf("local") > -1){
            //         this.value2 = '4';
            //     }else if(e.indexOf("data") > -1){
            //         this.value2 = '5';
            //     }else if(e.indexOf("virus") > -1){
            //         this.value2 = '6';
            //     }
            // }
        }

    }
</script>

<style scoped>
    /* .ivu-layout-content{
        position: relative;
        top:-30px;
        margin-left: 3%;

        float: left;
        width: 11.4%;
        height: 900px;
        min-width: 130px;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    }
    .layout{
        margin-left: 2.5%;
        top:-30px;
        float: left;
        width: 12.5%;
        height: 900px;


        background-color: #293949;
        position: relative;
        overflow:auto;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
    } */
    .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{
        border-right: none;
        color: #E86429;
        background: #23313f !important;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }

    .adminShow{
        display: none;
    }
    .logShow{
        display: none;
    }
    .userShow{
        display: none;
    }
    .ivu-layout-content{
        /*background: #293949;*/
        /* position: relative;
        top:-30px; */
        /*margin-right: 40px;*/
        /* margin-left: 3%; */

        /* float: left; */
        width: 200px;
        min-height: 720px;
        /* min-width: 130px; */
        /* border-top-left-radius: 10px;
        border-bottom-left-radius: 10px; */
    }
    .layout{
        min-height: 720px;
        width: 200px;
        background-color: #ffffff;
        float:left;
        background: #293949;
        overflow:auto;
    }
</style>