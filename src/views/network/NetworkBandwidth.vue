<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">是否启用:</span></td>
                            <td>
                                <RadioGroup v-model="status" style="margin-left: 15px;">
                                    <Radio label="禁用"></Radio>
                                    <Radio label="启用"></Radio>
                                </RadioGroup>
                            </td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">接口:eth1</span></td>
                            <td><Input placeholder="1024" style="width: 70px;margin-left: 15px;" /><span style="margin-left: 5px;">Mbit</span></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "NetworkBandwidth",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                status:"禁用",

                links: [
                    {name: "接口列表", to: "/network/interface"},
                    {name: "端口聚合", to: "/network/portTrunking"},
                    {name: "带宽设置", to: "/network/bandwidth"},
                    {name: "Mac地址", to: "/network/mac"},
                ]
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
</style>