import React from "react";
import { Typography } from "@mui/material";
import CommonChart from "../../chart";

const CurrFYEarnings = () => {
    const earningsData = [
        { id: "lblCurFYTarget", label: "Current FY Target", value: "₹2,00,000.00" },
        { id: "lblYTDTarget", label: "Y T D Target", value: "₹1,66,666.67" },
        { id: "lblYTDActual", label: "Y T D Actual", value: "₹0.00" },
        { id: "lblYTDAchievement", label: "Y T D Achievement (%)", value: "0.00%" },
        { id: "lblYTDBonus", label: "Y T D Bonus", value: "₹0.00" },
    ];

    return (
        <div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
                {earningsData.map((item) => (
                    <div key={item.id} className="bg-white">
                        <Typography variant="h6" className="!font-bold text-blue-500 !text-[14px] !mb-1 text-nowrap">
                            {item.value}
                        </Typography>
                        <Typography variant="body2" className="!text-black !text-[12px]">
                            {item.label}
                        </Typography>
                    </div>
                ))}
            </div>
            <CommonChart
                chartMaxHeight={360}
                chartType="column"
                title={false}
                yAxisLabel="Amount"
                xAxisLabel="Current FY Month-wise Actual Earnings"
                categories={['Apr. 2020', 'May 2020', 'Jun 2020', 'July 2020', 'Aug. 2020', 'Sep. 2020', 'Oct. 2020', 'Nov. 2020', 'Dec. 2020', 'Jan. 2021', 'Feb. 2021', 'Mar. 2021']}
                series={[
                    {
                        name: "Data",
                        data: [15000, 20000, 10000, 15000, 25000, 15000, 20000, 30000, 25000],
                    }
                ]}
            />
        </div>
    );
};

export default CurrFYEarnings;