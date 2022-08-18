import React, { useEffect, useState } from "react";
import { deleteApplication, getPropertyByID, retrieveApplication } from "../../api";
import { useParams } from "react-router-dom";
import { Grid, Pagination } from "@mui/material";
import Application from "./Application/Application";
import Typography from "@mui/material/Typography";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";

const Applications = () => {
    const { propertyId } = useParams();
    const [applications, setApplications] = useState([]);
    const [propertyName, setPropertyName] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        retrieveApplication(propertyId)
            .then((res) => {
                setApplications(res.data.applications);
                setNumberOfPages(res.data.totalPages);
            })
            .catch((err) => {
                console.log(err);
            });
        getPropertyByID(propertyId)
            .then((res) => {
                setPropertyName(res.data.location);
            });
    }, [propertyId, pageNumber]);

    const resolveApplication = (applicationId) => {
        deleteApplication(applicationId).then(() => {
            setApplications(applications.filter(application => application._id !== applicationId));
            Swal.fire("", "Application has been resolved", "success");
        });
    };

    const handlePageChange = (event, value) => {
        setPageNumber(value - 1);
    };

    return (
        <>
            {applications.length === 0 ? <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: 1
                }}>
                    <Typography variant="h4">
                        No applications for {propertyName}
                    </Typography>
                </Box> :
                <>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 3,
                        mb: 4
                    }}>
                        <Typography variant="h4" component="h1" fontFamily="Noto Sans">
                            Displaying Applications for {propertyName}
                        </Typography>
                    </Box>
                    <Grid container alignItems="center" justifyContent="center" direction="row" spacing={2}>
                        {applications ? applications.map((application, index) => {
                            return (
                                <Grid item key={index}>
                                    <Application application={application} resolveApplication={resolveApplication}/>
                                </Grid>
                            );
                        }) : ""}
                    </Grid>
                    <Box sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mt: 2
                    }}>
                        <Pagination onChange={handlePageChange} count={pages.length} variant="outlined"
                                    color="primary"/>
                    </Box>
                </>}

        </>

    );
};

export default Applications;