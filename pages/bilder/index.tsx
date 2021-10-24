import Link from "next/link";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { GetStaticProps } from "next";
import React from "react";
import styled from "@emotion/styled";
import { formatPictureRoute, PICTURES_ROUTE } from "../../routes/routes";

const MainContent = styled.main`
  padding: 0 5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PicturesGrid = styled.ul`
  // todo grid instead? need to be columns
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 3rem;

  @media (max-width: 600px) {
    // todo mixin...
    width: 100%;
    flex-direction: column;
  }
`;

// todo Link from Next?
const CardLink = styled.a`
  margin: 1rem;
  flex-basis: 20%;
  padding: 1.5rem;
  color: white;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;

  :hover {
    border-color: #0070f3;
  }
`;

// fixme types etterhvert..
const Pictures = ({ images }) => {
  // todo load from womeshere
  return (
    <PageWrapper>
      <MainContent>
        <h1>Bilder</h1>
        <PicturesGrid>
          {images.map((image) => (
            <CardLink
              href={formatPictureRoute(image.path.split(".")[0].split("/")[2])}
            >
              <img src={image.path} alt={image.alt} width="100%" />
              <p>{image.title}</p>
              <p>{image.price}</p>
            </CardLink>
          ))}
        </PicturesGrid>
      </MainContent>
    </PageWrapper>
  );
};

// vs getServerSideProps(context) for each request, which may be useful in some cases..
export const getStaticProps: GetStaticProps = async () => {
  const images = [
    {
      path: "/images/mange-bilder.jpg",
      height: 200,
      width: 200,
      alt: "Mange bilder",
      title: "Mange bilder",
      price: 1000,
    },
    {
      path: "/images/fargerik.jpg",
      height: 200,
      width: 200,
      alt: "Fargerik",
      title: "Farger",
      price: 1000,
    },
    {
      path: "/images/ballonger.png",
      height: 200,
      width: 200,
      alt: "Ballonger",
      title: "Ballonger",
      price: 1000,
    },
    {
      path: "/images/ansikt.png",
      height: 200,
      width: 200,
      alt: "Ansikt",
      title: "Ansikt",
      price: 1000,
    },
    {
      path: "/images/ond-stemor.png",
      height: 200,
      width: 200,
      alt: "Ansikt",
      title: "Ond stemor",
      price: 1000,
    },
    {
      path: "/images/mange-bilder.jpg",
      height: 200,
      width: 200,
      alt: "Mange bilder",
      title: "Tittel",
      price: 1000,
    },
  ];
  return {
    props: { images },
  };
};

export default Pictures;
