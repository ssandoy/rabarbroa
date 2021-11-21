import PageWrapper from "../../components/page-wrapper/page-wrapper";
import {
  FormStage,
  useShoppingCartContext,
} from "../../context/cart/ShoppingCartContext";
import styled from "@emotion/styled";
import Link from "next/link";
import React from "react";
import { Heading1 } from "../../styles/global";
import HandlevognTable from "../../components/checkout/handlevogn/HandlevognTable";
import { PRODUCTS_ROUTE } from "../../routes/routes";
import ContactInfo from "../../components/checkout/contact/ContactInfo";
import CheckoutBasket, {
  CheckoutStatus,
} from "../../components/checkout/CheckoutBasket";
import { CheckoutPayment } from "../../components/checkout/payment/CheckoutPayment";
import { Receipt } from "../../components/checkout/receipt/Receipt";

const Paragraph = styled.p`
  font-size: 1rem;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
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
        if (activeStage == "CART" || activeStage == "CONTACTINFO")
          return "TODO";
        return "COMPLETED";
      case "RECEIPT":
        return "TODO";
    }
  };

const ShoppingCart = () => {
  const { items, formStage, setFormStage } = useShoppingCartContext();

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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          //methods.handleSubmit(handleSubmit(); todo
        }}
      >
        <CheckoutBasket
          title="HANDLEVOGN"
          formStage="CART"
          status={calculateCheckoutStatus("CART")(formStage)}
        >
          <HandlevognTable onClick={() => setFormStage("CONTACTINFO")} />
        </CheckoutBasket>
        <CheckoutBasket
          formStage="CONTACTINFO"
          title="LEVERINGSINFORMASJON"
          status={calculateCheckoutStatus("CONTACTINFO")(formStage)}
        >
          <ContactInfo />
        </CheckoutBasket>
        <CheckoutBasket
          formStage="PAYMENT"
          title="BETALINGSMÅTE"
          status={calculateCheckoutStatus("PAYMENT")(formStage)}
        >
          <CheckoutPayment />
        </CheckoutBasket>
        <CheckoutBasket
          formStage="RECEIPT"
          title="KVITTERING"
          status={calculateCheckoutStatus("RECEIPT")(formStage)}
        >
          <Receipt />
        </CheckoutBasket>
      </Form>
    </PageWrapper>
  );
};

export default ShoppingCart;
