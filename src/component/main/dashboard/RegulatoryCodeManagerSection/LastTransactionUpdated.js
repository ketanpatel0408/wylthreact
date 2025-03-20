import React from "react";
import { Box, Typography } from "@mui/material";

const LastTransactionUpdated = () => {
    return (
        <div className="w-full">
            <Box className="md:text-right">
                <Typography
                    variant="body2"
                    color="textSecondary"
                    gutterBottom
                    sx={{
                        display: 'block',
                        fontWeight: 500,
                        color: 'text.secondary'
                    }}
                >
                    Last Transaction Updated On
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        fontWeight: 'bold',
                        color: 'text.primary',
                        m: 0
                    }}
                >
                    27 Jan 2025 05:07 PM
                </Typography>
            </Box>
        </div>
    )
}

export default LastTransactionUpdated;