<template>
 <div>
<!--        <li><a @click="showAddDrawer">文件同步</a></li>-->
<!--        <Button type="primary" @click="showAddDrawer">-->
<!--            添加文件同步服务-->
<!--        </Button>-->
        <!-- <div style="width:80px;height:30px;" @click="showAddDrawer">文件同步</div> -->
            <Form ref="plat_form" :rules="platForm.rules" :model="platForm.form"
                  :label-width="138">
            <Tabs value="name1">
                <TabPane style="height:650px" label="基础配置" name="name1">
                    <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;">
                    <FormItem label="外端服务id" prop="out_task_id" style="margin-bottom: 0px;width:50%;">
                        <Input v-model="platForm.form.out_task_id"/>
                        <span style="font-size: 12px;color: red">*(服务id内外端需一致)</span>
                    </FormItem>
                    <FormItem label="服务名称" prop="servicename" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.servicename"/>
                    </FormItem>
                    <FormItem label="资源类型" prop="type1" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.type">
                            <Option v-for="item in resourceList" :value="item.val" :key="item.val" @click.native="checkType(item.val)">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                        <FormItem label="用户名" v-show="ftpType" prop="username" style="margin-bottom: 15px;width:50%;">
                            <Input v-model="platForm.form.username"/>
                        </FormItem>
                        <FormItem label="密码" v-show="ftpType" prop="password" style="margin-bottom: 15px;width:50%;">
                            <Input v-model="platForm.form.password"/>
                        </FormItem>
                    <!--<FormItem label="用户名" v-show="client" prop="idplatform" style="margin-bottom: 15px;width:50%;">-->
                        <!--<Input v-model="platForm.form.username"/>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="密码" v-show="client" prop="idplatform" style="margin-bottom: 15px;width:50%;">-->
                        <!--<Input v-model="platForm.form.password"/>-->
                    <!--</FormItem>-->
                        <FormItem label="IP地址" v-show="ftpType" prop="ipaddress" style="margin-bottom: 15px;width:50%;">
                            <Input v-model="platForm.form.ipaddress"/>
                        </FormItem>
                        <FormItem label="端口" v-show="ftpType" prop="remoteport" style="margin-bottom: 15px;width:50%;">
                            <Input v-model="platForm.form.remoteport"/>
                        </FormItem>
                        <FormItem label="根目录" v-show="ftpType" prop="file_root" style="margin-bottom: 15px;width:50%;">
                            <Input v-model="platForm.form.file_root"/>
                        </FormItem>
                    <!-- <FormItem label="IP地址" v-show="client" prop="ipaddress" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.ipaddress"/>
                    </FormItem>
                    <FormItem label="端口" v-show="client" prop="idplatform" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.remoteport"/>
                    </FormItem> -->

                    <FormItem label="目录" v-show="localftpType" prop="path" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.path">
                            <Option v-for="item in directoryList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="协议版本" prop="smbVersion" v-show="smbType" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.smbVersion">
                            <Option v-for="item in smbVersionList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属的域" v-show="smbType" prop="workGroup" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.workGroup"/>
                    </FormItem>
                    <!-- <FormItem label="目录" v-show="smbType" prop="path" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.path"/>
                    </FormItem> -->
                    <FormItem label="密匙" prop="sftpKey" v-show="sftpType" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.sftpKey">
                            <Option v-for="item in smbVersionList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <!-- <FormItem label="目录" v-show="sftpType" prop="path" style="margin-bottom: 15px;width:50%;">
                        <Input v-model="platForm.form.path"/>
                    </FormItem> -->
                    </div>
                    <FormItem>
                        <Button type="primary" @click="addPlatForm">确认</Button>
                        <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                        <span style="color:red;margin-left:5px;">注:详细配置与文件过滤也会被重置</span>
                    </FormItem>
                    <!-- <FormItem label="显示高级设置" prop="idplatform" style="margin-bottom: 15px;width:50%;">
                        <Checkbox @on-change="checkGaoSettings"></Checkbox>
                    </FormItem> -->
                </TabPane>
                <TabPane label="详细配置" name="name2">
                            <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;">
                        <FormItem label="通道传输模式" prop="channel_transmission_mode" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                            <Select v-model="platForm.form.channel_transmission_mode">
                                <Option @click.native="channeltransmission_move(item.val)" v-for="item in channeltransmissionList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="线程数" v-show="ftpType" prop="tools" style="margin-bottom: 15px;width:33%;">
                            <Input v-model="platForm.form.tools"/>
                        </FormItem>
                        <FormItem label="等级" v-show="!ftpType && channel_transmission_show" prop="level" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.level">
                                <Option v-for="item in levelList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="异常日志是否入库" v-show="ftpType" prop="is_put_in_storage" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.is_put_in_storage">
                                <Option v-for="item in is_put_in_storageList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="编码" v-show="gaoSettings" prop="iocharset" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.iocharset">
                                <Option v-for="item in codingList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <!-- <FormItem label="传输模式" v-show="ftpType" prop="is_copy" style="margin-bottom: 15px;width:33%;">
                                <Select v-model="platForm.form.is_copy">
                                <Option v-for="item in copyList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                            </Select>
                        </FormItem> -->
                        <FormItem label="被动模式" v-show="ftpdType" prop="is_psvn" style="margin-bottom: 15px;width:33%;">
                                <Select v-model="platForm.form.is_psvn">
                                <Option v-for="item in psvnList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件同步后的操作" prop="operation" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                            <Select v-model="platForm.form.operation">
                                <Option v-for="item in operationList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="设置传输超时时间" v-show="ftpdType" prop="data_timeout" style="margin-bottom: 0px;width:33%;">
                            <Select v-model="platForm.form.data_timeout">
                                <Option v-for="item in data_timeoutList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                                <span style="color:red">*注意,单位为秒</span>
                        </FormItem>
                        <FormItem label="连接超时时间" v-show="ftpdType" prop="connection_timeout" style="margin-bottom: 0px;width:33%;">
                            <Select v-model="platForm.form.connection_timeout">
                                <Option v-for="item in connection_timeoutList" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                                <span style="color:red">*注意,单位为秒</span>
                        </FormItem>
                        <FormItem label="间隔" placeholder="以秒为单位" prop="time_interval" v-show="gaoSettings" style="margin-bottom:0px;width:33%;display: none;">
                            <Select v-model="platForm.form.time_interval">
                                <Option v-for="item in minutes" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                            <span style="color:red">*注意,单位为秒</span>
                        </FormItem>
                        
                        <FormItem label="目录同步" prop="idplatform" v-show="channel_transmission_show" style="margin-bottom: 15px;width:33%;display: none;">
                            <Select v-model="platForm.form.gg">
                                <Option v-for="item in aaList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="限速" prop="idbiz" v-show="channel_transmission_show" style="margin-bottom: 15px;width:33%;display: none;">
                            <Input v-model="platForm.form.uu"/>
                        </FormItem>
                        <FormItem label="启用监控目录清理" prop="idbiz" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                                <Checkbox label="Eat"></Checkbox>
                        </FormItem>
                        
                    </div>
                </TabPane>
                <TabPane label="文件过滤" name="name3">
                    <!-- <span style="color:red;margin-left:20px">注:不勾选则不开启过滤</span> -->
                        <!--                <FormItem label="通道负载" prop="idplatform" style="margin-bottom: 15px;width:90%;">-->
                        <!--                    <Select v-model="platForm.form.ff">-->
                        <!--                        <Option v-for="item in channelList" :value="item.name" :key="item.name">{{ item.name }}</Option>-->
                        <!--                    </Select>-->
                        <!--                </FormItem>-->
                        <!--                <FormItem label="并发数" prop="idbiz" style="margin-bottom: 15px;width:90%;">-->
                        <!--                    <Input v-model="platForm.form.zz"/>-->
                        <!--                </FormItem>-->
                        <!--                <FormItem label="优先级" prop="idbiz" style="margin-bottom: 15px;width:90%;">-->
                        <!--                    <Input v-model="platForm.form.ww"/>-->
                        <!--                </FormItem>-->
                    <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;">
                        <FormItem label="开启病毒扫描" prop="idbiz6" v-show="gaoSettings" style="text-align:left;margin-bottom: 15px;width:33%;display: none;">
                                <!-- <Checkbox v-model="platForm.form.idbiz6" @on-change="checkVirusFilter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.idbiz6" @on-change="checkVirusFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editVirusFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz6">编辑</Button>
                        </FormItem>
                        <FormItem label="关键字过滤" prop="idbiz1" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                                <!-- <Checkbox v-model="platForm.form.idbiz1" @on-change="checkPicNameFilter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.idbiz1" @on-change="checkPicNameFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editPicNameFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz1">编辑</Button>
                        </FormItem>
                        <FormItem label="文件大小过滤" prop="idbiz2" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                            <!-- <Checkbox v-model="platForm.form.idbiz2" @on-change="checkSizeFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz2" @on-change="checkSizeFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editSizeFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz2">编辑</Button>
                        </FormItem>
                        <FormItem label="文件名过滤" prop="idbiz3" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                            <!-- <Checkbox v-model="platForm.form.idbiz3" @on-change="checkNameFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz3" @on-change="checkNameFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editNameFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz3">编辑</Button>
                        </FormItem>
                        <!-- <FormItem label="内容关键字过滤" prop="idbiz4" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                             <Checkbox v-model="platForm.form.idbiz4"  @on-change="checkContentFilter"></Checkbox> 
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz4"  @on-change="checkContentFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editContentFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz4">编辑</Button>
                        </FormItem> -->
                        <FormItem label="文件后缀过滤" prop="idbiz5" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                            <!-- <Checkbox v-model="platForm.form.idbiz5" @on-change="checkSuffixFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz5" @on-change="checkSuffixFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editSuffixFilter" style="background:#fa914e;color:white" v-show="platForm.form.idbiz5">编辑</Button>
                        </FormItem>
                        <FormItem label="定时同步" prop="settimesyn" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                                <!-- <Checkbox v-model="platForm.form.settimesyn" @on-change="checkSettimesynFilter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.settimesyn" @on-change="checkSettimesynFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editSettimesynFilter" style="background:#fa914e;color:white" v-show="platForm.form.settimesyn">编辑</Button>
                        </FormItem>
                        <FormItem label="文件特征过滤" prop="file_feature_filter" v-show="gaoSettings" style="margin-bottom: 15px;width:33%;display: none;">
                                <!-- <Checkbox v-model="platForm.form.file_feature_filter" @on-change="checkfile_feature_filter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.file_feature_filter" @on-change="checkfile_feature_filter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editfile_feature_filter" style="background:#fa914e;color:white" v-show="platForm.form.file_feature_filter">编辑</Button>
                        </FormItem>
                        <FormItem label="敏感文件操作" prop="filter_after_opt" v-show="gaoSettings" style="margin-bottom: 15px;width:32%;display: none;">
                            <Select style="width:135px;" v-model="platForm.form.filter_after_opt">
                                <Option @click.native="showCopy_move(item.val)" v-for="item in filter_after_optList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                            <Poptip trigger="hover" content="敏感文件就是关键字过滤、文件大小过滤等出来的不符合规定的文件">
                                <i style="margin-left:3px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                                <!-- <Icon type="md-home" style="margin-bottom: 5px;font-size: 28px;" /> -->
                            </Poptip>
                        </FormItem>
                        <FormItem label="敏感文件复制到平台" prop="copy_move" v-show="gaoSettings?showcopy_move:false" style="margin-bottom: 15px;width:33%;display: none;">
                            <Select v-model="platForm.form.copy_move ">
                                <Option v-for="item in filter_after_optKeeptList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="敏感文件转移路径" prop="filter_after_opt_path" v-show="gaoSettings?showfilter_after_opt_path:false" style="margin-bottom: 15px;width:30%;display: none;">
                            <Input v-model="platForm.form.filter_after_opt_path"/>
                        </FormItem>
                        <Divider v-show="gaoSettings?virusFilter:false" orientation="left">病毒扫描</Divider>
                        <FormItem label="病毒文件处理" prop="virus_opt" v-show="gaoSettings?virusFilter:false" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.virus_opt">
                                <Option v-for="item in virusList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <Divider v-show="gaoSettings?picNameFilter:false" orientation="left">关键字过滤</Divider>
                        
                        <FormItem label="过滤的关键字" prop="filter_keyword" v-show="gaoSettings?picNameFilter:false" class="contentFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Input style="width:280px" v-model="platForm.form.filter_keyword "/>
                            <Poptip trigger="hover" content="匹配文件中的内容进行过滤操作，
                            支持的文件有：txt、pdf、xls、xlsx、doc、docx、ppt、pptx、wps、dps、et、xml，多个以/#/分隔">
                                <i style="margin-left:1px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                            </Poptip>
                        </FormItem>
                        <FormItem label="过滤类型" prop="keyword_type" v-show="gaoSettings?picNameFilter:false" class="sizeFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.keyword_type">
                                <Option v-for="item in filterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="图片关键字过滤" prop="filter_picture_keyword" v-show="gaoSettings?picNameFilter:false" style="margin-bottom: 15px;width:49%;display: none;">
                            <Input style="width:280px" v-model="platForm.form.filter_picture_keyword "/>
                            <Poptip trigger="hover" content="匹配图像中的内容里面的文字，多个以/#/分隔">
                                <i style="margin-left:1px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                            </Poptip>
                        </FormItem>
                        <Divider v-show="gaoSettings?sizeFilter:false" orientation="left">文件大小过滤</Divider>
                        <FormItem label="最小" prop="filter_min" v-show="gaoSettings?sizeFilter:false" class="sizeFilter_style" style="margin-bottom: 15px;width:50%;display: none;">
                            <Poptip trigger="hover" content="大于此值可同步">
                                <Input style="width:100%" v-model="platForm.form.filter_min_size"/>
                            </Poptip>
                            <Select style="width:26%" v-model="platForm.form.filter_min_size_unit">
                                <Option v-for="item in dataTypeList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="最大" prop="filter_max" v-show="gaoSettings?sizeFilter:false" class="sizeFilter_style" style="margin-bottom: 15px;width:50%;display: none;">
                            <Poptip trigger="hover" content="小于此值可同步">
                                <Input style="width:100%" v-model="platForm.form.filter_max_size"/>
                            </Poptip>
                            <Select style="width:26%" v-model="platForm.form.filter_max_size_unit">
                                <Option v-for="item in dataTypeList1" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="大小过滤类型" prop="filter_size_type" v-show="gaoSettings?sizeFilter:false" class="sizeFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.filter_size_type">
                                <Option v-for="item in sizefilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <Divider v-show="gaoSettings?nameFilter:false" orientation="left">文件名过滤</Divider>
                        <FormItem label="文件名过滤类型" prop="filename_type" v-show="gaoSettings?nameFilter:false" class="nameFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.filename_type">
                                <Option v-for="item in flienamefilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件名" prop="filter_filename" v-show="gaoSettings?nameFilter:false" class="nameFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Poptip trigger="hover" content="多个以小写|分割">
                                <Input style="width:300px" v-model="platForm.form.filter_filename"/>
                            </Poptip>
                        </FormItem>
                        <!-- <Divider v-show="gaoSettings?picNameFilter:false" orientation="left">内容关键字过滤</Divider> -->
                        <!-- <FormItem label="过滤类型" prop="keyword_type" v-show="gaoSettings?picNameFilter:false" class="contentFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.keyword_type">
                                <Option v-for="item in filterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem> -->
                        <Divider v-show="gaoSettings?suffixFilter:false" orientation="left">文件后缀过滤</Divider>
                        <FormItem label="后缀过滤类型" prop="suffix_type" v-show="gaoSettings?suffixFilter:false" class="suffixFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.suffix_type">
                                <Option v-for="item in suffixfilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件后缀" prop="filter_suffix " v-show="gaoSettings?suffixFilter:false" class="suffixFilter_style" style="margin-bottom: 15px;width:49%;display: none;">
                            <Poptip trigger="hover" content="多个以小写|分割">
                                <Input style="width:300px" v-model="platForm.form.filter_suffix"/>
                            </Poptip>
                        </FormItem>
                        <Divider v-show="gaoSettings?settimesynFilter:false" orientation="left">同步时间</Divider>
                         <FormItem label="同步时间段" prop="syntime" v-show="gaoSettings?settimesynFilter:false" cvallass="gaoSettings_style" style="margin-bottom: 15px;width:49%;display: none;">
                                <TimePicker confirm :value="platForm.form.syntime" format="hh’mm’ss" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                        </FormItem>
                        <Divider v-show="gaoSettings?file_feature_filter:false" orientation="left">文件特征过滤</Divider>
                        <FormItem label="文件特征" prop="filter_feature" v-show="gaoSettings?file_feature_filter:false" style="margin-bottom: 15px;width:60%;display: none;">
                            <Input v-show="gaoSettings" v-model="platForm.form.filter_feature" style="margin-bottom: 15px;width:49%;display: none;" />
                        </FormItem>
                        <FormItem label="文件特征类型" prop="feature_type" v-show="gaoSettings?file_feature_filter:false" style="margin-bottom: 15px;width:49%;display: none;">
                            <Select v-model="platForm.form.feature_type" style="margin-bottom: 15px;width:49%;">
                                <Option v-for="item in featureList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                            <Upload action="" :before-upload="handleLinkimage">
                                <i-button icon="ios-cloud-upload-outline">添加文件</i-button>
                            </Upload>
                        </FormItem>
                        </div>  
                </TabPane>
            </Tabs>
            </Form>
    </div>
</template>

<script>
    export default {
        name:"filesyncadd",
        components: {},
        // props: {
        // taskId: String,
        // required: true
        // },
        // props: ["taskId"],
        data() {
            return {
                platForm: {
                    show: false,
                    form: {
                        channel_transmission_mode:"highSpeed",
                        tools:"5",
                        runstate: "stop",
                        out_task_id: '',
                        servicename: '',
                        type: "localftp",
                        username: '',
                        password: '',
                        ipaddress: '',
                        remoteport: '',
                        path: "",
                        level: "1",
                        iocharset: "UTF-8",
                        operation: 'del',
                        time_interval: 3,
                        taskId: '',
                        workGroup:'',
                        smbVersion:"v2.0",
                        sftpKey:'v2.0',
                        syntime:'',
                        keyword_type:'blacklist',
                        filter_picture_keyword:'',
                        idbiz1:false,
                        idbiz2:false,
                        idbiz3:false,
                        idbiz4:false,
                        idbiz5:false,
                        idbiz6:false,
                        settimesyn:false,
                        filter_min_size:'',
                        filter_max_size:'',
                        filter_min_size_unit:"B",
                        filter_max_size_unit:"B",
                        suffix_type:'blacklist',
                        filter_keyword:'',
                        copy_move:'0',
                        filter_after_opt_path:'',
                        filter_filename:'',
                        filename_type:'blacklist',
                        filter_suffix:'',
                        virus_opt:'',
                        filter_feature:'',
                        feature_type:'blacklist',
                        filter_after_opt:'0',
                        file_root:"/",
                        // is_copy:'1',
                        is_psvn:'0',
                        data_timeout:1,
                        connection_timeout:30,
                        filter_size:'',
                        filter_size_type:'blacklist',
                        is_put_in_storage:"1",
                        ftp_sync_mode:'1',
                        imgsync_enable:'no',
                        direction:"nt2t",
                    },
                    // rules:{
                    //     out_task_id:[
                    //         { required: true, message: '不能为空', trigger: 'blur' },
                    //         { required: true, message: '只能填写为数字', trigger: 'blur',  pattern:/^[0-9]*$/ }
                    //     ],
                    //     servicename:[
                    //         { required: true, message: '不能为空', trigger: 'blur' },
                    //     ],
                    //     path:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.platForm.form.type == "localftp" || this.platForm.form.type == "localsmb"){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     username:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     password:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     ipaddress:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }else if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                    //                         callback(new Error('ip地址格式不正确'))
                    //                     }else {
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     remoteport:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }else if(!this.$util.testportnumber(value)){
                    //                         callback(new Error('端口格式不正确'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     file_root:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    //     tools:[
                    //         {
                    //             validator: (rule, value, callback)=>{
                    //                 if(this.ftpType == true){
                    //                     if(value == ''){
                    //                         callback(new Error('不能为空'))
                    //                     }else if(value<=0) {
                    //                         callback(new Error('线程数不能小于1'))
                    //                     }
                    //                     else if(value>=100) {
                    //                         callback(new Error('线程数不能大于100'))
                    //                     }
                    //                     else{
                    //                         callback()
                    //                     }
                    //                 }else{
                    //                     callback()
                    //                 }
                    //             }
                    //         }
                    //     ],
                    // }
                },
                resourceList:[{name:"本地FTP", val:"localftp"},{name:"本地SMB", val:"localsmb"},{name:"本地NFS", val:"localnfs"},{name:"本地SFTP", val:"localsftp"},{name:"远程SMB", val:"smb"},{name:"远程FTP", val:"ftp"},{name:"远程SFTP", val:"sftp"},{name:"远程NFS", val:"nfs"},{name:"光碟塔", val:"disc"},{name:"Client", val:"client"},{name:"认证同步", val:"auth_nc"}],
                directoryList:[],
                copyList:[{name:"否", val:"1"},{name:"是", val:"0"}],
                psvnList:[{name:"否", val:"1"},{name:"是", val:"0"}],
                is_put_in_storageList:[{name:"否", val:"1"},{name:"是", val:"0"}],
                levelList:[{name:"1", val:"1"},{name:"2", val:"2"},],
                codingList:[{name:"UTF-8", val:"UTF-8"},{name:"CP936", val:"CP936"}],
                channeltransmissionList:[{name:"常规模式", val:"common"},{name:"高速模式", val:"highSpeed"}],
                smbVersionList:[{name:"v1.0", val:"v1.0"},{name:"v2.0", val:"v2.0"},{name:"v3.0", val:"v3.0"}],
                operationList:[{name:"剪切", val:"del"},{name:"复制", val:"copy"}],
                featureList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                suffixfilterTypeList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                flienamefilterTypeList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                sizefilterTypeList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                idplatformList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                filterTypeList:[{name:"白名单",val:"whitelist"},{name:"黑名单",val:"blacklist"}],
                virusList:[{name:"删除",val:"remove"},{name:"隔离",val:"move"}],
                channelList:[{name:"channel01"},{name:"channel02"}],
                aaList:[{name:"同步子目录"},{name:"只同步当前目录"}],
                filter_after_optList:[{name:"保留",val:"0"},{name:"删除",val:"1"},{name:"转移",val:"2"}],
                filter_after_optKeeptList:[{name:"不复制",val:"0"},{name:"复制",val:"1"}],
                dataTypeList:[{name:"B", val:"B"},{name:"KB", val:"KB"},{name:"MB", val:"MB"},{name:"GB", val:"GB"}],
                dataTypeList1:[{name:"B", val:"B"},{name:"KB", val:"KB"},{name:"MB", val:"MB"},{name:"GB", val:"GB"}],
                minutes: [
                    3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
                    39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60
                ],
                data_timeoutList:[1,2,3,4,5],
                connection_timeoutList:[5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,
                    39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
                smbType: false,
                sftpType:false,
                ftpType: false,
                localftpType: true,
                gaoSettings: true,
                sizeFilter: false,
                nameFilter: false,
                contentFilter: false,
                suffixFilter: false,
                virusFilter:false,
                client:false,
                settimesynFilter:false,
                picNameFilter:false,
                file_feature_filter:false,
                showcopy_move:true,
                showfilter_after_opt_path:false,
                ftpdType:false,
                channel_transmission_show:false,
            }
        },
        computed: {},
        mounted: function() {
            this.findFtp();
        },
        methods: {
            //敏感文件选择框
            showCopy_move(val) {
                if(val == "0"){
                    this.showcopy_move = true
                    this.showfilter_after_opt_path = false
                    this.platForm.form.filter_after_opt_path = ''
                }else if(val == "2"){
                    this.showcopy_move = false
                    this.showfilter_after_opt_path = true
                    this.platForm.form.filter_after_opt_path = ''
                }
                else {
                    this.showcopy_move = false
                    this.showfilter_after_opt_path = false
                    this.platForm.form.filter_after_opt_path = ''
                }
            },
            //通道模式选择框
            channeltransmission_move(val) {
                if(val == "common"){
                    this.channel_transmission_show = true
                }else if(val == "highSpeed"){
                    this.channel_transmission_show = false
                    
                }
            },
            handleLinkimage(){

            },
            findFtp(){
                this.$https.fetchGet(this.$api.local.findFtpInfo.url).then((resp) => {
                    for(var i in resp.data.data) {
                        if(resp.data.data[i].state == "start") {
                            this.directoryList.push(resp.data.data[i].path);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            findSam(){
                this.$https.fetchGet(this.$api.local.samInfo.url).then((resp) => {
                    for(var i in resp.data.data) {
                        if(resp.data.data[i].state == "start") {
                            this.directoryList.push(resp.data.data[i].path);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            findSftp(){
                this.$https.fetchGet(this.$api.local.findSftp.url).then((resp) => {
                    for(var i in resp.data.data) {
                        if(resp.data.data[i].state == "start") {
                            this.directoryList.push(resp.data.data[i].path);
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            showAddDrawer() {
                this.platForm.show = true;
                // setTimeout(() => {
                    // console.log("get")
                    // let id = this.$storage.getStorage("businessID", id);
                    // if(id == null){
                    //     setTimeout(() => {
                    //         id = this.$storage.getStorage("businessID", id);
                    //         id = JSON.parse(id)
                    //         this.platForm.form.taskId = id
                    //         this.$set(this.platForm.form,"taskId",id)
                    //         console.log(this.platForm.form.taskId)
                    //     }, 1000);
                    // }
                    // console.log(id)
                    // id = JSON.parse(id)
                    // this.platForm.form.taskId = id
                    // this.$set(this.platForm.form,"taskId",id)
                    
                // }, 1000);
                // setTimeout(() => {
                //     console.log("get")
                // this.platForm.form.taskId = this.taskId
                setTimeout(() => {
                        this.platForm.form.taskId = this.taskId
                        console.log(this.platForm.form.taskId,"prop")
                    }, 500);
                // console.log(this.platForm.form.taskId)
                // }, 1000);
            },
            addPlatForm() {
                // this.platForm.form.time_interval = String(this.platForm.form.time_interval)
                // this.platForm.form.taskId =  this.$storage.getStorage("businessID").replace("\"","").replace("\"","");
                console.log(this.platForm.form)
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                this.platForm.form.data_timeout = this.platForm.form.data_timeout*1000
                this.platForm.form.connection_timeout = this.platForm.form.connection_timeout*1000
                    this.$https.fetchPost(this.$api.data.addFileTask.url, this.platForm.form).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '文件同步配置成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                location.reload();
                            }, 250);
                        } else
                            this.$Notice.error({title: '文件同步配置失败', desc: "错误代码：" + resp.data.desc, duration: 2.5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 2.5});
                        console.log(err)
                    });
                });
            },
            restPlatForm() {
                this.$refs['plat_form'].resetFields();
                if(this.suffixFilter == true){
                    this.checkSuffixFilter()
                }
                if(this.sizeFilter== true){
                    this.checkSizeFilter()
                }
                if(this.settimesynFilter == true){
                    this.checkSettimesynFilter()
                }
                if(this.nameFilter == true){
                    this.checkNameFilter()
                }
                if(this.contentFilter == true){
                    this.checkContentFilter()
                }
                if(this.picNameFilter == true){
                    this.checkPicNameFilter()
                }
                if(this.virusFilter == true){
                    this.checkVirusFilter()
                }
                if(this.file_feature_filter == true){
                    this.checkfile_feature_filter()
                }
            },
            checkType (val) {
                this.sftpType = false
                this.smbType = false
                this.ftpdType = false
                this.platForm.form.username = ''
                this.platForm.form.password = ''
                this.platForm.form.ipaddress = ''
                this.platForm.form.remoteport = ''
                this.platForm.form.sftpKey = 'v2.0'
                this.platForm.form.path = ''
                this.platForm.form.workGroup = ''
                this.platForm.form.file_root = '/'
                if(val == "ftp") {
                    // this.ftpType = !this.ftpType;
                    // this.localftpType = !this.localftpType;
                    this.client = false;
                    this.ftpType = true;
                    this.localftpType = false;
                    this.ftpdType = true
                    this.platForm.form.ftp_sync_mode = "3"
                } else if(val == "localftp") {
                    this.platForm.form.ftp_sync_mode = "1"
                    this.directoryList = [];
                    this.findFtp();
                    this.ftpType = false;
                    this.localftpType = true;
                } else if(val == "localsmb") {
                    this.platForm.form.ftp_sync_mode = "1"
                    this.directoryList = [];
                    this.ftpType = false;
                    this.findSam();
                    this.localftpType = true;
                }else if(val =="localnfs"){
                    this.platForm.form.ftp_sync_mode = "1"
                    this.ftpType = false;
                    this.directoryList = [];
                    this.localftpType = true;
                }else if(val =="localsftp"){
                    this.platForm.form.ftp_sync_mode = "1"
                    this.ftpType = false;
                    this.directoryList = [];
                    this.findSftp();
                    this.localftpType = true;
                }else if(val =="client"){
                    this.client = true;
                    this.localftpType = false;
                }
                else if(val =="nfs"){
                    this.platForm.form.ftp_sync_mode = "3"
                    this.client = false;
                    this.ftpType = true;
                    this.localftpType = false;
                    this.smbType = false;
                }
                else if(val =="smb"){
                    this.platForm.form.ftp_sync_mode = "3"
                    this.client = false;
                    this.ftpType = true;
                    this.localftpType = false;
                    this.smbType = true;
                }
                else if(val =="sftp"){
                    this.platForm.form.ftp_sync_mode = "3"
                    this.client = false;
                    this.ftpType = true;
                    this.localftpType = false;
                    this.sftpType = true;
                }
                else {
                    this.ftpType = false;
                    this.localftpType = true;
                }
                console.log(this.platForm.form.ftp_sync_mode)
            },
            filter_state(){
                this.sizeFilter = false
                this.nameFilter = false
                this.contentFilter = false
                this.suffixFilter = false
                this.picNameFilter = false
                this.virusFilter = false
                this.file_feature_filter = false
                this.settimesynFilter = false
            },
            checkGaoSettings () {
                this.gaoSettings = !this.gaoSettings;              
            },
            checkSizeFilter () {
                if(this.platForm.form.idbiz2 == false){
                    this.filter_state()
                    return
                }
                this.sizeFilter = !this.sizeFilter;
                this.platForm.form.filter_size = 'blacklist'
                this.platForm.form.filter_min_size = ''
                this.platForm.form.filter_max_size = ''
                this.platForm.form.filter_max_size_unit = 'B'
                this.platForm.form.filter_min_size_unit = 'B'
                if (this.sizeFilter == true){
                    this.filter_state()
                    this.sizeFilter = !this.sizeFilter;
                }
            },
            checkSettimesynFilter () {
                if(this.platForm.form.settimesyn == false){
                    this.filter_state()
                    return
                }
                this.settimesynFilter = !this.settimesynFilter;
                this.platForm.form.syntime = ''
                if (this.settimesynFilter == true){
                    this.filter_state()
                    this.settimesynFilter = !this.settimesynFilter;
                }
            },
            checkNameFilter () {
                if(this.platForm.form.idbiz3 == false){
                    this.filter_state()
                    return
                }
                this.nameFilter = !this.nameFilter;
                this.platForm.form.filename_type = 'blacklist'
                    this.platForm.form.filter_filename = ''
                if (this.nameFilter == true){
                    this.filter_state()
                    this.nameFilter = !this.nameFilter;
                }
            },
            checkContentFilter () {
                if(this.platForm.form.idbiz4 == false){
                    this.filter_state()
                    return
                }
                this.contentFilter = !this.contentFilter;
                this.platForm.form.keyword_type = 'blacklist'
                    this.platForm.form.filter_keyword = ''
                if (this.contentFilter == true){
                    this.filter_state()
                    this.contentFilter = !this.contentFilter;
                }
            },
            checkSuffixFilter () {
                if(this.platForm.form.idbiz5 == false){
                    this.filter_state()
                    return
                }
                this.suffixFilter = !this.suffixFilter;
                this.platForm.form.suffix_type = 'blacklist'
                    this.platForm.form.filter_suffix = ''
                if (this.suffixFilter == true){
                    this.filter_state()
                    this.suffixFilter = !this.suffixFilter;
                }
            },
            checkPicNameFilter () {
                if(this.platForm.form.idbiz1 == false){
                    this.filter_state()
                    return
                }
                this.picNameFilter = !this.picNameFilter
                this.platForm.form.filter_picture_keyword = ''
                if (this.picNameFilter == true){
                    this.filter_state()
                    this.picNameFilter = !this.picNameFilter;
                }
            },
            checkVirusFilter () {
                if(this.platForm.form.idbiz6 == false){
                    this.filter_state()
                    return
                }
                this.virusFilter = !this.virusFilter
                 this.platForm.form.virus_opt = ''
                if (this.virusFilter == true){
                   this.filter_state()
                    this.virusFilter = !this.virusFilter;
                }
            },
            checkfile_feature_filter() {
                if(this.platForm.form.file_feature_filter == false){
                    this.filter_state()
                    return
                }
                this.file_feature_filter = !this.file_feature_filter
                this.platForm.form.feature_type = 'blacklist'
                this.platForm.form.filter_feature = ''
                if (this.file_feature_filter == true){
                    this.filter_state()
                    this.file_feature_filter = !this.file_feature_filter;
                }
            },
            editVirusFilter() {
                this.filter_state()
                this.virusFilter = true
            },
            editPicNameFilter() {
                this.filter_state()
                this.picNameFilter = true
            },
            editSizeFilter() {
                this.filter_state()
                this.sizeFilter = true
            },
            editNameFilter() {
                this.filter_state()
                this.nameFilter = true
            },
            editContentFilter() {
                this.filter_state()
                this.contentFilter = true
            },
            editSuffixFilter() {
                this.filter_state()
                this.suffixFilter = true
            },
            editSettimesynFilter() {
                this.filter_state()
                this.settimesynFilter = true
            },
            editfile_feature_filter() {
                this.filter_state()
                this.file_feature_filter = true
            },
        }
    };
</script>
<style scoped lang="less">
    li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        font-weight: 400;
        line-height: 1.42857143;
        color: #333;
        white-space: nowrap;
        text-decoration: none;
        background-color: transparent;
    }
    /deep/ .ivu-switch-checked{
        border-color: #fa914e;
        background-color: #fa914e;
    }
</style>
