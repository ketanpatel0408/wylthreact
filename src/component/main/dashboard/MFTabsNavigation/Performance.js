import React from "react";
import CommonChart from "../../chart/column";

const Performance = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            <CommonChart
                chartMaxHeight={460}
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
             <CommonChart
                chartMaxHeight={460}
                chartType="column"
                title={false}
                yAxisLabel="Amount"
                xAxisLabel="Period"
                legend={true}
                categories={['FY 22-23', 'FY 23-24', 'FY 24-25']}
                series={[
                    {
                        name: "Current AUM",
                        data: [1251435, 1036064, 1947094],
                        colorList: ["#35CC99", "#FFC107", "#0C4B70"]
                    }
                ]}
            />
        </div>
    )
}

export default Performance;