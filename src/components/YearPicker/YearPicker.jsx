import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";

const options = [];
const date = new Date();
for (let i = 1800; i <= date.getFullYear(); i++) { 
    options.push({
        year: i.toString()
    })
}

const YearPicker = ({ value, setYearBuilt, name}) => {
    const [inputValue, setInputValue] = useState("");
    return (
        <div>
            <Autocomplete 
                options={options}
                disableCloseOnSelect
                autoHighlight
                getOptionLabel={(option) => option.year || ""}
                filterSelectedOptions
                value={value}
                inputValue={inputValue}
                freeSolo
                onInputChange={(_, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                onChange={(_, newValue) => { 
                    setYearBuilt((prev) => ({...prev, [name]: newValue}));
                }}
                renderInput={(params) => 
                    <TextField
                        {...params}
                        required
                        fullWidth
                        sx={{
                            mr: 2
                        }}
                        name={name}
                        label="Built"
                        value={value}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />} 
            />
        </div>
    );
};

export default YearPicker;