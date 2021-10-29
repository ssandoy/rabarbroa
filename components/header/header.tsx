import React from "react";
import styled from "@emotion/styled";
import NavBar from "../nav-bar/NavBar";
import ShoppingCart from "./ShoppingCart";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { SHOPPING_CART_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";

// todo style mobile
const HeaderContainer = styled.header`
  display: grid;
  grid-template-areas: "logo nav cart";
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vw;
  padding-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
  @media (${device.FOR_PHONE_ONLY}) {
    height: 150px;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      "logo cart"
      "nav";
  }
`;

const NavContainer = styled.div`
  @media (${device.FOR_PHONE_ONLY}) {
    grid-row: 2;
    place-self: end;
  }
`;

const LogoContainer = styled.div`
  grid-area: logo;
  place-self: center;
  cursor: pointer;
`;

const CartContainer = styled.div`
  grid-area: cart;
  place-self: center;
  cursor: pointer;
  @media (${device.FOR_PHONE_ONLY}) {
    grid-column: 2;
  }
`;

const Header = () => {
  const router = useRouter();
  // todo device-prop for width
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo width={300} />
      </LogoContainer>
      <NavContainer>
        <NavBar />
      </NavContainer>
      <CartContainer onClick={() => router.push(SHOPPING_CART_ROUTE)}>
        <ShoppingCart />
      </CartContainer>
    </HeaderContainer>
  );
};

export default Header;
