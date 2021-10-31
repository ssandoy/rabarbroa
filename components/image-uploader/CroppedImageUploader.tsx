import React, { useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";

import firebase from "../../firebase/init";
import { getCroppedImage } from "./utils/img";
import styled from "@emotion/styled";
import { Label } from "../../styles/global";

type Props = {
  firebaseStorageRef: string;
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
  firebaseStorageRef,
  handleUpdateComplete,
  buttonUploadText = "Last opp",
}: Props) => {
  const myRef = useRef(null);
  // todo why on earth does this not throw ts errro
  const [crop, setCrop] = useState<Crop | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [fileLocation, setFileLocation] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [imageElement, setImageElement] = useState<HTMLImageElement | null>(
    null
  );

  // todo message when done
  const handleUpload = async () => {
    if (imageElement) {
      setIsUploading(true);
      const croppedImage = await getCroppedImage(imageElement, crop, fileName);
      const imageRef = await firebase.storage().ref().child(firebaseStorageRef); // todo ref:
      const uploadRef = imageRef.child(new Date().getTime() + "-" + fileName);
      const imageUrl = await uploadRef.put(croppedImage).then(
        (success) => {
          setIsUploading(false);
          setIsUploaded(true);
          return success.ref.getDownloadURL();
        },
        (error) => {
          setIsUploading(false);
          setIsUploaded(false);
          setUploadError(
            "Noe gikk galt under opplastning, vennligst prøv på nytt."
          );
        }
      );

      return handleUpdateComplete ? handleUpdateComplete(imageUrl) : null;
    }
    return null;
  };

  return (
    <FileInputContainer>
      <Label style={{ fontSize: "0.9em" }} htmlFor="file-upload">
        <p>
          <span role="img" aria-label="folder-icon">
            📁{" "}
          </span>
          Velg bilde
        </p>
      </Label>
      {fileLocation && (
        <div style={{ width: "inherit" }}>
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

export default CroppedImageUploader;
