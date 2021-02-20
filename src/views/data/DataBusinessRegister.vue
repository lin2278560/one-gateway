<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <!--                    <span style="color: #e86429;">FTP服务</span>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">强制访问控制</a>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">FTP安全代理</a>-->
<!--                    <form class="form-inline pull-right" style="float: right">-->
<!--                        <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal">添加内网客户端</div>-->
<!--                    </form>-->
                </blockquote>
            </div>
            <div class="modal-body">
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">业务名称:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">业务单位:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;border-bottom: none;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">业务类型:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">数据传输类型:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>结构化数据</option>-->
<!--                            <option>非结构化数据</option>-->
<!--                            <option>结构化与非结构化数据</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>-->
<!--                </div>-->
                <div style="margin: 15px 10px;">
                    <table border="1" style="width: 100%;">
                        <tr style="height: 40px;">
                            <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">业务名称:</span></td>
                            <td><Input v-model="platForm.taskname" placeholder="" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">主管部门:</span></td>
                            <td><Input v-model="platForm.department" placeholder="" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">主管人:</span></td>
                            <td><Input v-model="platForm.master" placeholder="" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                        <tr style="height: 40px;">
                            <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">联系电话:</span></td>
                            <td><Input v-model="platForm.contact" placeholder="" style="width: 150px;margin-left: 15px;" /></td>
                        </tr>
                    </table>
                    <div style="text-align: center;margin-top: 10px;">
                        <Button type="primary" @click="addPlatForm">确认</Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";

    export default {
        name: "DataBusinessRegister",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                platForm: {
                    taskname: null,
                    department: null,
                    master: null,
                    contact: null
                },
                links: [
                    {name: "业务注册", to: "/data/businessRegister"}
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
        },
        methods: {
            addPlatForm() {
                console.log(this.platForm.taskname)
                console.log(this.platForm.taskname.length)
                if (this.platForm.taskname == null) {
                    this.$Notice.error({title: '业务名称不能为空'});
                    return
                }
                if(this.platForm.taskname.length >=10) {
                        this.$Notice.error({title: '业务名称长度不能超过10'});
                        return
                    }
                if (this.platForm.department == null) {
                    this.$Notice.error({title: '主管部门不能为空'});
                    return
                }
                if(this.platForm.taskname.length >=10) {
                        this.$Notice.error({title: '主管部门长度不能超过10'});
                        return
                    }
                if (this.platForm.master == null) {
                    this.$Notice.error({title: '主管人不能为空'});
                    return
                }
                if(this.platForm.taskname.length >=10) {
                        this.$Notice.error({title: '主管人长度不能超过10'});
                        return
                    }
                if (this.platForm.contact == null) {
                    this.$Notice.error({title: '联系电话不能为空'});
                    return
                }
                if(this.platForm.taskname.length >=10) {
                        this.$Notice.error({title: '联系电话长度不能超过10'});
                        return
                    }
                this.$https.fetchPost(this.$api.data.addSyncTask.url,this.platForm
                    // {headers: {'Content-Type': 'multipart/form-data'}}
                ).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '业务注册成功', desc: "正在刷新界面", duration: 2.5});
                        setTimeout(() => {
                            this.$router.push({ path: '/data/test2' })
                        }, 250);
                    } else
                        this.$Notice.error({title: '业务注册失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            }
        }
    };
</script>

<style scoped>
</style>