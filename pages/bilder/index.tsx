import Link from "next/link";
import Image from "next/image";
import { Image as ImageType, INDICES } from "../../firebase/types";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { GetStaticProps, GetStaticPropsResult } from "next";
import React from "react";
import styled from "@emotion/styled";
import { formatPictureRoute, PICTURES_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";

const MainContent = styled.main`
  padding: 0 2rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PicturesGrid = styled.ul`
  column-count: 3;
  list-style: none outside;
  column-gap: 2em;
  row-gap: 2em;
  padding-inline-start: 0;
  @media (${device.FOR_PHONE_ONLY}) {
    column-count: 1;
  }
`;

// todo Link from Next?
const ListItem = styled.li`
  padding: 1.5rem;
  margin-bottom: 3em; // todo
  break-inside: avoid;
  color: white;
  text-align: left;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  cursor: pointer;

  :hover {
    border-color: #0070f3;
  }
`;

const CardLink = styled.a`
  color: inherit;
  text-decoration: none;
`;

type Props = {
  images: ImageType[];
};

// fixme types etterhvert..
const Pictures = ({ images }) => {
  // todo load from womeshere
  return (
    <PageWrapper>
      <MainContent>
        <h1>Bilder</h1>
        <PicturesGrid>
          {images.map((image) => (
            <ListItem key={image.title}>
              <Link href={formatPictureRoute(image.title.replace(" ", "-"))}>
                <CardLink
                  href={formatPictureRoute(image.title.replace(" ", "-"))}
                >
                  <img src={image.href} alt={image.alt} width="100%" />
                  <p>{image.title}</p>
                  <p>{image.price}</p>
                </CardLink>
              </Link>
            </ListItem>
          ))}
        </PicturesGrid>
      </MainContent>
    </PageWrapper>
  );
};

// vs getServerSideProps(context) for each request, which may be useful in some cases..
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
