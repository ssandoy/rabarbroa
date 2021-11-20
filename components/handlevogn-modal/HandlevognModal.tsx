import { CrossIcon } from "../cross/CrossIcon";
import {
  PrimaryButton,
  SecondaryButton,
  StyledImage,
  StyledImageDiv,
} from "../../styles/global";
import { formatPrice, formatSize } from "../../pages/produkter";
import { calculateTotalPrice } from "../../firebase/domain";
import { PRODUCTS_ROUTE, SHOPPING_CART_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";
import styled from "@emotion/styled";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import { useRouter } from "next/router";
import { Image } from "../../firebase/types";

const ModalContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 1fr 1fr;
  @media (${device.FOR_PHONE_ONLY}) {
    grid-template-columns: 1fr;
  }
  width: 80vw;
`;

const ImageContainer = styled(StyledImageDiv)`
  @media (${device.FOR_PHONE_ONLY}) {
    width: 40%;
  }
  width: 80%;
  justify-self: center;
`;

const OrderGrid = styled.div``;

const OrderText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  margin: 8px 0;
`;

const HeadingContainer = styled.div`
  margin-left: 40px;
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    grid-column: 1/3;
  }
  display: flex;
`;

const OrderTitleText = styled(OrderText)``;

const OrderPriceText = styled(OrderText)`
  font-weight: bold;
`;

const Heading = styled.h4`
  align-self: flex-end;
  margin: 0;
  font-weight: lighter;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HandlevognModal = ({
  image,
  onClick,
}: {
  image: Image;
  onClick: () => void;
}) => {
  const { items } = useShoppingCartContext();
  const router = useRouter();
  return (
    <ModalContainer>
      <div style={{ position: "absolute" }} onClick={onClick}>
        <CrossIcon />
      </div>
      <HeadingContainer>
        <Heading>{image.title} er lagt til i handlekurven!</Heading>
      </HeadingContainer>
      <ImageContainer>
        <StyledImage src={image.href} alt={image.title} layout="fill" />
      </ImageContainer>
      <div>
        <Heading>Handlekurv</Heading>
        <OrderGrid>
          {items.map((item) => (
            <div style={{ margin: "16px 0" }}>
              <OrderTitleText>
                1x {item.title} ({formatSize(item.size)})
              </OrderTitleText>
              <OrderPriceText>{formatPrice(item.price)}</OrderPriceText>
            </div>
          ))}
          <div style={{ marginTop: 40 }}>
            <OrderText>Totalt</OrderText>
          </div>
          <OrderPriceText>
            {formatPrice(calculateTotalPrice(items))}
          </OrderPriceText>
        </OrderGrid>
        <ButtonGroup style={{ marginTop: 16 }}>
          <SecondaryButton
            style={{ margin: "4px 0" }}
            onClick={() => router.push(PRODUCTS_ROUTE)}
          >
            Fortsett å handle
          </SecondaryButton>
          <PrimaryButton
            onClick={() => router.push(SHOPPING_CART_ROUTE)}
            style={{ margin: "4px 0" }}
          >
            Gå til handlekurv
          </PrimaryButton>
        </ButtonGroup>
      </div>
    </ModalContainer>
  );
};
