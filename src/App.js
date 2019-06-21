import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { populationData } from "./Data";

class App extends Component {
  getOption = () => {
    let arr = [];
    let dates = [];
    let options = [];
    Object.entries(populationData).forEach(entry => {
      dates = [...dates, entry[0]];
      entry[1].map(e => {
        arr = [...arr, e.name];
      });
      let obj = {};
      obj.title = {
        text: `Singapore Population by District, ${entry[0]}`
      };
      obj.series = [
        {
          data: entry[1]
        }
      ];
      options = [...options, obj];
    });
    let areas = [...new Set(arr)];

    return {
      baseOption: {
        backgroundColor: "#fff",
        color: ["#354EF6"],
        timeline: {
          autoPlay: true,
          axisType: "category",
          bottom: 20,
          data: dates,
          height: null,
          inverse: true,
          left: null,
          orient: "vertical",
          playInterval: 1000,
          right: 40,
          top: 20,
          width: 55,
          label: {
            normal: {
              textStyle: {
                color: "#aaa"
              },
            },
            emphasis: {
              textStyle: {
                color: "#333"
              }
            },
          },
          symbol: "none",
          lineStyle: {
            color: "#aaa"
          },
          checkpointStyle: {
            color: "#333",
            borderColor: "transparent",
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: false,
            showPrevBtn: false,
            normal: {
              color: "#354EF6",
              borderColor: "#354EF6"
            },
            emphasis: {
              color: "#5d71f7",
              borderColor: "#5d71f7"
            }
          },
        },
        title: {
          subtext: "Data from the Singapore Department of Statistics",
          textAlign: "center",
          left: "50%",
          top: "0%"
        },
        tooltip: { backgroundColor: "#333", borderWidth: 1, padding: 10 },
        // legend: {
        //   x: "right",
        //   data: ["第一产业", "第二产业", "第三产业", "GDP", "金融", "房地产"],
        //   selected: {
        //     GDP: false,
        //     金融: false,
        //     房地产: false
        //   }
        // },
        calculable: true,
        grid: {
          top: 80,
          bottom: 100,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                formatter: function(params) {
                  return params.value.replace("\n", "");
                }
              }
            }
          }
        },
        xAxis: [
          {
            axisLabel: {
              interval: 0,
              rotate: 55,
              textStyle: { baseline: "top", fontSize: 10 }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            data: areas,
            name: "District",
            splitLine: { show: false },
            type: "category"
          }
        ],
        yAxis: [
          {
            axisLine: { show: false },
            axisTick: { show: false },
            name: "Population",
            type: "value"
          }
        ],
        series: [{ name: "Total", type: "bar" }]
      },
      options: options
    };
  };

  render() {
    return (
      <div className="App">
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          style={{ height: "80vh", top: 50, width: "90vw" }}
          opts={{ renderer: "svg" }}
        />
      </div>
    );
  }
}

export default App;
