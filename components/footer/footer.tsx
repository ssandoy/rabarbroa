import React from "react";
import styled from "@emotion/styled";

const Container = styled.footer`
  display: flex;
  width: 100%;
  padding: 16px 0;
  border-top: 1px solid #eaeaea;
  justify-content: center;
  margin-top: 24px;
`;

const Footer: React.FC = () => {
  return <Container>Powered by Rabaro Art AS</Container>;
};

export default Footer;
