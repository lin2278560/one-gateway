<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <!--                    <span style="color: #e86429;">FTP服务</span>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">强制访问控制</a>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">FTP安全代理</a>-->
<!--                    <form class="form-inline pull-right" style="float: right">-->
<!--                        <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal">添加内网客户端</div>-->
<!--                    </form>-->
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">
                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">
                        <span style="float: right;margin:5px 10px;font-size: 12px;">启用强制访问控制</span>
                    </div>
                    <div style="float: left;width: 40%;height: 28px;margin:5px 10px;"><input type="checkbox"></div>
                </div>
                <div style="border:1px solid #666; height:250px; width:100%; position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">白名单设置</span>
                    <div style="width: 98%;height: 220px;border: 1px solid gray;margin: 15px 10px;">
                        <div style="width: 25%;height: 218px;float: left;border-right: 1px solid gray;background-color: #eee;">
                            <span style="float: right;margin:109px 10px;font-size: 12px;">白名单列表</span>
                        </div>
                        <div style="float: left;width: 40%;height: 218px;margin:5px 10px;">
                            <textarea style="width:670px;height:170px;"></textarea>
                            <span style="font-size: 12px;">提示:输入允许主机列表IP，多个输入用换行隔开</span>
                        </div>
                    </div>
                </div>
                <div style="border:1px solid #666; height:280px; width:100%; position:relative;float: left;margin-top: 20px;">
                    <span style="background:#faf8f7; display:block; height:20px; width:90px; position:absolute; left:10px; top:-10px; text-align:center;font-size: 12px;">操作权限设置</span>
                    <div style="width: 98%;height: 30px;border: 1px solid gray;float: left;margin: 15px 10px 0px;">
                        <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">
                            <span style="float: right;margin:5px 10px;font-size: 12px;">全选/取消</span>
                        </div>
                        <div style="float: left;width: 40%;height: 28px;margin:5px 10px;"><input type="checkbox" v-model="checked" @change="changeAllChecked()"></div>
                    </div>
                    <div style="width: 98%;height: 220px;border: 1px solid gray;float: left;margin: 0px 10px;">
                        <div style="width: 25%;height: 218px;float: left;border-right: 1px solid gray;background-color: #eee;">
                            <span style="float: right;margin:109px 10px;font-size: 12px;">勾选代表允许的操作命令</span>
                        </div>
                        <div style="float: left;width: 73%;height: 218px;margin:5px 10px;">
                            <table style="width: 100%;height: 100%;">
                                <tr>
                                    <td><input type="checkbox" value="user" v-model="checkedNames">USER(用户名)</td>
                                    <td><input type="checkbox" value="pass" v-model="checkedNames">PASS(密码)</td>
                                    <td><input type="checkbox" value="acct" v-model="checkedNames">ACCT(接收)</td>
                                    <td><input type="checkbox" value="cwd" v-model="checkedNames">CWD(改变工作路径)</td>
                                    <td><input type="checkbox" value="cdup" v-model="checkedNames">CDUP(返回上一级目录)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="smnt" v-model="checkedNames">SMNT(结构加载)</td>
                                    <td><input type="checkbox" value="quit" v-model="checkedNames">QUIT(用户退出)</td>
                                    <td><input type="checkbox" value="rein" v-model="checkedNames">REIN(重新初始化)</td>
                                    <td><input type="checkbox" value="port" v-model="checkedNames">PORT(主动)</td>
                                    <td><input type="checkbox" value="pasv" v-model="checkedNames">PASV(被动)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="type" v-model="checkedNames">TYPE(类型)</td>
                                    <td><input type="checkbox" value="stru" v-model="checkedNames">STRU(文件结构)</td>
                                    <td><input type="checkbox" value="mode" v-model="checkedNames">MODE(传输模式)</td>
                                    <td><input type="checkbox" value="retr" v-model="checkedNames">RETR(下载文件)</td>
                                    <td><input type="checkbox" value="stor" v-model="checkedNames">STOR(保存文件)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="stou" v-model="checkedNames">STOU(唯一保存)</td>
                                    <td><input type="checkbox" value="appe" v-model="checkedNames">APPE(追加或者新建文件)</td>
                                    <td><input type="checkbox" value="allo" v-model="checkedNames">ALLO(分配)</td>
                                    <td><input type="checkbox" value="rest" v-model="checkedNames">REST(重新开始)</td>
                                    <td><input type="checkbox" value="rnfr" v-model="checkedNames">RNFR(重命名)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="rnto" v-model="checkedNames">RNTO(重命名为)</td>
                                    <td><input type="checkbox" value="abor" v-model="checkedNames">ABOR(放弃)</td>
                                    <td><input type="checkbox" value="dele" v-model="checkedNames">DELE(删除文件)</td>
                                    <td><input type="checkbox" value="rmd" v-model="checkedNames">RMD(删除目录)</td>
                                    <td><input type="checkbox" value="mkd" v-model="checkedNames">MKD(创建目录)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="pwd" v-model="checkedNames">PWD(打印目录)</td>
                                    <td><input type="checkbox" value="list" v-model="checkedNames">LIST(列表)</td>
                                    <td><input type="checkbox" value="nlst" v-model="checkedNames">NLST(名字列表)</td>
                                    <td><input type="checkbox" value="site" v-model="checkedNames">SITE(站点参数)</td>
                                    <td><input type="checkbox" value="syst" v-model="checkedNames">SYST(系统)</td>
                                </tr>
                                <tr>
                                    <td><input type="checkbox" value="stat" v-model="checkedNames">STAT(状态)</td>
                                    <td><input type="checkbox" value="help" v-model="checkedNames">HELP(帮助)</td>
                                    <td><input type="checkbox" value="noop" v-model="checkedNames">NOOP(等待)</td>
                                </tr>
                            </table>
                        </div>
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
    // export default {
    //     name: "LocalAccessControl"
    // }
    import JkTabs from "@/components/JkTabs.vue";

    export default {
        name: "LocalAccessControl",
        components: {
            jk_tabs: JkTabs
        },
        inject: ["reload"],
        data(){
            return {
                links: [
                    {name: "FTP服务", to: "/local/ftp"},
                    {name: "强制访问控制", to: "/local/accessControl"},
                    // {name: "FTP安全代理", to: "/local/proxy"},
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
                checked: false,
                checkedNames: [],
                checkedArr: ["user","pass","acct","cwd","cdup","smnt","quit","rein","port","pasv","type","stru","mode","retr",
                            "stor","stou","appe","allo","rest","rnfr","rnto","abor","dele","rmd","mkd","pwd","list","nlst","site",
                            "syst","stat","help","noop"],
            }
        },
        methods: {
            changeAllChecked: function () {
                if (this.checked) {
                    this.checkedNames = this.checkedArr
                } else {
                    this.checkedNames = []
                }
            }
        },
        watch: {
            "checkedNames" : function () {
                if (this.checkedNames.length == this.checkedArr.length) {
                    this.checked = true
                } else {
                    this.checked = false
                }
            }
        }
    };
</script>

<style scoped>
</style>