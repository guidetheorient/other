//page2
var deburringChart = echarts.init($('#deburringRatio')[0]);
option30 = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
            radius: '85%',
            axisLine: {
                lineStyle: {
                    color: [[0.2, '#FF8C69'], [0.8, '#4169E1'], [1, '#00CD66']],
                    width: 10,                                                                                     //宽度要自适应
                }
            },
            splitLine: {
                length: 15,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                width: 5,
                length: '75%',
            },
            title: {
                offsetCenter: [0, '90%'],
                textStyle: {
                    color: '#A3A3A3',
                    fontFamily: 'Vernada',
                    fontSize: 20,
                }
            },
            name: '去毛刺',
            type: 'gauge',
            detail: { 
                formatter: '{value}%',
                textStyle:{
                    fontSize:22,
                }
             },
            data: [{ value: 50, name: '合格率' }]
        }
    ]
};
setInterval(function () {
    option30.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    deburringChart.setOption(option30, true);
}, 2000);
deburringChart.setOption(option30);

var millingChart = echarts.init($('#millingRatio')[0]);
option31 = {
    tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
    },
    series: [
        {
            radius: '85%',
            axisLine: {
                lineStyle: {
                    color: [[0.2, '#FF8C69'], [0.8, '#4169E1'], [1, '#00CD66']],
                    width: 10,
                }
            },
            splitLine: {
                length: 15,
            },
            axisLabel: {
                show: false,
            },
            pointer: {
                width: 5,
                length: '75%',
            },
            title: {
                offsetCenter: [0, '90%'],
                textStyle: {
                    color: '#A3A3A3',
                    fontFamily: 'Vernada',
                    fontSize: 20,
                }
            },
            name: '铣削',
            type: 'gauge',
            detail: { formatter: '{value}%',textStyle:{
                    fontSize:22,
                } },
            data: [{ value: 50, name: '什么率' }]
        }
    ]
};
setInterval(function () {
    option31.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
    millingChart.setOption(option31, true);
}, 2000);
millingChart.setOption(option31);

var OEE_bar = echarts.init(document.getElementById('OEE_bar_chart'));
	option32 = {
		grid:{
			bottom:'10%',
			width:'90%',
		},
		legend: {
			data: ['OEE'],
            show:false,
			right:0,
			top:10,
			textStyle:{
				color: '#fff',
				fontSize: '15',
			}
		},
		xAxis: [{
            show:false,
			type: 'category',
			boundaryGap: true,
			axisTick:{                      
				interval:0,							//隔几个显示一个刻度
			},
			axisLine: {								//坐标轴的样式					
                lineStyle: {
                    color: '#fff',
                },
            },
            axisLabel: {                            //data样式，why？
                show: true,
                textStyle: {
                    color: '#fff',
                    fontSize: '14',
                    align:'center',
                  	fontFamily: "Segoe UI Light",
                }
            },
            nameTextStyle: {						//坐标轴名称的文字样式
                color: '#fff',
                fontFamily: '微软雅黑',
                fontSize: '15',
                },
			data: (function() {
				var now = new Date();
				var res = [];
				var len = 10;
				while(len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
		}, ],
		yAxis: [{
            show:false,
			type: 'value',
			scale: true,
			max: 100,
			min: 0,
			boundaryGap: [0.2, 0.2],
			axisLine: {
                lineStyle: {
                    color: '#fff',
                },
            },
            name:'百分比',
            nameTextStyle: {
                color: '#fff',
                fontFamily: '微软雅黑',
                fontSize: '16',
            },
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: '16',
                }
            },splitLine:{
                show:false,
            }
		}, ],
 		series: [{
            symbolSize:8,
            showAllSymbol:true,
			name: 'OEE',
			type: 'line',
			barGap:'0%',
			itemStyle: {
                normal: {
                    color: '#fff',
                }
            },
			data: (function() {
				var res = [];
				var len = 0;
				while(len < 10) {
					res.push((Math.random() * 30 + 70).toFixed(2));
					len++;
				}
				return res;
			})()
		}
		]
	};
	setInterval(function() {
		axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

		var data0 = option32.series[0].data;
		data0.shift();
        var yAxisData = (Math.random() * 30 + 70).toFixed(2)
		data0.push(yAxisData);
		option32.xAxis[0].data.shift();
		option32.xAxis[0].data.push(axisData);
        //OEE chart数值显示
        $OEEBarTitleValue.text(yAxisData+'%')
		OEE_bar.setOption(option32);
	}, 2100);

	OEE_bar.setOption(option32);

    var production = echarts.init(document.getElementById('production'));
	option33 = {
		grid:{
			bottom:'12%',
			width:'91%',
            y2:'40%',
		},
		legend: {
			data: ['合格品','总产量'],
			right:0,
			top:10,
			textStyle:{
				color: '#fff',
				fontSize: '15',
			}
		},
		xAxis: [{
			type: 'category',
			boundaryGap: true,
		  	axisLine: {								//坐标轴的样式					
                lineStyle: {
                    color: '#fff',
                },
            },
            axisLabel: {                            //data样式，why？
                show: true,
                interval:1,                         //这个移动设备要重新设置
                textStyle: {
                    color: '#fff',
                    fontSize: '14',
                  	align:'center',
                  	fontFamily: "Segoe UI Light",
                }
            },
            nameTextStyle: {						//坐标轴名称的文字样式
                color: '#BEBEBE	',
                fontFamily: 'Vernada',
                fontSize: '14',
                },
			data: (function() {
				var now = new Date();
				var res = [];
				var len = 10;
				while(len--) {
					res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
					now = new Date(now - 2000);
				}
				return res;
			})()
		}, ],
		yAxis: [{
         splitLine: {
             show:false,
         },
			type: 'value',
			scale: true,
			max: 15,
			min: 0,
			boundaryGap: [0.2, 0.2],
			axisLine: {
                lineStyle: {
                    color: '#fff',
                },
            },
            nameTextStyle: {
                color: '#fff',
                fontFamily: 'Vernada',
                fontSize: '15',
            },
           
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: '14',
                }
            }
		}, ],
		series: [{
			name: '合格品',
			type: 'bar',
			barWidth:'20%',
			itemStyle: {
                normal: {
                    color: '#f5e8c8',
                    barBorderRadius:5,
                }
            },
			data: (function() {
				var res = [];
				var len = 0;
				while(len < 10) {
					res.push((Math.random() * 10 + 5).toFixed(1) - 0);
					len++;
				}
				return res;
			})()
		},{
			name: '总产量',
			type: 'bar',
			barWidth:'20%',
			barGap:'-2%',
			itemStyle: {
                normal: {
                    color: '#fff',
                    barBorderRadius:5,
                }
            },
			data: (function() {
				var res = [];
				var len = 0;
				while(len < 10) {
					res.push((Math.random() * 10 + 5).toFixed(1) - 0);
					len++;
				}
				return res;
			})()
		}]
	};
	setInterval(function() {
		axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');

		var data0 = option33.series[0].data;
		data0.shift();
		data0.push((Math.random() * 10 + 5).toFixed(1) - 0);

		option33.xAxis[0].data.shift();
		option33.xAxis[0].data.push(axisData);

		production.setOption(option33);
	}, 2100);

	production.setOption(option33);
    

    //   var XbarChart1 = echarts.init($('#Xbar-chart1')[0])
    //   option21 = {
    //     grid: {
    //       width: '100%',
    //       y2: '40%',
    //     },
    //     tooltip: {
    //       trigger: 'axis'
    //     },
    //     dataZoom: {
    //       show: false,
    //       start: 0,
    //       end: 100
    //     },
    //     xAxis: [{
    //       splitLine: {
    //         show: false,
    //       },
    //       type: 'category',
    //       boundaryGap: true,
    //       data: ['小明', '小赵', '小钱', '小孙', '小李', '小周', '小吴']
    //     }, ],
    //     yAxis: [{
    //       splitLine: {
    //         show: false,
    //       },
    //       type: 'value',
    //       scale: true,
    //       name: '尺寸1',
    //       max: 0.5,
    //       min: -0.5,
    //       boundaryGap: [0.2, 0.2]
    //     }, ],
    //     series: [{
    //       itemStyle: {   //柱图颜色
    //           normal: {
    //             color: '#4682B4',
    //           }
    //         },
    //       showAllSymbol: true,
    //       markLine: {
    //         symbolSize: 0,
    //         itemStyle: {
    //           normal: {
    //             lineStyle: {
    //               type: 'solid',
    //               color: '#000000'
    //             },
    //             label: {
    //               show: false,
    //               position: 'middle'
    //             }
    //           }
    //         },
    //         data: [{
    //             name: 'Y 轴值为 0.5 的水平线',
    //             yAxis: 0.5
    //           },
    //           {
    //             name: 'Y 轴值为 -0.5 的水平线',
    //             yAxis: -0.5
    //           },
    //         ],
    //       },
    //       name: '最新成交价',
    //       type: 'line',
    //       data: (function () {
    //         var res = [];
    //         var len = 0;
    //         while (len < 10) {
    //           res.push((Math.random() * 0.8 - 0.4).toFixed(1));
    //           len++;
    //         }
    //         return res;
    //       })()
    //     }]
    //   };
    //   XbarChart1.setOption(option21);

//page1
var finishedOrderChart = echarts.init(document.getElementById('finished-order'));
  option5 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
      center: ['50%', '35%'],
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [
            [1, '#4169E1']
          ],
          width: 12,
        }
      },
      startAngle: [370],
      endAngle: [60],
      pointer: {
        show: false,
      },
      splitLine: {
        length: 15,
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },

      title: {
        offsetCenter: [0, '150%'],
        textStyle: {
          color: '#A3A3A3',
          fontFamily: 'Vernada',
          fontSize: 25,
        }
      },
      name: '已完成订单',
      type: 'gauge',
      detail: {
        formatter: '{value}',
        offsetCenter: [0, '-5%'],
      },
      data: [{
        value: 5,
        name: '已完成订单'
      }]
    }]
  };
  setInterval(function () {
    option5.series[0].data[0].value++;
    finishedOrderChart.setOption(option5, true);
  }, 60000);
  finishedOrderChart.setOption(option5);
var unfinishedOrderChart = echarts.init(document.getElementById('unfinished-order'));
  option6 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
      center: ['50%', '35%'], //控制图表在画布中的位置，guage是用不了grid的left
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [
            [1, '#FF8C69']
          ],
          width: 12,
        }
      },
      startAngle: [370],
      endAngle: [60],
      pointer: {
        show: false,
      },
      splitLine: {
        length: 15,
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      title: {
        offsetCenter: [0, '150%'],
        textStyle: {
          color: '#A3A3A3',
          fontFamily: 'Vernada',
          fontSize: 25,
        }
      },
      name: '未完成订单',
      type: 'gauge',
      detail: {
        formatter: '{value}',
        offsetCenter: [0, '-5%'],
      },
      data: [{
        value: 9,
        name: '未完成订单'
      }]
    }]
  };
  setInterval(function () {
    option6.series[0].data[0].value++;
    unfinishedOrderChart.setOption(option6, true);
  }, 60000);
  unfinishedOrderChart.setOption(option6);

  var xxOrderChart = echarts.init(document.getElementById('xx-order'));
  option7 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
      center: ['50%', '35%'], //控制图表在画布中的位置，guage是用不了grid的left
      radius: '70%',
      axisLine: {
        lineStyle: {
          color: [
            [1, '#00CD66']
          ],
          width: 12,
        }
      },
      startAngle: [370],
      endAngle: [60],
      pointer: {
        show: false,
      },
      splitLine: {
        length: 15,
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      title: {
        offsetCenter: [0, '150%'],
        textStyle: {
          color: '#A3A3A3',
          fontFamily: 'Vernada',
          fontSize: 25,
        }
      },
      name: '叫什么呢订单',
      type: 'gauge',
      detail: {
        formatter: '{value}',
        offsetCenter: [0, '-5%'],
      },
      data: [{
        value: 1,
        name: '叫什么呢订单'
      }]
    }]
  };
  setInterval(function () {
    option7.series[0].data[0].value++;
    xxOrderChart.setOption(option7, true);
  }, 60000);
  xxOrderChart.setOption(option7);
