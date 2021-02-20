<template>
    <div>
        <Button type="primary" @click="showAddDrawer">
            新增
        </Button>
        <Drawer title="新增端口聚合" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="100">
                <FormItem label="名称" prop="name" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.name" style="width: 100%;" />
                </FormItem>
                <FormItem label="模式" prop="pattern" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.pattern" style="width:100%;">
                        <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="成员接口" prop="interfaceList" style="margin-bottom: 15px;">
                    <!-- <CheckboxGroup v-for="(value,index) in interfaceListsData" :key="index"  v-model="platForm.form.interfaceList">
                        <Checkbox style="float:left;" :label="value">{{value}}</Checkbox>
                    </CheckboxGroup> -->
                    <Select v-model="platForm.form.interfaceList" multiple style="width:100%">
                        <Option v-for="item in interfaceListsData" :key="item" :value="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="addPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    export default {
        name: "NetworkRortTrunkingAdd",
        props: {
            interfaceListsData: Array,
        },
        components: {},
        inject: ["reload"],
        data() {
            return {
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
                }
            }
        },
        computed: {},
        mounted: function() {
            
        },
        methods: {
            
            showAddDrawer() {
                if(this.interfaceListsData.length==0){
                    this.$Notice.error({title: '无法新增', desc: '所有成员接口已被占有', duration: 5});
                    return
                }else{
                    this.platForm.show = true;
                } 
            },
            addPlatForm() {
               this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                    if(this.platForm.form.interfaceList.length==0){
                        this.$Notice.error({title: '新增失败', desc: '必须选择成员接口', duration: 10});
                        return
                    }
                    this.platForm.form.member = ''
                    for(let i in this.platForm.form.interfaceList){
                        this.platForm.form.member += this.platForm.form.interfaceList[i]+'|'
                    }
                    this.platForm.form.member = this.platForm.form.member.substring(0, this.platForm.form.member.length - 1);  
                    console.log(this.platForm.form)
                    this.$https.fetchPost(this.$api.network.addPort.url,this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '端口聚合添加成功', desc: "正在刷新界面", duration: 5});
                            setTimeout(() => {
                                this.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '端口聚合添加失败', desc: "错误：" + resp.data.desc, duration: 5});
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
    };
</script>
<style scoped lang="less">
</style>