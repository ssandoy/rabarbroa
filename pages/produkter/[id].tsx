import Link from "next/link";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { Image as ImageType, INDICES } from "../../firebase/types";
import Head from "next/head";
import React from "react";
import styled from "@emotion/styled";
import { PRODUCTS_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";
import { Button, Heading1 } from "../../styles/global";
import { formatPrice } from "./index";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import {
  imageListContainsImage,
  removeImageFromImages,
} from "../../firebase/domain";

const ImageContainer = styled.div`
  margin: 2em;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  @media (${device.FOR_PHONE_ONLY}) {
    grid-template-columns: 1fr;
  }
  grid-gap: 2em;
`;

const Image = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div``;

const Section = styled.section`
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    width: 85vw;
  }
`;

type Props = {
  image: ImageType;
};

// todo modal here which says success and allows you to go to handlekurv
const Id: React.FC<Props> = ({ image }) => {
  const { items, setItems } = useShoppingCartContext();

  const imageInShoppingCart = imageListContainsImage(items)(image);
  return (
    <PageWrapper>
      <Head>
        <title>{image.title}</title>
      </Head>
      <h2>
        <Link href={PRODUCTS_ROUTE}>
          <a style={{ color: "black" }}>Tilbake</a>
        </Link>
      </h2>
      {/* Add this <section> tag below the existing <section> tag */}
      <Section>
        <ImageContainer>
          <Image src={image.href} alt={image.title} />
          <InfoContainer>
            <Heading1>{image.title}</Heading1>
            <p>{formatPrice(image.price)}</p>
            <p>{image.size}</p>
            {imageInShoppingCart ? (
              <Button
                onClick={() => {
                  const newItems = removeImageFromImages(items)(image);
                  setItems(newItems);
                }}
              >
                Fjern fra handlevogn
              </Button>
            ) : (
              <Button
                onClick={() => setItems((prevItems) => [...prevItems, image])}
              >
                Legg til i handlevogn
              </Button>
            )}
          </InfoContainer>
        </ImageContainer>
      </Section>
    </PageWrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id
  const snapshot = await firebase
    .firestore()
    .collection(INDICES.PICTURES_INDEX)
    .get();
  const images = snapshot.docs.map((doc) => doc.data()) as ImageType[];
  return {
    paths: images.map((image) => ({
      params: { id: image.title.replace(" ", "-") },
    })),
    fallback: "blocking",
  };
}

// vs getServerSideProps(context) for each request, which may be useful in these cases..
export const getStaticProps: GetStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<Props>> => {
  const id = params.id as string;
  const snapshot = await firebase
    .firestore()
    .collection(INDICES.PICTURES_INDEX)
    .where("title", "==", id.replace("-", " "))
    .get();
  const image = snapshot.docs[0].data() as ImageType;
  return {
    props: {
      image,
    },
    revalidate: 60,
  };
};

export default Id;
