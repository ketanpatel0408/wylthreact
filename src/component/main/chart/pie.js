import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartHasData = (chart) => {
  return chart.series.some(s => s.data && s.data.length > 0);
};

const Pie = ({ series = [], noDataText = "No data available" }) => {
  const chartComponentRef = useRef(null);

  // Resolve CSS variable --white to actual color
  const whiteBackground = getComputedStyle(document.documentElement)
    .getPropertyValue("--white")?.trim() || "#ffffff";

  const options = {
    chart: {
      type: "pie",
      backgroundColor: whiteBackground,
    },
    title: { text: "" },
    subtitle: { text: "" },
    exporting: { enabled: false },
    accessibility: {
      announceNewData: { enabled: true },
      point: { valueSuffix: "%" },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: { enabled: false },
        showInLegend: true,
      },
    },
    tooltip: {
      enabled: true,
      useHTML: true,
      borderWidth: 0,
      backgroundColor: whiteBackground,
      outside: true,
      formatter: function () {
        const point = this.point;
        const index = point.index;
        const item = series[index];

        // If AUM exists, format it accordingly
        if (item?.AUM !== undefined) {
          const formatINRCurrency = (value) =>
            value?.toString().replace(/,/g, "") &&
            new Intl.NumberFormat("en-IN", {
              style: "currency",
              currency: "INR",
            }).format(Number(value.replace(/,/g, "")));

          const TotalAUM = item?.y !== null ? formatINRCurrency(item.AUM) : "-";
          const MappedAUM = item?.MappedAUM ? formatINRCurrency(item.MappedAUM) : null;
          const UnmappedAUM = item?.UnmappedAUM ? formatINRCurrency(item.UnmappedAUM) : null;

          let tooltipHTML = `
            <div class="bg-white text-blue-500 rounded-md p-2 text-left text-[12px] leading-[14px]" style="font-family: Rubik, sans-serif;">
              <span class="font-medium">${point.name} (${point.percentage.toFixed(2)}%)</span><br/><br/>
              <table>
                <tr>
                  <td class="text-left pl-0 pb-3">
                    <span class="text-gray-600 block mb-1">Total ${item.name} AUM</span>
                    <span class="text-gray-800 block mb-1 font-medium">${TotalAUM}</span>
                  </td>
                </tr>`;

          if (MappedAUM || UnmappedAUM) {
            tooltipHTML += `<tr>`;
            if (MappedAUM) {
              tooltipHTML += `
                <td class="pr-[10px]">
                  <span class="text-gray-600 block mb-1">Mapped AUM</span>
                  <span class="text-gray-800 block mb-1 font-medium">${MappedAUM}</span>
                </td>`;
            }
            if (UnmappedAUM) {
              tooltipHTML += `
                <td>
                  <span class="text-gray-600 block mb-1">Unmapped AUM</span>
                  <span class="text-gray-800 block mb-1 font-medium">${UnmappedAUM}</span>
                </td>`;
            }
            tooltipHTML += `</tr>`;
          }

          tooltipHTML += `</table></div>`;
          return tooltipHTML;
        }

        // If it's not AUM (e.g., SIP), simple label
        return `
          <div class="text-[12px] text-blue-500" style="font-family: Rubik, sans-serif;">
            <strong>${point.name}</strong><br/>
            Count: ${point.y}
          </div>`;
      },
      shared: true,
      style: {
        textAlign: "left",
      },
    },
    credits: { enabled: false },
    legend: {
      itemStyle: { fontSize: "10px" },
    },
    series: [
      {
        name: "Asset Class",
        colorByPoint: true,
        innerSize: "80%",
        data: series.map((item) => ({
          ...item,
          color: item.color || "#cccccc",
        })),
      },
    ],
  };

  useEffect(() => {
    const chart = chartComponentRef.current?.chart;
    if (chart && !ChartHasData(chart)) {
      const text = chart.renderer
        .text(noDataText)
        .css({ color: "#4572A7", fontSize: "16px" })
        .add();

      const bbox = text.getBBox();
      const x = chart.plotLeft + chart.plotWidth / 2 - bbox.width / 2;
      const y = chart.plotTop + chart.plotHeight / 2 - bbox.height / 2;

      text.attr({ x, y, id: "xtratext" });
    }
  }, [series, noDataText]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      containerProps={{ id: "PieChartComponent" }}
    />
  );
};

export default Pie;