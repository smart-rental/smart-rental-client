import React, { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";


const AmenitiesAutoComplete = ({value, setAmenities}) => {
    const [inputValue, setInputValue] = useState();
    const options = [
        { amenities: "Washer" },
        { amenities: "Dryer" },
        { amenities: "Air Conditioning" },
        { amenities: "Hardwood Floors" },
        { amenities: "Dishwasher" },
        { amenities: "Fireplace" },
        { amenities: "WiFi" },
        { amenities: "TV" },
        { amenities: "Heating System" },
        { amenities: "Pool" },
    ]

    return (
        <Autocomplete
            multiple
            autoHighlight
            disableCloseOnSelect
            sx={{mt: 2, mb: 2}}
            value={value}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => { 
                setInputValue(newInputValue);
            }}
            onChange={(event, value) => {
                setAmenities(value);
            }}
            options={options}
            getOptionLabel={(option) => option.amenities}
            isOptionEqualToValue={(option, value) => option.amenities === value.amenities}
            filterSelectedOptions
            renderInput={(params) => (
                <TextField label="Amenities" {...params} name="amenities" InputLabelProps={{ shrink: true }}/>
            )}/>
            
    );
};

export default AmenitiesAutoComplete;