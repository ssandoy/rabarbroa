import React from "react";
import styled from "@emotion/styled";
import MapPin from "../icons/map-pin/MapPin";
import Instagram from "../icons/social-media/Instagram";
import InfoCircle from "../icons/social-media/InfoCircle";

const Container = styled.footer`
  display: flex;
  padding: 16px 0;
  align-items: center;
  font-family: Helvetica Neue, sans-serif;
  justify-content: space-around;
  background-color: rgba(93, 105, 86, 0.48);
  color: white;
  margin-top: auto;
  width: 100%;
`;

const Text = styled.p<{ bold?: boolean }>`
  font-size: 0.8em;
  margin: 4px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: center;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <InfoContainer>
        <MapPin />
        <Text bold={true}>Torvhaugen 11</Text>
        <Text>Brønnøysund</Text>
      </InfoContainer>
      <InfoContainer>
        <InfoCircle />
        <Text bold={true}>Rabarbro AS</Text>
        <Text>Org nr: 98231231</Text>
      </InfoContainer>
      <InfoContainer>
        <Instagram />
        <Text bold={true}>Instagram</Text>
        <Text>@rabarbroart</Text>
      </InfoContainer>
    </Container>
  );
};

export default Footer;
