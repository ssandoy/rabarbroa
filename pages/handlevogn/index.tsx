import PageWrapper from "../../components/page-wrapper/page-wrapper";
import {
  FormStage,
  useShoppingCartContext,
} from "../../context/cart/ShoppingCartContext";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { Heading1 } from "../../styles/global";
import HandlevognTable from "../../components/checkout/handlevogn/HandlevognTable";
import { PRODUCTS_ROUTE } from "../../routes/routes";
import ContactInfo from "../../components/checkout/contact/ContactInfo";
import { device } from "../../styles/mixins";
import CheckoutBasket, {
  CheckoutStatus,
} from "../../components/checkout/CheckoutBasket";
import { CheckoutPayment } from "../../components/checkout/payment/CheckoutPayment";
import { FormData } from "../../components/checkout/domain";

const Paragraph = styled.p`
  font-size: 1rem;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 800px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (${device.FOR_PHONE_ONLY}) {
    width: 85vw;
  }
`;

const calculateCheckoutStatus =
  (formStage: FormStage) =>
  (activeStage: FormStage): CheckoutStatus => {
    if (activeStage === formStage) {
      return "ACTIVE";
    }
    switch (formStage) {
      case "CART":
        return "COMPLETED";
      case "CONTACTINFO":
        if (activeStage === "CART") {
          return "TODO";
        }
        return "COMPLETED";
      case "PAYMENT":
        return "TODO";
    }
  };

const ShoppingCart = () => {
  const { items, formStage, setFormStage } = useShoppingCartContext();
  const methods = useForm<FormData>();
  // todo issue with formState not persisted when going in and out

  if (items.length === 0) {
    return (
      <EmptyContainer>
        <Paragraph>Handlevognen er for øyeblikket tom.</Paragraph>
        <Paragraph>
          Utforsk bildene til salgs <Link href={PRODUCTS_ROUTE}>her</Link>
        </Paragraph>
      </EmptyContainer>
    );
  }

  return (
    <PageWrapper>
      <Heading1>Handlevogn</Heading1>
      <FormProvider {...methods}>
        <Form
          onSubmit={(e) => {
            console.log("Submitting");
            e.preventDefault();
            //methods.handleSubmit(handleSubmit(); todo
          }}
        >
          <CheckoutBasket
            title="Handlevogn"
            formStage="CART"
            status={calculateCheckoutStatus("CART")(formStage)}
          >
            <HandlevognTable onClick={() => setFormStage("CONTACTINFO")} />
          </CheckoutBasket>
          <CheckoutBasket
            formStage="CONTACTINFO"
            title="Leveringsinformasjon"
            status={calculateCheckoutStatus("CONTACTINFO")(formStage)}
          >
            <ContactInfo />
          </CheckoutBasket>
          <CheckoutBasket
            formStage="PAYMENT"
            title="Betalingsmåte"
            status={calculateCheckoutStatus("PAYMENT")(formStage)}
          >
            <CheckoutPayment />
          </CheckoutBasket>
        </Form>
      </FormProvider>
    </PageWrapper>
  );
};

export default ShoppingCart;
