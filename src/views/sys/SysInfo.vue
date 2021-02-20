<template>
  <div class="container-fluid">
    
    <Row :gutter="16" class="panel-group">
    <Col span="6" class="card-panel-col">
    <Card class="card1">
      <div @click="quick('/network/interface')" class="card-panel">
        <div class="card-panel-icon-wrapper">
          <Icon size="58" type="md-git-network" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            网络配置
          </div>
          <div style="font-size:11px;">
            接口、通道等配置
          </div>
        </div>
      </div>
      </Card>
    </Col>
    <Col span="6" class="card-panel-col">
    <Card class="card2">
      <div @click="quick('/local/ftp')"  class="card-panel">
        <div class="card-panel-icon-wrapper ">
          <Icon size="58" type="md-git-pull-request" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            本地服务
          </div>
          <div style="font-size:11px;">
            本地FTP等服务
          </div>
        </div>
      </div>
      </Card>
    </Col>
    <Col span="6" class="card-panel-col">
    <Card class="card3">
      <div @click="quick('/data/test2')" class="card-panel">
        <div class="card-panel-icon-wrapper">
          <Icon size="58" type="md-sync" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            数据同步
          </div>
          <div style="font-size:11px;">
            业务/服务管理
          </div>
        </div>
      </div>
      </Card>
    </Col>
    <Col span="6"  class="card-panel-col">
    <Card class="card4">
      <div @click="quick('/sys/businessMonitoring')" class="card-panel">
        <div class="card-panel-icon-wrapper">
          <Icon size="58" type="ios-pulse" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            业务监控
          </div>
          <div style="font-size:11px;">
            服务监控
          </div>
        </div>
      </div>
      </Card>
    </Col>
  </Row>

    <Row :gutter="16" class="panel-group">
      <Col span="12" offset="0" class="card-panel-col">
        <Card  style="height:230px;">
            <p slot="title">
            <Icon size="20" type="ios-pulse"></Icon>
            &nbsp;&nbsp;资源监控
            </p>
            <vue-justgage ref="g1" id="g1" class="gauge"></vue-justgage>
            <vue-justgage ref="g2" id="g2" class="gauge"></vue-justgage>
            <vue-justgage ref="g3" id="g3" class="gauge"></vue-justgage>
        </Card>
      </Col>
      <Col span="12" class="card-panel-col">
        <Card style="height:230px;">
            <p slot="title">
            <Icon size="20" type="md-barcode"></Icon>
            &nbsp;&nbsp;设备信息
            </p>
            <Row :gutter="36" >
              <Col span="14" >
                <div v-for="item in randomMovieList" :key="item.title" style="font-weight: 500;margin-bottom: 24px;">
                  <div style="display:flex;flex-flow: row nowrap;justify-content: space-between;">
                    <span style="font-size:12px;text-align:left;font-weight:bold;">{{ item.title }}</span>
                  
                    <span style="font-size:12px;">{{ item.content }}</span>
                  </div>
                </div>
                </Col>
                <Col span="10">
                <div v-for="item in randomMovieList1" :key="item.title" style="font-weight: 500;margin-bottom: 24px;">
                  <div style="display:flex;flex-flow: row nowrap;justify-content: space-between;">
                    <span style="font-size:12px;font-weight:bold;">{{ item.title }}</span>
                  
                    <span style="font-size:12px;">{{ item.content }}</span>
                  </div>
                </div>
              </Col>
            </Row>
        </Card>
      </Col>
    </Row>

    <Row :gutter="16" class="panel-group">
      <Col span="12" offset="0" class="card-panel-col">
        <Card  bordered style="height:230px;">
            <p slot="title">
            <Icon size="20" type="md-git-network"></Icon>
            &nbsp;&nbsp;网络接口信息
            </p>
            <div style="overflow-y:hidden;">
              <Table height="140" border stripe :columns="columns1" :data="data1">
                <template slot-scope="{ row, index }" slot="list">
                  <span v-if="row.list.length==0" >暂未配置</span>
                  <span v-if="row.list.length>0" v-for="(val,index) in row.list">
                    {{val}}{{index!=row.list.length-1?',':''}}
                  </span>
                </template>
              </Table>
            </div>
        </Card>
      </Col>
      <Col span="12" class="card-panel-col">
        <Card :padding="0" bordered  style="height:230px;">
            <p slot="title">
            <Icon size="20" type="md-swap"></Icon>
            &nbsp;&nbsp;双机热备状态{{AvaliList.action=="true"?AvaliList.isHost?'（当前为主机）':'（当前为备机）':''}}
            </p>
            <CellGroup>
                <Cell title="当前状态" :extra="AvaliList.action=='true'?'启用中':'已禁用'" />
                <Cell title="HA口" :extra="AvaliList.HA==null?'无':AvaliList.HA" />
                <Cell title="工作模式" :extra="AvaliList.pattern">
                </Cell>
            </CellGroup>
        </Card>
      </Col>
    </Row>
    <!-- <div class="row box margin-x clear-margin padding-x" style="width: 50%;float: left;" >
      <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
        <blockquote style="padding: 0; margin: 0; border: none;color: #000;font-size: 14px;" >
          资源监控
        </blockquote>
      </div>
      <div class="modal-body">
        <vue-justgage ref="g1" id="g1" class="gauge"></vue-justgage>
        <vue-justgage ref="g2" id="g2" class="gauge"></vue-justgage>
        <vue-justgage ref="g3" id="g3" class="gauge"></vue-justgage>
      </div>
    </div> -->

    <!-- <div class="row box margin-x clear-margin padding-x" style="width: 45.5%;height: 253px;float: left;margin-left: 15px;" >
      <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
        <blockquote style="padding: 0; margin: 0; border: none;color: #000;font-size: 14px;">
          设备信息
        </blockquote>
      </div>
      <div class="modal-body" style="margin-top: 5px;">
        <div v-for="item in randomMovieList" :key="item.title" style="font-weight: 500;margin-bottom: 18px;">
          <div style="width: 130px;float: left;">
            <span style="font-size:12px;">{{ item.title }}</span>
          </div>
          <div>
            <span style="font-size:12px;">{{ item.content }}</span>
          </div>
        </div>
      </div>
    </div> -->


    
    <!-- <div class="row box margin-x clear-margin padding-x" style="width: 97%;float: left;">
      <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
        <blockquote style="padding: 0; margin: 0; border: none;color: #000;font-size: 14px;">
          事件信息
        </blockquote>
      </div>
      <div class="modal-body">
        <contrastLine :text="text"></contrastLine>
      </div>
    </div> -->
  </div>
</template>
<script>
import Utils from '../../components/test.js';
// import JustGage from "../../assets/js/justgage.js";
// import contrastLine from "../../components/chart/contrastLine2";
export default {
  name: "SysInfo",
  components: { 
    // contrastLine 
    },
  inject: ["reload"],
  data() {
    return {
      isHost:false,
      switchValue:false,
      columns1: [
          {title: '序号', key: 'id', align: 'center',width: 70,
          render: (h, params) => {
                  return h('span', params.index +1);
              }
          },
          {   
              width: 150,
              align: 'center',
              title: '接口',
              key: 'dev',
          },
          {   
              align: 'center',
              title: 'IP地址',
              key: 'list',
              sortable: true,
              slot:'list',
              // sortType:'desc',
              // render: (h, params) => {
              //     return h('div', {
              //         attrs: {
              //             class: 'subCol'
              //         }
              //     },
              //     [
              //         h('ul', this.data1[params.index].list.map(item => {
              //             return h('li', {
              //             }, item)
              //         }))
              //     ])
              // }
          },
          {   
              width: 80,
              align: 'center',
              title: '链路状态',
              key: 'bl',
              render: (h, params) => {
                if(params.row.bl){
                  return h("Tag", {style: {paddingLeft: '18px',border:"none !important"},props: {type: "dot", color: "success"}},)
                }
                else {
                  return h("Tag", {style: {paddingLeft: '18px',border:"none !important"},props: {type: "dot", color: "error"}},)
                }
              }
          },
      ],
      data1: [
          // {
          //     name: 'John Brown',
          //     age: 18,
          //     address: 'New York No. 1 Lake Park',
          //     date: '2016-10-03'
          // },
      ],
      AvaliList:{
        isHost: "主机",
        pattern: "主备",
        HA: null,
        action: "true"
      },
      sysCfg: {
        input: 0,
        switch: true
      },
      webSocket: null,
      text: {},
      // columns1: [
      //     {title : "系统名称/版本",width: "150px",key : "name",minWidth:10},
      //     {title : "ViGap安全隔离与信息单向导入系统/3.2.20.5",key : "val",minWidth:10}
      // ],
      // sysInfoData: [
      //     {name: "系统版本",val: "1.0.5.1_38[数据库] / 1.0.1.5[文件] / 1.0.1.5[监控]"},
      //     {name: "运行时长",val: "3天20时55分58秒"},
      //     {name: "最后更改配置时间",val: "2019-12-09 15:10:29"}
      // ],
      randomMovieList: [
        // { title: "系统名称：", content: "ViGap安全隔离与信息单向导入系统" },
        // {
        //   title: "同步程序版本：",
        //   content: "1.0.5.1_38 (数据库) | 1.0.1.5 (文件)"
        // },
        // { title: "运行时长：", content: "3天20时55分58秒" },
        // { title: "更新配置时间：", content: "2020-10-21 10:10:29" },
        { title: "型号", content: "ViGap安全隔离与信息单向导入系统" },
        { title: "版本", content: "1.0.5.1_38 (数据库) | 1.0.1.5 (文件)"},
        { title: "内部版本识别", content: "3天20时55分58秒" },
        
      ],
      randomMovieList1:[
        { title: "运行时长：", content: "2020-10-21 10:10:29" },
        { title: "配置时间", content: "3天20时55分58秒" },
        { title: "授权信息", content: "2020-10-21 10:10:29" },
      ],
      sysInfo: {
        mapping: {
          name: "系统名称",
          version: "版本",
          state: "开启状态",
          registerTime: "注册时间",
          startupTime: "启动时间"
        },
        values: {
          name: "伟思信安集中监控平台",
          version: "V3.0.4",
          state: "开启",
          registerTime: "2019-06-26 10:00",
          startupTime: "2019-06-26 8:00"
        }
      },
      dflt: {
        min: 0,
        max: 200,
        // donut: true,
        // gaugeWidthScale: 0.6,
        counter: true,
        hideInnerShadow: true
      }
    };
  },
  mounted() {
    this.getipfindLinkIp()
    this.getSystemMessage()
    this.getAvailMessage()
    this.connWebSocket();
    var g1 = this.$refs.g1.draw({
      id: "g1",
      // value: 125,
      // title: 'javascript call',
      // defaults: this.dflt
      value: 1,
      min: 0,
      max: 100,
      title: "CPU使用率",
      label: "%"
    });
    var g2 = this.$refs.g2.draw({
      id: "g2",
      value: 1,
      min: 0,
      max: 100,
      title: "内存使用率",
      label: "%"
    });
    var g3 = this.$refs.g3.draw({
      id: "g3",
      value: 1,
      min: 0,
      max: 100,
      title: "磁盘使用率",
      label: "%"
    });
  },
  methods: {
    quick (e) {
      this.$router.push({ path: e });
      Utils.$emit('demo1',e);
    },
    getipfindLinkIp(){
      this.$https.fetchPost(this.$api.sys.ipfindLinkIp.url).then((resp) => {
        if (resp.data.status == 200) {
          for(let i in resp.data.data){
            this.data1.push(resp.data.data[i])
          }
          this.data1.reverse()
          console.log(this.data1)
        }
        }).catch((error) => {
            console.log(error);
        });
    },
    getAvailMessage(){
      this.$https.fetchGet(this.$api.sys.getIndexData.url).then((resp) => {
        if (resp.data.status == 200) {
          this.AvaliList = resp.data.data
          if(this.AvaliList.isHost == "主机"){
            this.isHost = true
          }
        }
        }).catch((error)=> {
            console.log(error);
        });
    },
    getSystemMessage(){
      this.$https.fetchPost(this.$api.sys.getSystemMessage.url).then((resp) => {
        if (resp.data.status == 200) {
          let data = resp.data.data          
          let list = data.dbsyncVersion +'(数据库) | ' + data.fileSyncVersion + '(文件)'
          let licenseInfo = ''
          if(data.licenseInfo.type == '正式版'){
            licenseInfo = data.licenseInfo.type
          }else{
            licenseInfo = data.licenseInfo.type+data.licenseInfo.data+'天'
          }
          
          this.$set(this.randomMovieList[0],"content",data.type)
          this.$set(this.randomMovieList[1],"content",data.version)
          this.$set(this.randomMovieList[2],"content",list)
          this.$set(this.randomMovieList1[0],"content",data.systemRunTime)
          this.$set(this.randomMovieList1[1],"content",data.configurationTime)
          this.$set(this.randomMovieList1[2],"content",licenseInfo)
        }
        }).catch((error) => {
            console.log(error);
        });
    },
    connWebSocket() {
      let url = null;
      if(this.$https.getAxiosBaseurl() == "/") {url = "wss://"+window.location.host+"/websocket";}
      else {
          let str = this.$https.getAxiosBaseurl()
          let index = str .lastIndexOf("/")
          str =str .substring(index+1,str.length);
          url = "wss://"+str+"/websocket";
      }
      let webSocket = new WebSocket(url);
      this.webSocket = webSocket;

      webSocket.onmessage = this.$options.methods.onmessage.bind(this);
      webSocket.onopen = e => {
        console.log("建立连接", e);
      };
      webSocket.onerror = e => console.log("连接异常", e);
      webSocket.onclose = e => {
        console.log("连接关闭", e);
      };
    },
    closeWebSocket() {
      if (this.webSocket != null) this.webSocket.close();
    },
    onmessage(e) {
      let data = JSON.parse(e.data);
      this.$refs.g1.refresh(data.cpu);
      data.mem = data.mem.substr(1);
      data.mem = data.mem.substr(0, data.mem.length - 1);
      var arrs = new Array(); //定义一数组
      arrs = data.mem.split(","); //字符分割
      // console.log(arrs)
      this.$refs.g2.refresh(((arrs[0] - arrs[1]) / arrs[0]) * 100);
      this.$refs.g3.refresh(data.disk);
      // let arr = []
      // arr.push(data)
      this.text = data;
      //   this.scrollBottom();
    },
    send() {
      let data = {
        instruct: this.model1,
        param: this.value
      };
      this.webSocket.send(JSON.stringify(data));
    },
    scrollBottom() {
      this.$nextTick(function() {
        // let div = document.getElementById("asd");
        // div.scrollTop = div.scrollHeight;
      });
    }
  },
  beforeDestroy() {
    this.closeWebSocket();
  }
};
</script>
<style scoped lang="less">
@import "../../assets/css/bootstrap.min.css";
@import "../../assets/css/animate.css";
@import "../../assets/css/dev-register.css";
/*@import "../../assets/css/index.css";*/
@import "../../assets/css/multiple-select.css";
@import "../../assets/css/omas-basic.css";

#g1,
#g2,
#g3 {
  width: 30%;
  float: left;
  margin-right: 15px;
}
/*.content{*/
/*    font-size: .875rem;*/
/*    position: relative;*/
/*    width: 96%;*/
/*    margin: 12px auto 30px;*/
/*}*/
.box {
  font-size: 0.875rem;
  position: relative;
  /*margin-bottom: 30px;*/
  background-color: white;
  padding: 10px 20px 20px 20px;
  border: solid 1px #e9e9e9;
  box-shadow: 1px 12px 12px 0 #dcdcdc;
  table {
    //border: solid 1px black;
    td,
    th {
      padding: 12px 10px 12px 50px;
    }
  }
}

@deep: ~">>>";
@{deep} .ivu-tabs-bar {
  border-bottom: none;
  margin: 14px 0;
  margin-bottom: 14px;
}
@{deep} .ivu-tabs-nav {
  font-size: 1em;
  background-color: #e5e5e5;
  border-radius: 5px;

  padding-left: 0;
  margin: 0;
  float: left;
  list-style: none;
  box-sizing: border-box;
  position: relative;
  transition: transform 0.5s ease-in-out;
}
@{deep} .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab {
  margin: 0;
  margin-right: 0;
  height: auto;
  padding: 3px 16px;
  vertical-align: middle;
  border: none;
  border-bottom: 0;
  border-radius: 6%;
  transition: all 0.3s ease-in-out;
  background: transparent;
  &:hover {
    color: white;
    border-radius: 6%;
    background-color: #ff6600;
  }
}
@{deep} .ivu-tabs.ivu-tabs-card > .ivu-tabs-bar .ivu-tabs-tab-active {
  color: white;
  border: none;
  border-radius: 6%;
  background-color: #ff6600;
}


.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 12px;
  }

  .card-panel {
    height: 98px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 6px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        text-align:center;
        margin-top:5px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 22px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
/deep/ .ivu-card-head {
    border-bottom: 1px solid #e8eaec;
    padding: 10px 16px 2px;
    line-height: 1;
    background:#f3f3f4;
}
/deep/ .ivu-card-bordered {
    border: 2px solid #dcdee2;
    border-color: #e8eaec;
}
.card1 :hover{
  .card-panel{
     cursor:pointer ;
     background:#40c9c6;
     background:#ea6130;
  }
}
.card2 :hover{
  .card-panel{
     cursor:pointer ;
     background:#36a3f7;
     background:#ea6130;
  }
}
.card3 :hover{
  .card-panel{
     cursor:pointer ;
     background:#ea6130;
  }
}
.card4 :hover{
  .card-panel{
     cursor:pointer ;
     background:#96b9e3;
     background:#ea6130;
  }
}
/deep/ .ivu-table th {
    height: 25px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #f8f8f9;
}
/deep/ .ivu-table td, .ivu-table th {
    min-width: 0;
    height: 24px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    text-overflow: ellipsis;
    vertical-align: middle;
    border-bottom: 1px solid #e8eaec;
}
</style>
