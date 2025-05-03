import { Typography } from "@mui/material";
import React from "react";
import CommonChart from "../../chart/column";

const TotalAUM = () => {
    return (
        <div className="bg-white w-full p-5">
            <div>
                <Typography variant="h6" className="text-blue-500">Total AUM</Typography>
                <Typography variant="h5" className="!font-medium">₹ 34,99,843.23</Typography>
            </div>

           
        </div>
    )
}

export default TotalAUM;