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
        min-height: 100vh;
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
  font-size: 1.3em;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 0;
`;

export const Input = styled.input`
  width: 300px;
  height: 30px;
  padding-left: 14px;
  border: none;
  box-shadow: inset 0px 1.5px 1.5px rgba(0, 0, 0, 0.25);
`;

export const Label = styled.label`
  padding-left: 2px;
  margin-top: 14px;
  margin-bottom: 4px;
`;

export const CardContainer = styled.div`
  margin-top: 50px;
  width: 350px;
  background: rgba(255, 255, 255, 0.51);
  box-shadow: 0px 1.5px 1.5px rgba(0, 0, 0, 0.25);
`;

// todo buttons etc here
