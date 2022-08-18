import * as React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { deleteProperty, getProperties, getUsers } from "../../api";
import Property from "./Property/Property";
import Swal from "sweetalert2";
import { TableFooter, TablePagination, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";


const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const landlordId = useSelector((state) => state.auth.isLoggedIn);
    useEffect(() => {
        getProperties(landlordId)
            .then((res) => {
                setProperties(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
        getUsers()
            .then((res) => {
                setUsers(res.data);
            });
    }, [landlordId]);

    const removeProperty = (propertyId) => {
        deleteProperty(propertyId)
            .then(() => {
                setProperties(properties.filter(property => property._id !== propertyId));
                Swal.fire("Property Deleted", `The property has been deleted`, "success");
            })
            .catch((e) => {
                console.error(e);
                Swal.fire("Error", "There was an error deleting your property", "error");
            });
    };

    return (
        <Container maxWidth="125rem">
            {properties === [] ?
                <Typography variant="h4" align="center"><b>No properties to manage</b></Typography>
                :
                <>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{borderBottom: "none"}} align="center" colSpan={30}>
                                        <Typography variant="h4">
                                            <b>Manage Properties</b>
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center">Location</TableCell>
                                    <TableCell align="center">Date built</TableCell>
                                    <TableCell align="center">Square Feet</TableCell>
                                    <TableCell align="center">Rent per month</TableCell>
                                    <TableCell align="center">Max Capacity</TableCell>
                                    <TableCell align="center">Parking Stalls</TableCell>
                                    <TableCell align="center">Bed</TableCell>
                                    <TableCell align="center">Bath</TableCell>
                                    <TableCell align="center">Pets</TableCell>
                                    <TableCell align="center">Utilities</TableCell>
                                    <TableCell align="center">Payment Status</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            {properties
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((property) => (
                                    <Property property={property} landlordId={landlordId} users={users}
                                              removeProperty={removeProperty}
                                              key={property._id}/>
                                ))}
                            <TableFooter>
                                <TablePagination sx={{borderBottom: "none"}} count={properties.length}
                                                 onPageChange={(event, page) => handleChangePage(event, page)}
                                                 onRowsPerPageChange={handleChangeRowsPerPage}
                                                 page={page}
                                                 rowsPerPage={rowsPerPage}
                                                 rowsPerPageOptions={[5, 10, 25, 50]}
                                />
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </>
            }
        </Container>
    );
};

export default Properties;