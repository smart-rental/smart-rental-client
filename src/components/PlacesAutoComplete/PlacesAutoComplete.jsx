import React, { useEffect } from "react";
import usePlacesAutocomplete from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import { Autocomplete, TextField } from "@mui/material";
import { useLoadScript } from "@react-google-maps/api";


const libraries = ['places'];

const PlacesAutoComplete = ({ name, label, style, valueProp, handleChange }) => {
    const {
        value,
        suggestions: { data },
        setValue,
        clearSuggestions
    } = usePlacesAutocomplete();

    useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries
    });
    
    useEffect(() => { 
        setValue(valueProp);
    }, [valueProp])
    const ref = useOnclickOutside(() => {
        // When user clicks outside the component, we can dismiss
        // the searched suggestions by calling this method
        clearSuggestions();
    });
    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    return (
        <div ref={ref}>
            <Autocomplete 
                autoHighlight
                disablePortal
                options={data}
                sx={{mt: 1}}
                value={{ description: value.toString() }}
                getOptionLabel={(option) => option.description}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(event, value) => {
                    if (value != null) {
                        const { description } = value;
                        handleInput(event);
                        handleChange((data) => ({...data, [name]: description}));
                    }
                }}
                renderInput={(params) =>
                    <TextField {...params} 
                               required
                               name={name}
                               onChange={handleInput}
                               label={label}
                               value={valueProp}
                               InputLabelProps={{
                                   shrink: true
                               }}
                               style={style}
                    />}
            />
        </div>
    );
}

export default PlacesAutoComplete;