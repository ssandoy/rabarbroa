import Link from "next/link";
import { Image as ImageType, INDICES } from "../../firebase/types";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import numberFormat from "underscore.string/numberFormat";
import { GetStaticProps, GetStaticPropsResult } from "next";
import React from "react";
import styled from "@emotion/styled";
import { formatPictureRoute } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";

const MainContent = styled.main`
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    padding: 0 2rem;
    width: 80vw;
  }

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PicturesGrid = styled.ul`
  column-count: 3;
  list-style: none outside;
  column-gap: 3em;
  row-gap: 3em;
  padding-inline-start: 0;
  @media (${device.FOR_PHONE_ONLY}) {
    column-count: 2;
    column-gap: 1em;
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
  padding: 1.5em 1em 1em;
  margin-bottom: 3em;
  break-inside: avoid;
  text-align: left;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.51);
  box-shadow: 0 0 1.5px rgba(0, 0, 0, 0.25);
  cursor: pointer;

  transition: transform 0.3s ease-in;
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

const Image = styled.img``;

// this adds space between every third number
export const formatPrice = (price: number) => {
  return `kr ${numberFormat(price, 0, " ", " ")}`;
};

type Props = {
  images: ImageType[];
};

const Pictures: React.FC<Props> = ({ images }) => {
  return (
    <PageWrapper>
      <MainContent>
        <PicturesGrid>
          {images.map((image) => (
            <ListItem key={image.title}>
              <Link href={formatPictureRoute(image.title.replace(" ", "-"))}>
                <CardLink
                  href={formatPictureRoute(image.title.replace(" ", "-"))}
                >
                  <Image src={image.href} alt={image.title} width="100%" />
                  <TextContainer>
                    <CardTitle>{image.title}</CardTitle>
                    <p>{formatPrice(image.price)}</p>
                  </TextContainer>
                </CardLink>
              </Link>
            </ListItem>
          ))}
        </PicturesGrid>
      </MainContent>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  // todo consider react-firebase-hooks inside component for live updates
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
