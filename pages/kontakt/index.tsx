import React, { useState } from "react";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import {
  CardContainer,
  Form,
  Heading1,
  Input,
  Label,
  PrimaryButton,
} from "../../styles/global";
import { useForm } from "react-hook-form";
import styled from "@emotion/styled";

type FormData = {
  name: string;
  email: string;
  feedback: string;
};

const FeedbackContainer = styled(CardContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // todo email-sending when submitting
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // todo validation
  const onSubmit = () => {
    setHasSubmitted(true);
  };

  return (
    <PageWrapper>
      <Heading1>Kontaktskjema</Heading1>
      {!hasSubmitted ? (
        <>
          <p style={{ textAlign: "center", fontSize: "0.9rem", width: "80%" }}>
            Vi tar gjerne i mot tilbakemeldinger om siden! Du kan også stille
            spørsmål du lurer på her.
          </p>
          <Form style={{ width: 260 }} onSubmit={handleSubmit(onSubmit)}>
            <Label>Navn</Label>
            <Input {...register("name", { required: true })} />
            <Label>E-post</Label>
            <Input {...register("email", { required: true })} />
            <Label>Melding</Label>
            <textarea
              style={{
                height: 100,
                border: "none",
                boxShadow: "inset 0px 1.5px 1.5px rgba(0, 0, 0, 0.25)",
              }}
              {...register("feedback", { required: true })}
            />
            <PrimaryButton
              style={{
                width: "100%",
                marginTop: "16px",
              }}
            >
              SEND MELDING
            </PrimaryButton>
          </Form>
        </>
      ) : (
        <FeedbackContainer>
          <p>Tusen takk for din melding!</p>
          <p style={{ marginTop: 0 }}>Vi svarer deg så fort vi kan.</p>
        </FeedbackContainer>
      )}
    </PageWrapper>
  );
};

export default Contact;
