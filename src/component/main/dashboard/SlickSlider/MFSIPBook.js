import React, { useState } from "react";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Tabs, Tab, Box } from "@mui/material";
import MFAUMChart from "./MFAUMGrowth/MFAUMChart";
import MFAUMList from "./MFAUMGrowth/MFAUMList";

const data = [
    { month: "Mar-2025", openingAUM: 19.71, closingAUM: 20.03, inflowExisting: 3, inflowNew: 5, marketMovement: 10.32, outflows: 12 },
    { month: "Feb-2025", openingAUM: 20.54, closingAUM: 19.71, inflowExisting: 2.70, inflowNew: 0, marketMovement: 16.97, outflows: 0 },
    { month: "Jan-2025", openingAUM: 11.51, closingAUM: 24.53, inflowExisting: 0, inflowNew: 0, marketMovement: -11.33, outflows: 0 },
];

const MFSIPBook = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="bg-white w-full p-5">
            <div className="flex flex-row justify-between items-center mb-2">
                <Typography variant="h6" className="text-blue-500">MF AUM Growth</Typography>
                <Box className="flex justify-end">
                    {/* Tabs List */}
                    <Tabs className="!min-h-max" value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
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
                    label={<span className="text-xs">Show inflow/outflow only</span>}
                />
            }

            {activeTab === 0 && <MFAUMChart data={data} />}
            {activeTab === 1 && <MFAUMList data={data} />}
        </div>
    );
};

export default MFSIPBook;