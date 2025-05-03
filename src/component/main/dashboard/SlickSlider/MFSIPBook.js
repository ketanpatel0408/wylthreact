import React, { useRef, useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Tabs, Tab, Box } from "@mui/material";
import MFSIPBookChart from "./MFSIPBook/MFSIPBookChart";
import MFSIPBookList from "./MFSIPBook/MFSIPBookList";

const data = [
    { month: "Mar-2025", openingSIP: 56.40, closingSIP: 31.40, newSIPExistingAccounts: 3, existingAccountsNo: 5, newSIPAccounts: 10, newAccountsNo: 12, onGoingSIP: 2, sipCeased: -20, sipMatured: -2 },
    { month: "Feb-2025", openingSIP: 9.00, closingSIP: 5.00, newSIPExistingAccounts: 2, existingAccountsNo: 2, newSIPAccounts: 16, newAccountsNo: 4, onGoingSIP: 30, sipCeased: 0, sipMatured: -6 },
    { month: "Jan-2025", openingSIP: 24.00, closingSIP: 15.00, newSIPExistingAccounts: 2, existingAccountsNo: 1, newSIPAccounts: 0, newAccountsNo: 0, onGoingSIP: 14, sipCeased: 0, sipMatured: -4 },
];

const MFSIPBook = () => {
    const [activeTab, setActiveTab] = useState(0);
    const chartRef = useRef(null);

    const handleTabChange = (e, newValue) => {
        setActiveTab(newValue);

        setTimeout(() => {
            if (chartRef.current?.chart) {
                chartRef.current.chart.redraw();
            }
        }, 100);
    };

    return (
        <div className="bg-white w-full p-5">
            <div className="flex flex-row justify-between items-center mb-2">
                <Typography variant="h6" className="text-blue-500">MF SIP Book</Typography>
                <Box className="flex justify-end">
                    <Tabs className="!min-h-max" value={activeTab} onChange={handleTabChange}>
                        <Tab className="!w-[35px] !h-[35px] !flex !items-center !justify-center !p-0 !rounded-md !border !border-gray-300 !border-solid !text-gray-600 !min-w-max !min-h-max !mr-2"
                            icon={<i className="fas fa-chart-bar text-sm"></i>}
                            aria-label="Chart View"
                            sx={{
                                "&.Mui-selected": {
                                    bgcolor: "var(--blue-500) !important",
                                    color: "var(--white) !important"
                                },
                            }}
                        />
                        <Tab className="!w-[35px] !h-[35px] !flex !items-center !justify-center !p-0 !rounded-md !border !border-gray-300 !border-solid !text-gray-600 !min-w-max !min-h-max"
                            icon={<i className="fas fa-table text-sm"></i>}
                            aria-label="Table View"
                            sx={{
                                "&.Mui-selected": {
                                    bgcolor: "var(--blue-500) !important",
                                    color: "var(--white) !important"
                                },
                            }}
                        />
                    </Tabs>
                </Box>
            </div>
            {activeTab === 0 &&
                <FormControlLabel className="mb-4"
                    control={<Checkbox size="small" className="!pt-0 !pb-0" />}
                    label={<span className="text-xs">Show New SIPs only</span>}
                />
            }

            <div style={{ display: activeTab === 0 ? "block" : "none" }}>
                <MFSIPBookChart ref={null} data={data} />
            </div>
            <div style={{ display: activeTab === 1 ? "block" : "none" }}>
                <MFSIPBookList data={data} />
            </div>
        </div>
    );
};

export default MFSIPBook;