import styled from "@emotion/styled";
import { useFormContext } from "react-hook-form";
import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import { Input, Label, PrimaryButton, ErrorSpan } from "../../../styles/global";
import { FormData } from "../domain";
import { usePostalNumber } from "./usePostalNumber";
import { useEffect } from "react";
import { device } from "../../../styles/mixins";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  @media (${device.FOR_PHONE_ONLY}) {
    width: 140px;
  }
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
    setValue,
    formState: { errors },
  } = useFormContext<FormData>();
  const [{ city }, setPostalNumber] = usePostalNumber();

  useEffect(() => {
    if (city) {
      setValue("contactInfo.city", city, {
        shouldValidate: true,
      });
    }
  }, [city]);

  const onSubmit = () => {
    setFormStage("PAYMENT");
  };
  return (
    <Container>
      <InputContainer>
        <Label>Navn</Label>
        <Input {...register("contactInfo.name", { required: true })} />
        {errors.contactInfo?.name && (
          <ErrorSpan>Du må skrive inn navn</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Adresse</Label>
        <Input {...register("contactInfo.address", { required: true })} />
        {errors.contactInfo?.address && (
          <ErrorSpan>Du må skrive inn adresse</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Postnummer</Label>
        <Input
          {...register("contactInfo.postalNumber", { required: true })}
          onChange={(e) => {
            setPostalNumber(e.target.value);
            setValue("contactInfo.postalNumber", e.target.value, {
              shouldValidate: true,
            });
          }}
        />
        {errors.contactInfo?.postalNumber && (
          <ErrorSpan>Du må skrive inn postnummer</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>By</Label>
        <Input {...register("contactInfo.city", { required: true })} />
        {errors.contactInfo?.city && <ErrorSpan>Du må skrive inn by</ErrorSpan>}
      </InputContainer>
      <InputContainer>
        <Label>E-postadresse</Label>
        <Input {...register("contactInfo.email", { required: true })} />
        {errors.contactInfo?.email && (
          <ErrorSpan>Du må skrive inn e-postadresse</ErrorSpan>
        )}
      </InputContainer>
      <InputContainer>
        <Label>Mobilnummer</Label>
        <Input {...register("contactInfo.phoneNumber", { required: true })} />
        {errors.contactInfo?.phoneNumber && (
          <ErrorSpan>Du må skrive inn mobilnummer</ErrorSpan>
        )}
      </InputContainer>
      <ButtonContainer>
        <PrimaryButton onClick={handleSubmit(onSubmit)}>FORTSETT</PrimaryButton>
      </ButtonContainer>
    </Container>
  );
};

export default ContactInfo;
