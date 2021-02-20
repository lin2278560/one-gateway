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
                        <tr style="height: 40px;" v-for="(item,index) in data" :key="index">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;">
                                <span style="float: right;margin-right: 15px;font-size: 12px;">{{index}}</span>
                            </td>
                            <td>
                                <span style="margin-left:15px;font-size:12px;">{{item}}</span>
                            </td>
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
        name: "NetworkMac",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                status:"禁用",
                data:[],
                keys:[],
                links: [
                    {name: "接口列表", to: "/network/interface"},
                    {name: "端口聚合", to: "/network/portTrunking"},
                    // {name: "带宽设置", to: "/network/bandwidth"},
                    {name: "Mac地址", to: "/network/mac"},
                ]
            }
        },
        mounted: function() {
            this.getinfo()    
        },
        methods: {
            getinfo(){
                this.$https.fetchGet(this.$api.network.showDevAndMac.url).then((resp) => {
                    if (resp.data.status == 200) {
                   
                    this.data = resp.data.data;
                    for(let i in this.data){
                        this.keys.push(i)
                    }
                    console.log(this.data,"this.data")
                    } else {
                        this.$Message.info('请求数据失败');
                    }
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
        }
    }
</script>

<style scoped>
</style>