import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "react-router-dom";
import classes from "./styles";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../Store/slices/auth-slice";
import userActions from "../../Store/slices/users-slice";

const ResponsiveAppBar = () => {
    const LANDLORD = "Landlord";
    const TENANT = "Tenant";
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const userType = useSelector((state) => state.users.userType);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    
    const logOut = () => { 
        dispatch(authActions.actions.logout(null));
        dispatch(userActions.actions.removeUserType(null));
        dispatch(userActions.actions.removeUserData(null));
    }
    
    function displayLogIn() { 
        switch (userType) {
            case LANDLORD:
                return (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Noto Sans",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        Smart Rentals
                    </Typography>);
            case TENANT:
                return (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Noto Sans",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        Smart Rentals
                    </Typography>);
            default:
                return (
                    <Typography
                        variant="h6"
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "Noto Sans",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none"
                        }}
                    >
                        <Link to="/" style={classes.link}>Smart Rentals</Link>
                    </Typography>
                )
        }
    }

    return (
        <AppBar position="sticky" color="primary">
            {/*Desktop Version*/}
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {displayLogIn()}
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left"
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            style={classes.menu}
                        >
                            {userType == null && 
                                <>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to="/">Home Page</Link></Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to="/house">View Available
                                            Houses</Link></Typography>
                                    </MenuItem>
                                </>
                            }
                            {userType === LANDLORD &&
                                <>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to={`/landlord/${isLoggedIn}`}>Manage Properties</Link></Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to={`/addProperty/${isLoggedIn}`}>Add Property</Link></Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to={`/profile/${isLoggedIn}`}>Profile</Link></Typography>
                                    </MenuItem>
                                </>}
                            {userType === TENANT && 
                                <>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to="/house">View Available Houses</Link></Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to="/house">View Available Houses</Link></Typography>
                                    </MenuItem>
                                    <MenuItem>
                                        <Typography textAlign="center"><Link style={classes.menuItem} to="/house">View Available Houses</Link></Typography>
                                    </MenuItem>
                                </>
                            }
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {isLoggedIn == null &&
                            <>
                                <Link style={classes.link} to="/house">
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }}
                                                    fontFamily="Noto Sans">View Available Houses</Typography>
                                    </Button>
                                </Link>
                            </>
                            }
                        {(isLoggedIn != null && userType === LANDLORD) && 
                            <>
                                <Link style={classes.link} to={`/landlord/${isLoggedIn}`}>
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }} fontFamily="Noto Sans">Manage
                                            Properties</Typography>
                                    </Button>
                                </Link>
                                <Link style={classes.link} to={`/addProperty/${isLoggedIn}`}>
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }} fontFamily="Noto Sans">Add
                                            Property</Typography>
                                    </Button>
                                </Link>
                            </>
                        }
                        {(isLoggedIn != null && userType === TENANT) && 
                            <>
                                <Link style={classes.link} to={`/addIssue/${isLoggedIn}`}>
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }} fontFamily="Noto Sans">Add Issue</Typography>
                                    </Button>
                                </Link>
                                <Link style={classes.link} to={`/issue`}>
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }} fontFamily="Noto Sans">Issues</Typography>
                                    </Button>
                                </Link>
                            </>
                            }
                        {isLoggedIn != null && 
                            <>
                                <Link style={classes.link} to={`/profile/${isLoggedIn}`}>
                                    <Button style={classes.mobileButton} size="large">
                                        <Typography textAlign="center" style={{ color: "white" }} fontFamily="Noto Sans">Profile</Typography>
                                    </Button>
                                </Link>
                            </>
                        }
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        {isLoggedIn == null && <Link style={classes.link} to="/login">
                            <Button variant="contained" color="secondary" style={classes.mobileButton} size="large">
                                <Typography textAlign="center" style={classes.mobileTypography}>Login</Typography>
                            </Button>
                        </Link>}
                        {isLoggedIn == null && <Link style={classes.link} to="/signup">
                            <Button variant="contained" size="large">
                                <Typography textAlign="center" fontFamily="Noto Sans">Sign up</Typography>
                            </Button>
                        </Link>}
                        {isLoggedIn != null && <Link style={classes.link} to="/">
                            <Button variant="contained" size="large" onClick={logOut}>
                                <Typography textAlign="center" fontFamily="Noto Sans">Logout</Typography>
                            </Button>
                        </Link>}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;