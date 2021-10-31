import React from "react";
import styled from "@emotion/styled";
import ActiveLink from "./ActiveLink";
import {
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  INTRO_ROUTE,
  PICTURES_ROUTE,
} from "../../routes/routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1rem;
`;

const NavBar = () => {
  return (
    <Container>
      <ActiveLink href={INTRO_ROUTE}>Forside</ActiveLink>
      <ActiveLink href={PICTURES_ROUTE}>Bilder</ActiveLink>
      <ActiveLink href={CONTACT_ROUTE}>Kontakt</ActiveLink>
      <ActiveLink href={ABOUT_ROUTE}>Om Rabarbro</ActiveLink>
    </Container>
  );
};
// todo load routes somehow

export default NavBar;
