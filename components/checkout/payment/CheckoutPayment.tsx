import styled from "@emotion/styled";
import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import { VippsPayment } from "../../icons/vipps/VippsPayment";
import { formatPrice } from "../../../pages/produkter";
import { calculateTotalPrice } from "../../../firebase/domain";
import { useFormContext } from "react-hook-form";
import { calculateShippingPrice, shippingTypeToString } from "../domain";

const Container = styled.div``;
const PaymentOptionContainer = styled.div``;
const OrderContainer = styled.div`
  background-color: #dee1e1;
`;
// todo style
const OrderItem = styled.p`
  display: flex;
  width: 80%;
  margin: 0;
  justify-content: space-between;
  padding-left: 24px;
`;
const SmallText = styled.p`
  font-size: 0.8rem;
  font-weight: lighter;
`;
const Text = styled.p``;
const PaymentButton = styled.button`
  cursor: pointer;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
`;

export const CheckoutPayment = () => {
  // todo ordreoversikt, paymentoptions.
  // todo betingelseR?
  const { items } = useShoppingCartContext();
  const { watch } = useFormContext();
  const shippingType = watch("shippingType");
  const shippingPrice = calculateShippingPrice(shippingType);
  const totalPrice = calculateTotalPrice(items);
  return (
    <Container>
      <SmallText>Ordreoversikt</SmallText>
      <OrderContainer>
        {items.map((item) => {
          return (
            <OrderItem>
              <SmallText>{item.title}</SmallText>{" "}
              <SmallText>{formatPrice(item.price)}</SmallText>
            </OrderItem>
          );
        })}
        <OrderItem>
          <SmallText>
            Leveringsmåte: {shippingTypeToString(shippingType)}
          </SmallText>
          <SmallText>{formatPrice(shippingPrice)}</SmallText>
        </OrderItem>
        <div style={{ backgroundColor: "#d0d5d5" }}>
          <OrderItem>
            <Text>Totalt</Text>
            <Text>{formatPrice(totalPrice + shippingPrice)}</Text>
          </OrderItem>
        </div>
      </OrderContainer>
      <PaymentOptionContainer>
        <PaymentButton>
          <VippsPayment />
        </PaymentButton>
      </PaymentOptionContainer>
    </Container>
  );
};
