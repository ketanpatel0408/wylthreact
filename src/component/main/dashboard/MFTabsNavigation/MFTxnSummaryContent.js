import React, { useState } from "react";
import { Select, MenuItem, FormControl, Table, TableHead, TableRow, TableCell, TableBody, Typography, TableContainer, Paper, IconButton, Button } from "@mui/material";

const MFTxnSummaryContent = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("4");

    const handleChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const data = [
        { type: "SIP", transactions: 3, amount: "2,499.88", id: 4, transtype: "SIP" },
        { type: "Lumpsum", transactions: 2, amount: "5,000.00", id: 5, transtype: "Lumpsum" }
    ];

    return (
        <div className="bg-white">
            <div className="flex flex-row justify-between items-center mb-4">
                <Typography variant="h5" className="text-left !text-[16px] leading-6 font-normal tracking-normal text-blue-500 opacity-100">MF Transaction Summary</Typography>

                <FormControl className="min-w-[150px]">
                    <Select
                        value={selectedPeriod}
                        onChange={handleChange}
                        className="bg-white text-[14px]"
                        sx={{
                            fontSize: "14px",
                            padding: "4px 8px",
                            minHeight: "32px",
                            "& .MuiSelect-select": {
                                padding: "4px 8px",
                            }
                        }}
                    >
                        <MenuItem value="1">Today</MenuItem>
                        <MenuItem value="2">T-1</MenuItem>
                        <MenuItem value="3">Last 7 Days</MenuItem>
                        <MenuItem value="4">Last 30 Days</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <div className="overflow-x-auto">
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow className="bg-blue-500 text-white">
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] text-nowrap">Transaction Type</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-right text-nowrap"># Txn(s)</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-right text-nowrap">Amount (₹)</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-center text-nowrap">View</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center" className="py-6">
                                        {/* <img src={noDataImage} alt="No Data" className="w-40 mx-auto mb-2" /> */}
                                        <Typography variant="body2" className="text-gray-500">
                                            No more data to display
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((row, index) => (
                                    <TableRow key={index} className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-left">{row.type}</TableCell>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-right">{row.transactions}</TableCell>
                                        <TableCell className={`!p-2 !text-[12px] !border-none !text-right font-medium  ${parseFloat(row.amount.replace(/,/g, '')) >= 0 ? '!text-green-500' : '!text-red-500'}`}>
                                            {row.amount}
                                        </TableCell>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-center">
                                            <IconButton size="small" className="text-gray-400">
                                                <i className="fas fa-eye text-[12px]"></i>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="flex flex-row items-center justify-between mt-5">
                <Typography variant="caption" className="text-blue-500 text-[10px] mt-2 mb-2">
                    Showing transactions as confirmed by RTA(s).
                </Typography>
                <Button
                    variant="outlined"
                    color="primary"
                    className="!text-blue-500 !border-blue-500 hover:!bg-blue-100 !py-1 !px-3 !normal-case text-nowrap"
                >
                    View all
                </Button>
            </div>
        </div>
    );
};

export default MFTxnSummaryContent;