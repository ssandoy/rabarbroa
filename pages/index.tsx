import Head from "next/head";
import PageWrapper from "../components/page-wrapper/page-wrapper";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsResult } from "next";
import EmblaCarousel from "../components/carousel/carousel";
import React from "react";

const Title = styled.h1``;

type Props = {
  carouselImages: {
    path: string;
    height: number;
    width: number;
    alt: string;
  }[];
};

const MainContent = styled.main`
  padding: 0 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: React.FC<Props> = ({ carouselImages }) => {
  return (
    <PageWrapper>
      <MainContent>
        <Title>Rabarbroa</Title>
        <EmblaCarousel images={carouselImages} />
      </MainContent>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  // todo fetch given documents from firebase instead?
  const carouselImages = [
    {
      path: "/images/mange-bilder.jpg",
      height: 300,
      width: 300,
      alt: "Mange bilder",
    },
    {
      path: "/images/fargerik.jpg",
      height: 300,
      width: 300,
      alt: "Fargerik",
    },
    {
      path: "/images/ballonger.png",
      height: 300,
      width: 300,
      alt: "Ballonger",
    },
    {
      path: "/images/ansikt.png",
      height: 300,
      width: 300,
      alt: "Ansikt",
    },
    {
      path: "/images/ond-stemor.png",
      height: 300,
      width: 300,
      alt: "Ansikt",
    },
  ];
  return {
    props: {
      carouselImages,
    },
  };
};

export default Home;
