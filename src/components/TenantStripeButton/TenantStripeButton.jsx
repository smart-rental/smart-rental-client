import React from "react";
import {
    stripeAutoPaymentCreation,
    stripeAutoPaymentDeletion
} from "../../api";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const TenantStripeButton = ({stripe_account, setSubmit, ownerId}) => {
    const handleStripeAutoPayment = async (e) => {
        e.preventDefault();
        try {
            const res = await stripeAutoPaymentCreation(ownerId);
            window.location.href = res.data.checkoutSession.url;
        } catch (e) {
            console.log(e);
        } finally {
            setSubmit(true);
        }
    };

    const handleStripeAutoPaymentDeletion = async (e) => {
        e.preventDefault();
        try {
            await stripeAutoPaymentDeletion(ownerId);
            await Swal.fire("", "Account Deleted. If you want to continue receiving payments please create another stripe account.", "success");
        } catch (e) {
            console.log(e);
        } finally {
            setSubmit(true);
        }
    };

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 1
        }}>
            {stripe_account ?
                <Button variant="contained" color="primary" onClick={handleStripeAutoPaymentDeletion}
                        sx={{ borderRadius: "15px", p: 1, mr: 1 }}>
                    <Typography fontFamily="Noto Sans">
                        Delete auto-payment
                    </Typography>
                </Button>
                :
                <Button variant="contained" color="primary" onClick={handleStripeAutoPayment}
                        sx={{ borderRadius: "15px", p: 1 }}>
                    <Typography fontFamily="Noto Sans">
                        Set up auto-payment with stripe
                    </Typography>
                </Button>
            }
        </Box>
    );
};

export default TenantStripeButton;