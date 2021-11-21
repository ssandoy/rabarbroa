import { css, Global, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { device } from "./mixins";
import Image from "next/image";

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

const Button = styled.button`
  color: white;
  height: 40px;
  border: none;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  letter-spacing: 1px;
`;

export const PrimaryButton = styled(Button)`
  font-size: 1rem;
  background: #5d6956;
`;

export const SecondaryButton = styled(Button)`
  font-size: 1rem;
  background: #7a8475;
`;

export const Heading1 = styled.h1`
  font-weight: normal;
  font-size: 1.3rem;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 24px 0;
`;

export const Input = styled.input`
  height: 30px;
  padding-left: 14px;
  border: none;
  box-shadow: inset 0px 1.5px 1.5px rgba(0, 0, 0, 0.25);
  -webkit-appearance: none;
`;

export const Label = styled.label`
  padding-left: 2px;
  margin-top: 14px;
  margin-bottom: 4px;
  font-size: 1.1rem;
  @media (${device.FOR_PHONE_ONLY}) {
    font-size: 0.9rem;
  }
`;

export const CardContainer = styled.div`
  margin-top: 50px;
  width: 350px;
  background: rgba(255, 255, 255, 0.51);
  box-shadow: 0px 1.5px 1.5px rgba(0, 0, 0, 0.25);
`;

export const ErrorSpan = styled.span`
  @media (${device.FOR_PHONE_ONLY}) {
    font-size: 0.7rem;
  }
  color: #e63d3d;
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const StyledImage = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
`;

export const StyledImageDiv = styled.div`
  width: 100%;

  > div {
    position: unset !important;
  }
`;

export const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
// todo buttons etc here
