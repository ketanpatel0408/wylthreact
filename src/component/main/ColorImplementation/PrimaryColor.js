import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { HexColorPicker } from "react-colorful";
import { useColor } from "./ColorContext";

const isLightColor = (hex) => {
    if (!hex) return false;
    const rgb = parseInt(hex.substring(1), 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = (rgb >> 0) & 0xff;
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
};

const PrimaryColor = () => {
    const { primaryColor, setPrimaryColor } = useColor();
    const [showPicker, setShowPicker] = useState(false);
    const [customColor, setCustomColor] = useState(primaryColor);
    const pickerRef = useRef(null);

    const handlePickerChange = (newColor) => {
        setPrimaryColor(newColor);
        setCustomColor(newColor);
    };

    const handleCustomColorChange = (e) => {
        const newColor = e.target.value;
        setCustomColor(newColor);
        if (/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(newColor)) {
            setPrimaryColor(newColor);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };

        if (showPicker) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPicker]);

    useEffect(() => {
        setCustomColor(primaryColor);
    }, [primaryColor]);


    return (
        <Box className="border-dashed border border-gray-300 bg-gray-100 p-2 rounded-md mb-10 relative">
            <Box className="flex items-start">
                <input type="hidden" id="BGColor" name="BGColor" value={primaryColor} />

                <Box
                    className="w-[60px] h-[60px] min-w-[60px] mt-1 rounded-lg shadow-md relative cursor-pointer overflow-hidden"
                    style={{ backgroundColor: primaryColor }}
                    onClick={() => setShowPicker(true)}
                >
                    <Box className="absolute inset-0 flex items-center justify-center opacity-100">
                        <i className={`fas fa-eye-dropper ${isLightColor(primaryColor) ? "text-black" : "text-gray-100"}`}></i>
                    </Box>
                </Box>

                <Box className="ml-5">
                    <Typography variant="h6" className="font-bold !text-[1rem]">Primary Color</Typography>
                    <Typography variant="body2">
                        This color change will affect all buttons, navigation bars, and tab colors in the platform.
                    </Typography>
                </Box>
            </Box>

            {showPicker && (
                <Box ref={pickerRef} className="absolute top-20 left-0 bg-white shadow-lg p-3 rounded-md border w-auto z-[9999]">
                    <HexColorPicker color={primaryColor} onChange={handlePickerChange} />

                    <TextField
                        label="Custom Color"
                        variant="outlined"
                        size="small"
                        value={customColor}
                        onChange={handleCustomColorChange}
                        className="!mt-4 !w-[200px] !block"
                    />
                </Box>
            )}
        </Box>
    );
};

export default PrimaryColor;