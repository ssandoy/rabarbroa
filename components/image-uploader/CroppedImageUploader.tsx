import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import { getCroppedImage } from "./utils/img";
import styled from "@emotion/styled";
import { Label } from "../../styles/global";

type Props = {
  title?: string;
  handleUpdateComplete?: (uploadUrl: string) => void;
  buttonUploadText?: string;
  cropAspectRatio?: number;
};

const FileInputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
  input[type="file"] {
    display: none;
  }

  label {
    padding: 4px 10px;
    margin: 10px;
    //border-radius: $button-border-radius;
    border: 1px solid grey;
    cursor: pointer;
    font-size: 10px;
  }
`;

export const CroppedImageUploader: React.FC<Props> = ({
  handleUpdateComplete,
  buttonUploadText = "Last opp",
}: Props) => {
  const myRef = useRef(null);
  const [crop, setCrop] = useState<Crop>();
  const [fileName, setFileName] = useState<string>("");
  const [fileLocation, setFileLocation] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  const handleUpload = async () => {
    if (imageElement) {
      setIsUploading(true);
      const croppedImage = await getCroppedImage(imageElement, crop, fileName);
      const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME}/upload`;
      const xhr = new XMLHttpRequest();
      const fd = new FormData();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      // todo error-handling or use fetch.
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const response = JSON.parse(xhr.responseText);
          setIsUploading(false);
          setIsUploaded(true);
          console.log(response.secure_url);
          handleUpdateComplete(response.secure_url);
        }
      };

      fd.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_UNSIGNED_UPLOAD_PRESET
      );
      fd.append("tags", "browser_upload");
      fd.append("file", croppedImage);
      xhr.send(fd);
    }
    //   (error) => {
    //     setIsUploading(false);
    //     setIsUploaded(false);
    //     setUploadError(
    //       "Noe gikk galt under opplastning, vennligst pr??v p?? nytt."
    //     );
    //   }
    // );

    return null;
  };

  return (
    <FileInputContainer>
      <Label style={{ fontSize: "0.9rem" }} htmlFor="file-upload">
        <p>
          <span role="img" aria-label="folder-icon">
            ????{" "}
          </span>
          Velg bilde
        </p>
      </Label>
      {fileLocation && (
        <div>
          <ReactCrop
            onImageLoaded={(image) => {
              setImageElement(image);
            }}
            src={fileLocation}
            crop={crop}
            onChange={(newCrop) => {
              setCrop(newCrop);
            }}
          />
        </div>
      )}
      {fileName && <p>{fileName}</p>}
      <input
        id="file-upload"
        type="file"
        accept="image/*;capture=camera"
        onChange={(event) => {
          if (event.target?.files?.[0]) {
            setFileLocation(URL.createObjectURL(event.target.files?.[0]));
            setFileName(event.target.files?.[0].name);
          }
        }}
      />
      {imageElement && (
        <button ref={myRef} type="button" onClick={handleUpload}>
          {buttonUploadText}
        </button>
      )}
      {isUploading && <p>Laster opp...</p>}
      {isUploaded && <p>Ferdig!</p>}
      {uploadError && <p>{uploadError}</p>}
    </FileInputContainer>
  );
};
