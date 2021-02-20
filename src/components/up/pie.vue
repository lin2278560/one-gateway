<template>

    <div class="pie" :id="id" style="border:solid 1px black;width: 100%"/>

</template>
<script>

    export default {
        props: {
            id: {type: String},
            option: {type: Object}
        },
        mounted(){
            this.chart();
        },
        methods: {
            chart(){
                let pie = this.$echarts.init(document.getElementById(this.id))
                // 绘制图表
                let option = {
                    title: {text: '使用echarts'},
                    xAxis: {
                        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                };
                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['系统操作日志', '权限认证日志', '配置管理日志', '服务访问日志', '服务认证日志', '非法阻断日志', '服务配置日志'],
                        type: 'scroll',
                        //width:'80%',
                        y:'bottom',
                        show:false
                    },
                    grid: {
                       /* left: '0',
                        right: '0',*/
                       top:0,
                        bottom:0,
                        left:0,
                        right:0,

                        //y:'center',
                        //containLabel: true
                    },
                    xAxis: {
                        show:false,
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: [{  show:false,type: 'value'}],
                    series: [

                        {
                            name:'系统操作日志',
                            type:'line',smooth: true,
                            stack: '总量',
                            areaStyle: {},
                            data:[120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name:'权限认证日志',
                            type:'line',smooth: true,
                            stack: '总量',
                            areaStyle: {},
                            data:[220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name:'配置管理日志',
                            type:'line',smooth: true,
                            stack: '总量',
                            areaStyle: {},
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'服务访问日志',smooth: true,
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'非法阻断日志',smooth: true,
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'服务配置日志',smooth: true,
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'服务认证日志',smooth: true,
                            type:'line',
                            stack: '总量',
                            areaStyle: {normal: {}},
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        }

                        /*{
                            name: '系统操作日志',
                            type: 'line', smooth: true,
                            data: [320, 332, 301, 334, 390, 330, 320]
                        }, {
                            name: '权限认证日志',
                            type: 'line', smooth: true,
                            data: [640, 530, 234, 834, 655, 560, 903]
                        },
                        {
                            name: '配置管理日志',
                            type: 'line', smooth: true,
                            data: [93, 23, 12, 24, 31, 62, 45]
                        }, {
                            name: '服务访问日志',
                            type: 'line', smooth: true,
                            data: [224, 420, 420, 912, 1023, 612, 232]
                        }, {
                            name: '服务认证日志',
                            type: 'line', smooth: true,
                            data: [726, 152, 82, 155, 400, 211, 703]
                        }, {
                            name: '非法阻断日志',
                            type: 'line', smooth: true,
                            data: [42, 21, 4, 3, 9, 0, 0]
                        }, {
                            name: '服务配置日志',
                            type: 'line', smooth: true,
                            data: [23, 12, 24, 12, 12, 4, 0]
                        }*/
                        //'服务认证日志', '非法阻断日志', '服务配置日志'
                    ]
                };

                option = {
                    legend: {},
                    tooltip: {
                        trigger: 'axis',
                        showContent: false,
                        axisPointer:{
                            type: 'shadow',
                        }
                    },
                    dataset: {
                        source: [
                            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                            ['Matcha Latte', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                            ['Milk Tea', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                        ]
                    },
                    xAxis: {type: 'category'},
                    yAxis: {gridIndex: 0},
                    grid: {top: '55%'},
                    series: [
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                        {
                            type: 'pie',
                            id: 'pie',
                            radius: '30%',
                            center: ['50%', '25%'],
                            label: {
                                formatter: '{b}: {@2012} ({d}%)'
                            },
                            encode: {
                                itemName: 'product',
                                value: '2012',
                                tooltip: '2012'
                            }
                        }
                    ]
                };

                pie.on('updateAxisPointer', function (event) {
                    var xAxisInfo = event.axesInfo[0];
                    if (xAxisInfo) {
                        var dimension = xAxisInfo.value + 1;
                        pie.setOption({
                            series: {
                                id: 'pie',
                                label: {
                                    formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                                },
                                encode: {
                                    value: dimension,
                                    tooltip: dimension
                                }
                            }
                        });
                    }
                });


                pie.setOption(option);
            }

        }
    }


</script>
<style scoped>
    .pie {
        height: 100%;
        width: 100%;
    }

</style>
