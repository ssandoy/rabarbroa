import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const globalBackgroundColor = "#282c34";
const globalTextColor = "white";

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
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
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

// todo buttons etc here
