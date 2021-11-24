import React from "react";
import styled from "@emotion/styled";

const MainContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const PageWrapper: React.FC = ({ children }) => {
  return <MainContainer>{children}</MainContainer>;
};

export default PageWrapper;
