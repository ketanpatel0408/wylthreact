import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput } from "@mui/material";
import { useAlert } from "./alert/AlertProvider";

const options = [
    { id: "17821", label: "JAYDEEP (ARN-3007)" },
    { id: "17822", label: "RAHUL (ARN-5001)" },
    { id: "17823", label: "PRIYA (ARN-2003)" },
];

const ARNRIACode = () => {
    const [selectedValues, setSelectedValues] = useState([options[0].id]);
    const showAlert = useAlert();
    

    const handleChange = (event) => {
        const newValues = event.target.value;

        if (newValues.length === 0) {
            showAlert("At least one value must be selected", "error");
            return;
        }

        setSelectedValues(newValues);
    };

    return (
        <div className="w-full">
            <FormControl fullWidth>
                <InputLabel>Code (ARN/RIA)</InputLabel>
                <Select
                    multiple
                    value={selectedValues}
                    onChange={handleChange}
                    input={<OutlinedInput label="Code (ARN/RIA)" />}
                    renderValue={(selected) =>
                        selected
                            .map((id) => options.find((option) => option.id === id)?.label)
                            .join(", ")
                    }
                    className="bg-white"
                >
                    {options.map((option) => (
                        <MenuItem
                            key={option.id}
                            value={option.id}
                            // Prevent deselection of the last remaining option
                            disabled={selectedValues.length === 1 && selectedValues.includes(option.id)}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}

export default ARNRIACode;