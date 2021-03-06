import React from "react";
import styled from "@emotion/styled";
import ActiveLink from "./ActiveLink";
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  INTRO_ROUTE,
  PRODUCTS_ROUTE,
} from "../../routes/routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rrem;
`;

const NavBar = () => {
  return (
    <Container>
      <ActiveLink href={INTRO_ROUTE}>Forside</ActiveLink>
      <ActiveLink href={PRODUCTS_ROUTE}>Produkter</ActiveLink>
      <ActiveLink href={ABOUT_ROUTE}>Om Rabarbro</ActiveLink>
      <ActiveLink href={CONTACT_ROUTE}>Kontakt</ActiveLink>
    </Container>
  );
};

export default NavBar;
