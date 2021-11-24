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
  font-size: 0.8rem;
  margin: 4px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
  text-align: center;
`;

const LinkText = styled.a`
  font-size: 0.8rem;
  margin: 4px;
  text-align: center;
  color: white;
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
        <LinkText
          href="https://www.instagram.com/rabarbroart/"
          rel="noopener noreferrer"
          target="_blank"
        >
          @rabarbroart
        </LinkText>
      </InfoContainer>
    </Container>
  );
};

export default Footer;
