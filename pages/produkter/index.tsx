import Link from "next/link";
import { Image as ImageType, INDICES } from "../../firebase/types";
import Image from "next/image";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import numberFormat from "underscore.string/numberFormat";
import { GetStaticProps, GetStaticPropsResult } from "next";
import React from "react";
import styled from "@emotion/styled";
import { formatPictureRoute } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";
import { StyledImage, StyledImageDiv } from "../../styles/global";

const PicturesGrid = styled.ul`
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    padding: 0 2rrem;
    width: 80vw;
    max-width: 1200px;
  }
  column-count: 3;
  list-style: none outside;
  column-gap: 3rem;
  row-gap: 3rem;
  padding-inline-start: 0;
  @media (${device.FOR_PHONE_ONLY}) {
    column-count: 2;
    column-gap: 1rem;
    margin: 0 16px;
  }
`;

const TextContainer = styled.div``;

const CardTitle = styled.p`
  position: relative;
  width: max-content;
  max-width: 100%;

  ::after {
    content: "";
    position: absolute;
    height: 4px;
    width: 100%;
    left: 0;
    bottom: -4px;
    background-color: deepskyblue;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
  }
`;

const ListItem = styled.li`
  overflow: hidden;
  padding: 1.5em 1em 1rem;
  margin-bottom: 3rem;
  break-inside: avoid;
  text-align: left;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.51);
  box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  transition: transform 0.15s ease-in;
  transform-origin: top center;
  :hover,
  :focus-within {
    transform: scale(1.05);
    ${CardTitle}::after {
      transform: scaleX(1);
    }
  }
`;

const CardLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

// todo move
// this adds space between every third number
export const formatPrice = (price: number) => {
  return `kr ${numberFormat(price, 0, " ", " ")}`;
};

export const formatSize = (size: string) =>
  size.replace("x", " x ").concat("cm");

type Props = {
  images: ImageType[];
};

// https://res.cloudinary.com/XXX/image/upload/YYY/ZZZ.jpg
const formatCloudinaryPic = (href: string) => (width: number) =>
  href.replace("/upload", `/upload/w_${width}`);

const Pictures: React.FC<Props> = ({ images }) => {
  return (
    <PageWrapper>
      <PicturesGrid>
        {images.map((image) => (
          <ListItem key={image.title}>
            <Link href={formatPictureRoute(image.title.replace(" ", "-"))}>
              <CardLink
                href={formatPictureRoute(image.title.replace(" ", "-"))}
              >
                <StyledImageDiv>
                  <StyledImage
                    className="image"
                    src={formatCloudinaryPic(image.href)(400)}
                    alt={image.title}
                    layout="fill"
                    placeholder="blur"
                    blurDataURL={formatCloudinaryPic(image.href)(300)}
                  />
                </StyledImageDiv>
                <TextContainer>
                  <CardTitle>{image.title}</CardTitle>
                  <p>{formatSize(image.size)}</p>
                  <p>{formatPrice(image.price)}</p>
                </TextContainer>
              </CardLink>
            </Link>
          </ListItem>
        ))}
      </PicturesGrid>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const snapshot = await firebase
    .firestore()
    .collection(INDICES.PICTURES_INDEX)
    .get();
  const images = snapshot.docs.map((doc) => doc.data()) as ImageType[];
  return {
    props: { images },
    revalidate: 60,
  };
};

export default Pictures;
