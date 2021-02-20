<template>
 <div>
        <div style="width:80px;height:30px;" @click="showAddDrawer">文件同步</div>
        <modal title="文件同步服务编辑"  v-model="platForm.show" width="1000">
            <Form ref="plat_form"   :model="platForm.form" :rules="platForm.rules"
                  :label-width="138">
            <Tabs style="min-height:500px;margin-right:50px;" value="name1">
                <TabPane label="基础配置" name="name1">
                    <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;">
                    <FormItem label="外端服务id" prop="out_task_id" style="margin-bottom: 0px;width:50%;">
                        <Tooltip max-width="320" placement="top" content="服务id内外端需一致">
                            <Input clearable style="width:320px;" v-model="platForm.form.out_task_id"/>
                        </Tooltip>
                        <!-- <span style="font-size: 12px;color: red">*(服务id内外端需一致)</span> -->
                    </FormItem>
                    <FormItem label="服务名称" prop="servicename" style="margin-bottom: 15px;width:50%;">
                        <Input clearable v-model="platForm.form.servicename"/>
                    </FormItem>
                    <FormItem label="资源类型" prop="type1" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.type">
                            <Option v-for="item in resourceList" :value="item.val" :key="item.val" @click.native="checkType(item.val)">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                        <FormItem label="IP地址" v-if="ftpType" prop="ipaddress" style="margin-bottom: 15px;width:50%;">
                            <Input clearable v-model="platForm.form.ipaddress"/>
                        </FormItem>
                        <FormItem label="端口" v-if="ftpType" prop="remoteport" style="margin-bottom: 15px;width:50%;">
                            <Input clearable v-model="platForm.form.remoteport"/>
                        </FormItem>
                        <FormItem label="用户名" v-if="ftpType" prop="username" style="margin-bottom: 15px;width:50%;">
                            <Input clearable v-model="platForm.form.username"/>
                        </FormItem>
                        <FormItem label="密码" v-if="ftpType" prop="password" style="margin-bottom: 15px;width:50%;">
                            <Input type="password" clearable v-model="platForm.form.password"/>
                        </FormItem>
                        
                        <FormItem label="根目录" v-if="ftpType" prop="file_root" style="margin-bottom: 15px;width:50%;">
                            <Input clearable v-model="platForm.form.file_root"/>
                        </FormItem>
                    <FormItem label="目录" v-if="localftpType" prop="path" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.path">
                            <Option v-for="item in directoryList" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="协议版本" prop="smbVersion" v-if="smbType" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.smbVersion">
                            <Option v-for="item in smbVersionList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="所属的域" v-if="smbType" prop="workGroup" style="margin-bottom: 15px;width:50%;">
                        <Input clearable v-model="platForm.form.workGroup"/>
                    </FormItem>
                    <FormItem label="密匙" prop="sftpKey" v-if="sftpType" style="margin-bottom: 15px;width:50%;">
                        <Select v-model="platForm.form.sftpKey">
                            <Option v-for="item in smbVersionList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                        </Select>
                    </FormItem>
                    </div>
                    <FormItem style="margin-top:5px;">
                        <Button type="primary" @click="addPlatForm">确认</Button>
                        <!-- <Button style="margin-left: 8px" @click="restPlatForm">重置</Button>
                        <span style="color:red;margin-left:5px;">注:详细配置与文件过滤也会被重置</span> -->
                        <span v-if="detailSpanShow" style="color:red;margin-left:5px;">详细配置中有参数不合法</span>
                    </FormItem>
                    <!-- <filetab1 /> -->
                </TabPane>
                <TabPane label="详细配置" name="name2">
                            <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;">
                        <FormItem label="通道传输模式" prop="channel_transmission_mode" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.channel_transmission_mode">
                                <Option @click.native="channeltransmission_move(item.val)" v-for="item in channeltransmissionList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="线程数" v-if="ftpType" prop="tools" style="margin-bottom: 15px;width:33%;">
                            <Input v-model="platForm.form.tools"/>
                        </FormItem>
                        <FormItem label="等级" v-if="!ftpType && channel_transmission_show" prop="level" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.level">
                                <Option v-for="item in levelList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="异常日志是否入库" v-if="ftpType" prop="is_put_in_storage" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.is_put_in_storage">
                                <Option v-for="item in is_put_in_storageList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="编码" v-if="ftpType" prop="iocharset" style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.iocharset">
                                <Option v-for="item in codingList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="传输模式" v-if="ftpdType" prop="is_psvn" style="margin-bottom: 15px;width:33%;">
                                <Select v-model="platForm.form.is_psvn">
                                <Option v-for="item in psvnList" :value="item.val" :key="item.val">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件同步后的操作" prop="operation"  style="margin-bottom: 15px;width:33%;">
                            <Select v-model="platForm.form.operation">
                                <Option v-for="item in operationList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="设置传输超时时间(秒)" v-if="ftpdType" prop="data_timeout" style="margin-bottom: 0px;width:33%;">
                            <!-- <Select v-model="platForm.form.data_timeout">
                                <Option v-for="item in data_timeoutList" :value="item" :key="item">{{ item }}</Option>
                            </Select> -->
                            <Input v-model="platForm.form.data_timeout" />
                        </FormItem>
                        <FormItem label="连接超时时间(秒)" v-if="ftpdType" prop="connection_timeout" style="margin-bottom: 0px;width:33%;">
                            <!-- <Select v-model="platForm.form.connection_timeout">
                                <Option v-for="item in connection_timeoutList" :value="item" :key="item">{{ item }}</Option>
                            </Select> -->
                            <Input v-model="platForm.form.connection_timeout" />  
                        </FormItem>
                        <FormItem label="间隔(秒)" v-if="ftpType" placeholder="以秒为单位" prop="time_interval"   style="margin-bottom:0px;width:33%;">
                            <Select v-model="platForm.form.time_interval">
                                <Option v-for="item in minutes" :value="item" :key="item">{{ item }}</Option>
                            </Select>
                        
                        </FormItem>
                        
                        <FormItem label="目录同步" prop="idplatform" v-if="channel_transmission_show"  style="margin-bottom: 15px;width:33%;display: none;">
                            <Select v-model="platForm.form.gg">
                                <Option v-for="item in aaList" :value="item.name" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="限速" prop="idbiz" v-if="channel_transmission_show"  style="margin-bottom: 15px;width:33%;display: none;">
                            <Input v-model="platForm.form.uu"/>
                        </FormItem>
                        <!-- <FormItem label="启用监控目录清理" prop="idbiz" style="margin-bottom: 15px;width:33%;">
                                <Checkbox label="Eat"></Checkbox>
                        </FormItem> -->
                        
                    </div>
                </TabPane>
                <TabPane label="文件过滤" v-if="ftpType" name="name3">
                    <FormItem v-if="!ftpType" label="文件过滤" prop="filter"  style="margin-bottom: 15px;width:49%;">
                        <!-- <Checkbox v-model="platForm.form.filter" @on-change="filter_change"></Checkbox> -->
                        <i-switch style="margin-right:12px" v-model="platForm.form.filter" @onchange="filter_change" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                    <div style="display:flex;justify-conten:space-around;flex-wrap:wrap;" v-if="platForm.form.filter||ftpType">
                        <FormItem label="开启病毒扫描" prop="idbiz6"  style="text-align:left;margin-bottom: 15px;width:33%;">
                                <!-- <Checkbox v-model="platForm.form.idbiz6" @on-change="checkVirusFilter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.idbiz6" @on-change="checkVirusFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editVirusFilter" style="background:#fa914e;color:white" v-if="platForm.form.idbiz6">编辑</Button>
                        </FormItem>
                        <FormItem label="关键字过滤" prop="idbiz1"  style="margin-bottom: 15px;width:33%;">
                                <!-- <Checkbox v-model="platForm.form.idbiz1" @on-change="checkPicNameFilter"></Checkbox> -->
                                <i-switch style="margin-right:12px" v-model="platForm.form.idbiz1" @on-change="checkPicNameFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editPicNameFilter" style="background:#fa914e;color:white" v-if="platForm.form.idbiz1">编辑</Button>
                        </FormItem>
                        <FormItem label="文件大小过滤" prop="idbiz2" style="margin-bottom: 15px;width:33%;">
                            <!-- <Checkbox v-model="platForm.form.idbiz2" @on-change="checkSizeFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz2" @on-change="checkSizeFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editSizeFilter" style="background:#fa914e;color:white" v-if="platForm.form.idbiz2">编辑</Button>
                        </FormItem>
                        <FormItem label="文件名过滤" prop="idbiz3"   style="margin-bottom: 15px;width:33%;">
                            <!-- <Checkbox v-model="platForm.form.idbiz3" @on-change="checkNameFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz3" @on-change="checkNameFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editNameFilter" style="background:#fa914e;color:white" v-if="platForm.form.idbiz3">编辑</Button>
                        </FormItem>
                        <FormItem label="文件名后缀过滤" prop="idbiz5" style="margin-bottom: 15px;width:33%;">
                            <!-- <Checkbox v-model="platForm.form.idbiz5" @on-change="checkSuffixFilter"></Checkbox> -->
                            <i-switch style="margin-right:12px" v-model="platForm.form.idbiz5" @on-change="checkSuffixFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                            <Button @click.native="editSuffixFilter" style="background:#fa914e;color:white" v-if="platForm.form.idbiz5">编辑</Button>
                        </FormItem>
                        <!-- <FormItem label="定时同步" prop="settimesyn" style="margin-bottom: 15px;width:33%;">
                                
                                <i-switch style="margin-right:12px" v-model="platForm.form.settimesyn" @on-change="checkSettimesynFilter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editSettimesynFilter" style="background:#fa914e;color:white" v-if="platForm.form.settimesyn">编辑</Button>
                        </FormItem> -->
                        <!-- <FormItem label="文件特征过滤" prop="file_feature_filter"   style="margin-bottom: 15px;width:33%;">
                                
                                <i-switch style="margin-right:12px" v-model="platForm.form.file_feature_filter" @on-change="checkfile_feature_filter" size="large">
                                    <span slot="open">开启</span>
                                    <span slot="close">关闭</span>
                                </i-switch>
                                <Button @click.native="editfile_feature_filter" style="background:#fa914e;color:white" v-if="platForm.form.file_feature_filter">编辑</Button>
                        </FormItem> -->
                        <FormItem label="敏感文件操作" prop="filter_after_opt"  style="margin-bottom: 15px;width:34%;">
                            <Select style="width:130px;" v-model="platForm.form.filter_after_opt">
                                <Option @click.native="showCopy_move(item.val)" v-for="item in filter_after_optList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                            <Poptip trigger="hover" placement="left" content="敏感文件就是关键字过滤、文件大小过滤等出来的不符合规定的文件">
                                <i style="margin-left:3px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                                <!-- <Icon type="md-home" style="margin-bottom: 5px;font-size: 28px;" /> -->
                            </Poptip>
                        </FormItem>
                        <FormItem label="敏感文件复制到平台" prop="copy_move" v-if="showcopy_move"  style="margin-bottom: 15px;width:30%;">
                            <Select v-model="platForm.form.copy_move ">
                                <Option v-for="item in filter_after_optKeeptList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="敏感文件转移路径" prop="filter_after_opt_path" v-if="showfilter_after_opt_path"  style="margin-bottom: 15px;width:30%;">
                            <Input disabled v-model="platForm.form.filter_after_opt_path"/>
                        </FormItem>
                        <Divider v-if="virusFilter" orientation="left">病毒扫描</Divider>
                        <FormItem label="病毒文件处理" prop="virus_opt" v-if="virusFilter"  style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.virus_opt">
                                <Option v-for="item in virusList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                            <span v-if="virusFilter" style="color:red;font-size:11px;">注：病毒库管理中杀毒引擎为启用状态时，此功能才生效</span>
                        </FormItem>
                        
                        <Divider v-if="picNameFilter" orientation="left">关键字过滤</Divider>
                        
                        <FormItem label="过滤的关键字" prop="filter_keyword" v-if="picNameFilter" style="margin-bottom: 15px;width:49%;">
                            <Input style="width:280px" v-model="platForm.form.filter_keyword "/>
                            <Poptip trigger="hover" content="匹配文件中的内容进行过滤操作，
                            支持的文件有：txt、pdf、xls、xlsx、doc、docx、ppt、pptx、wps、dps、et、xml，多个以/#/分隔">
                                <i style="margin-left:1px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                            </Poptip>
                        </FormItem>
                        <FormItem label="过滤类型" prop="keyword_type" v-if="picNameFilter"  style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.keyword_type">
                                <Option v-for="item in filterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="图片关键字过滤" prop="filter_picture_keyword" v-if="picNameFilter" style="margin-bottom: 15px;width:49%;">
                            <Input style="width:280px" v-model="platForm.form.filter_picture_keyword "/>
                            <Poptip trigger="hover" content="匹配图像中的内容里面的文字，多个以/#/分隔">
                                <i style="margin-left:1px;color:#fa914e;font-size: 24px;" class="ivu-icon ivu-icon-ios-alert"></i>
                            </Poptip>
                        </FormItem>
                        <Divider v-if="sizeFilter" orientation="left">文件大小过滤</Divider>
                        <FormItem label="最小" prop="filter_min" v-if="sizeFilter"  style="margin-bottom: 15px;width:50%;">
                            <Poptip trigger="hover" content="大于此值可同步">
                                <Input style="width:100%" v-model="platForm.form.filter_min_size"/>
                            </Poptip>
                            <Select style="width:26%" v-model="platForm.form.filter_min_size_unit">
                                <Option v-for="item in dataTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="最大" prop="filter_max" v-if="sizeFilter"  style="margin-bottom: 15px;width:50%;">
                            <Poptip trigger="hover" content="小于此值可同步">
                                <Input style="width:100%" v-model="platForm.form.filter_max_size"/>
                            </Poptip>
                            <Select style="width:26%" v-model="platForm.form.filter_max_size_unit">
                                <Option v-for="item in dataTypeList1" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="大小过滤类型" prop="filter_size_type" v-if="sizeFilter"  style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.filter_size_type">
                                <Option v-for="item in sizefilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <Divider v-if="nameFilter" orientation="left">文件名过滤</Divider>
                        <FormItem label="文件名过滤类型" prop="filename_type" v-if="nameFilter" style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.filename_type">
                                <Option v-for="item in flienamefilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件名" prop="filter_filename" v-if="nameFilter" style="margin-bottom: 15px;width:49%;">
                            <Poptip trigger="hover" content="多个以小写|分割">
                                <Input style="width:300px" v-model="platForm.form.filter_filename"/>
                            </Poptip>
                        </FormItem>
                        <Divider v-if="suffixFilter" orientation="left">文件名后缀过滤</Divider>
                        <FormItem label="后缀过滤类型" prop="suffix_type" v-if="suffixFilter"  style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.suffix_type">
                                <Option v-for="item in suffixfilterTypeList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                        </FormItem>
                        <FormItem label="文件名后缀" prop="filter_suffix " v-if="suffixFilter"  style="margin-bottom: 15px;width:49%;">
                            <Poptip trigger="hover" content="例如*.txt 多个请以空格分开">
                                <Input style="width:300px" v-model="platForm.form.filter_suffix"/>
                            </Poptip>
                        </FormItem>
                        <Divider v-if="settimesynFilter" orientation="left">同步时间</Divider>
                         <FormItem label="同步时间段" prop="syntime" v-if="settimesynFilter" style="margin-bottom: 15px;width:49%;">
                                <TimePicker confirm transfer="true" :value="platForm.form.syntime" format="hh’mm’ss" type="timerange" placement="bottom-end" placeholder="Select time" style="width: 168px"></TimePicker>
                        </FormItem>
                        <Divider v-if="file_feature_filter" orientation="left">文件特征过滤</Divider>
                        <FormItem label="文件特征" prop="filter_feature" v-if="file_feature_filter" style="margin-bottom: 15px;width:60%;">
                            <Input  v-model="platForm.form.filter_feature" style="margin-bottom: 15px;width:49%;" />
                        </FormItem>
                        <FormItem label="文件特征类型" prop="feature_type" v-if="file_feature_filter" style="margin-bottom: 15px;width:49%;">
                            <Select v-model="platForm.form.feature_type" style="margin-bottom: 15px;width:49%;">
                                <Option v-for="item in featureList" :value="item.val" :key="item.name">{{ item.name }}</Option>
                            </Select>
                            <Upload action="" :before-upload="handleLinkimage">
                                <i-button icon="ios-cloud-upload-outline">添加文件</i-button>
                            </Upload>
                        </FormItem>
                        <span v-if="false">
                        <!-- <input name="filter_feature[]" class="filter_feature" type="checkbox" value="1"> directory
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="2"> very short file (no magic)
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="3"> CDF V2 Document
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="4"> Microsoft ASF
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="5"> Windows Installer XML
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="6"> PE32 executable for MS Windows (GUI)
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="7"> PE32 executable for MS Windows (DLL)
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="8"> PE32+ executable for MS Windows
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="9"> MS Windows HtmlHelp Data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="10">MS Windows icon resource
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="11">Microsoft Cabinet archive data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="12">DOS batch file text
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="13">COM executable for DOS
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="14">ACB archive data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="15">RPM
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="16">Zip archive data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="17">RAR archive data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="18">gzip compressed data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="19">bzip2 compressed data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="20">xz compressed data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="21">7-zip archive data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="22">POSIX tar archive
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="23">ASCII text#ISO-8859 text#UTF-8 Unicode text#|UTF-16 Unicode text
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="24">GIF image data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="25">JPEG image data
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="26">PNG image
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="27">PC bitmap
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="28">PDF document
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="29">BitTorrent file
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="30">POSIX shell script text executable
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="31">Lisp/Scheme program text
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="32">|Microsoft Office Word#Microsoft Word
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="33">Microsoft Excel
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="34">|PowerPoint
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="35">Microsoft OOXML
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="36">XML 1.0 document text
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="37">MPEG ADTS, layer II
                        <input name="filter_feature[]" class="filter_feature" type="checkbox" value="38">Audio file with ID3|MPEG ADTS, layer III -->
                        <Checkbox v-model="single" value="1"> directory</Checkbox>
                        <Checkbox v-model="single" value="2"> very short file (no magic)</Checkbox>
                        <Checkbox v-model="single" value="3"> CDF V2 Document</Checkbox>
                        <Checkbox v-model="single" value="4"> Microsoft ASF</Checkbox>
                        <Checkbox v-model="single" value="5"> Windows Installer XML</Checkbox>
                        <Checkbox v-model="single" value="6"> PE32 executable for MS Windows (GUI)</Checkbox>
                        <Checkbox v-model="single" value="7"> PE32 executable for MS Windows (DLL)</Checkbox>
                        <Checkbox v-model="single" value="8"> PE32+ executable for MS Windows</Checkbox>
                        <Checkbox v-model="single" value="9"> MS Windows HtmlHelp Data</Checkbox>
                        <Checkbox v-model="single" value="10">MS Windows icon resource</Checkbox>
                        <Checkbox v-model="single" value="11">Microsoft Cabinet archive data</Checkbox>
                        <Checkbox v-model="single" value="12">DOS batch file text</Checkbox>
                        <Checkbox v-model="single" value="13">COM executable for DOS</Checkbox>
                        <Checkbox v-model="single" value="14">ACB archive data</Checkbox>
                        <Checkbox v-model="single" value="15">RPM</Checkbox>
                        <Checkbox v-model="single" value="16">Zip archive data</Checkbox>
                        <Checkbox v-model="single" value="17">RAR archive data</Checkbox>
                        <Checkbox v-model="single" value="18">gzip compressed data</Checkbox>
                        <Checkbox v-model="single" value="19">bzip2 compressed data</Checkbox>
                        <Checkbox v-model="single" value="20">xz compressed data</Checkbox>
                        <Checkbox v-model="single" value="21">7-zip archive data</Checkbox>
                        <Checkbox v-model="single" value="22">POSIX tar archive</Checkbox>
                        <Checkbox v-model="single" value="23">ASCII text#ISO-8859 text#UTF-8 Unicode text#|UTF-16 Unicode text</Checkbox>
                        <Checkbox v-model="single" value="24">GIF image data</Checkbox>
                        <Checkbox v-model="single" value="25">JPEG image data</Checkbox>
                        <Checkbox v-model="single" value="26">PNG image</Checkbox>
                        <Checkbox v-model="single" value="27">PC bitmap</Checkbox>
                        <Checkbox v-model="single" value="28">PDF document</Checkbox>
                        <Checkbox v-model="single" value="29">BitTorrent file</Checkbox>
                        <Checkbox v-model="single" value="30">POSIX shell script text executable</Checkbox>
                        <Checkbox v-model="single" value="31">Lisp/Scheme program text</Checkbox>
                        <Checkbox v-model="single" value="32">|Microsoft Office Word#Microsoft Word</Checkbox>
                        <Checkbox v-model="single" value="33">Microsoft Excel</Checkbox>
                        <Checkbox v-model="single" value="34">|PowerPoint</Checkbox>
                        <Checkbox v-model="single" value="35">Microsoft OOXML</Checkbox>
                        <Checkbox v-model="single" value="36">XML 1.0 document text</Checkbox>
                        <Checkbox v-model="single" value="37">MPEG ADTS, layer II</Checkbox>
                        <Checkbox v-model="single" value="38">Audio file with ID3|MPEG ADTS, layer III</Checkbox>
                        </span>
                        </div>  
                </TabPane>
            </Tabs>
            </Form>
            <div slot="footer">
            </div>
        </modal>
    </div>
</template>

<script>
    // import filetab1 from "./dbsync_file_edit2tab1";

    export default {
        components: {
            // filetab1
        },
        inject: ["reload"],
        props: {
        taskId: String,
        // required: true
        },
        data() {
            return {
                detailSpanShow:false,
                platForm: {
                    show: false,
                    form: {
                        idbiz1:false,
                        idbiz2:false,
                        idbiz3:false,
                        idbiz5:false,
                        idbiz6:false,
                        filter:false,
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
                        settimesyn:false,
                        filter_min_size:'',
                        filter_max_size:'',
                        filter_min_size_unit:"1",
                        filter_max_size_unit:"1",
                        suffix_type:'blacklist',
                        filter_keyword:'',
                        copy_move:'0',
                        filter_after_opt_path:'/home/invalid',
                        filter_filename:'',
                        filename_type:'blacklist',
                        filter_suffix:'',
                        virus_opt:'',
                        filter_feature:'',
                        feature_type:'blacklist',
                        filter_after_opt:'0',
                        file_root:"/",
                        is_psvn:'0',
                        data_timeout:60,
                        connection_timeout:60,
                        filter_size:'',
                        filter_size_type:'blacklist',
                        is_put_in_storage:"1",
                        ftp_sync_mode:'1',
                        imgsync_enable:'no',
                        direction:"nt2t",
                    },
                    rules:{
                        out_task_id:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                            { required: true, message: '只能填写为数字', trigger: 'blur',  pattern:/^[0-9]*$/ }
                        ],
                        servicename:[
                            { required: true, message: '不能为空', trigger: 'blur' },
                        ],
                        path:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.platForm.form.type == "localftp" || this.platForm.form.type == "localsmb"){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        username:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        password:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        ipaddress:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }else if(!this.$util.queryDevIP4(value) && !this.$util.queryDevIP6(value)){
                                            callback(new Error('ip地址格式不正确'))
                                        }else {
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        remoteport:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }else if(!this.$util.testportnumber(value)){
                                            callback(new Error('端口格式不正确'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        file_root:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            callback(new Error('不能为空'))
                                        }
                                        else{
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        tools:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            this.detailSpanShow = true
                                            callback(new Error('不能为空'))
                                        }else if(value<=0) {
                                            this.detailSpanShow = true
                                            callback(new Error('线程数不能小于1'))
                                        }
                                        else if(value>=100) {
                                            this.detailSpanShow = true
                                            callback(new Error('线程数不能大于100'))
                                        }
                                        else if(!this.$util.queryNum(value)) {
                                            this.detailSpanShow = true
                                            callback(new Error('请填写数字'))
                                        }
                                        else{
                                            this.detailSpanShow = false
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        data_timeout:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            this.detailSpanShow = true
                                            callback(new Error('不能为空'))
                                        }else if(value<=0) {
                                            this.detailSpanShow = true
                                            callback(new Error('不能小于1'))
                                        }
                                        else if(value>=100) {
                                            this.detailSpanShow = true
                                            callback(new Error('不能大于600'))
                                        }
                                        else if(!this.$util.queryNum(value)) {
                                            this.detailSpanShow = true
                                            callback(new Error('请填写数字'))
                                        }
                                        else{
                                            this.detailSpanShow = false
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                        connection_timeout:[
                            {
                                validator: (rule, value, callback)=>{
                                    if(this.ftpType == true){
                                        if(value == ''){
                                            this.detailSpanShow = true
                                            callback(new Error('不能为空'))
                                        }else if(value<=0) {
                                            this.detailSpanShow = true
                                            callback(new Error('不能小于1'))
                                        }
                                        else if(value>=100) {
                                            this.detailSpanShow = true
                                            callback(new Error('不能大于600'))
                                        }
                                        else if(!this.$util.queryNum(value)) {
                                            this.detailSpanShow = true
                                            callback(new Error('请填写数字'))
                                        }
                                        else{
                                            this.detailSpanShow = false
                                            callback()
                                        }
                                    }else{
                                        callback()
                                    }
                                }
                            }
                        ],
                    }
                },
                resourceList:[
                    {name:"本地FTP", val:"localftp"},{name:"本地SMB", val:"localsmb"},
                    // {name:"本地NFS", val:"localnfs"},
                    {name:"本地SFTP", val:"localsftp"},
                    // {name:"远程SMB", val:"smb"},
                    {name:"远程FTP", val:"ftp"},
                    {name:"远程SFTP", val:"sftp"},
                    // {name:"远程NFS", val:"nfs"},{name:"光碟塔", val:"disc"},{name:"Client", val:"client"},{name:"认证同步", val:"auth_nc"}
                    ],
                directoryList:[],
                copyList:[{name:"否", val:"1"},{name:"是", val:"0"}],
                psvnList:[{name:"主动模式", val:"1"},{name:"被动模式", val:"0"}],
                is_put_in_storageList:[{name:"否", val:"1"},{name:"是", val:"0"}],
                levelList:[{name:"1", val:"1"},{name:"2", val:"2"},],
                codingList:[{name:"UTF-8", val:"UTF-8"},{name:"CP936", val:"CP936"}],
                channeltransmissionList:[
                    // {name:"常规模式", val:"common"},
                    {name:"高速模式", val:"highSpeed"}],
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
                dataTypeList:[{name:"B", val:"1"},{name:"KB", val:"1000"},{name:"MB", val:"1000000"},{name:"GB", val:"1000000000"}],
                dataTypeList1:[{name:"B", val:"1"},{name:"KB", val:"1000"},{name:"MB", val:"1000000"},{name:"GB", val:"1000000000"}],
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
            // this.findFtp();
        },
        methods: {
            //敏感文件选择框
            showCopy_move(val) {
                if(val == "0"){
                    this.showcopy_move = true
                    this.showfilter_after_opt_path = false
                    this.platForm.form.filter_after_opt_path = '/home/invalid'
                }else if(val == "2"){
                    this.showcopy_move = false
                    this.showfilter_after_opt_path = true
                    this.platForm.form.filter_after_opt_path = '/home/invalid'
                }
                else {
                    this.showcopy_move = false
                    this.showfilter_after_opt_path = false
                    this.platForm.form.filter_after_opt_path = '/home/invalid'
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
                this.directoryList=[]
                this.findFtp();
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
                if(this.platForm.form.out_task_id=='9999'){
                    this.$Notice.error({title: '文件同步配置失败', desc: '外端id不能为9999', duration: 5});
                    return
                }
                // this.platForm.form.time_interval = String(this.platForm.form.time_interval)
                // this.platForm.form.taskId =  this.$storage.getStorage("businessID").replace("\"","").replace("\"","");
                console.log(this.platForm.form)
                this.$refs['plat_form'].validate((valid) => {
                    if (!valid)
                        return;
                
                let obj = this._.cloneDeep(this.platForm.form)
                obj.data_timeout = obj.data_timeout*1000
                obj.connection_timeout = obj.connection_timeout*1000
                    this.$https.fetchPost(this.$api.data.addFileTask.url, obj).then((resp) => {
                        if (resp.data.status == 200) {
                            this.$Notice.success({title: '文件同步配置成功', desc: "正在刷新界面", duration: 2.5});
                            setTimeout(() => {
                                document.querySelector("body").setAttribute("style", "overflow: auto !important;")
                                this.reload()
                            }, 250);
                        } else
                            this.$Notice.error({title: '文件同步配置失败', desc: "错误：" + resp.data.desc, duration: 5});
                    }).catch(err => {
                        this.$Notice.error({title: '请求失败', desc: err, duration: 5});
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
                this.platForm.form.filter_max_size_unit = '1'
                this.platForm.form.filter_min_size_unit = '1'
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
                if(this.idbiz4 == false){
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
            //文件过滤change
            filter_change(){
                console.log(this.platForm.form.filter)
                this.platForm.form.filter = !this.platForm.form.filter
            }
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
