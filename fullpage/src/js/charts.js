$(function () {
  var inspectDimensionChart = echarts.init($('#inspectDimensionChart')[0], 'walden')
  var data = [
    [0, 6.86],
    [1, 7.27],
    [2, 7.52],
    [3, 7.59],
    [4, 7.48],
    [5, 7.17],
    [6, 6.68],
    [7, 6.02],
    [8, 5.24],
    [9, 4.44],
    [10, 3.67],
    [11, 3.03],
    [12, 2.55],
    [13, 2.27],
    [14, 2.17],
    [15, 2.27],
  ];
  //polynomial多项式 10多项式项数
  //github地址https://github.com/ecomfe/echarts-stat
  var myRegression = ecStat.regression('polynomial', data, 5);

  myRegression.points.sort(function (a, b) {
    return a[0] - b[0];
  });

  option0 = {
    title: {
      text: '测量点集合',
      left: 'center'
    },
    xAxis: {
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      },
      splitNumber: 20
    },
    yAxis: {
      type: 'value',
      splitLine: {
        show: false,
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [{
      name: 'scatter',
      type: 'scatter',
      symbol: 'roundRect',
      symbolSize: 6,
      label: {
        emphasis: {
          show: true,
          position: 'left',
          textStyle: {
            color: '#626c91',
            fontSize: 16
          }
        }
      },
      data: data
    }, {
      name: 'line',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: myRegression.points,
      markPoint: {
        itemStyle: {
          normal: {
            color: 'transparent'
          }
        },
        label: {
          normal: {
            show: false,
            position: 'left',
            formatter: myRegression.expression,
            textStyle: {
              color: '#333',
              fontSize: 14
            }
          }
        },
        data: [{
          coord: myRegression.points[myRegression.points.length - 1]
        }]
      },
      areaStyle: {
        normal: {
          color: "#6BE6C1",
          opacity: 1
        }
      }
    }]
  };
  inspectDimensionChart.setOption(option0);

  var dimensionRadarChart = echarts.init($('#dimension-radar')[0], 'walden')
  option01 = {
    title: {
      text: '单一截面上下公差带',
      left: 'center',
      top: 'top'
    },
    radar: [{
      indicator: [],
      indicator: (function () {
        var res = []
        for (var i = 0; i < 30; i++) {
          res.unshift({
            text: '',
            max: 15
          })
        }
        return res
      })(),
      scale: true,
      radius: 120,
      startAngle: 90,
      splitNumber: 6,
      shape: 'circle',
      name: {
        formatter: '{value}',
        textStyle: {
          color: 'rgba(114,172,209,1)'
        }
      },
      splitArea: {
        areaStyle: {
          color: [],
          color: (function () {
            var res = []
            for (var i = 0; i < 5; i++) {
              res.unshift('rgba(0,0,0,0)')
            }
            res.push('rgba(63,177,227, 0.4)')
            return res
          })()

        }
      },
      axisLine: {
        show: false,
      },
      splitLine: {
        show: false,
      }
    }],
    series: [{
      name: '雷达图',
      type: 'radar',
      data: [{
        value: (function () {
          var res = [];
          var len = 0;
          while (len < 30) {
            res.push((Math.random() * 1.5 + 13.5).toFixed(1));
            len++;
          }
          return res;
        })(),
        name: '图一',
        symbol: 'roundRect',
        symbolSize: 5,
        lineStyle: {
          normal: {
            color: 'rgba(107,230,193,1)',
            width: 3,
          }
        }
      }]
    }]
  }
  dimensionRadarChart.setOption(option01)

  var cupShapeChart = echarts.init($('#cup-shape-chart')[0])
  var data = [
    [0, 0],
    [0, 6.86],
    [1, 7.27],
    [2, 7.52],
    [3, 7.59],
    [4, 7.48],
    [5, 7.17],
    [6, 6.68],
    [7, 6.02],
    [8, 5.24],
    [9, 4.44],
    [10, 3.67],
    [11, 3.03],
    [12, 2.55],
    [13, 2.27],
    [14, 2.17],
    [15, 2.27],
    [15, 0]
  ];
  //data x y对调
  var ii
  for (var i = 0; i < data.length; i++) {
    ii = data[i][0]
    data[i][0] = data[i][1]
    data[i][1] = ii
  }
  var data2 = []
  for (var i = 0; i < data.length; i++) {
    data2[i] = []
    data2[i][0] = -data[i][0]
    data2[i][1] = data[i][1]
  }
  option02 = {
    title: {
      text: '温度范围',
      left: 'center',
     textStyle:{
        color:'#eee',
      }
    },
    xAxis: {
      show: false,
      type: 'value',
    },
    yAxis: [{
      show: false,
      type: 'value',
      splitNumber: 20,
      itemStyle:{
        normal:{
          width:0
        }
      }
    }],
    visualMap: {
      min: 0,
      max: 15,
      splitNumber: 5,
      color: ['#d94e5d', '#eac736', '#50a3ba'],
      textStyle: {
        color: '#fff'
      },
      right:'0',
      top:'10%'
    },
    series: [{
      name: 'line',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: data,
      itemStyle: {
        normal: {
          color: '#333'
        }
      },
      areaStyle: {
        normal: {
          opacity: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#50a3ba' // 0% 处的颜色
            }, {
              offset: 0.2,
              color: '#50a3ba' // 20% 处的颜色
            }, {
              offset: 0.21,
              color: '#9db578' // 40% 处的颜色
            }, {
              offset: 0.4,
              color: '#9db578' // 40% 处的颜色
            }, {
              offset: 0.41,
              color: '#eac736' // 40% 处的颜色
            }, {
              offset: 0.6,
              color: '#eac736' // 60% 处的颜色
            }, {
              offset: 0.61,
              color: '#e28b4a' // 60% 处的颜色
            }, {
              offset: 0.8,
              color: '#e28b4a' // 80% 处的颜色
            }, {
              offset: 0.81,
              color: '#d94e5d' // 80% 处的颜色
            }, {
              offset: 1,
              color: '#d94e5d' // 80% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
    }, {
      name: 'line',
      type: 'line',
      showSymbol: false,
      smooth: true,
      data: data2,
      itemStyle: {
        normal: {
          color: '#333'
        }
      },
      areaStyle: {
        normal: {
          opacity: 1,
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [{
              offset: 0,
              color: '#50a3ba' // 0% 处的颜色
            }, {
              offset: 0.2,
              color: '#50a3ba' // 20% 处的颜色
            }, {
              offset: 0.21,
              color: '#9db578' // 40% 处的颜色
            }, {
              offset: 0.4,
              color: '#9db578' // 40% 处的颜色
            }, {
              offset: 0.41,
              color: '#eac736' // 40% 处的颜色
            }, {
              offset: 0.6,
              color: '#eac736' // 60% 处的颜色
            }, {
              offset: 0.61,
              color: '#e28b4a' // 60% 处的颜色
            }, {
              offset: 0.8,
              color: '#e28b4a' // 80% 处的颜色
            }, {
              offset: 0.81,
              color: '#d94e5d' // 80% 处的颜色
            }, {
              offset: 1,
              color: '#d94e5d' // 80% 处的颜色
            }],
            globalCoord: false // 缺省为 false
          }
        }
      },
    }, ]
  };
  cupShapeChart.setOption(option02);


  //page3
  var finishedOrderChart = echarts.init(document.getElementById('finished-order'));
  option5 = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%"
    },
    series: [{
      center: ['50%', '35%'], //控制图表在画布中的位置，guage是用不了grid的left
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
          color: '#FFFFFF',
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
          color: '#FFFFFF',
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
          color: '#FFFFFF',
          fontFamily: 'Vernada',
          fontSize: 25,
        }
      },
      name: '合格订单',
      type: 'gauge',
      detail: {
        formatter: '{value}',
        offsetCenter: [0, '-5%'],
      },
      data: [{
        value: 5,
        name: '合格订单'
      }]
    }]
  };
  setInterval(function () {
    option7.series[0].data[0].value++;
    xxOrderChart.setOption(option7, true);
  }, 60000);
  xxOrderChart.setOption(option7);



})