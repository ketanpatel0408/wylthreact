import React from "react";
import CommonChart from "../../../chart/column";
import ReactDOMServer from 'react-dom/server';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const MFAUMChart = ({ data }) => {
    return (
        <CommonChart
            chartMaxHeight={460}
            chartType="column"
            title={false}
            yAxisLabel=""
            xAxisLabel=""
            legend={true}
            categories={data.map(d => d.month)}
            tooltip={{
                enabled: true,
                useHTML: true,
                backgroundColor: "transparent",
                outside: true,
                shared: true,
                formatter: function () {
                    let chart = this.series.chart;
                    let index = this.point.index;
                    let categories = chart.xAxis[0].categories;
                    let closingAUMValue = data[index]?.closingAUM;

                    const tooltipFields = [
                        { label: "Opening AUM", seriesIndex: 0, color: "#043472" },
                        { label: "Closing AUM", value: closingAUMValue, color: "#043472" },
                        { label: "AUM Inflow from Existing Accounts", seriesIndex: 1, color: "#0852B2" },
                        { label: "AUM Inflow from New Accounts", seriesIndex: 2, color: "#F9BF00" },
                        { label: "AUM Outflows", seriesIndex: 4, color: "#FFAA60" },
                        {
                            label: "Market Movement",
                            seriesIndex: 3,
                            getColor: (value) => (value < 0 ? "#B10D2D" : "#008B00")
                        }
                    ];

                    const getFormattedValue = (field) => {
                        let value = field.value !== undefined
                            ? field.value
                            : chart.series[field.seriesIndex]?.data[index]?.y;

                        return value !== null && value !== undefined
                            ? value
                            : "-";
                    };

                    return `
                            <div class="bg-white shadow-lg p-3 w-80 !z-[999999]">
                                <span class="block mb-5 text-base font-semibold">${categories[index]}</span>
                
                                ${ReactDOMServer.renderToString(
                        <TableContainer component={Paper}>
                            <Table size="small">
                                <TableBody>
                                    {tooltipFields
                                        .map((field, i) => {
                                            if (i % 2 === 0) {

                                                let fieldValue = getFormattedValue(field);
                                                let fieldColor = field.getColor
                                                    ? field.getColor(fieldValue)
                                                    : field.color;

                                                let nextFieldValue = tooltipFields[i + 1]
                                                    ? getFormattedValue(tooltipFields[i + 1])
                                                    : "";
                                                let nextFieldColor = tooltipFields[i + 1]?.getColor
                                                    ? tooltipFields[i + 1].getColor(nextFieldValue)
                                                    : tooltipFields[i + 1]?.color;

                                                return (
                                                    <React.Fragment key={`row-group-${i}`}>
                                                        <TableRow key={`label-${i}`}>
                                                            <TableCell className="pr-3 text-wrap !border-none !text-xs !pb-0">{field.label}</TableCell>
                                                            <TableCell className="pr-3 text-wrap !border-none !text-xs !pb-0">{tooltipFields[i + 1]?.label || ""}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={`value-${i}`}>
                                                            <TableCell className="font-semibold pb-5 !border-none !text-xs !pb-2" style={{ color: fieldColor }}>
                                                                {fieldValue !== null ? fieldValue.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : "-"}
                                                                {field.label === "AUM Inflow from Existing Accounts" && (data[index]?.existingAcc || data[index]?.existingAcc === 0) && (
                                                                    <div style={{ fontWeight: 500, color: fieldColor, marginTop: "0", lineHeight: "20px" }}>
                                                                        {data[index]?.existingAcc} Accounts
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="font-semibold pb-5 !border-none !text-xs !pb-2" style={{ color: nextFieldColor }}> 
                                                                {nextFieldValue !== null ? nextFieldValue.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : ""}
                                                                {tooltipFields[i + 1]?.label === "AUM Inflow from New Accounts" && (data[index]?.newAcc || data[index]?.newAcc === 0) && (
                                                                    <div style={{ fontWeight: 500, color: nextFieldColor, marginTop: "0", lineHeight: "20px" }}>
                                                                        {data[index]?.newAcc} Accounts
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                );
                                            }
                                            return null;
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                            </div>
                        `;
                }
            }}
            series={[
                { name: "Opening AUM", data: data.map(d => d.openingAUM), stack: "AUM", color: "#043472" },
                { name: "AUM Inflow Existing Acc.", data: data.map(d => d.inflowExisting), stack: "AUM", color: "#0852B2" },
                { name: "AUM Inflow New Acc.", data: data.map(d => d.inflowNew), stack: "AUM", color: "#F9BF00" },
                { name: "Market Growth/Loss", data: data.map(d => d.marketMovement), stack: "AUM" },
                { name: "AUM Outflows", data: data.map(d => d.outflows), stack: "AUM", color: "#FFAA60" },
                { name: "Closing AUM", data: data.map(d => d.closingAUM), stack: "AUM", visible: false, showInLegend: false },
                { name: "Existing Acc.", data: data.map(d => d.existingAcc), stack: "AUM", visible: false, showInLegend: false },
                { name: "New Acc.", data: data.map(d => d.newAcc), stack: "AUM", visible: false, showInLegend: false }
            ]}
            plotOptions="normal"
        />
    )
}

export default MFAUMChart;