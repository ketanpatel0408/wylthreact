import React from "react";
import CommonChart from "../../../chart/column";
import ReactDOMServer from 'react-dom/server';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from "@mui/material";

const MFSIPBookChart = ({ data }) => {
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
                    let closingSIPValue = data[index]?.closingSIP;

                    const tooltipFields = [
                        { label: "Opening SIP", seriesIndex: 2, color: "#043472" },
                        { label: "Closing SIP", value: closingSIPValue, color: "#043472" },
                        { label: "Existing Accounts", seriesIndex: 3, color: "#0852B2" },
                        { label: "New Accounts", seriesIndex: 4, color: "#F9BF00" },
                        { label: "Ongoing SIP", seriesIndex: 5, color: "#8CD8CF" },
                        {
                            label: "SIP Ceased",
                            seriesIndex: 0,
                            getColor: (value) => (value < 0 ? "#B10D2D" : "#FFAA60")
                        },
                        {
                            label: "SIP Matured",
                            seriesIndex: 1,
                            getColor: (value) => (value < 0 ? "#B10D2D" : "#FFAA60")
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

                                                let nextField = tooltipFields[i + 1];
                                                let nextFieldValue = nextField ? getFormattedValue(nextField) : "";
                                                let nextFieldColor = nextField?.getColor
                                                    ? nextField.getColor(nextFieldValue)
                                                    : nextField?.color;

                                                return (
                                                    <React.Fragment key={`row-group-${i}`}>
                                                        <TableRow key={`label-${i}`}>
                                                            <TableCell className="pr-3 text-wrap">{field.label}</TableCell>
                                                            <TableCell className="pr-3 text-wrap">{nextField?.label || ""}</TableCell>
                                                        </TableRow>
                                                        <TableRow key={`value-${i}`}>
                                                            <TableCell className="font-semibold pb-5" style={{ color: fieldColor }}>
                                                                {fieldValue !== null ? fieldValue.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : "-"}
                                                                {field.label === "Existing Accounts" && (data[index]?.existingAccountsNo || data[index]?.existingAccountsNo === 0) && (
                                                                    <div style={{ fontWeight: 500, color: fieldColor, marginTop: "0", lineHeight: "20px" }}>
                                                                        {data[index]?.existingAccountsNo} Accounts
                                                                    </div>
                                                                )}
                                                            </TableCell>
                                                            <TableCell className="font-semibold pb-5" style={{ color: nextFieldColor }}>
                                                                {nextFieldValue !== null ? nextFieldValue.toLocaleString("en-IN", { style: "currency", currency: "INR" }) : ""}
                                                                {tooltipFields[i + 1]?.label === "New Accounts" && (data[index]?.newAccountsNo || data[index]?.newAccountsNo === 0) && (
                                                                    <div style={{ fontWeight: 500, color: nextFieldColor, marginTop: "0", lineHeight: "20px" }}>
                                                                        {data[index]?.newAccountsNo} Accounts
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
                { name: "SIP Ceased", data: data.map(d => d.sipCeased), stack: "SIP", color: "#FFAA60" },
                { name: "SIP Matured/Maturing", data: data.map(d => d.sipMatured), stack: "SIP", color: "#B10D2D" },
                { name: "Opening SIP", data: data.map(d => d.openingSIP), stack: "SIP", color: "#043472" },
                { name: "New SIP by Existing Acc.", data: data.map(d => d.newSIPExistingAccounts), stack: "SIP", color: "#5994E0" },
                { name: "SIP by New Acc.", data: data.map(d => d.newSIPAccounts), stack: "SIP", color: "#F9BF00" },
                { name: "Ongoing SIP", data: data.map(d => d.onGoingSIP), stack: "SIP", color: "#8CD8CF" },
                { name: "Closing SIP", data: data.map(d => d.closingSIP), stack: "SIP", visible: false, showInLegend: false },
                { name: "Existing Acc. No.", data: data.map(d => d.existingAccountsNo), stack: "SIP", visible: false, showInLegend: false },
                { name: "New Acc. No.", data: data.map(d => d.newAccountsNo), stack: "SIP", visible: false, showInLegend: false }
            ]}
            plotOptions="normal"
        />
    )
}

export default MFSIPBookChart;