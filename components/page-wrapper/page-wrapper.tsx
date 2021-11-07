import React from "react";
import styled from "@emotion/styled";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const PageWrapper: React.FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageWrapper;
