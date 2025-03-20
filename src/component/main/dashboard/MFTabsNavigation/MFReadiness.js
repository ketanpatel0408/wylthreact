import React, { useState } from "react";
import { Box, FormControl, IconButton, MenuItem, Paper, Select, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, Typography } from "@mui/material";

const MFReadiness = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [selectedPeriod, setSelectedPeriod] = useState("4");

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSelectChange = (event) => {
        setSelectedPeriod(event.target.value);
    };

    const data = [
        { image: "https://prodfwsg.blob.core.windows.net/images/e830176a-f9b2-49f7-8ad8-5d950dae8b20.png", submitted: 26, approved: 67, unapproved: 0 },
        { image: "https://prodfwsg.blob.core.windows.net/images/dee96a54-d092-49a9-bd19-cc93e1e2370c.png", submitted: 0, approved: 183, unapproved: 0 },
        { image: "https://prodfwsg.blob.core.windows.net/images/ed808cd1-3b82-403b-b582-2e2df68e47f1.png", submitted: 23, approved: 6, unapproved: 0, }
    ];

    return (
        <div>
            <div className="flex flex-row justify-between items-center mb-4">
                <Tabs
                    value={activeTab}
                    onChange={handleTabChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab
                        label="Digital MF A/C"
                        className={`!text-[13px] text-blue-500 !normal-case !font-medium !p-0 !mr-5 ${activeTab === 0 ? "!border-b-2 !border-current !border-solid" : ""
                            }`}
                    />
                    <Tab
                        label="Debit Mandate"
                        className={`!text-[13px] text-blue-500 !normal-case !font-medium !p-0 !mr-5 ${activeTab === 1 ? "!border-b-2 !border-current !border-solid" : ""
                            }`}
                    />
                </Tabs>

                <FormControl className="min-w-[150px]">
                    <Select
                        value={selectedPeriod}
                        onChange={handleSelectChange}
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
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-center text-nowrap">Platform</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-right text-nowrap">Submitted</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-right text-nowrap">Approved</TableCell>
                                <TableCell className="text-white font-semibold !p-2 !text-[12px] !text-right text-nowrap">Unapproved</TableCell>
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
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-center">
                                            <Box
                                                component="img"
                                                src={row.image}
                                                className="max-w-[100px] max-h-[30px] object-contain object-center m-auto"
                                                alt="My Image"
                                            />
                                        </TableCell>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-right">{row.submitted}</TableCell>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-right">{row.approved}</TableCell>
                                        <TableCell className="!p-2 !text-[12px] !border-none !text-right">{row.unapproved}</TableCell>
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
        </div>
    )
}

export default MFReadiness;