import styled from "@emotion/styled";
import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import { VippsPayment } from "../../icons/vipps/VippsPayment";
import { formatPrice, formatSize } from "../../../pages/produkter";
import { calculateTotalPrice } from "../../../firebase/domain";
import { useFormContext } from "react-hook-form";
import { calculateShippingPrice, shippingTypeToString } from "../domain";

const Container = styled.div``;
const PaymentOptionContainer = styled.div`
  //padding-left: 24px;
`;
const OrderContainer = styled.div``;
// todo remove exports when styled Receipt
export const OrderItem = styled.p`
  padding-left: 24px;
`;

export const Text = styled.p`
  font-family: Arial, sans-serif;
`;

export const SmallText = styled(Text)`
  font-size: 0.8rem;
  font-weight: lighter;
`;
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
  const { items, setActiveFormStage } = useShoppingCartContext();
  const { watch } = useFormContext();
  const shippingType = watch("shippingType");
  const shippingPrice = calculateShippingPrice(shippingType);
  const totalPrice = calculateTotalPrice(items);
  return (
    <Container>
      <OrderContainer>
        {items.map((item) => {
          return (
            <OrderItem>
              <SmallText>
                1x {item.title} ({formatSize(item.size)})
              </SmallText>
              <SmallText style={{ fontWeight: "bold" }}>
                {formatPrice(item.price)}
              </SmallText>
            </OrderItem>
          );
        })}
        <OrderItem>
          <SmallText>
            Leveringsmåte: {shippingTypeToString(shippingType)}
          </SmallText>
          <SmallText>{formatPrice(shippingPrice)}</SmallText>
        </OrderItem>
        <div>
          <OrderItem>
            <Text style={{ fontWeight: "bold", margin: 0 }}>Totalt</Text>
            <Text style={{ fontWeight: "bold", margin: 0 }}>
              {formatPrice(totalPrice + shippingPrice)}
            </Text>
          </OrderItem>
        </div>
      </OrderContainer>
      <PaymentOptionContainer>
        <PaymentButton onClick={() => setActiveFormStage("RECEIPT")}>
          <VippsPayment />
        </PaymentButton>
      </PaymentOptionContainer>
    </Container>
  );
};
