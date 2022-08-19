import React from "react";
import { stripeAccountCreation, stripeAccountDeletion } from "../../api";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";

const LandLordStripeButton = ({stripe_account, setSubmit, ownerId}) => {
    const handleStripeAccountCreation = async (e) => {
        e.preventDefault();
        try {
            const res = await stripeAccountCreation(ownerId);
            window.location.href = res.data.accountLink.url;
        } catch (e) {
            await Swal.fire("Error", "Error creating account", "error");
        } finally {
            setSubmit(true);
        }
    };

    const handleStripeAccountDeletion = async (e) => {
        e.preventDefault();
        try {
            await stripeAccountDeletion(ownerId);
            await Swal.fire("", "Account Deleted. If you want to continue receiving payments please create another stripe account.", "success");
        } catch (e) {
            await Swal.fire("Error", "Error Deleting Account", "error");
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
                <Button variant="contained" color="primary" onClick={handleStripeAccountDeletion}
                        sx={{ borderRadius: "15px", p: 1, mr: 1 }}>
                    <Typography fontFamily="Noto Sans">
                        Delete Bank Account
                    </Typography>
                </Button>
                :
                <Button variant="contained" color="primary" onClick={handleStripeAccountCreation}
                        sx={{ borderRadius: "15px", p: 1 }}>
                    <Typography fontFamily="Noto Sans">
                        Set up Bank Account with Stripe
                    </Typography>
                </Button>
            }
        </Box>
    );
};

export default LandLordStripeButton;