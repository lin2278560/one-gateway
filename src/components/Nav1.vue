<template>
<!-- secondheader -->
  <div class="nav">
    <ul class="nav-items">
        <li v-for="(v,i) in tap.items" :key="i">
              <div @click="quick(v.to)">
                  <Icon :type="v.type" style="margin-bottom: 5px;font-size: 24px;" /><br/>
                  <span style="font-size: 13px;">{{v.title}}</span>
              </div>
      </li>
    </ul>
  </div>
</template>
<script>
    import Utils from './test.js';
    export default {
        name: "NetworkGateway",
        components: {

        },
        data(){
            return{
                tap:{
                    items:[
                        {to:"/sys/info", title:"首页", type:"md-home"},
                        {to:"/network/interface", title:"接口配置", type:"md-git-network"},
                        {to:"/network/gateway", title:"网关设置", type:"md-git-pull-request"},
                        {to:"/local/ftp", title:"FTP服务", type:"md-create"},
                        {to:"/local/smb", title:"SMB服务", type:"md-list-box"},
                        {to:"/data/test2", title:"数据同步", type:"md-sync"},
                        // {to:"/test/ceshitest", title:"测试调试", type:"md-aperture"},
                        {to:"/logs/logSys", title:"日志与审计", type:"md-list-box"},
                        {to:"/user/userConfig", title:"用户配置", type:"ios-contact"},
                      ],
                    select:0
                }
            }
        },
        methods:{
            // toView(i){
            // this.tap.select=i;
            // this.$router.push({path:this.tap.items[i].to});
            // getInfo: function (to) {
            //     console.log(to);
            // },
            quick (e) {
                this.$router.push({ path: e });
                Utils.$emit('demo1',e);
            },
            functionA(e) {
                // this.$router.push({ path: index });
                Utils.$emit('demo','qqq');
            }
        },
        mounted() {
            let users = this.$storage.getStorage("users");
            if(users != null) {users  = users.replace("\"","").replace("\"","");}
            if(users == "admins") {
                this.tap.items.splice(6, 2);
            }else if(users == "logauditor") {
                this.tap.items.splice(0, 6);
                this.tap.items.splice(1, 1);
            }else {
                this.tap.items.splice(0, 7);
            }
        },
    }
</script>
<style scoped>
    .nav{
        width: 100%;
        height:100px;
        background-color: #e86429;
    }

    .nav-items{
        list-style: none;
        color: white;
        /*display: inline-block;*/
        margin: 13px 90px 0 50px;
    }
    .nav-items li{
        display: inline-block;
        cursor: pointer;
        width:75px;
        height:75px;
        margin: 0 20px 0 0;
        text-align: center;
    }
    .nav-items li:hover{
        border-bottom:solid 5px white;
    }
    .nav-items li.active{
        border-bottom:solid 5px white;
    }
    .nav-items img{
        display: inline-block;
        width:35px;
        height:35px;
        padding:0;
        margin: 0 20px 5px;
    }
    .nav-items span{
        font-size: 16px;
        line-height: 1;
        font-weight: 500;
    }
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>
