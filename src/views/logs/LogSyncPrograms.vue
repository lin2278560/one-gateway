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
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">监控程序日志设置</span></td>
                            <td>
                                <table style="margin-left: 15px;">
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">开启备份:</td><td><Checkbox v-model="start_program" style="margin-left: 15px;"></Checkbox></td></tr>
                                    <tr style="display:block;margin: 10px 0;font-size: 12px;"><td style="width: 120px;font-size: 12px;">阀值:</td><td><Input :value="program_max_size" style="width: 200px;margin-left: 15px;" /> 超过设定大小自动压缩转存,单位MB</td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">备份路径:</td><td><Input :value="program_path" style="width: 200px;margin-left: 15px;" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">目录清理日志阀值:</td><td><Input :value="program_sfmdellogsise" style="width: 200px;margin-left: 15px;" /></td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">目录清理间隔:</td><td><Input :value="program_crondeltime" style="width: 200px;margin-left: 15px;" /></td></tr>
                                </table>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">发送端日志设置</span></td>
                            <td>
                                <table style="margin-left: 15px;">
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">开启备份:</td><td><Checkbox v-model="start_sender" style="margin-left: 15px;"></Checkbox></td></tr>
                                    <tr style="display:block;margin: 10px 0;font-size: 12px;"><td style="width: 120px;font-size: 12px;">阀值:</td><td><Input :value="sender_size" style="width: 200px;margin-left: 15px;" /> 超过设定大小自动压缩转存,单位MB</td></tr>
                                    <tr style="display:block;margin: 10px 0;"><td style="width: 120px;font-size: 12px;">备份路径:</td><td><Input :value="sender_path" style="width: 200px;margin-left: 15px;" /></td></tr>
                                </table>
                            </td>
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
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "LogSyncPrograms",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                start_program: true,
                program_max_size: 200,
                program_path: "/home/smond",
                program_sfmdellogsise: 0,
                program_crondeltime: 10,

                start_sender: true,
                sender_size: 200,
                sender_path: "/home/ogapd",

                links: [
                    {name: "日志常规设置", to: "/logs/logSetting"},
                    {name: "Syslog服务", to: "/logs/logSyslog"},
                    {name: "SNMP Traps服务", to: "/logs/logSnmpTraps"},
                    {name: "同步程序日志设置", to: "/logs/logSyncPrograms"}
                ]
            }
        },
        methods: {

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