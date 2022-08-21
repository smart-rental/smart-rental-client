import React, { useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import HouseIcon from "@mui/icons-material/House";
import Swal from "sweetalert2";
import { addTenant, deleteTenant } from "../../../../api";
import Container from "@mui/material/Container";
import PhoneInput from "react-phone-input-2";

const AddTenant = () => {
    let { ownerId, propertyId } = useParams();
    const initialState = {
        name: "",
        email: "",
        phoneNumber: ""
    };
    const [{ name, email, phoneNumber }, setValues] = useState(initialState);
    const navigate = useNavigate();

    const avatarStyle = {
        backgroundColor: "#26a69a"
    };

    const btnStyle = {
        margin: "8px 4px"
    };

    const reset = () => {
        setValues({ ...initialState });
        navigate(`/landlord/${ownerId}`);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value }));
    };

    const addUser = (e) => {
        e.preventDefault();
        const tenantToAdd = {
            email,
            phoneNumber,
            name
        };
        addTenant(ownerId, propertyId, tenantToAdd)
            .then(() => {
                Swal.fire("Congratulations", "The tenant has been added", "success").then(reset);
            })
            .catch((e) => {
                console.log(e);
                Swal.fire("Try Again", "There does not seem to be a user that matches", "error");
            });
    };

    const removeTenant = () => {
        deleteTenant(ownerId, propertyId)
            .then(() => {
                Swal.fire("Congratulations", "The tenant has been removed", "success").then(reset);
            })
            .catch(() => {
                Swal.fire("Try Again", "There was an error removing the tenant", "error");
            });
    };

    return (
        <form onSubmit={addUser}>
            <Container>
                <Grid align="center" style={{marginTop: "20px"}}>
                    <Avatar style={avatarStyle}><HouseIcon/></Avatar>
                    <Typography variant="h5" fontFamily="Noto Sans">Add Tenant</Typography>
                </Grid>
                <Paper style={{
                    padding: 20,
                    height: "40vh",
                    width: 332,
                    margin: "20px auto"
                }}>
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="name"
                        id="outlined-required"
                        label="Tenant Name"
                        value={name}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        required
                        style={btnStyle}
                        fullWidth
                        onChange={handleChange}
                        name="email"
                        id="outlined-required"
                        label="Tenant Email"
                        value={email}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <PhoneInput
                        country={'us'}
                        value={phoneNumber}
                        disableDropdown
                        onlyCountries={['us']}
                        required
                        onChange={phone => setValues((prevState) => ({...prevState, ["phoneNumber"]: phone}))}
                    />
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} onClick={addUser}>
                        <Typography fontFamily="Noto Sans">Add</Typography>
                    </Button>
                    <Button type="submit" sx={{ bgcolor: "red" }} variant="contained" style={btnStyle} onClick={removeTenant}>
                        <Typography fontFamily="Noto Sans">Remove</Typography>
                    </Button>
                </Paper>
            </Container>
        </form>
    );
};

export default (AddTenant);