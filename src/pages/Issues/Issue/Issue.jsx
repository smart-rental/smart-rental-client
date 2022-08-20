import React from "react";
import { Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";
import Gallery from "../../../components/Gallery/Gallery";

const Issue = ({
                   issue: { _id, issueImage, issueType, issueDescription, status, timeStamp},
                   removeIssue,
                   editIssue,
               }) => {

    const dateToString = () => {
        const date = new Date(timeStamp);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`
    }

    return (
        <Grid item>
            <Card sx={{ maxWidth: 345 }}>
                <div style={{ display: "flex", justifyContent: "center"}}>
                    <Gallery images={issueImage}/>
                </div>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {issueType}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {issueDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Created: {dateToString()}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={() => editIssue(_id)}>
                        <Typography variant="contained">
                            Edit
                        </Typography>
                    </Button>
                    <Button size="small" onClick={() => {removeIssue(_id)}}>
                        <Typography variant="contained">
                            Delete
                        </Typography>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default Issue;