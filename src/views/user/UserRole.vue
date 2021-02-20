<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table border size="small" :columns="columns1" :data="data1"></Table>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "UserRole",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                columns1: [
                    {title: '组名', key: 'name', align: 'center'},
                    {title: '描述', key: 'descr', align: 'center'},
                    {title: '成员数量', key: 'priv', align: 'center'}
                ],
                links: [
                    {name: "用户", to: "/user/userConfig"},
                    {name: "角色", to: "/user/userRole"},
                    {name: "密码强度设置", to: "/user/userPwd"}
                ],
                data1: []
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            showProxy(){
                this.$https.fetchGet(this.$api.user.showGroup.url).then((resp) => {
                    console.log(resp);
                    this.data1 = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>
</style>