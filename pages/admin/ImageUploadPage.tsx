import CroppedImageUploader from "../../components/image-uploader";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, INDICES } from "../../firebase/types";
import styled from "@emotion/styled";
import firebase from "../../firebase/init";
import { nanoid } from "nanoid";

type FormData = Image;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 24px 0;
`;

const Input = styled.input`
  width: 300px;
  height: 20px;
  border-radius: 24px;
  padding-left: 14px;
  border: 1px solid grey;
  margin-bottom: 16px;
`;

const Label = styled.label`
  margin-bottom: 8px;
`;

const ErrorSpan = styled.span`
  color: #e63d3d;
  margin-bottom: 16px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageUploadPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [uploadedImageRef, setUploadedImageRef] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(false);

  const onSubmit = (formData: Image) => {
    if (uploadedImageRef === null) {
      setImageUploadError(true);
    } else {
      setImageUploadError(false);
      firebase
        .firestore()
        .collection(INDICES.PICTURES_INDEX)
        .doc(nanoid())
        .set({ ...formData, href: uploadedImageRef, sold: false })
        .then(() => {
          console.log("SUCCESS");
        });
    }
    // todo upload
  };
  // todo page title
  return (
    <Container>
      <h1>Legg til ny kunst!</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Label>Tittel</Label>
        <Input {...register("title", { required: true })} />
        {errors.title && <ErrorSpan>Du må skrive inn tittel</ErrorSpan>}
        <Label>Pris</Label>
        <Input type="number" {...register("price", { required: true })} />
        {errors.price && <ErrorSpan>Du må skrive inn pris</ErrorSpan>}
        <Label>Størrelse</Label>
        <Input {...register("size", { required: true })} />
        {errors.size && <ErrorSpan>Du må skrive inn størrelse</ErrorSpan>}
        <Label>Beskrivelse</Label>
        <Input {...register("description")} />
        <Label>Last opp bilde</Label>
        <CroppedImageUploader
          handleUpdateComplete={setUploadedImageRef}
          firebaseStorageRef="testbilder"
        />
        {imageUploadError && (
          <ErrorSpan>Du må laste opp bildet før du sender inn!</ErrorSpan>
        )}
        <button type="submit">Legg til</button>
      </Form>
    </Container>
  );
};

export default ImageUploadPage;
