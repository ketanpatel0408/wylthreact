import React from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, TableContainer, Paper } from "@mui/material";

const MFSIPBookList = ({ data }) => {
    return (
        <TableContainer component={Paper} className="shadow-lg rounded-lg mt-5">
            <Table>
                <TableHead>
                    <TableRow className="bg-blue-500 text-white">
                        <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-center !leading-5">Month</TableCell>
                        <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">Opening SIP (₹)<br />Closing SIP (₹)</TableCell>
                        <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">SIP Mature (₹)<br />SIP Ceased (₹)</TableCell>
                        <TableCell className="text-white font-semibold !p-2 !text-[12px] !align-bottom !text-right !leading-5">Existing Acc.<br />New Acc.<br />Ongoing SIP</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row, index) => (
                        <TableRow key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                            <TableCell className="!p-2 !text-[12px] !border-none !text-center !font-medium text-gray-600">{row.month}</TableCell>
                            <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                <span className="text-blue-500">{row.openingSIP.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span><br />
                                <span className="text-blue-500">{row.closingSIP.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                            </TableCell>
                            <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                <span className={row.sipMatured < 0 ? "text-[#B10D2D]" : "text-[#008B00]"}>
                                    {row.sipMatured.toLocaleString("en-IN", { style: "currency", currency: "INR" })}
                                </span><br />
                                <span className="text-[#FFAA60]">{row.sipCeased.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                            </TableCell>
                            <TableCell className="!p-2 !text-[12px] !border-none !text-right !font-medium">
                                <span className="text-[#0852B2]">
                                    {row.newSIPExistingAccounts.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span><br />
                                <span className="text-[#F9BF00]">
                                    {row.newSIPAccounts.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span><br />
                                <span className="text-[#8CD8CF]">{row.onGoingSIP.toLocaleString("en-IN", { style: "currency", currency: "INR" })}</span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MFSIPBookList;