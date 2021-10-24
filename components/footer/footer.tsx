import React from "react";
import styled from "@emotion/styled";

const Container = styled.footer`
  display: flex;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
`;

const Footer: React.FC = () => {
  return <Container>Powered by Rabaroa AS</Container>;
};

export default Footer;
