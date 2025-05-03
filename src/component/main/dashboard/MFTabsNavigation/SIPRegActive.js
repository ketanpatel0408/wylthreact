import React from "react";
import CommonChart from "../../chart/column";

const SIPRegActive = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <CommonChart
                chartMaxHeight={460}
                chartType="column"
                title={false}
                yAxisLabel="No. of SIP Registred"
                xAxisLabel="Period"
                legend={true}
                categories={['FY 22-23', 'FY 23-24', 'FY 24-25']}
                series={[
                    {
                        name: "Current FY SIP Reg.",
                        data: [10, 27, 22],
                        colorList: ["#35CC99", "#FFC107", "#0C4B70"]
                    }
                ]}
            />
            <CommonChart
                chartMaxHeight={460}
                chartType="column"
                title={false}
                yAxisLabel="No. of Active Investment A/C"
                xAxisLabel="Period"
                legend={true}
                categories={['FY 22-23', 'FY 23-24', 'FY 24-25']}
                series={[
                    {
                        name: "Current FY Active Inv. A/C",
                        data: [50, 500, 1507],
                        colorList: ["#35CC99", "#FFC107", "#0C4B70"]
                    }
                ]}
            />
        </div>
    )
}

export default SIPRegActive;