import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { populationData } from "./Data";
import { populationDataFemale } from "./DataFemale";
import { populationDataMale } from "./DataMale";

class App extends Component {
  getOption = () => {
    let arr = [];
    let dates = [];
    Object.entries(populationDataFemale).forEach(entry => {
      dates = [...dates, entry[0]];
      entry[1].map(e => {
        arr = [...arr, e.name];
      });
    });
    let areas = [...new Set(arr)];

    let options = dates.map(date => {
      let obj = {};
      obj.title = {
        text: `Population of Singapore by District, ${date}`
      };
      obj.series = [
        {
          stack: "group",
          data: populationDataFemale[date]
        },
        {
          stack: "group",
          data: populationDataMale[date]
        }
      ];
      return obj;
    });

    return {
      baseOption: {
        backgroundColor: "#fff",
        color: [
          "#e91e63 ", 
          "#354EF6",
      ],
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
          right: 0,
          top: 20,
          width: 55,
          label: {
            normal: {
              textStyle: {
                color: "#aaa"
              }
            },
            emphasis: {
              textStyle: {
                color: "#333"
              }
            }
          },
          symbol: "none",
          lineStyle: {
            color: "#aaa"
          },
          checkpointStyle: {
            color: "#354EF6",
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
          }
        },
        title: {
          subtext: "Data from the Singapore Department of Statistics",
          textAlign: "left",
          left: "5%",
        },
        tooltip: { backgroundColor: "#555", borderWidth: 0, padding: 10 },
        legend: {
          data: ["Female", "Male"],
          itemGap: 35,
          itemHeight: 18,
          right: "11%",
          top: 20
        },
        calculable: true,
        grid: {
          top: 100,
          bottom: 150,
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
              textStyle: {
                baseline: "top",
                color: "#333",
                fontSize: 10,
                fontWeight: "bold"
              }
            },
            axisLine: { lineStyle: { color: "#aaa" }, show: true },
            axisTick: { show: false },
            data: areas,
            // name: "District",
            splitLine: { show: false },
            type: "category"
          }
        ],
        yAxis: [
          {
            axisLabel: {
              textStyle: { fontSize: 10 }
            },
            axisLine: { show: false },
            axisTick: { show: false },
            name: "Population",
            splitLine: {
              lineStyle: {
                type: "dotted"
              }
            },
            type: "value"
          }
        ],
        series: [{ name: "Female", type: "bar" }, { name: "Male", type: "bar" }]
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
          style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
          opts={{ renderer: "svg" }}
        />
      </div>
    );
  }
}

export default App;
