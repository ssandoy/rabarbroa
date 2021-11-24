import styled from "@emotion/styled";
import { useShoppingCartContext } from "../../../context/cart/ShoppingCartContext";
import { formatPrice, formatSize } from "../../../pages/produkter";
import { calculateShippingPrice, shippingTypeToString } from "../domain";
import { OrderItem, SmallText, Text } from "../payment/CheckoutPayment";
import { calculateTotalPrice } from "../../../firebase/domain";
import { useFormContext } from "react-hook-form";

const Container = styled.div`
  display: grid;
`;

export const Receipt = () => {
  const { items } = useShoppingCartContext();
  const { watch } = useFormContext();
  const shippingType = watch("shippingType");
  const shippingPrice = calculateShippingPrice(shippingType);
  const totalPrice = calculateTotalPrice(items);
  return (
    <Container>
      <p style={{ marginLeft: 24 }}>
        Tusen takk for din handel! Produktene blir sendt så snart som ordren
        gjennomføres.
      </p>
      <div>
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
      </div>
    </Container>
  );
};
