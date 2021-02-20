<template>
    <div class="container-fluid">
        <div class="row box margin-x clear-margin padding-x">
            <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
                <blockquote style="padding: 0; margin: 0; border: none;color: #000;">
                    <jk_tabs :links="links" style="float: left;font-size: 14px;"></jk_tabs>
                    <virtualAdd :IPlistdata="IPlist" style="float: right"></virtualAdd>
                </blockquote>
            </div>
            <div class="modal-body" style="height: 550px;">
                <Table size="small" border :columns="columns1" :data="data3">
                    <template slot-scope="{ row, index }" slot="interfaces">
                        <div class="subCol">
                            <ul v-for="(val,index) in row.subVirtualIps">
                                <li>{{val.machineIp}} : {{val.interfaces}}{{index==0?('(主机)'):''}}</li>
                            </ul>
                        </div>
                    </template>
                    <template slot-scope="{ row, index }" slot="interfaceses">
                        <div class="subCol">
                            <ul v-for="(val,index) in row.subVirtualIps">
                                <li>{{val.machineIp}} : {{val.interfaceses}}{{index==0?('(主机)'):''}}</li>
                            </ul>
                        </div>
                    </template>
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="primary" size="small" style="margin-right: 5px" @click="updateVIP(index)">修改</Button>
                        <Button type="error" size="small" @click="deleteVIP(row.id,index)">删除</Button>
                    </template>
                </Table>
                <Page :current.sync="currentPage"
                            :total="dataCount"
                            show-elevator
                            :page-size="pageSize"
                            :show-total="true"
                            @on-change="changepage"
                            style="margin-top:10px;" />
            </div>
        </div>
        <Drawer title="修改虚拟IP" v-model="platForm.show" width="50%">
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="150">
                <!-- <FormItem label="网口" prop="interfaces" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.interfaces">
                        <Option @click.native="copy(item)" v-for="item in testList" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <FormItem label="关联网口" prop="interfaceses" style="margin-bottom: 15px;">
                    <Select multiple v-model="platForm.form.interfaceses">
                        <Option v-for="item in testList1" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem> -->
                <FormItem label="虚拟IP地址组" prop="virtualIps" style="margin-bottom: 15px;">
                    <div v-for="(item,i) in IpGroup" :key="i">
                        <Input style="width: 31%;" v-model="IpGroup[i].ipaddress"/>&nbsp; / &nbsp;
                        <Select style="width: 20%;" v-model="IpGroup[i].subnet">
                            <Option v-for="index in 32" :value="index" :key="index">{{ index }}</Option>
                        </Select>
                        <i-button style="margin:0 10px;" size="small" @click="delvarIP(i)">删除</i-button>
                    </div>
                    <i-button size="small" @click="addvarIP" icon="md-add">添加</i-button>
                </FormItem>
                <FormItem label="VHID组ID" prop="vrid" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.vrid"/>
                </FormItem>
                <FormItem label="VHID组密码" prop="vridPassword" style="margin-bottom: 15px;">
                    <Input v-model="platForm.form.vridPassword"/>
                </FormItem>
                <FormItem label="心跳间隔(秒)" prop="advert" style="margin-bottom: 15px;">
                    <Select v-model="platForm.form.advert" style="width:100%">
                        <Option v-for="item in oneToTen" :value="item" :key="item">{{ item }}</Option>
                    </Select>
                </FormItem>
                <div v-for="(value,index) in platForm.form.subVirtualIps" :key="index">
                    <FormItem :label="value.machineIp" prop="interfaces" style="margin-bottom: 15px;">
                        <div>
                            <span style="width:5%;font-weight:bold;color: #515a6e;margin-right:33px;">{{index==0?'主机':'备机'}}网口</span>
                            <Select v-if="index==0?true:false" v-model="platForm.form.subVirtualIps[index].interfaces" style="width:86%">
                                <Option @click.native="copy(item)" v-for="item in testList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <Input v-if="index!=0?true:false" style="width:86%" v-model="platForm.form.subVirtualIps[index].interfaces"/>
                            <!-- <span v-if="false" style="width:86%" v-model="platForm.form.subVirtualIps[index].machineIp">{{value}}</span> -->
                        </div>
                        <div>
                            <span style="width:5%;font-weight:bold;color: #515a6e;margin-right:10px;">{{index==0?'主机':'备机'}}关联网口</span>
                            <Select multiple v-if="index==0?true:false" v-model="platForm.form.subVirtualIps[index].interfaceses" style="width:86%">
                                <Option @click.native="copy(item)" v-for="item in testList1" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <!-- <Input v-if="index!=0?true:false" style="width:86%" v-model="platForm.form.subVirtualIps[index].interfacesesCopy"/> -->
                            <!-- <Select multiple v-if="index!=0?true:false" v-model="platForm.form.subVirtualIps[index].interfaceses" style="width:86%">
                                <Option @click.native="copy(item)" v-for="item in testList1" :value="item" :key="item">{{ item }}</Option>
                            </Select> -->
                            <Input v-if="index!=0?true:false" style="width:86%" v-model="platForm.form.subVirtualIps[index].interfaceses"/>
                            <!-- <Input v-if="false" style="width:86%" v-model="platForm.form.subVirtualIps[index].machineIp"/> -->
                            <span v-if="index!=0?true:false" style="color:red;font-size:12px;">注:多个关联网口用逗号隔开</span>
                        </div>
                    </FormItem>
                </div>
                
                <FormItem>
                    <Button type="primary" @click="editPlatForm">确认</Button>
                    <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                </FormItem>
            </Form>
        </Drawer>
    </div>
</template>

<script>
    import JkTabs from "@/components/JkTabs.vue";
    import virtualAdd from "./VirtualAdd";
    export default {
        inject: ["reload"],
        name: "Virtual",
        components: {
            jk_tabs: JkTabs,virtualAdd
        },
        data(){
            return {
                oneToTen:[1,2,3,4,5,6,7,8,9],
                host:false,
                data1: [],
                data3:[],
                columns1: [
                    {title: '序号', key: 'id', align: 'center',width: 65,
                        render: (h, params) => {
                            return h('span', params.index +1);
                        }
                    },
                    {title: '虚拟IP列表',align: 'center', key: 'virtualIps',width: 150,
                    render: (h, params) => {
                        return h('div', {
                            attrs: {
                                class: 'subCol'
                            }
                        },
                        [
                            h('ul', this.data1[params.index].virtualIps.map(item => {
                                return h('li', {
                                }, item)
                            }))
                        ])
                    }
                    },
                    {title: '网口',align: 'center', slot: 'interfaces'},
                    {title: '关联网口',align: 'center', slot: 'interfaceses'
                    // render: (h, params) => {
                    //     return h('div', {
                    //         attrs: {
                    //             class: 'subCol'
                    //         }
                    //     },
                    //     [
                    //         h('ul', this.data1[params.index].interfaceses.map(item => {
                    //             return h('li', {
                    //             }, item)
                    //         }))
                    //     ])
                    // }
                    },
                    {title: '虚拟IP组ID',align: 'center', key: 'vrid',width: 100,},
                    {title: '虚拟IP组密码',align: 'center', key: 'vridPassword',width: 100,},
                    {title: '心跳间隔(秒)',align: 'center', key: 'advert',width: 100,},
                    
                    
                    {title: '操作',slot: 'action',align: 'center', key: '',width: 130,}
                ],
                links: [
                    {name: "虚拟IP", to: "/availability/virtual"}
                ],
                IpGroup:[
                    {}
                ],
                platForm: {
                    show: false,
                    form: {
                        advert: 1,
                        id: "",
                        priority: 50,
                        subVirtualIps: [
                            {
                            interfaces: "",//网口
                            interfaceses: [],//关联网口
                            machineIp: ""
                            },  
                        ],
                        virtualIps: [],
                        vrid: '',
                        vridPassword: ""
                    },
                    rules: {
                        ipaddress:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, pattern: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])|(\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*)$/, message: '请输入ipv4或ipv6格式', trigger: 'blur' },
                        ],
                        // vrid:[
                        //     { required: true, message: '不能为空', trigger: 'blur' },
                        // ],
                        vridPassword:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                    }
                },
                testList: [],
                testList1: [],
                // 初始化信息总条数
                dataCount: 0,
                currentPage:1,
                // 每页显示多少条
                pageSize: 5,
                IPlist:[],
            }
        },
        mounted: function() {
            this.getviplist()
            this.getUSBList()
            this.isHost()
        },
        methods: {
            getAllMachineIp(){
                this.$https.fetchGet(this.$api.avail.getAllMachineIp.url).then((resp) => {
                if (resp.data.status == 200) {
                    this.IPlist = resp.data.data
                } else
                    this.$Notice.error({title: '获取数据失败', desc: resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            //判断是否为主机,true就是主机
            isHost(){
                this.$https.fetchGet(this.$api.avail.isHost.url).then((resp) => {
                if (resp.data.status == 200) {
                    this.host = resp.data.data
                    if(this.host){
                        //新增虚拟ip时获得的主机备机ip列表
                        this.getAllMachineIp()
                    }
                } else
                    this.$Notice.error({title: '获取数据失败', desc: resp.data.desc, duration: 5});
                }).catch(err => {
                    this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    console.log(err)
                })
            },
            //分页事件
            changepage(index) {
                this.currentPage = index;
                var _start = (index - 1) * this.pageSize;
                var _end = index * this.pageSize;
                this.data3 = this.data1.slice(_start, _end);
             },
            getviplist(){
                this.$https.fetchGet(this.$api.avail.getVirtualIps.url).then((resp) => {
                    if (resp.data.status == 200) {
                        console.log(resp.data.data)
                        this.data1 = resp.data.data
                        for(let i in this.data1){
                            for(let j=1;j<this.data1[i].subVirtualIps.length;j++){
                                this.data1[i].subVirtualIps[j].interfaceses.join(',')
                            }
                        }
                        this.dataCount = this.data1.length 
                        this.data3 = Object.assign(this.data1, this.data3)
                    } else
                        this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                    })
            },
            //get网口列表
            getUSBList (){
                let obj = {name:"common"}
                this.$https.fetchGet(this.$api.network.showEth.url,obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.testList = resp.data.data
                            this.testList1 = resp.data.data
                            console.log(this.testList)
                        } else
                            this.$Notice.error({title: '获取数据失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
            },
            //赋值默认网口
            copy(item){
                for(let i in this.platForm.form.interfaceses){
                    if(this.platForm.form.interfaceses[i] == item){
                        return
                    }
                }
                this.platForm.form.interfaceses.push(item)
            },
             //增加虚拟ip组框
            addvarIP (){
                this.IpGroup.push({subnet:24,ipaddress:''})
                console.log(this.IpGroup)
            },
            //删除虚拟ip框
            delvarIP (i){
                if(this.IpGroup.length<=1){
                    return
                }else{
                    this.IpGroup.splice(i,1)
                }
                
            },
            //修改vip组
            updateVIP(index){
                this.platForm.show = true
                this.platForm.form = this.data1[index]
                let obj = [{}]
                let arr = []
                let arr1 = []
                console.log(this.platForm.form)
                for(let i in this.platForm.form.virtualIps){
                    arr = this.platForm.form.virtualIps[i].split("/")
                    let obj = {
                        ipaddress:"",
                        subnet:""
                    }
                    obj.ipaddress = arr[0]
                    obj.subnet = parseInt(arr[1])
                    arr1.push(obj)
                }
                console.log(arr1)
                this.IpGroup = arr1
                // console.log(this.IpGroup ,"arr")
                
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                this.IpGroup = [
                    {}
                ]
                this.platForm.form.interfaceses = []
            },
            editPlatForm() {
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                    return;
                let arr = []
                for(let i in this.IpGroup){
                    if(!this.$util.queryDevIP4(this.IpGroup[i].ipaddress) && !this.$util.queryDevIP6(this.IpGroup[i].ipaddress)){
                        this.$Notice.error({title: '新增失败', desc: "虚拟IP组请填写正确的ipv4或ipv6", duration: 5});
                        return
                    }
                    arr.push(this.IpGroup[i].ipaddress +'/'+this.IpGroup[i].subnet)
                }
                this.platForm.form.virtualIps = arr
                let obj = JSON.parse(JSON.stringify(this.platForm.form))
                for(let i = 1;i<obj.subVirtualIps.length;i++){
                    console.log(obj.subVirtualIps[i].interfaceses,'obj.subVirtualIps[i].interfaceses')
                    if(Array.isArray(obj.subVirtualIps[i].interfaceses)){

                    }else{
                        if(obj.subVirtualIps[i].interfaceses.indexOf(",") == -1){
                            obj.subVirtualIps[i].interfaceses = [obj.subVirtualIps[i].interfaceses]
                        }else{
                            obj.subVirtualIps[i].interfaceses = obj.subVirtualIps[i].interfaceses.split(',')
                            console.log(obj.subVirtualIps[i].interfaceses)
                            if(typeof(obj.subVirtualIps[i].interfaceses)=='string'){
                                let str = obj.subVirtualIps[i].interfaceses
                                obj.subVirtualIps[i].interfaceses = []
                                obj.subVirtualIps[i].interfaceses.push(str)
                            }
                        }
                    }
                    
                    
                }
                                
                console.log(obj,'obj')
                this.$https.fetchPost(this.$api.avail.editVirtualIps.url,obj).then((resp) => {
                    if (resp.data.status == 200) {
                        this.$Notice.success({title: '修改成功', duration: 2.5});
                        setTimeout(() => {
                            this.reload();
                        }, 250);
                    } else
                        this.$Notice.error({title: '获取数据失败', desc: "错误代码：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    })
                })
            },
            //删除vip组
            deleteVIP(id,index){
                console.log(id,index)
                let obj = {id:id}
                this.$Modal.confirm({
                    title: '删除虚拟ip组',
                    content: '<p>当前操作将会导致该配置被删除，请确认删除</p>',
                    loading: true,
                    onOk: () => {
                        this.$https.fetchPost(this.$api.avail.delVirtualIp.url,obj).then((resp) => {
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
        }
    }
</script>

<style>
.subCol>ul>li{
    /* margin:0 -18px; */
    list-style:none;
    text-Align: center;
    padding-top: 6px;
    border-bottom:1px solid #ccc;
    overflow-x: hidden;
    min-height: 25px;
    font-size: 12px;

}
.subCol>ul>li:last-child{
  border-bottom: none
}

</style>