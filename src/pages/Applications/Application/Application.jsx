import React from "react";
import { Button, Card, CardActions, CardContent, Divider, Stack, Typography } from "@mui/material";

const Application = ({application: {_id, animals, dob, email, monthlyIncome, name, occupants, occupation, phoneNumber, message, timeStamp}, resolveApplication}) => {
    
    const dateToString = (d) => {
        const date = new Date(d);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`
    }
    
    return (
        <Card sx={{ alignItems: "center", alignContent: "center"}}>
            <CardContent>
                <Typography variant="h6" component="h2">
                    Contact Information
                </Typography>
                <Divider/>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Name: {name}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Date of Birth: {dateToString(dob)}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Email: {email}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Phone Number: {phoneNumber}
                    </Typography>
                </Stack>

                <Typography variant="h6" component="h2" sx={{mt: 1}}>
                     Information
                </Typography>
                <Divider/>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Occupation of renter: {occupation}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Monthly Income: ${monthlyIncome}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Animals: {animals}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Number of Occupants: {occupants}
                    </Typography>
                </Stack>

                <Typography variant="h6" component="h2" sx={{mt: 1}}>
                    Additional Information
                </Typography>
                <Divider/>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Date Applied: {dateToString(timeStamp)}
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={1}>
                    <Typography>
                        Message: {message}
                    </Typography>
                </Stack>
            </CardContent>
            <CardActions>
                <Button size="large" variant="contained" onClick={() => {
                    resolveApplication(_id);
                }}>
                    <Typography>
                        Resolve Application
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
};

export default Application;