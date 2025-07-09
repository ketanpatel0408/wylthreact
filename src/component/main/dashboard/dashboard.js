import React from "react";
import RegulatoryCodeManagerSection from "./RegulatoryCodeManagerSection/RegulatoryCodeManagerSection";
import { useMenu } from "../MenuManagement/MenuContext";
import QuickAccessBox from "./QuickAccessBox";
import MFTabsNavigation from "./MFTabsNavigation";
import InvestmentTabs from "./InvestmentTabs";

const Dashboard = () => {
  const { menuData } = useMenu();

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

  return (
    <div>
      {findMenuItem("Code Relationship Manager Section", menuData)?.active && (
        <RegulatoryCodeManagerSection />
      )}
      {findMenuItem("Quick Access Section", menuData)?.active && (
        <div className="px-[20px] pt-[20px] pb-[10px]">
          <QuickAccessBox />
        </div>
      )}
      <div className={`px-[20px] py-[10px] grid grid-cols-1 gap-4 ${findMenuItem("Performance Section", menuData)?.active &&
        findMenuItem("Investment Tabs", menuData)?.active
        ? "lg:grid-cols-2"
        : "lg:grid-cols-1"
        }`}>
        {findMenuItem("Investment Tabs", menuData)?.active && (
          <InvestmentTabs />
        )}
        {findMenuItem("Performance Section", menuData)?.active && (
          <MFTabsNavigation />
        )}
       
      </div>
    </div>
  );
};

export default Dashboard;