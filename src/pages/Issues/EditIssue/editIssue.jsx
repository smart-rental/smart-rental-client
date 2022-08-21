import React, { useEffect, useState } from "react";
import { Avatar, Backdrop, Button, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FeedbackIcon from '@mui/icons-material/Feedback';
import { retrieveIssue, updateIssue } from "../../../api";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import ListImage from "../../../components/ListImage/ListImage";
import { FileUpload } from "@mui/icons-material";
import Container from "@mui/material/Container";

const EditIssue = () => {
    const { issueId } = useParams();
    let initialState = {
        issueType: "",
        issueDescription: "",
        status: "",
        propertyId: ""
    }
    const [{issueType, issueDescription, status, propertyId}, setValues] = useState(initialState);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        retrieveIssue(issueId)
            .then((res) => {
                const { issueType, issueDescription, issueImage, status, propertyId } = res.data
                setValues({
                    issueType,
                    issueDescription,
                    status,
                    propertyId
                })
                setSelectedFiles(issueImage);
            })
            .catch((e) => {
                console.log(e);
            })
    }, [issueId]);

    const avatarStyle = {
        backgroundColor: "#26a69a"
    };

    const btnStyle = {
        margin: "8px 0"
    };

    const handleFileChange = (event) => {
        const filesGiven = event.target.files;
        for (const file of filesGiven) {
            previewFile(file);
        }
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedFiles(prev => [...prev, reader.result]);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setValues((prevState) => ({ ...prevState, [name]: value}));
    }

    const backdrop = () => {
        return (
            <>
                {
                    loading &&
                    <Backdrop open={loading} sx={{zIndex: 1}}>
                        <CircularProgress color="primary"/>
                    </Backdrop>
                }
            </>
        )
    }
    
    const changeIssue = (e) => {
        e.preventDefault();
        setLoading(true);
        const issueData = { 
            issueImage: selectedFiles,
            imagesToDelete,
            issueType,
            issueDescription,
            status,
            propertyId
        };
        updateIssue(issueId, issueData)
            .then(() => {
                setLoading(false);
                Swal.fire("Congratulations", "Your issue has been successfully edited", "success")
                    .then(() => {
                        window.history.back()
                    });
            })
            .catch((e) => {
                setLoading(false);
                if (e.response.status === 404) {
                    Swal.fire("Error", "You have not been added to a property. <br/> If this is a mistake please contact your landlord to add you to their list of properties", "error");
                } else {
                    Swal.fire("Error", "There was an issue editing your error", "error");
                    console.log(e);
                }
            })
    }

    return (
        <form onSubmit={changeIssue}>
            {backdrop()}
            <Container>
                    <Grid align="center" style={{marginTop: "20px"}}>
                        <Avatar style={avatarStyle}><FeedbackIcon/></Avatar>
                        <Typography variant="h5" fontFamily="Noto Sans">Edit Issue</Typography>
                        <Typography variant="h5" fontFamily="Noto Sans">
                            Issues will be automatically sent to your landlord.
                        </Typography>
                    </Grid>
                    <TextField
                        fullWidth
                        style={btnStyle}
                        id="select"
                        label="Issue Type"
                        select
                        name="issueType"
                        value={issueType}
                        onChange={handleChange}
                        required
                        InputLabelProps={{
                            shrink: true
                        }}>
                        <MenuItem value={"Plumbing"}>Plumbing</MenuItem>
                        <MenuItem value={"Electrical"}>Electrical</MenuItem>
                        <MenuItem value={"Structural Damage"}>Structural Damage</MenuItem>
                        <MenuItem value={"Heating"}>Heating</MenuItem>
                        <MenuItem value={"Roof Leaks"}>Roof Leaks</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                    </TextField>
                    <TextField
                        rows={8}
                        fullWidth
                        multiline
                        label="Issue Description"
                        sx={{mt: 1}}
                        onChange={handleChange}
                        name="issueDescription"
                        value={issueDescription}
                        placeholder="Brief description of your issue (optional)"
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button variant="contained" style={btnStyle} endIcon={<FileUpload/>} component="label">
                        <Typography variant="contained">
                            Upload Issue Images
                        </Typography>
                        <input onChange={handleFileChange} hidden multiple type="file" />
                    </Button>
                    <ListImage
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        imagesToDelete={imagesToDelete}
                        setImagesToDelete={setImagesToDelete}
                    />
                    <br/>
                    <Button type="submit" color="primary" variant="contained" fullWidth>
                        <Typography fontFamily="Noto Sans">Submit</Typography>
                    </Button>
            </Container>
        </form>
    );
};

export default EditIssue;