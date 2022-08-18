import React from "react";
import { Button, Card, CardActions, CardContent, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PlaceIcon from '@mui/icons-material/Place';
import BedIcon from '@mui/icons-material/Bed';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import BathtubIcon from '@mui/icons-material/Bathtub';
import StraightenIcon from '@mui/icons-material/Straighten';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import Gallery from "../../../components/Gallery/Gallery";

const HouseCard = ({propertyInfo: { _id, location, squareFeet, images, rent, capacity, bed, bath } }) => {
    const navigate = useNavigate();
    return (
        <Card sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", alignContent: "center"}}>
                <div style={{ width: "200px"}}>
                    <Gallery images={images}/>
                </div>
                <CardContent>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <PlaceIcon/>
                        <Typography>
                            {location}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <PeopleOutlineIcon/>
                        <Typography>
                            Capacity: {capacity}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <BedIcon/>
                        <Typography>
                            Bed: {bed}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <BathtubIcon/>
                        <Typography>
                            Bath: {bath}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <StraightenIcon/>
                        <Typography>
                            Square Feet: {squareFeet}
                        </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" gap={1}>
                        <AttachMoneyIcon/>
                        <Typography>
                            Rent Price: ${rent}
                        </Typography>
                    </Stack>
                </CardContent>
                <CardActions>
                    <Button size="large" sx={{borderRadius: "20px"}} variant="contained" onClick={() => {
                        navigate(`/map/${location}/${_id}`);
                    }}>
                        <Typography fontFamily="Noto Sans">
                            View Listing
                        </Typography>
                    </Button>
                </CardActions>
        </Card>
    )
}

export default HouseCard;
