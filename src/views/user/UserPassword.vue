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
                                <td style="width: 25%;background-color: #eee;margin-left: 70%;"><span style="float: right;margin-right: 15px;font-size: 12px;">最小密码长度:</span></td>
                                <td><Input placeholder="8" disabled v-model="modal.form.min" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                            <tr style="height: 40px;">
                                <td style="background-color: #eee;"><span style="float: right;margin-right: 15px;font-size: 12px;">最大密码长度:</span></td>
                                <td><Input placeholder="16" v-model="modal.form.max" style="width: 70px;margin-left: 15px;" /></td>
                            </tr>
                        </table>
                    </div>
                <div>
                    <Button type="primary" style="margin: 10px 50%;" @click="addPlatForm">确认</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    export default {
        name: "UserPassword",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
                links: [
                    {name: "用户", to: "/user/userConfig"},
                    {name: "角色", to: "/user/userRole"},
                    {name: "密码强度设置", to: "/user/userPwd"},
                ],
                modal: {
                    form: {
                        min: '8',
                        max: null
                    }
                },
            }
        },
        mounted: function() {
            this.showProxy();
        },
        methods: {
            showProxy(){
                this.$https.fetchGet(this.$api.user.showPWD.url).then((resp) => {
                    console.log(resp.data.data);
                    this.modal.form = resp.data.data;
                }).catch(err => {
                    console.log(err)
                })
            },
            addPlatForm() {
                // console.log("asdasd", this.modal.form);
                // this.$refs['info_form'].validate((valid) => {
                //     if (!valid)
                //         return;
                    if(Number(this.modal.form.min)>=Number(this.modal.form.max)?true:false){
                        this.$Notice.error({title: '密码长度修改失败', desc: "最小值请小于最大值"});
                        return
                    }
                    this.$https.fetchPost(this.$api.user.updatePWD.url, this.modal.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '密码长度修改成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                location.reload();
                            }, 300);
                            
                        } else
                            this.$Notice.error({title: '密码长度修改失败', desc: "错误代码：" + resp.data.status, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                // });
            }
        }
    }
</script>

<style scoped>
</style>