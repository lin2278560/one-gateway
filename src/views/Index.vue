<template>
    <div>
        <jk_nav/>
        <!-- <v-nav1/> -->
        <div style="display:flex;">
        <v-nav4/>
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
        </div>
    </div>
</template>
<script>
    // @ is an alias to /src
    import JkNav from "@/components/JkNav.vue";
    import vNav1 from "@/components/Nav1.vue";
    import vNav4 from "@/components/Nav4.vue";

    export default {
        name: "Index",
        components: {
            "jk_nav":JkNav,
            "v-nav1":vNav1,
            "v-nav4":vNav4
        }
    };
</script>
<style scoped lang="less">
body {
   overflow: visible !important;
}
</style>
