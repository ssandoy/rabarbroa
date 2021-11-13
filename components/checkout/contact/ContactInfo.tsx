import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import { Input, Label, Button, ErrorSpan, Form } from "../../../styles/global";
import { FormData } from "../domain";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-top: 16px;
`;

const ContactInfo = () => {
  const { setFormStage } = useShoppingCartContext();
  // todo validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  const onSubmit = () => {
    setFormStage("PAYMENT");
  };
  return (
    <Container>
      <InputContainer>
        <Label>Fornavn</Label>
        <Input
          width={200}
          {...register("contactInfo.firstName", { required: true })}
        />
        {errors.contactInfo?.firstName && (
          <ErrorSpan>Du må skrive inn fornavn</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Etternavn</Label>
        <Input
          width={200}
          {...register("contactInfo.lastName", { required: true })}
        />
        {errors.contactInfo?.lastName && (
          <ErrorSpan>Du må skrive inn etternavn</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Adresse</Label>
        <Input
          width={200}
          {...register("contactInfo.address", { required: true })}
        />
        {errors.contactInfo?.address && (
          <ErrorSpan>Du må skrive inn adresse</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Postnummer & By</Label>
        <Input
          width={200}
          {...register("contactInfo.postalNumberAndCity", { required: true })}
        />
        {errors.contactInfo?.postalNumberAndCity && (
          <ErrorSpan>Du må skrive inn postnummer og by</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>E-postadresse</Label>
        <Input
          width={200}
          {...register("contactInfo.email", { required: true })}
        />
        {errors.contactInfo?.email && (
          <ErrorSpan>Du må skrive inn e-postadresse</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Mobilnummer</Label>
        <Input
          width={200}
          {...register("contactInfo.phoneNumber", { required: true })}
        />
        {errors.contactInfo?.phoneNumber && (
          <ErrorSpan>Du må skrive inn mobilnummer</ErrorSpan>
        )}
      </InputContainer>
      <ButtonContainer>
        <Button onClick={handleSubmit(onSubmit)}>Fortsett</Button>
      </ButtonContainer>
    </Container>
  );
};

export default ContactInfo;
