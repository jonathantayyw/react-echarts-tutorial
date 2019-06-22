import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";
import { populationDataFemale } from "./DataFemale";
import { populationDataMale } from "./DataMale";

class App extends Component {
  getOption = () => {
    let districts = [];
    let years = [];
    Object.entries(populationDataFemale).forEach(entry => {
      years = [...years, entry[0]];
      entry[1].forEach(e => {
        districts = [...districts, e.name];
      });
    });
    let uniqueDistricts = [...new Set(districts)];

    let options = years.map(year => {
      let obj = {};
      obj.title = {
        text: `Population of Singapore by District, ${year}`
      };
      obj.series = [
        {
          stack: "group",
          data: populationDataFemale[year]
        },
        {
          stack: "group",
          data: populationDataMale[year]
        }
      ];
      return obj;
    });

    return {
      baseOption: {
        color: ["#e91e63 ", "#354EF6"],
        timeline: {
          autoPlay: true,
          axisType: "category",
          bottom: 20,
          data: years,
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
          left: "5%"
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
            data: uniqueDistricts,
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
      <ReactEcharts
        option={this.getOption()}
        style={{ height: "80vh", left: 50, top: 50, width: "90vw" }}
        opts={{ renderer: "svg" }}
      />
    );
  }
}

export default App;
