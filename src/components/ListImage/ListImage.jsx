import React, { useState } from "react";
import { ImageList, ImageListItem, ImageListItemBar } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

const ListImage = ({
                       selectedFiles,
                       setSelectedFiles,
                       imagesToDelete, 
                       setImagesToDelete,
                       width,
                       height
                   }) => {
    // eslint-disable-next-line
    const [objToDelete, setObjToDelete] = useState();

    function setTheObjToDelete(index) {
        if (setImagesToDelete !== undefined) {
            setObjToDelete(setImagesToDelete(prevState => [...prevState, selectedFiles[index]]));
        }
    }

    return (
        <>
            {selectedFiles.length > 0 &&
                <ImageList sx={{ width, height }} cols={4} >
                    {selectedFiles && selectedFiles.map((image, index) => {
                        return (
                            <ImageListItem key={index}>
                                <img
                                    src={typeof image === "string" ? image : image.secure_url}
                                    alt="black"
                                    loading="lazy"
                                />
                                <ImageListItemBar
                                    sx={{
                                        background:
                                            "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                            "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
                                    }}
                                    position="top"
                                    actionIcon={
                                        <IconButton
                                            sx={{ color: "white" }}
                                            onClick={() => {
                                                setSelectedFiles(selectedFiles.filter(e => e !== image));
                                                setTheObjToDelete(index);
                                            }}
                                        >
                                            <DeleteIcon/>
                                        </IconButton>
                                    }
                                    actionPosition="left"
                                />
                            </ImageListItem>
                        );
                    })}
                </ImageList>}
        </>
    );
};

export default ListImage;