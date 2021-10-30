import React from "react";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { Heading1 } from "../../styles/global";

const Contact: React.FC = () => {
  return (
    <PageWrapper>
      <Heading1>Kontaktskjema</Heading1>
    </PageWrapper>
  );
};

export default Contact;
