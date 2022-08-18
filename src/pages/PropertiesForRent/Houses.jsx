import React, { useEffect, useState } from "react";
import { getAllProperties } from "../../api";
import HouseCard from "./HouseCard/HouseCard";
import { Grid, Pagination } from "@mui/material";
import Error from "../../components/Error/Error";

const Houses = () => {
    const [properties, setProperties] = useState([]);
    const [numberOfPages, setNumberOfPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(0);
    const pages = new Array(numberOfPages).fill(null).map((v, i) => i);
    useEffect(() => {
        getAllProperties(pageNumber)
            .then((res) => {
                setProperties(res.data.property);
                setNumberOfPages(res.data.totalPages);
            })
            .catch(() => {
                return (
                    <Error/>
                );
            });
    }, [pageNumber]);

    const handlePageChange = (event, value) => {
        setPageNumber(value - 1);
    };

    return (
        <>
            <Grid container
                  style={{ marginTop: "20px" }}
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                  spacing={2}
            >
                {properties ? properties.map((propertyInfo, index) => {
                    return (
                        <Grid item minWidth={1000} key={index}>
                            <HouseCard propertyInfo={propertyInfo}/>
                        </Grid>
                    );
                }) : ""}
                <Grid item>
                    <Pagination onChange={handlePageChange} count={pages.length} variant="outlined" color="primary"/>
                </Grid>
            </Grid>
        </>
    );
};

export default Houses;