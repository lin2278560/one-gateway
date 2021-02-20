<template>
  <div class="Echarts">
    <div id="main" style="width: 100%;height:550px;font-size: 12px;"></div>
  </div>
</template>

<script>
export default {
  props: {
    text: Object
  },
  name: "Echarts",
  data() {
    return {
      option: {},
      arr: [],
      i: 0,
      yAxis: "",
      yAxis1:'',
      times: [],
      index:0,
      last:{},
      timestamp:'',
      num1:0,
      num:0,
      num3:0,
      num4:0,
    };
  },
  methods: {
    setOption(data) {
      let timestamp = data.date
      let time = this.$util.time_stamp2time_date(new Date()).format("hh:mm:ss");
      this.times.push(time);
      this.arr.push(data)
      if (this.times.length >= 30) {
        this.i = 28;
        this.times.shift();
      }
      if (this.arr.length >= 30) {
        this.arr.shift()
        this.option.series[0].data.splice(0,1)
        this.option.series[1].data.splice(0,1)
        }
      // console.log(this.arr[this.i].flow[2].bytesRecv)
      if (this.i != 0) {
        var num = 0 
        var num1 = 0 
        var num3= 0 
        var num4 = 0 
        for(let index in this.arr[this.i].flow){
            num = num + this.arr[this.i].flow[index].bytesSend
        }
        for(let index in this.arr[this.i - 1].flow){
           num1 = num1 + this.arr[this.i - 1].flow[index].bytesSend
        }
        let num2 = (num - num1) /3;
        // let num2 = (num - num1) /(timestamp - this.timestamp);
        num2 = num2.toFixed(2)
        this.option.series[0].data.push(num2);
        for(let index in this.arr[this.i].flow){
           num3 = num3 + this.arr[this.i].flow[index].bytesRecv
        }
        for(let index in this.arr[this.i - 1].flow){
           num4 = num4 + this.arr[this.i - 1].flow[index].bytesRecv
        }
        // let num5 = (num3 - num4) /(timestamp - this.timestamp);
        let num5 = (num3 - num4) /3;
        // console.log(num,num1)
        this.timestamp = timestamp;
        num5 = num5.toFixed(2)
        this.option.series[1].data.push(num5);
        this.$set(this.option.xAxis[0], "data", this.times);
        this.$set(this.option.xAxis[1], "data", this.times);
        var myChart = this.$echarts.init(document.getElementById("main"));
        myChart.setOption(this.option);
      }
    },
    myEcharts(times = []) {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("main"));
      //   let time = this.$util
      //     .time_stamp2time_date(this.data[this.i].time)
      //     .format("hh:mm:ss");
      //   this.times.push(time);
      //   var timeData = [
      //     "0:00",
      //     "1:00",
      //     "2:00",
      //     "3:00",
      //     "4:00",
      //     "5:00",
      //     "6:00",
      //     "7:00",
      //     "8:00",
      //     "9:00",
      //     "10:00",
      //     "11:00",
      //     "12:00",
      //     "13:00",
      //     "14:00",
      //     "15:00",
      //     "16:00",
      //     "17:00",
      //     "18:00",
      //     "19:00",
      //     "20:00",
      //     "21:00",
      //     "22:00",
      //     "23:00"
      //   ];

      // timeData = timeData.map(function (str) {
      //     return str.replace('2009/', '');
      // });

      // 指定图表的配置项和数据
      this.option = {
        title: {
          // text: '雨量流量关系图',
          subtext: "上下行流量统计图",
          left: "center"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false
          },
        formatter(params) {
            const item = params[0];
            let KB = 1024;
            let MB = 1048576;
            let GB = 1073741824;
            let TB = 1099511627776;
            if (item.data < KB) item.data = item.data + "/B";
            else if (item.data >= KB && item.data < MB)
              item.data = (item.data / KB).toFixed(2) + "/KB";
            else if (item.data >= MB && item.data < GB)
              item.data = (item.data / MB).toFixed(2) + "/MB";
            else if (item.data >= GB && item.data < TB)
              item.data = (item.data / GB).toFixed(2) + "/GB";
            else if (item.data >= TB) item.data = (item.data / TB).toFixed(2) + "/TB";
            return item.data;
            },
        },
        legend: {
          data: ["上行流量", "下行流量"],
          left: 10
        },
        toolbox: {
          show :false,
          feature: {
            dataZoom: {
              yAxisIndex: "none"
            },
            restore: {},
            saveAsImage: {}
          }
        },
        axisPointer: {
          link: { xAxisIndex: "all" }
        },
        dataZoom: [
          // {
          //     show: true,
          //     realtime: true,
          //     start: 30,
          //     end: 70,
          //     xAxisIndex: [0, 1]
          // },
          // {
          //     type: 'inside',
          //     realtime: true,
          //     start: 30,
          //     end: 70,
          //     xAxisIndex: [0, 1]
          // }
        ],
        grid: [
          {
            left: 50,
            right: 50,
            height: "25%"
          },
          {
            left: 50,
            right: 50,
            top: "45%",
            height: "25%"
          }
        ],
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: true },
            data: times
          },
          {
            gridIndex: 1,
            type: "category",
            boundaryGap: false,
            axisLine: { onZero: true },
            data: times,
            position: "top"
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function(yAxis) {
                let KB = 1024;
                let MB = 1048576;
                let GB = 1073741824;
                let TB = 1099511627776;
                if (yAxis < KB) yAxis = yAxis + "/B";
                else if (yAxis >= KB && yAxis < MB)
                  yAxis = (yAxis / KB).toFixed(1) + "/KB";
                else if (yAxis >= MB && yAxis < GB)
                  yAxis = (yAxis / MB).toFixed(1) + "/MB";
                else if (yAxis >= GB && yAxis < TB)
                  yAxis = (yAxis / GB).toFixed(1) + "/GB";
                else if (yAxis >= TB) yAxis = (yAxis / TB).toFixed(1) + "/TB";
                return yAxis;
              }
            }
          },
          {
            gridIndex: 1,
            type: "value",
            axisLabel: {
              formatter: function(yAxis1) {
                let KB = 1024;
                let MB = 1048576;
                let GB = 1073741824;
                let TB = 1099511627776;
                if (yAxis1 < KB) yAxis1 = yAxis1 + "/B";
                else if (yAxis1 >= KB && yAxis1 < MB)
                  yAxis1 = (yAxis1 / KB).toFixed(1) + "/KB";
                else if (yAxis1 >= MB && yAxis1 < GB)
                  yAxis1 = (yAxis1 / MB).toFixed(1) + "/MB";
                else if (yAxis1 >= GB && yAxis1 < TB)
                  yAxis1 = (yAxis1 / GB).toFixed(1) + "/GB";
                else if (yAxis1 >= TB) yAxis1 = (yAxis1 / TB).toFixed(1) + "/TB";
                return yAxis1;
              }
            },
            inverse: true
          }
        ],
        series: [
          {
            name: "上行流量",
            type: "line",
            symbolSize: 8,
            hoverAnimation: false,
            data: []
          },
          {
            name: "下行流量",
            type: "line",
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: []
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(this.option);
    }
  },
  mounted() {
    this.myEcharts();
  },
  watch: {
    text(newVal, oldVal) {
      this.data = _.cloneDeep(newVal);
      if (this.i == 0) {
        this.myEcharts(newVal);
      }
      this.setOption(this.data);
      this.i++;
      //   if (this.i != 0) {
      //     console.log(this.data, "data");
      //     let num =
      //       this.data[this.i].flow[0].bytesSend +
      //       this.data[this.i].flow[1].bytesSend +
      //       this.data[this.i].flow[2].bytesSend +
      //       this.data[this.i].flow[3].bytesSend;
      //     let num1 =
      //       this.data[this.i - 1].flow[0].bytesSend +
      //       this.data[this.i - 1].flow[1].bytesSend +
      //       this.data[this.i - 1].flow[2].bytesSend +
      //       this.data[this.i - 1].flow[3].bytesSend;
      //     let num2 =
      //       (num - num1) /
      //       (this.data[this.i].date - this.data[this.i - 1].date) /
      //       1048576;
      //     num2 = parseInt(num2);
      //     this.option.series[0].data.push(num2);
      //     var myChart = this.$echarts.init(document.getElementById("main"));
      //     myChart.setOption(this.option);
      //     console.log(this.option.series[0]);
      //     console.log(newVal, "这里是监听"); //这个参数就是传来的所有值
      //   }
      //   this.i++;
      //   if (this.data.length >= 13) {
      //     this.data.shift();
      //     this.i = 11;
      //   }
      //   if (this.times.length >= 13) {
      //     this.times.shift();
      //   }
      //   if (this.option.series[0].data.length >= 13) {
      //     this.option.series[0].data.shift();
      //   }
    }
  }
};
</script>

<style></style>
