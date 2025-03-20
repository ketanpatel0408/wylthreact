import React from "react";
import { IconButton, Typography } from "@mui/material";
import CommonChart from "../../chart";

const MFAUMGrowth = () => {
    return (
        <div className="bg-white w-full p-[20px]">
            <div className="flex flex-row justify-between items-center mb-4">
                <Typography variant="h5" className="text-left !text-[16px] leading-6 font-normal tracking-normal text-blue-500 opacity-100">MF Transaction Summary</Typography>
                <div>
                    <IconButton size="small" className="text-gray-400">
                        <i className="fas fa-eye text-[12px]"></i>
                    </IconButton>
                </div>
            </div>

            <CommonChart
                chartType="column"
                title={false}
                yAxisLabel="Amount"
                xAxisLabel="Period"
                legend={true}
                categories={['FY 22-23', 'FY 23-24', 'FY 24-25']}
                series={[
                    {
                        name: "Current FY Earnings",
                        data: [50, 100.78, 30],
                        colorList: ["#35CC99", "#FFC107", "#0C4B70"]
                    }
                ]}
            />
        </div>
    )
}

export default MFAUMGrowth;