import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import NavBar from "../nav-bar/NavBar";
import ShoppingCart from "./ShoppingCart";
import Logo from "./Logo";
import { useRouter } from "next/router";
import { SHOPPING_CART_ROUTE } from "../../routes/routes";
import { isNative } from "../../utils/window";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";

// todo style mobile
const HeaderContainer = styled.header`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding-bottom: 24px;
  border-bottom: 1px solid #eaeaea;
  align-items: center;
`;

const NavContainer = styled.div`
  padding: 0;
  //margin-top: -24px;
`;

const LogoContainer = styled.div`
  place-self: center;
  cursor: pointer;
  position: relative;
`;

const CartContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: -46px;
  top: 26px;
`;

const Header = () => {
  const router = useRouter();
  const { items } = useShoppingCartContext();

  // todo 340 width for desktop
  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo width={250} height={100} />
        <CartContainer onClick={() => router.push(SHOPPING_CART_ROUTE)}>
          <ShoppingCart numberOfItems={items.length} />
        </CartContainer>
      </LogoContainer>
      <NavContainer>
        <NavBar />
      </NavContainer>
    </HeaderContainer>
  );
};

export default Header;
