<template>
    <div class="nav">
        <!--        <jk_tabs :links="links"></jk_tabs>-->
<!--        <div class="container-fluid">-->
<!--            <blockquote class="row margin-top clear-margin"-->
<!--                        style="border-left: groove 5px rgba(0, 0, 0, .4);color: #000000;">-->
<!--                系统配置-->
<!--                <footer>系统控制台</footer>-->
<!--            </blockquote>-->
<!--        </div>-->
        <transition name="fade" mode="out-in">
            <router-view  v-if="IsRouterAlive" />
        </transition>
    </div>
</template>
<script>
    // @ is an alias to /src
    // import JkTabs from "@/components/JkTabs.vue";

    export default {
        name: "Sys",
        components: {
            // jk_tabs: JkTabs
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
                //     {name: "系统信息", to: "/sys/info"},
                //     {name: "用户管理", to: "/sys/user"},
                //     {name: "漏洞管理", to: "/sys/bug"},
                // ]
            }
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
        float: left;
        width:100%;
        background-color: #fff;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        overflow:auto;
    }
</style>
