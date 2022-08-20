import React, { useState, useCallback } from "react";
import ImageViewer from "react-simple-image-viewer";

const Gallery = ({images, width}) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    const imageLinks = images.map((image) => {
        return image.secure_url;
    });

    return (
        <>
            <img
                src={imageLinks[0]}
                onClick={() => openImageViewer(0)}
                width={width === undefined ? "100%" : width}
                alt=""
            />

            {isViewerOpen && (
                <ImageViewer
                    src={imageLinks}
                    currentIndex={currentImage}
                    onClose={closeImageViewer}
                    disableScroll={false}
                    backgroundStyle={{
                        backgroundColor: "rgba(0,0,0,0.9)"
                    }}
                    closeOnClickOutside={true}
                />
            )}
        </>
    );
};

export default Gallery;