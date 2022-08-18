import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                padding: "0px 0px",
                background: "#F5F5F5"
            }}>
                <Grid container alignItems="center" justifyContent="center" spacing={10}>
                    <Grid item>
                        <Typography sx={{mb: 2}} fontFamily="Noto Sans" variant="h4">
                            Your one stop shop for all your rental needs
                        </Typography>
                        <Typography fontFamily="Noto Sans">
                            Manage your rental properties for Free.
                        </Typography>
                        <Typography fontFamily="Noto Sans">
                            One of the easiest ways to <span
                            style={{ color: "darkblue" }}>market your rental property</span>,
                            <br/>
                            <span style={{ color: "darkblue" }}>manage issues from tenants</span>, and <span
                            style={{ color: "darkblue" }}>collect rents online</span>.
                        </Typography>
                        <Typography fontFamily="Noto Sans">
                            Easily manage properties right from home.
                        </Typography>
                        <Button variant="contained" sx={{mt: 2}} onClick={() => {
                            navigate("/signup");
                        }}>
                            <Typography fontFamily="Noto Sans">
                                Create my free account
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Box
                            component="img"
                            alt="house"
                            sx={{
                                height: 500,
                                width: 700,
                                maxHeight: { xs: 233, md: 500 },
                                maxWidth: { xs: 350, md: 700 }
                            }}
                            src="../../../images/wfh.png"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                alignItems: "center",
                padding: "0px 0px",
                background: "#26a69a"
            }}>
                <Grid>
                    <Grid item>
                        <Typography style={{ color: "white" }} fontFamily="Noto Sans" variant="h4">
                            Say GoodBye to vacant homes!
                        </Typography>
                        <Typography style={{ color: "white" }} variant="h5" fontFamily="Noto Sans">
                            Create professional rental listings instantly.
                            Manage hundreds of properties easily.
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Box
                            component="img"
                            alt="house"
                            sx={{
                                height: 500,
                                width: 700,
                                maxHeight: { xs: 233, md: 500 },
                                maxWidth: { xs: 350, md: 600 }
                            }}
                            src="../../../images/rentFamily.png"
                        />
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                justifyContent: "center",
                padding: "0px 0px",
                background: "#F5F5F5"
            }}>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                        <Typography variant="h4" fontFamily="Noto Sans">
                            Renters
                        </Typography>
                        <ul>
                            <li>
                                <Typography fontFamily="Noto Sans">
                                    Find hundreds of properties
                                </Typography>
                            </li>
                            <li>
                                <Typography fontFamily="Noto Sans">
                                    Easily create and manage issues through our kanban style board to quickly address
                                    plumbing, electricity, or anything else
                                </Typography>
                            </li>
                            <li>
                                <Typography fontFamily="Noto Sans">
                                    Never miss a rental payment again with our auto payment feature
                                </Typography>
                            </li>
                            <li>
                                <Typography fontFamily="Noto Sans">
                                    Applying to homes has never been more easier!
                                </Typography>
                            </li>
                        </ul>
                        <Button variant="contained" onClick={() => navigate("/house")}>
                            <Typography fontFamily="Noto Sans">
                                Start finding your dream home
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Box
                            component="img"
                            alt="house"
                            sx={{
                                height: 500,
                                width: 700,
                                maxHeight: { xs: 233, md: 500 },
                                maxWidth: { xs: 350, md: 600 }
                            }}
                            src="../../../images/kanban.png"
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Home;