<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <rorttrunkingadd :interfaceListsData="interfaceLists" style="float: right"></rorttrunkingadd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data1">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updatePort(index)">修改</Button>
                        <Button type="error" size="small" @click="deletePort(row.id,index)">删除</Button>
                    </template>
                </Table>
            </div>
        </div>
        <Drawer title="修改端口聚合" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="100">
                <FormItem label="名称" prop="name" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.name" style="width: 100%;" />
                </FormItem>
                <FormItem label="模式" prop="pattern" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.pattern" style="width:100%">
                        <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="成员接口" prop="List" style="margin-bottom: 15px;">
                    <!-- <CheckboxGroup  v-model="platForm.form.interfaceList">
                        <Checkbox v-for="(value) in interfaceList" style="float:left;" :label="value">{{value}}</Checkbox>
                    </CheckboxGroup> -->
                    <Select v-model="platForm.form.interfaceList" multiple style="width:100%">
                        <Option v-for="item in interfaceList" :key="item" :value="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="UpdateForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import rorttrunkingadd from "./NetworkRortTrunkingAdd";
    export default {
        name: "NetworkRortTrunking",
        components: {
            jk_tabs: JkTabs,rorttrunkingadd
        },
        inject: ["reload"],
        data(){
            return {
                columns1: [
                    {title: '序号', key: '', align: 'center',width: 63,
                    render: (h, params) => {
                        return h(
                            "span", params.index + 1
                        );
                    }},
                    {title: '名称',align: 'center', key: 'name'},
                    {title: '接口',align: 'center', key: 'hickey'},
                    {title: '成员',align: 'center', key: 'member' },
                    {title: '模式',align: 'center', width:500,key: 'pattern',
                    render: (h, params) => {
                        if(params.row.pattern == '0'){
                            return h(
                                "span", this.modeList[0].name
                            );
                        }else if(params.row.pattern == '1'){
                            return h(
                                "span", this.modeList[1].name
                            );
                        }else if(params.row.pattern == '2'){
                            return h(
                                "span", this.modeList[2].name
                            );
                        }else if(params.row.pattern == '3'){
                            return h(
                                "span", this.modeList[3].name
                            );
                        }else if(params.row.pattern == '4'){
                            return h(
                                "span", this.modeList[4].name
                            );
                        }else if(params.row.pattern == '5'){
                            return h(
                                "span", this.modeList[5].name
                            );
                        }else if(params.row.pattern == '6'){
                            return h(
                                "span", this.modeList[6].name
                            );
                        }
                    }
                    },
                    {title: '操作',align: 'center',slot: 'action'}
                ],
                links: [
                    {name: "接口列表", to: "/network/interface"},
                    {name: "端口聚合", to: "/network/portTrunking"},
                    // {name: "带宽设置", to: "/network/bandwidth"},
                    {name: "Mac地址", to: "/network/mac"},
                ],
                interfaceList:[],
                interfaceLists:[],
                modeList:[
                    {value:'0',name:'load balancing(round-robin)平衡轮循环策略'},
                    {value:'1',name:'fault-tolerance(active-backup)主-备份策略'},
                    {value:'2',name:'load balancing(xor)平衡策略'},
                    {value:'3',name:'fault-tolerance(broadcast)广播策略'},
                    {value:'4',name:'IEEE 802.3ad动态链接聚合'},
                    {value:'5',name:'transmit load balancing(适配器传输负载均衡)'},
                    {value:'6',name:'adaptive load balancing(适配器适应性负载均衡)'},
                ],
                platForm: {
                    show: false,
                    form: {
                        hickey: "",//null
                        id: "",//null
                        member: "",//成员接口
                        name: "",
                        pattern: "",//模式
                        interfaceList:[],
                    },
                    rules: {
                        name:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                        pattern:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                    }
                },
                data1:[],
                //复制数组
                data3:[]
            }
        },
        mounted: function() {
            this.getinfo(),
            this.findEth()
        },
        methods: {
            findEth(){
                this.$https.fetchGet(this.$api.network.findEth.url).then((resp) => {
                if (resp.data.status == 200) {
                    this.interfaceLists = resp.data.data
                }
                    // this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            },
            getinfo(){
                this.$https.fetchGet(this.$api.network.findPort.url).then((resp) => {
                if (resp.data.status == 200) {
                    console.log(resp.data.data)
                    this.data1 = resp.data.data
                    this.data3 = this._.cloneDeep(resp.data.data)
                } else
                    this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.platForm.show = true;
            },
            updatePort(index) {
                this.platForm.form = this.data3[index]
                // this.platForm.form.interfaceList = []
                let str = this.platForm.form.member
                let arr = str.split('|')
                if(this.interfaceLists.length !=0){
                    for(let i in this.interfaceLists){
                        arr.push(this.interfaceLists[i])
                    }
                }
                this.interfaceList = arr
                //神奇bug
                // setTimeout(() => {
                    // for(let i in this.interfaceList){
                    //     this.platForm.form.interfaceList.push(this.interfaceList[i])
                    // }
                    this.platForm.form.interfaceList = str.split('|')
                    this.platForm.show = true;
                    console.log(this.interfaceList,"this.interfaceList")
                    console.log(this.platForm.form.interfaceList)
                // }, 250);
            },
            deletePort(index,row) {
                console.log(index,row)
                this.$Modal.confirm({
                    title: '删除端口聚合',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchGet(this.$api.network.delPort.url,{key: index}).then((resp) => {
                            if (resp.data.status == 200) {
                                this.$Notice.success({title: '删除成功', duration: 2.5});
                                setTimeout(() => {
                                    this.$Modal.remove();
                                    this.reload();
                                }, 250);
                            } else {
                                this.$Modal.remove();
                                this.$Notice.error({title: '删除失败', desc: "错误：" + resp.data.desc, duration: 5});
                            }
                        }).catch(err => {
                            this.$Modal.remove();
                            this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                            console.log(err)
                        })
                    }
                });
            },
            UpdateForm() {
               this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.platForm.form.interfaceList.length==0){
                        this.$Notice.error({title: '修改失败', desc: '必须选择成员接口', duration: 10});
                        return
                    }
                    this.platForm.form.member = ''
                    for(let i in this.platForm.form.interfaceList){
                        this.platForm.form.member += this.platForm.form.interfaceList[i]+'|'
                    }
                    this.platForm.form.member = this.platForm.form.member.substring(0, this.platForm.form.member.length - 1);  
                    console.log(this.platForm.form)
                    this.$https.fetchPost(this.$api.network.updatePort.url,this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '端口聚合修改成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '端口聚合修改失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
                        console.log(err)
                    })
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
            }
        }
    }
</script>

<style scoped>
</style>