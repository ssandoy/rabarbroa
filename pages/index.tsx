import PageWrapper from "../components/page-wrapper/page-wrapper";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsResult } from "next";
import EmblaCarousel from "../components/carousel/carousel";
import React from "react";
import { device } from "../styles/mixins";

type Props = {
  carouselImages: {
    path: string;
    height: number;
    width: number;
    alt: string;
  }[];
};

const Container = styled.div`
  padding: 0 3rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroContainer = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 24px;
  width: 60vw;
  max-width: 600px;
  margin-top: 24px;
`;

const IntroTitle = styled.h2`
  color: black;
  font-weight: lighter;
  margin: 0;
`;

const IntroText = styled.p`
  color: black;
  text-align: center;
`;

const BottomBox = styled.div`
  position: absolute;
  height: 4px;
  width: 30%;
  bottom: 0;
  left: 0;

  background: #5d6956;
`;

const TopBox = styled.div`
  position: absolute;
  height: 24px;
  width: 20%;
  @media (${device.FOR_PHONE_ONLY}) {
    width: 40%;
  }
  top: -8px;
  right: -16px;
  background: #5d6956;
`;

const Home: React.FC<Props> = ({ carouselImages }) => {
  return (
    <PageWrapper>
      <Container>
        <div style={{ marginTop: 24 }}>
          <EmblaCarousel images={carouselImages} />
        </div>
        <IntroContainer>
          <TopBox />
          <IntroTitle>Kaos. Farger. Liv</IntroTitle>
          <IntroText>
            Norske originaler, tegnet og malt på Sør-Helgeland.
          </IntroText>
          <BottomBox />
        </IntroContainer>
      </Container>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  // todo fetch given documents from firebase instead?
  const carouselImages = [
    {
      path: "/images/fargehav.jpg",
      height: 500,
      width: 500,
      alt: "Mange bilder",
    },
    {
      path: "/images/tredamer2.jpg",
      height: 500,
      width: 500,
      alt: "Tre damer",
    },
    {
      path: "/images/ballonger.jpg",
      height: 500,
      width: 400,
      alt: "Ballonger",
    },
    {
      path: "/images/farger.jpg",
      height: 500,
      width: 400,
      alt: "Farger",
    },
    {
      path: "/images/trehus.jpg",
      height: 500,
      width: 400,
      alt: "Tre hus",
    },
    {
      path: "/images/tredamer.jpg",
      height: 500,
      width: 500,
      alt: "Tre damer",
    },
  ];
  return {
    props: {
      carouselImages,
    },
  };
};

export default Home;
