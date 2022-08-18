import React from "react";
import { Alert,  Snackbar } from "@mui/material";

const Error = ({ message, open, onClose}) => {
    const origin = {
        vertical: 'top',
        horizontal: 'center'
    }
    const { vertical, horizontal } = origin;
    return (
        <Snackbar
            open={open}
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={2000}
            onClose={onClose}
        >
            <Alert severity="error">{message}</Alert>
        </Snackbar>
    )
}
export default Error;