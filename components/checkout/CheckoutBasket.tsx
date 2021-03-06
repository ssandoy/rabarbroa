import React from "react";
import styled from "@emotion/styled";
import CheckIcon from "./check-icon/CheckIcon";
import {
  FormStage,
  useShoppingCartContext,
} from "../../context/cart/ShoppingCartContext";
import { device } from "../../styles/mixins";

const CheckoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 750px;
  @media (${device.FOR_TABLET_PORTRAIT_DOWN}) {
    max-width: 600px;
    width: 85vw;
  }
  padding: 16px;
  margin-bottom: 24px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

type TitleProps = {
  isActive: boolean;
};

const CheckoutTitle = styled.h2<TitleProps>`
  font-size: 1.5rem;
  @media (${device.FOR_PHONE_ONLY}) {
    font-size: 1rem;
  }
  font-weight: lighter;
  color: #5d6956;
  letter-spacing: 2px;
`;

export type CheckoutStatus = "TODO" | "ACTIVE" | "COMPLETED";

type Props = {
  title: string;
  status: CheckoutStatus;
  formStage: FormStage;
};
const isCompleted = (status: CheckoutStatus) => status === "COMPLETED";
const isActive = (status: CheckoutStatus) => status === "ACTIVE";

const Button = styled.button`
  text-underline: black;
  background: none;
  border: none;
  border-bottom: 1px solid black;
  padding: 0;
  cursor: pointer;
  margin-left: auto;
  margin-right: 32px;
`;

const CheckoutBasket: React.FC<Props> = ({
  title,
  status,
  formStage,
  children,
}) => {
  const { setActiveFormStage } = useShoppingCartContext();
  return (
    <CheckoutContainer>
      <TitleContainer>
        {isCompleted(status) && (
          <div style={{ marginRight: 8, marginTop: 6 }}>
            <CheckIcon />
          </div>
        )}
        <CheckoutTitle isActive={isActive(status)}>{title}</CheckoutTitle>
        {isCompleted(status) && (
          <Button type="button" onClick={() => setActiveFormStage(formStage)}>
            ENDRE
          </Button>
        )}
      </TitleContainer>

      {status === "ACTIVE" && children}
    </CheckoutContainer>
  );
};

export default CheckoutBasket;
