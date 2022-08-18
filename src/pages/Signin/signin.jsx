import React, { useEffect, useState } from "react";
import { Avatar, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { getUsers, validateUser } from "../../api";
import classes from "./styles";
import { useDispatch } from "react-redux";
import authActions from "../../Store/slices/auth-slice";
import userActions from "../../Store/slices/users-slice";
import Swal from "sweetalert2";

const SignIn = () => {
    const { paper, avatar, link, btnStyle } = classes;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false
    });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers()
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

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
        setValues(prevState => ({...prevState, [name]: value}));
    }

    const submitLogin = (e) => {
        e.preventDefault();
        const { email, password } = values;
        const userCredentials = {
            email,
            password
        };
        let userInfo = users.find(users => users.email === email);
        //Call the backend
        validateUser(userCredentials)
            .then(() => {
                navigate(`/profile/${userInfo._id}`);
                dispatch(authActions.actions.login(userInfo._id)); 
                dispatch(userActions.actions.setUserType(userInfo.userType));
                dispatch(userActions.actions.setUserData(userInfo));
            })
            .catch(() => Swal.fire("Try Again", "It seems you have entered the wrong password or email", "error"));
    };

    return (
        <form onSubmit={submitLogin}>
            <Grid>
                <Paper elevation={10} style={paper}>
                    <Grid align="center">
                        <Avatar style={avatar}><LockOutlinedIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Sign in</Typography>
                    </Grid>
                    <TextField sx={{mt: 2}} label="Email" name="email" type="email" value={values.email} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }}/>
                    <TextField sx={{mt: 2}} label="Password" name="password" value={values.password} type={values.showPassword ? "text" : "password"} onChange={handleChange} fullWidth InputLabelProps={{ shrink: true }} InputProps={{endAdornment:
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                    }}/>
                    <Button type="submit" color="primary" variant="contained" style={btnStyle} fullWidth>
                        <Typography
                            fontFamily="Noto Sans"
                        >
                            Sign in
                        </Typography>
                    </Button>
                    <Typography fontFamily="Noto Sans">
                        Don't have an account? &nbsp;
                        <Link to="/signup" style={link}>
                            Sign up
                        </Link>
                    </Typography>
                </Paper>
            </Grid>
        </form>
    );
};

export default SignIn;