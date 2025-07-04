import React from "react";
import { Typography } from "@mui/material";
import Pie from "../../chart/pie";

const sipSeriesData = [
  { color: "#F0C141", name: "Equity", y: 18 },
  { color: "#35CC99", name: "Fixed Income", y: 5 },
  { color: "#57B3F1", name: "Cash", y: 7 },
  { color: "#FF8853", name: "Real Estate", y: 10 },
  { color: "#0C4B70", name: "Commodities", y: 3 },
  { color: "#f2e2af", name: "Others", y: 15 },
];

const totalY = sipSeriesData.reduce((sum, item) => sum + item.y, 0);

const ActiveSIP = () => {
  return (
    <div className="bg-white w-full p-5 h-full">
      <div>
        <Typography variant="h6" className="text-blue-500">Total Active SIP</Typography>
        <Typography variant="h5" className="!font-medium">{totalY}</Typography>
      </div>
      <Pie series={sipSeriesData} />
    </div>
  );
};

export default ActiveSIP;