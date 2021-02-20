<template>
  <div class="container-fluid">
    
    <Row :gutter="16" class="panel-group">
      <Col span="6">
        <Card class="card1">
          <div style="height:150px;background:#3c9cf2;text-align:center;color:white;border-radius:3px;">
            <div style="color:white;padding-top:20px;font-size:16px;">业务统计量</div>
            <div style="font-size:48px;color:white! important;margin-bottom:5px;">{{Task}}</div>
            <div class="hoverShd" style="height:35px;background:rgba(0,0,0,.4);color:#DDD;line-height:35px;padding-left:15px;">
            </div>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card class="card2">
          <div style="height:150px;background:#677ce7;text-align:center;color:white;border-radius:3px;">
            <div style="color:white;padding-top:20px;font-size:16px;">文件同步总量</div>
            <div style="font-size:48px;color:white! important;margin-bottom:5px;">{{fileCount}}</div>
            <div class="hoverShd" style="height:35px;background:rgba(0,0,0,.4);color:#DDD;line-height:35px;padding-left:15px;">
            今日同步量：{{filedateCount}}
            </div>
          </div>
        </Card>
      </Col>
      <Col span="6">
        <Card class="card3">
          <div style="height:150px;background:#5dc76b;text-align:center;color:white;border-radius:3px;">
            <div style="color:white;padding-top:20px;font-size:16px;">数据库同步总量</div>
            <div style="font-size:48px;color:white! important;margin-bottom:5px;">{{dbCount}}</div>
            <div class="hoverShd" style="height:35px;background:rgba(0,0,0,.4);color:#DDD;line-height:35px;padding-left:15px;">
            今日同步量：{{dbdateCount}}
            </div>
          </div>
        </Card>
      </Col>
      <Col span="6" >
        <Card class="card4">
          <div style="height:150px;background:#f19736;text-align:center;color:white;border-radius:3px;">
            <div style="color:white;padding-top:20px;font-size:16px;">告警日志</div>
            <div style="font-size:48px;color:white! important;margin-bottom:5px;">{{ warnningdata }}</div>
            <div class="hoverShd" style="height:35px;background:rgba(0,0,0,.4);color:#DDD;line-height:35px;padding-left:15px;">
            </div>
          </div>
        </Card>
      </Col>
    </Row>

    <div class="row box margin-x clear-margin padding-x" style="width: 100%;float: left;">
      <div class="modal-header " style="border-bottom: 1px solid #a9a9a9;">
        <blockquote style="padding: 0; margin: 0; border: none;color: #000;font-size: 14px;">
          事件信息
        </blockquote>
      </div>
      <div class="modal-body">
        <contrastLine :text="text"></contrastLine>
      </div>
    </div>
  </div>
</template>
<script>
// import JustGage from "../../assets/js/justgage.js";
import contrastLine from "../../components/chart/contrastLine2";
export default {
  name: "SysBusinessMonitoring",
  components: { contrastLine },
  inject: ["reload"],
  data() {
    return {
      switchValue:false,
      columns1: [
          {   
              align: 'center',
              title: '接口',
              key: 'name'
          },
          {   
              align: 'center',
              title: '物理口',
              key: 'age'
          },
          {   
              align: 'center',
              title: 'IP地址',
              key: 'address'
          },
          {   
              align: 'center',
              title: '启用状态',
              key: 'address'
          },
          {   
              align: 'center',
              title: '链路状态',
              key: 'address'
          },
      ],
      data1: [
          {
              name: 'John Brown',
              age: 18,
              address: 'New York No. 1 Lake Park',
              date: '2016-10-03'
          },
      ],
      sysCfg: {
        input: 0,
        switch: true
      },
      webSocket: null,
      text: {},
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
        { title: "配置信息", content: "3天20时55分58秒" },
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
        counter: true,
        hideInnerShadow: true
      },
      warnningdata:'0',
      Task:'0',
      fileCount:'0',
      fliedateCount:'0',
      dbCount:'0',
      dbdateCount:'0',
      filedateCount:'0'
    };
  },
  mounted() {
    this.getwarnningLogcount()
    this.getdbtaskcount()
    this.getextractInfocount()
    this.getfileOperStatuscount()
    this.connWebSocket();
  },
  methods: {
    //数据库
    getextractInfocount(){
      this.$https.fetchPost(this.$api.sys.extractInfocount.url).then((resp) => {
        if (resp.data.status == 200) {
          this.dbCount = resp.data.data.count
          this.dbdateCount = resp.data.data.dateCount
        }
        }).catch(function (error) {
            console.log(error);
        });
    },

    getwarnningLogcount(){
      this.$https.fetchPost(this.$api.sys.warnningLogcount.url).then((resp) => {
        if (resp.data.status == 200) {
          this.warnningdata = resp.data.data
        }
        }).catch(function (error) {
            console.log(error);
        });
    },
    //业务
    getdbtaskcount(){
      this.$https.fetchPost(this.$api.sys.dbtaskcount.url).then((resp) => {
        if (resp.data.status == 200) {
          this.Task = resp.data.data.dbTask + resp.data.data.fileTask
        }
        }).catch(function (error) {
            console.log(error);
        });
    },
    getfileOperStatuscount(){
      this.$https.fetchPost(this.$api.sys.fileOperStatuscount.url).then((resp) => {
        if (resp.data.status == 200) {
          this.fileCount = resp.data.data.count
          this.filedateCount = resp.data.data.dateCount
        }
        }).catch(function (error) {
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
      // this.$refs.g1.refresh(data.cpu);
      data.mem = data.mem.substr(1);
      data.mem = data.mem.substr(0, data.mem.length - 1);
      var arrs = new Array(); //定义一数组
      arrs = data.mem.split(","); //字符分割
      // console.log(arrs)
      // this.$refs.g2.refresh(((arrs[0] - arrs[1]) / arrs[0]) * 100);
      // this.$refs.g3.refresh(data.disk);
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
    height: 108px;
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
        background: #34bfa3
      }

      .icon-shopping {
        background: #f4516c;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #34bfa3
    }

    .icon-shopping {
      color: #f4516c;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
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
    padding: 6px 16px;
    line-height: 1;
    background:#f3f3f4;
}
.card1 :hover{
  .hoverShd{
     background:rgba(0,0,0,.5) !important;
     color:#fff !important;
  }
}
.card2 :hover{
  .hoverShd{
     background:rgba(0,0,0,.5) !important;
     color:#fff !important;
  }
}
.card3 :hover{
  .hoverShd{
    background:rgba(0,0,0,.5) !important;
     color:#fff !important;
  }
}
.card4 :hover{
  .hoverShd{
     background:rgba(0,0,0,.5) !important;
     color:#fff !important;
  }
}
/deep/ .ivu-card-body {
    padding: 0px; 
}
</style>
