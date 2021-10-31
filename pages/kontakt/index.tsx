import React from "react";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import {
  Form,
  Heading1,
  Input,
  Label,
  SubmitButton,
} from "../../styles/global";
import { useForm } from "react-hook-form";

type FormData = {
  name: string;
  email: string;
  feedback: string;
};

const Contact: React.FC = () => {
  const {
    register,
    // todo
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  return (
    <PageWrapper>
      <Heading1>Kontaktskjema</Heading1>
      <p style={{ textAlign: "center", fontSize: "0.9em", width: "80%" }}>
        Vi tar gjerne i mot tilbakemeldinger om siden! Du kan også stille
        spørsmål du lurer på her.
      </p>
      <Form>
        <Label>Navn</Label>
        <Input {...register("name", { required: true })} />
        <Label>E-post</Label>
        <Input {...register("email", { required: true })} />
        <Label>Melding</Label>
        <textarea
          style={{
            width: "100%",
            height: 100,
            border: "none",
            boxShadow: "inset 0px 1.5px 1.5px rgba(0, 0, 0, 0.25)",
          }}
          {...register("feedback", { required: true })}
        />
        <SubmitButton
          style={{
            width: "100%",
            marginTop: "16px",
          }}
        >
          Send melding
        </SubmitButton>
      </Form>
    </PageWrapper>
  );
};

export default Contact;
