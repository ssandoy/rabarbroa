import React from "react";
import styled from "@emotion/styled";
import ActiveLink from "./ActiveLink";
import { ABOUT_ROUTE, PICTURES_ROUTE } from "../../routes/routes";

const Container = styled.div`
  display: flex;
  padding-top: 16px;
  justify-content: center;
  font-size: 0.5rem;
`;

const NavBar = () => {
  return (
    <Container>
      <ActiveLink href={PICTURES_ROUTE}>Bilder</ActiveLink>
      <ActiveLink href={ABOUT_ROUTE}>Om</ActiveLink>
      <ActiveLink href="/about">FAQ</ActiveLink>
      <ActiveLink href="/about">Contact</ActiveLink>
    </Container>
  );
};
// todo load routes somehow

export default NavBar;
