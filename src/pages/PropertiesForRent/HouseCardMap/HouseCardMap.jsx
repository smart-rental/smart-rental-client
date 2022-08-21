import React, { useEffect, useState } from "react";
import { Divider, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { getPropertyByID, getUser } from "../../../api";
import Gallery from "../../../components/Gallery/Gallery";
import Map from "../../../components/Map/Map";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import StraightenIcon from "@mui/icons-material/Straighten";
import PaidIcon from "@mui/icons-material/Paid";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import PetsIcon from "@mui/icons-material/Pets";
import ImageIcon from "@mui/icons-material/Image";
import BuildIcon from "@mui/icons-material/Build";
import { OtherHouses } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import EasyApplyModal from "../../../components/EasyApplyModal/EasyApplyModal";
import Container from "@mui/material/Container";

const HouseCardMap = () => {
    const { propertyId } = useParams();
    const initialState = {
        location: "",
        images: [],
        built: new Date(),
        amenities: [],
        squareFeet: "",
        rent: "",
        capacity: "",
        parkingStalls: "",
        pets: "",
        utilities: "",
        bed: "",
        bath: "",
        description: ""
    };
    const [{
        images,
        location,
        built,
        squareFeet,
        rent,
        capacity,
        pets,
        utilities,
        parkingStalls,
        bed,
        bath,
        description,
        amenities,
        ownerId
    }, setProperty] = useState(initialState);
    const [{ landlordName, phoneNumber, email }, setLandlord] = useState({
        landlordName: "",
        phoneNumber: "",
        email: ""
    });
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    function formatPhoneNumber() {
        const cleaned = ("" + phoneNumber).replace(/\D/g, "");
        const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            const intlCode = (match[1] ? "+1 " : "");
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return null;
    }

    const petToString = () => {
        return pets ? "Allowed" : "Not Allowed";
    };
    
    useEffect(() => {
        let isMounted = true;
        async function retrieveData() {
            const property = await getPropertyByID(propertyId);
            setProperty(property.data);
            const user = await getUser(ownerId);
            if (user) {
                const { name, phoneNumber, email } = user.data;
                setLandlord({ landlordName: name, phoneNumber, email });
            }
        }

        retrieveData();
        return () => {
            isMounted = false;
        };
    }, [ownerId, propertyId]);

    return (
        <Container sx={{ width: "100%", height: "93vh", mt: 2 }}>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Gallery width="60%" images={images}/>
                <Box sx={{
                    position: "absolute",
                    top: "30%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: 'rgba(0, 0, 0, 0.54)',
                    borderRadius: "15px",
                    padding: 1,
                    color: 'white',
                }}>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <ImageIcon/>
                        <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                            {images.length} Photos
                        </Typography>
                    </Stack>
                </Box>
            </div>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1, mt: 1 }}>
                <PlaceIcon/>
                <Typography variant="h5" component="h2">
                    {location}
                </Typography>
            </Stack>
            <Map/>
            <br/>
            <Typography variant="h6" component="h2">
                Pricing
            </Typography>
            <Stack direction="row" alignItems="center" gap={1} sx={{ mt: 2, mb: 1 }}>
                <PaidIcon/>
                <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                    Rent Price: ${rent}
                </Typography>
            </Stack>
            <Divider/>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                Property Information
            </Typography>
            <List component={Stack} direction="row" spacing={4} alignItems="center" justifyContent="center">
                <ListItem>
                    <ListItemIcon>
                        <PeopleOutlineIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Capacity: ${capacity}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <StraightenIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Square Feet: ${squareFeet}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <BuildIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Built: ${built}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <BathtubIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Bath: ${bath}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <BedIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Bed: ${bed}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
            </List>
            <Divider/>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                Description
            </Typography>
            <Typography variant="h7" component="h4" sx={{ mt: 2, mb: 1 }}>
                {description ? description : "N/A"}
            </Typography>
            <Divider/>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                Features
            </Typography>
            <List component={Stack} direction="row" spacing={17} alignItems="center" justifyContent="center">
                <ListItem>
                    <ListItemIcon>
                        <PetsIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Pets: ${petToString()}`} sx={{ m: -2 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <OtherHouses/>
                    </ListItemIcon>
                    <ListItemText primary={`Utilities: ${utilities}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <LocalParkingIcon/>
                    </ListItemIcon>
                    <ListItemText primary={`Parking Stalls: ${parkingStalls}`} sx={{ m: -3 }}
                                  primaryTypographyProps={{ fontSize: 18, fontWeight: "medium" }}/>
                </ListItem>
            </List>
            <Divider/>
            <Typography variant="h6" component="h2" sx={{ mt: 2 }}>
                Amenities
            </Typography>
            <ul style={{ marginTop: 0 }}>
                {amenities.map((amenity, index) => (
                    <li key={index}>
                        <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                            {amenity}
                        </Typography>
                    </li>
                ))}
            </ul>
            <Divider/>
            <Typography variant="h6" component="h2" sx={{ mt: 2, mb: 1 }}>
                Contact Information
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                LandLord: {landlordName}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                Phone Number: {formatPhoneNumber()}
            </Typography>
            <Typography sx={{ fontSize: 18, fontWeight: "medium" }}>
                Email: {email}
            </Typography>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "2%",
                mb: 4
            }}>
                <Button fullWidth variant="contained" onClick={handleOpen}>
                    <Typography fontFamily="Noto Sans">
                        Easy Apply
                    </Typography>
                </Button>
                <EasyApplyModal
                    open={open}
                    handleClose={handleClose}
                />
            </Box>
        </Container>
    );
};

export default HouseCardMap;