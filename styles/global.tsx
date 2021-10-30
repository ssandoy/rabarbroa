import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const globalBackgroundColor = "#F4F0EA";
const globalTextColor = "black";

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        padding: 0;
        margin: 0;
        background: ${globalBackgroundColor};
        color: ${globalTextColor};
        min-height: 100%;
        font-family: Antonio, sans-serif;
        font-size: 16px;
      }
    `}
  />
);

export const basicButtonStyles = css`
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  transition: all 0.1s linear;
  font-size: 1em;
  margin: 3rem 0;
  padding: 1rem 0.5rem;
`;

// todo
export const Button = styled.button`
  ${basicButtonStyles};
`;

export const SubmitButton = styled.button`
  color: white;
  height: 40px;
  border: none;
  background: rgba(122, 132, 117, 0.51);
`;

export const Heading1 = styled.h1`
  font-weight: normal;
`;

// todo buttons etc here
