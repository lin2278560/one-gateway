<template>
    <div class="nav">
        <div class="container-fluid">
            <blockquote class="row margin-top clear-margin"
                        style="border-left: groove 5px rgba(0, 0, 0, .4);color: #000000;font-size: 14px;">
                数据同步
            </blockquote>
        </div>
        <!--        <jk_tabs :links="links"></jk_tabs>-->
        <transition name="fade" mode="out-in">
            <router-view v-if="IsRouterAlive" />
        </transition>
    </div>
</template>
<script>
    // @ is an alias to /src
    // import JkTabs from "@/components/JkTabs.vue";

    export default {
        name: "Data",
        components: {
            // jk_tabs: JkTabs,
        },
        provide() {
            return {
                reload: this.reload
            }
        },
        data(){
            return {
                IsRouterAlive: true,
                // links: [
                //     {name: "视频业务", to: "/log/video"},
                //     {name: "文件业务", to: "/log/file"},
                //     {name: "数据库业务", to: "/log/db"},
                //     {name: "映射业务", to: "/log/mapping"},
                //     {name: "定制协议业务", to: "/log/protocol"},
                // ],
            }
        },
        
        mounted() {
        },
        methods: {//方法
            reload() {
                this.IsRouterAlive = false;
                this.$nextTick(function () {
                    this.IsRouterAlive = true;
                });
            },
        }
    };
</script>
<style scoped lang="less">
    @import "../../assets/css/bootstrap.min.css";
    @import "../../assets/css/animate.css";
    @import "../../assets/css/dev-register.css";
    /*@import "../../assets/css/index.css";*/
    @import "../../assets/css/multiple-select.css";
    @import "../../assets/css/omas-basic.css";

    // .nav{
    //     position: relative;
    //     top: -30px;
    //     float: left;
    //     width: 83%;
    //     height: 900px;
    //     border: 0px;
    //     /*background-color: rgb(238, 238, 238);*/
    //     background-color: #fff;
    //     border-top-right-radius: 10px;
    //     border-bottom-right-radius: 10px;
    //     overflow:auto;
    // }
    .nav{
        width: 100%;
        min-height: 600px;
        border: 0px;
        background-color: #fff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow:auto;
    }
</style>
