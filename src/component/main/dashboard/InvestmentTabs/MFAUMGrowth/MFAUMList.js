import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const MFAUMList = ({ data }) => {
    return (
        <TableContainer component={Paper} className="shadow-lg rounded-lg mt-5">
                <Table>
                    <TableHead>
                        <TableRow className="bg-blue-500 text-white">
                            <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-center !leading-5">Month</TableCell>
                            <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">Opening AUM (₹)<br />Closing AUM (₹)</TableCell>
                            <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">AUM Inflow (₹)<br />Existing Acc.<br />New Acc.</TableCell>
                            <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">Market Mov. (₹)<br />AUM Outflows (₹)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row, index) => (
                            <TableRow key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                <TableCell className="!p-2 !text-[12px] !border-none !text-center !font-medium text-gray-600">{row.month}</TableCell>
                                <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                    <span className="text-blue-500">{row.openingAUM.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span><br />
                                    <span className="text-blue-500">{row.closingAUM.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                                </TableCell>
                                <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                    <span className="text-[#0852B2]">{row.inflowExisting.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span><br />
                                    <span className="text-[#F9BF00]">{row.inflowNew.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                                </TableCell>
                                <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                    <span className={row.marketMovement < 0 ? "text-[#B10D2D]" : "text-[#008B00]"}>
                                        {row.marketMovement.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                                    </span><br />
                                    <span className="text-[#B10D2D]">{row.outflows.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default MFAUMList;