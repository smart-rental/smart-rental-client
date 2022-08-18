import React, { useState } from "react";
import {
    Avatar,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createUser, getUsers } from "../../api";
import Swal from "sweetalert2";
import classes from "./styles";
import { useDispatch } from "react-redux";
import authActions from "../../Store/slices/auth-slice";
import userActions from "../../Store/slices/users-slice";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

const Signup = () => {
    const { paper, avatar, link, topMargin } = classes;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
        userType: "",
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues((prevState) => ({...prevState, [name]: value}));
    };

    const retrieveNewUser = (userLogin) => {
        getUsers().then((response) => {
            let userInfo = response.data.find(users => users.email === userLogin.email);
            navigate(`/profile/${userInfo._id}`);
            dispatch(authActions.actions.login(userInfo._id));
            dispatch(userActions.actions.setUserType(userInfo.userType));
        });
    };

    const submitLogin = (e) => {
        e.preventDefault();
        const { name, email, password, userType, phoneNumber } = values;
        const userLogin = {
            name,
            email,
            phoneNumber,
            password,
            userType
        };
        createUser(userLogin)
            .then(() => {
                retrieveNewUser(userLogin);
            })
            .catch((res) => {
                switch (res.response.status) {
                    case 409:
                        Swal.fire("Email already exits", "Seems that a user with given email already exits", "error");
                        break;
                    case 500:
                        Swal.fire("This ones on us", "Looks like there was an internal server error", "error");
                        break;
                    case 400:
                        let message = "";
                        for (const response of res.response.data.message) {
                            message = `${response.message}`;
                        }
                        Swal.fire("", `${message}`, "error");
                        break;
                    default:
                        break;
                }
            });
    };

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={paper}>
                    <Grid align="center">
                        <Avatar style={avatar}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign up</Typography>
                    </Grid>
                    <TextField label="Name" sx={{mt: 2}} values={values.name} name="name" onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField label="Email" sx={{mt: 2}} values={values.email} name="email" type="email" onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField label="Password" sx={{mt: 2}} values={values.password} type={values.showPassword ? "text" : "password"} name="password" onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} InputProps={{endAdornment:
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                    }}/>
                    <TextField label="Re-Enter Password" sx={{mt: 2}} type={values.showPassword ? "text" : "password"} values={values.confirmPassword} name="confirmPassword" onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} InputProps={{endAdornment:
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                    }}/>
                    <PhoneInput
                        country={'us'}
                        style={topMargin}
                        value={values.phoneNumber}
                        disableDropdown
                        onlyCountries={['us']}
                        onChange={phone => setValues((prevState) => ({...prevState, ["phoneNumber"]: phone}))}
                    />
                    <FormControl sx={{mt: 2}}>
                        <FormLabel>User Type</FormLabel>
                        <RadioGroup
                            row
                            name="userType"
                            value={values.userType}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="Landlord" control={<Radio />} label="Landlord" />
                            <FormControlLabel value="Tenant" control={<Radio />} label="Tenant" />
                        </RadioGroup>
                    </FormControl>
                    <Button type="submit" color="primary" variant="contained" style={topMargin}
                            fullWidth>
                        <Typography
                            fontFamily="Noto Sans"
                        >
                            Sign up
                        </Typography>
                    </Button>
                    <Typography style={topMargin} fontFamily="Noto Sans">
                        Already have an account? &nbsp;
                        <Link to="/login" style={link}>
                            Sign in
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    );
};

export default Signup;