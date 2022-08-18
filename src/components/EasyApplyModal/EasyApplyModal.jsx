import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Divider, InputAdornment, Modal, Stack, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { addApplication } from "../../api";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import PhoneInput from "react-phone-input-2";

const EasyApplyModal = ({ handleClose, open }) => {
    const { propertyId } = useParams();
    const [{firstName, lastName, dob, email, phoneNumber, occupation, monthlyIncome, animals, vehicles, occupants, message}, setApplication] = useState({
        firstName: "",
        lastName: "",
        dob: "",
        email: "",
        phoneNumber: "",
        occupation: "",
        monthlyIncome: "",
        animals: "",
        vehicles: "",
        occupants: "",
        message: ""
    });
    
    const handleChange = (event) => { 
        let { name, value } = event.target;
        const numbersInput = ["monthlyIncome", "animals", "vehicles", "occupants", "phoneNumber"];
        if (numbersInput.includes(name) && value < 0) {
            value = 0;
        }
        setApplication((previous) => ({...previous, [name]: value}));
        
    }
    
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000,
        bgcolor: "background.paper",
        borderRadius: "10px",
        boxShadow: 24,
        p: 4
    };
    
    const reset = () => { 
        setApplication({
            firstName: "",
            lastName: "",
            dob: "",
            email: "",
            phoneNumber: "",
            occupation: "",
            monthlyIncome: "",
            animals: "",
            vehicles: "",
            occupants: "",
            message: ""
        });
    }
    
    const submitApplication = (e) => { 
        e.preventDefault();
        const application = {
            propertyId,
            name: `${firstName} ${lastName}`,
            email,
            occupation,
            phoneNumber,
            monthlyIncome,
            animals,
            vehicles,
            occupants,
            dob,
            message
        }
        addApplication(propertyId, application)
            .then(() => {
                Swal.fire("Successfully Submitted", "Your landlord will respond to you soon", "success");
                reset();
                handleClose();
            })
            .catch(() => {
                Swal.fire("This ones on us", "There seems to have been a problem on our part", "error");
            })
    }

    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={submitApplication}>
                    <Typography variant="h6" component="h2">
                        Contact Information
                    </Typography>
                    <Divider orientation="horizontal"/>
                    <Stack direction="row" spacing={1} sx={{mt: 2}}>
                        <TextField name="firstName" value={firstName} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} label="First Name"/>
                        <TextField name="lastName" value={lastName} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} label="Last Name"/>
                        <TextField name="dob" value={dob} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} label="DOB" type="date"/>
                    </Stack>
                    <Stack direction="row" spacing={1} sx={{mt: 2}}>
                        <TextField name="email" value={email} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} label="Email" type="email"/>
                        <PhoneInput
                            country={'us'}
                            style={{width: 400}}
                            value={phoneNumber}
                            disableDropdown
                            onlyCountries={['us']}
                            onChange={phone => setApplication((prevState) => ({...prevState, ["phoneNumber"]: phone}))}
                        />                    </Stack>
                    <Typography variant="h6" component="h2" sx={{mt: 2}}>
                        Personal Information
                    </Typography>
                    <Divider orientation="horizontal"/>
                    <Stack direction="row" spacing={1} sx={{mt: 2}}>
                        <TextField name="occupation" value={occupation} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} label="Occupation"/>
                        <TextField name="monthlyIncome" value={monthlyIncome} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} type="number" label="Monthly Income" InputProps={{startAdornment: <InputAdornment position="start">$</InputAdornment>}}/>
                    </Stack>
                    <TextField name="animals" value={animals} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} type="number" label="Number of Animals" sx={{ mt: 2 }}/>
                    <TextField name="vehicles" value={vehicles} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} type="number" label="Number of Vehicles" sx={{ mt: 2 }}/>
                    <TextField name="occupants" value={occupants} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} type="number" label="Number of occupants" sx={{ mt: 2 }}/>
                    <Typography variant="h6" component="h2" sx={{mt: 1}}>
                        Additional Information
                    </Typography>
                    <Divider orientation="horizontal"/>
                    <TextField name="message" value={message} onChange={handleChange} fullWidth multiline InputLabelProps={{ shrink: true }} label="Message to landlord" rows={4} sx={{ mt: 2, mb: 2 }}/>
                    <Button type="submit" variant="contained" sx={{ mr: "20px" }}>
                        Submit Application
                    </Button>
                    <Button variant="contained" onClick={handleClose} sx={{ bgcolor: "red" }}>
                        Close
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default EasyApplyModal;