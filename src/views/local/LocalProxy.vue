<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">IP地址:</span></td>
                            <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">端口:</span></td>
                            <td><Input placeholder="240" style="width: 70px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">启用:</span></td>
                            <td><Checkbox style="width: 70px;margin-left: 15px;"></Checkbox></td>
                        </tr>
                    </table>
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
                    {name: "FTP安全代理", to: "/local/proxy"},
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
        }
    };
</script>

<style scoped>
</style>