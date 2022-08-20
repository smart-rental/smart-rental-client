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
import { Backdrop, CircularProgress, TableFooter, TablePagination, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";
import TableBody from "@mui/material/TableBody";


const Properties = () => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
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
        let isMounted = true;
        const property = async () => {
            try {
                const result = await getProperties(landlordId);
                const userResult = await getUsers();
                setProperties(result.data);
                setUsers(userResult.data);
                setLoading(false);
            } catch (e) {
                console.log(e);
            }
        };
        property();
        return () => {
            isMounted = false;
        };
    }, [landlordId]);

    const removeProperty = (propertyId) => {
        setLoading(true);
        deleteProperty(propertyId)
            .then(() => {
                setLoading(false);
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
            {loading ?
                <Backdrop open={loading} sx={{zIndex: 1}}>
                    <CircularProgress color="primary"/>
                </Backdrop>
                :
                <>
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ borderBottom: "none" }} align="center" colSpan={30}>
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
                            <TableBody>
                                {properties
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((property) => (
                                        <Property property={property} landlordId={landlordId} users={users}
                                                  removeProperty={removeProperty}
                                                  key={property._id}/>
                                    ))}
                            </TableBody>
                            <TableFooter>
                                <TablePagination sx={{ borderBottom: "none" }} count={properties.length}
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