import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import MFTxnSummaryContent from "./MFTabsNavigation/MFTxnSummaryContent";
import CurrFYEarnings from "./MFTabsNavigation/CurrFYEarnings";
import Performance from "./MFTabsNavigation/Performance";
import SIPRegActive from "./MFTabsNavigation/SIPRegActive";
import MFReadiness from "./MFTabsNavigation/MFReadiness";
import { useMenu } from "../MenuManagement/MenuContext";

const findMenuItem = (name, data) => {
  for (let item of data) {
    if (item.name === name) return item;
    if (item.children) {
      const found = findMenuItem(name, item.children);
      if (found) return found;
    }
  }
  return null;
};

const MFTabsNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { menuData } = useMenu();

  const tabs = useMemo(() => [
    {
      label: "MF Txn. Summary",
      component: <MFTxnSummaryContent />,
      active: findMenuItem("MF Txn. Summary", menuData)?.active,
    },
    {
      label: "Curr. FY Earnings",
      component: <CurrFYEarnings />,
      active: findMenuItem("Curr. FY Earnings", menuData)?.active,
    },
    {
      label: "Performance",
      component: <Performance />,
      active: findMenuItem("Performance", menuData)?.active,
    },
    {
      label: "SIP Reg. & Active",
      component: <SIPRegActive />,
      active: findMenuItem("SIP Reg. & Active", menuData)?.active,
    },
    {
      label: "MF Readiness",
      component: <MFReadiness />,
      active: findMenuItem("MF Readiness", menuData)?.active,
    },
  ], [menuData]);

  const activeTabs = tabs.filter(tab => tab.active);

  useEffect(() => {
    if (activeTab >= activeTabs.length) {
      setActiveTab(0);
    }
  }, [activeTabs.length, activeTab]);

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
        {activeTabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            className="!text-[13px] !text-black !normal-case !font-normal"
          />
        ))}
      </Tabs>

      <Box className="p-4">
        {activeTabs[activeTab]?.component}
      </Box>
    </Box>
  );
};

export default MFTabsNavigation;