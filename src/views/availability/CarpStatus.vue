<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table border :columns="columns1" :data="data1"></Table>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "CarpStatus",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                data1:[],
                columns1: [
                    {title: '序号', align: 'center',key: ''},
                    {title: '双机热备接口', align: 'center',key: ''},
                    {title: '虚拟IP', align: 'center',key: ''},
                    {title: '状态', align: 'center',key: ''}
                ],
                links: [
                    {name: "双机热备状态", to: "/availability/carpStatus"}
                ],
                testList:[],
            }
        },
        methods: {
            getinfo() {
            //     this.$https.fetchGet(this.$api.network.showCommon.url).then((resp) => {
            //     if (resp.data.status == 200) {
            //         console.log(resp.data.data)
            //         this.data1 = resp.data.data
            //     } else
            //         this.$Notice.error({title: '获取数据失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
            //     }).catch(err => {
            //         this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
            //         console.log(err)
            //     })
            },
            //get网口列表
            getUSBList (){
                let obj = {name:"common"}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.testList = resp.data.data
                            console.log(this.testList)
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            
        },
        mounted: function() {
            this.getinfo()
            this.getUSBList()
            
        },
    }
</script>

<style scoped>
</style>