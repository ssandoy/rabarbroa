import React from "react";
import styled from "@emotion/styled";
import MapPin from "../icons/map-pin/MapPin";
import Image from "next/image";
import { device } from "../../styles/mixins";
import Instagram from "../icons/social-media/Instagram";
import Facebook from "../icons/social-media/Facebook";

const Container = styled.footer`
  display: flex;
  @media (${device.FOR_PHONE_ONLY}) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  padding: 16px 0;
  align-items: center;
  font-family: Helvetica Neue, sans-serif;
  justify-content: space-between;
  background-color: rgba(93, 105, 86, 0.48);
  color: white;
  margin-top: auto;
  width: 100%;
`;

const Text = styled.p<{ bold?: boolean }>`
  font-size: 0.8em;
  margin: 4px;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

const AreaContainer = styled.div`
  display: flex;
  align-items: center;
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    margin-left: 24px;
  }
  @media (${device.FOR_PHONE_ONLY}) {
    margin-bottom: 16px;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const VippsContainer = styled.div`
  @media (${device.FOR_PHONE_ONLY}) {
    margin-bottom: -16px;
  }
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    margin-right: 24px;
  }
`;

const Footer: React.FC = () => {
  return (
    <Container>
      <AreaContainer>
        <MapPin />
        <div>
          <Text>Torvhaugen 11</Text>
          <Text>8909 Brønnøysund</Text>
        </div>
      </AreaContainer>
      <InfoContainer>
        <Text bold={true}>Rabarbro AS</Text>
        <Text>Org nr: 98231231</Text>
        <div>
          <Instagram />
          <Facebook />
        </div>
      </InfoContainer>
      <VippsContainer>
        <Image
          src="/images/vipps.svg"
          height={70}
          width={70}
          alt="Vipps-logo"
        />
      </VippsContainer>
    </Container>
  );
};

export default Footer;
