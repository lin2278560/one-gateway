<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left"></jk_tabs>
                    <!--                    <span style="color: #e86429;">FTP服务</span>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">强制访问控制</a>&nbsp;|&nbsp;<a class="J_menuItem" href="postclient.html" style="color: #000">FTP安全代理</a>-->
                    <form class="form-inline pull-right" style="float: right">
                        <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal">添加内网客户端</div>
                    </form>
                </blockquote>
            </div>
            <div class="modal-body">
                <div style="width: 100%;height: 100%;float: left;">
                    <table border="1" style="width: 100%;height: 100%;">
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">外端服务id:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">服务名称:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">资源类型:</span></td>
                            <td>
                                <select type="text" style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option>本地FTP</option>
                                    <option>本地SMB</option>
                                    <option>本地NFS</option>
                                    <option>光盘塔</option>
                                    <option>Client</option>
                                    <option>认证同步</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">目录:</span></td>
                            <td>
                                <select style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option></option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">等级:</span></td>
                            <td>
                                <select style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">编码:</span></td>
                            <td>
                                <select style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option>UTF-8</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">显示高级设置:</span></td>
                            <td><input type="checkbox" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                    </table>
                    <table border="1" style="width: 100%;height: 100%;margin-top: 20px;">
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">文件同步后所采取的操作:</span></td>
                            <select type="text" style="width: 40%;height: 28px;margin:2px 10px;">
                                <option>删除</option>
                                <option>复制</option>
                            </select>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">后缀名过滤:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">文件特征:</span></td>
                            <td>
                                <select type="text" style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option>不审计</option>
                                    <option>白名单</option>
                                    <option>黑名单</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">启用监控目录清理:</span></td>
                            <td><input type="checkbox" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">关键字过滤:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">过滤最小字节数:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">过滤最大字节数:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">开启病毒扫描:</span></td>
                            <td><input type="checkbox" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">病毒文件处理方式:</span></td>
                            <td>
                                <select type="text" style="width: 40%;height: 28px;margin:2px 10px;">
                                    <option>删除</option>
                                    <option>隔离</option>
                                </select>
                            </td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">限速:</span></td>
                            <td><input type="text" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                        <tr style="width: 100%;">
                            <td style="width: 25%;height: 28px;border-right: 1px solid gray;background-color: #eee;"><span style="float: right;margin:5px 10px;">定时同步:</span></td>
                            <td><input type="checkbox" style="width: 40%;height: 28px;margin:2px 10px;"></td>
                        </tr>
                    </table>
                    <div>
                        <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>
                    </div>
                </div>



<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">外端服务id:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">服务名称:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">资源类型:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>本地FTP</option>-->
<!--                            <option>本地SMB</option>-->
<!--                            <option>本地NFS</option>-->
<!--                            <option>光盘塔</option>-->
<!--                            <option>Client</option>-->
<!--                            <option>认证同步</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">目录:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option></option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">等级:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>1</option>-->
<!--                            <option>2</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">编码:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>UTF-8</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">显示高级设置:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="checkbox"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;margin-top: 20px;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">文件同步后所采取的操作:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>删除</option>-->
<!--                            <option>赋值</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">后缀名过滤:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">文件特征:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>不审计</option>-->
<!--                            <option>白名单</option>-->
<!--                            <option>黑名单</option>-->
<!--                        </select>-->
<!--                        <input type="">-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">启用监控目录清理:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="checkbox"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">关键字过滤:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">过滤最小字节数:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;border-bottom: none;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">过滤最大字节数:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">开启病毒扫描:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="checkbox"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border-left: 1px solid gray;border-right: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">病毒文件处理方式:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;">-->
<!--                        <select>-->
<!--                            <option>删除</option>-->
<!--                            <option>隔离</option>-->
<!--                        </select>-->
<!--                    </div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;border-bottom: none;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">限速:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="text"></div>-->
<!--                </div>-->
<!--                <div style="width: 100%;height: 30px;border: 1px solid gray;float: left;">-->
<!--                    <div style="width: 25%;height: 28px;float: left;border-right: 1px solid gray;background-color: #eee;">-->
<!--                        <span style="float: right;margin:5px 10px;">定时同步:</span>-->
<!--                    </div>-->
<!--                    <div style="float: left;width: 40%;height: 28px;margin:2px 10px;"><input type="checkbox"></div>-->
<!--                </div>-->
<!--                <div>-->
<!--                    <div class="btn btn-sm btn-custom add_fontclient" data-toggle="modal" style="margin: 10px 50%;">确认</div>-->
<!--                </div>-->
                <!--                <table id="fontclientdata" class="table" style="width:100%;">-->
                <!--                    <thead>-->
                <!--                    <tr id="first">-->
                <!--                        <th>序号</th>-->
                <!--                        <th>用户名</th>-->
                <!--                        <th>FTP目录</th>-->
                <!--                        <th>状态</th>-->
                <!--                        <th>操作</th>-->
                <!--                    </tr>-->
                <!--                    </thead>-->
                <!--                    <tbody>-->
                <!--                    <tr v-for="(v,i) in tap.items">-->
                <!--                        <td>{{v.no}}</td>-->
                <!--                        <td>{{v.uname}}</td>-->
                <!--                        <td>{{v.directory}}</td>-->
                <!--                        <td>{{v.state}}</td>-->
                <!--                        <td>-->
                <!--                            <button class="btn btn-custom btn-xs reset_fontclient" tgdata="' + result.data[i].unique_id + '" tpdata = "'+result.data[i].type+'" is_in_queue="'+result.data[i].is_in_queue+'" type="button"><i class="fa fa-paste"></i> 修改</button>-->
                <!--                            <button class="btn btn-warning btn-xs delete_fontclient" tgdata="' + result.data[i].unique_id + '"   is_in_queue="'+result.data[i].is_in_queue+'" type="button"><i class="fa fa-trash"></i> 删除</button>-->
                <!--                        </td>-->
                <!--                    </tr>-->
                <!--                    </tbody>-->
                <!--                </table>-->
            </div>
        </div>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    //import BusinessAdd from "../up/BusinessAdd";

    export default {
        name: "DataBusinessRegister",
        components: {
            jk_tabs: JkTabs
        },
        data(){
            return {
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
                },
                render: (h, params) => {
                    return h(BusinessAdd);
                }
            }
        }
    };
</script>

<style scoped>
</style>