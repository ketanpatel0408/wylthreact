import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useColor } from "./ColorImplementation/ColorContext";

const CommonChart = ({ chartType = "column", title = "Chart", yAxisLabel = "Value", legend = false, xAxisLabel = "Data", categories = [], series = [], tooltip = null, plotOptions = null, chartMaxHeight = null }) => {
  const [chartOptions, setChartOptions] = useState({});
  const { primaryColor, baseColor } = useColor();
  const [chartHeight, setChartHeight] = useState(chartMaxHeight || "100%");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setChartHeight(chartMaxHeight || "100%");
      } else {
        setChartHeight(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartMaxHeight]);

  useEffect(() => {
    const allSeriesEmpty = series.every(
      (s) => !s.data || s.data.length === 0 || s.data.every((value) => value === null || value === undefined)
    );

    setChartOptions({
      chart: {
        type: chartType,
        backgroundColor: baseColor,
        height: chartHeight,
        events: {
          load: function () {
            let chart = this;
            if (chart.noDataText) {
              chart.noDataText.destroy();
            }
            if (allSeriesEmpty) {
              chart.noDataText = chart.renderer
                .text("No Data Found", chart.plotLeft + chart.plotWidth / 2 - 50, chart.plotTop + chart.plotHeight / 2)
                .css({ color: "#4572A7", fontSize: "16px" })
                .add();
            }
          },
          redraw: function () {
            let chart = this;
            if (chart.noDataText) {
              chart.noDataText.destroy();
            }
            if (allSeriesEmpty) {
              chart.noDataText = chart.renderer
                .text("No Data Found", chart.plotLeft + chart.plotWidth / 2 - 50, chart.plotTop + chart.plotHeight / 2)
                .css({ color: "#4572A7", fontSize: "16px" })
                .add();
            }
          }
        }
      },
      title: { text: title || null },
      xAxis: { categories, title: { text: xAxisLabel || null, margin: 15 } },
      credits: { enabled: false },
      yAxis: { title: { text: yAxisLabel || null } },
      plotOptions: {
        column: {
          stacking: plotOptions || null,
        }
      },
      legend: {
        enabled: legend || false,
        symbolHeight: 0,
        symbolWidth: 0,
        symbolRadius: 5,
        useHTML: true,
        itemStyle: { color: primaryColor, fontWeight: "bold" },
        labelFormatter: function () {
          let colorStyle;
          if (this.name === "Market Growth/Loss") {
              colorStyle = "background: linear-gradient(45deg, #CB444A, #67C99C);";
          } else {
              colorStyle = `background-color: ${this.data[0].color};`;
          }
  
          return `<span style="display: inline-block; width: 10px; height: 10px; ${colorStyle} border-radius: 50%; margin-right: 5px;"></span> ${this.name}`;
      }
      },
      tooltip: tooltip || {
        shared: true,
        useHTML: true,
        backgroundColor: "#FFF",
        borderWidth: 1,
        borderColor: "#ddd",
        formatter: function () {
          return `<b>${this.x}</b><br/>Value: ${this.y}`;
        }
      },
      series: allSeriesEmpty
        ? [{ name: "Data", data: Array(categories.length).fill(null), showInLegend: false, color: primaryColor }]
        : series.map((s) => ({
          name: s.name,
          stack: s.stack || null,
          visible: s.visible !== undefined ? s.visible : true,
          showInLegend: s.showInLegend !== undefined ? s.showInLegend : true,
          data: s.data.map((value, index) => ({
            y: value,
            color: s.name === "Market Growth/Loss"
              ? (value >= 0 ? "#67C99C" : "#CB444A")
              : (s.colorList ? s.colorList[index] : s.color || primaryColor)
          })),
          marker: {
            symbol: "circle",
            fillColor: s.colorList ? s.colorList[0] : s.color || primaryColor,
            lineColor: "#ffffff",
            lineWidth: 2
          }
        })),
      accessibility: { enabled: false }
    });
  }, [chartType, title, yAxisLabel, xAxisLabel, legend, categories, series, primaryColor, baseColor, chartHeight, tooltip, plotOptions, chartMaxHeight]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default CommonChart;