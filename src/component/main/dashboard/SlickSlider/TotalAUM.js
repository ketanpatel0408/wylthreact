import React from "react";
import { Typography } from "@mui/material";
import Pie from "../../chart/pie";

const aumSeriesData = [
  {
    AUM: "40,04,284.32",
    MappedAUM: "36,42,927.58",
    UnmappedAUM: "3,61,356.74",
    color: "#F0C141",
    name: "Equity",
    y: 72.38,
  },
  {
    AUM: "14,14,128.89",
    MappedAUM: "93,853.98",
    UnmappedAUM: "13,20,274.92",
    color: "#35CC99",
    name: "Fixed Income",
    y: 25.56,
  },
  {
    AUM: "1,13,754.49",
    MappedAUM: "1,03,773.92",
    UnmappedAUM: "9,980.57",
    color: "#57B3F1",
    name: "Cash",
    y: 2.06,
  },
  {
    AUM: "0.00",
    MappedAUM: null,
    UnmappedAUM: null,
    color: "#FF8853",
    name: "Real Estate",
    y: 0,
  },
  {
    AUM: "223.51",
    MappedAUM: "59.41",
    UnmappedAUM: "164.10",
    color: "#0C4B70",
    name: "Commodities",
    y: 0,
  },
  {
    AUM: "0.00",
    MappedAUM: null,
    UnmappedAUM: null,
    color: "#f2e2af",
    name: "Others",
    y: 0,
  }
];

const totalAUM = aumSeriesData.reduce((sum, item) => {
  const aum = parseFloat(item.AUM.replace(/,/g, ""));
  return sum + (isNaN(aum) ? 0 : aum);
}, 0);

const TotalAUM = () => {
  return (
    <div className="bg-white w-full p-5 h-full">
      <div>
        <Typography variant="h6" className="text-blue-500">Total AUM</Typography>
        <Typography variant="h5" className="!font-medium">₹ {totalAUM.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</Typography>
      </div>
      <Pie series={aumSeriesData} />
    </div>
  );
};

export default TotalAUM;