import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useColor } from "./ColorImplementation/ColorContext";

const CommonChart = ({ chartType = "column", title = "Chart", yAxisLabel = "Value", legend = false, xAxisLabel = "Data", categories = [], series = [] }) => {
  const [chartOptions, setChartOptions] = useState({});
  const { primaryColor, baseColor } = useColor();
  const [chartHeight, setChartHeight] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newHeight = window.innerWidth >= 768 ? "100%" : null;
      if (newHeight !== chartHeight) {
        setChartHeight(newHeight);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [chartHeight]); // Ensure the effect runs when `chartHeight` changes

  useEffect(() => {
    const allSeriesEmpty = series.every(s => !s.data || s.data.length === 0 || s.data.every(value => value === null || value === undefined));

    setChartOptions({
      chart: {
        type: chartType,
        backgroundColor: baseColor,
        height: chartHeight, // Dynamically set height
        events: {
          load: function () {
            let chart = this;
            if (chart.noDataText) {
              chart.noDataText.destroy();
            }
            if (allSeriesEmpty) {
              chart.noDataText = chart.renderer
                .text("No Data Found", chart.plotLeft + chart.plotWidth / 2 - 50, chart.plotTop + chart.plotHeight / 2)
                .css({
                  color: "#4572A7",
                  fontSize: "16px"
                })
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
                .css({
                  color: "#4572A7",
                  fontSize: "16px"
                })
                .add();
            }
          }
        }
      },
      title: {
        text: title || null
      },
      xAxis: {
        categories: categories,
        title: {
          text: xAxisLabel || null,
          margin: 15
        },
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: yAxisLabel || null
        }
      },
      legend: {
        enabled: legend || false,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolRadius: 5,
        itemStyle: {
          color: primaryColor,
          fontWeight: "bold"
        }
      },
      series: allSeriesEmpty
        ? [{ name: "Data", data: Array(categories.length).fill(null), showInLegend: false, color: primaryColor }]
        : series.map(s => ({
          ...s,
          data: s.data.map((value, index) => ({
            y: value,
            color: s.colorList ? s.colorList[index] : primaryColor
          })),
          color: s.colorList ? s.colorList[2] : primaryColor,
          marker: {
            symbol: "circle",
            fillColor: s.colorList ? s.colorList[0] : primaryColor,
            lineColor: "#ffffff",
            lineWidth: 2
          }
        })),
      accessibility: {
        enabled: false
      }
    });
  }, [chartType, title, yAxisLabel, xAxisLabel, legend, categories, series, primaryColor, baseColor, chartHeight]);

  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default CommonChart;