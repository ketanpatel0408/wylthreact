import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import MFTxnSummaryContent from "./MFTabsNavigation/MFTxnSummaryContent";
import CurrFYEarnings from "./MFTabsNavigation/CurrFYEarnings";
import Performance from "./MFTabsNavigation/Performance";
import SIPRegActive from "./MFTabsNavigation/SIPRegActive";
import MFReadiness from "./MFTabsNavigation/MFReadiness";

const MFTabsNavigation = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box className="bg-white shadow-md rounded-md">
            <Tabs
                value={activeTab}
                onChange={handleChange}
                variant="scrollable"
                scrollButtons="auto"
                className="bg-gray-200"
            >
                <Tab label="MF Txn. Summary" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="Curr. FY Earnings" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="Performance" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="SIP Reg. & Active" className="!text-[13px] !text-black !normal-case !font-normal" />
                <Tab label="MF Readiness" className="!text-[13px] !text-black !normal-case !font-normal" />
            </Tabs>

            <Box className="p-4">
                {activeTab === 0 && <MFTxnSummaryContent /> }
                {activeTab === 1 && <CurrFYEarnings /> }
                {activeTab === 2 && <Performance /> }
                {activeTab === 3 && <SIPRegActive /> }
                {activeTab === 4 && <MFReadiness /> }
            </Box>
        </Box>
    );
}

export default MFTabsNavigation;