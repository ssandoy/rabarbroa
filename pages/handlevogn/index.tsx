import React from "react";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import PageWrapper from "../../components/page-wrapper/page-wrapper";

const ShoppingCart: React.FC = () => {
  const { items } = useShoppingCartContext();
  console.log(items);
  // todo map over items
  return (
    <PageWrapper>
      <h1>HANDLEVOGN</h1>
    </PageWrapper>
  );
};

export default ShoppingCart;
