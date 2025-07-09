import React, { useState, useEffect, useMemo } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SIPRegActive from "./MFTabsNavigation/SIPRegActive";
import { useMenu } from "../MenuManagement/MenuContext";
import TotalAUM from "./InvestmentTabs/TotalAUM";
import MFAUMGrowth from "./InvestmentTabs/MFAUMGrowth";
import MFSIPBook from "./InvestmentTabs/MFSIPBook";
import ActiveSIP from "./InvestmentTabs/ActiveSIP";

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
      label: "Total AUM",
      component: <TotalAUM />,
      active: findMenuItem("Total AUM", menuData)?.active,
    },
    {
      label: "MF AUM Growth",
      component: <MFAUMGrowth />,
      active: findMenuItem("MF AUM Growth", menuData)?.active,
    },
    {
      label: "MF SIP Book",
      component: <MFSIPBook />,
      active: findMenuItem("MF SIP Book", menuData)?.active,
    },
    {
      label: "Active SIPs",
      component: <ActiveSIP />,
      active: findMenuItem("Active SIPs", menuData)?.active,
    },
    {
      label: "SIP Reg. & Active",
      component: <SIPRegActive />,
      active: findMenuItem("SIP Reg. & Active", menuData)?.active,
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
        sx={{
          '& .MuiTabs-flexContainer': {
            justifyContent: 'space-between',
            minWidth: '100%',
          },
        }}
      >
        {activeTabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            className="!text-[12px] !text-black !normal-case !font-normal"
          />
        ))}
      </Tabs>

      <Box className="p-4">
        {activeTabs.map((tab, index) => (
          <div
            key={index}
            style={{ display: index === activeTab ? "block" : "none" }}
          >
            {React.cloneElement(tab.component, { isActive: index === activeTab })}
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default MFTabsNavigation;