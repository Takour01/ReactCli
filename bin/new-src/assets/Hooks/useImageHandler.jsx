import React, { useState } from "react";

const useImageHandler = () => {
  const [images, setImages] = useState([]);
  const [singleImage, setSingleImage] = useState(null);
  const [fetchedImaged, setFetchedImaged] = useState([]);
  const handleSingleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setSingleImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleMultipleImageUpload = (event) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const uploadedImages = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        uploadedImages.push(reader.result);
        if (uploadedImages.length === files.length) {
          setImages((prevImages) => [...prevImages, ...uploadedImages]);
        }
      };

      reader.readAsDataURL(file);
    }
  };
  return {
    handleMultipleImageUpload,
    images,
    setImages,
    singleImage,
    handleSingleImageUpload,
    setSingleImage,
    fetchedImaged,
    setFetchedImaged,
  };
};

export default useImageHandler;
