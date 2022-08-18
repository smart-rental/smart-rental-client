import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonIcon from '@mui/icons-material/Person';
import Kebab from "../../../components/Kebab/Kebab";
import DescriptionIcon from '@mui/icons-material/Description';
import BugReportIcon from '@mui/icons-material/BugReport';
import { Chip } from "@mui/material";
import TableBody from "@mui/material/TableBody";

const Property = ({property: { _id, location, built, squareFeet, rent, capacity, parkingStalls, pets, utilities, bed, bath, tenant, rent_payment_status }, landlordId, removeProperty, users}) => {
    const checkOrX = (bool) => {
        return bool ? <CheckCircleIcon style={{color: "green"}}/> : <CancelIcon style={{color: "red"}}/>
    }
    
    const renderPaymentStatus = () => {
        switch(rent_payment_status) {
            case "paid":
                return (<Chip label={rent_payment_status} color="success"/>)
            case "pending":
                return (<Chip label={rent_payment_status} sx={{bgcolor: "#ffff33"}}/>)
            case "n/a":
                return (<Chip label={rent_payment_status}/>)
        }
    }

    const displayTenant = () => {
        let isTenant = null;
        if (tenant) {
            isTenant = users.find(user => user._id === tenant);
        }
        return isTenant == null ? {
            navigationLink: `/addTenant/${landlordId}/${_id}`,
            name: "Add Tenant",
            icon: <PersonAddAltIcon/>
        } : {
            navigationLink: `/editTenant/${landlordId}/${_id}`,
            name: "Edit Tenant",
            icon: <PersonIcon/>
        };
    }
    const options = [
        {
            navigationLink: `/editProperty/${landlordId}/${_id}`,
            name: "Edit",
            icon: <EditIcon/>
        },
        {
            navigationLink: `/applications/${_id}`,
            name: "Applications",
            icon: <DescriptionIcon/>
        },
        {
            navigationLink: `/issue/${_id}`,
            name: "Manage Issues",
            icon: <BugReportIcon/>
        },
        displayTenant()
    ]

    const dateToString = () => {
        const date = new Date(built);
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        return `${month}/${day}/${year}`
    }

    return(
        <TableBody>
            <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell align="center" component="th" scope="row">
                    {location}
                </TableCell>
                <TableCell align="center">{dateToString()}</TableCell>
                <TableCell align="center">{squareFeet}</TableCell>
                <TableCell align="center">${rent}</TableCell>
                <TableCell align="center">{capacity}</TableCell>
                <TableCell align="center">{parkingStalls}</TableCell>
                <TableCell align="center">{bed}</TableCell>
                <TableCell align="center">{bath}</TableCell>
                <TableCell align="center">{checkOrX(pets)}</TableCell>
                <TableCell align="center">{utilities}</TableCell>
                <TableCell align="center">{renderPaymentStatus()}</TableCell>
                <TableCell align="center"><DeleteForeverIcon style={{color: "#cc0000"}} onClick={() => {
                    removeProperty(_id);}}/></TableCell>
                <TableCell align="center">
                    <Kebab
                        options={options}
                    />
                </TableCell>
            </TableRow>
        </TableBody>
        
    );
}

export default Property;