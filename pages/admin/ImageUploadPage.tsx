import CroppedImageUploader from "../../components/image-uploader";
import React from "react";

const ImageUploadPage = () => {
  // todo add more inputs, based on image props
  return (
    <form>
      <CroppedImageUploader firebaseStorageRef="testbilder" />
    </form>
  );
};

export default ImageUploadPage;
