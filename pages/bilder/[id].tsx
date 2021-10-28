import Link from "next/link";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { getPictureData } from "../../lib/pictures";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { Image as ImageType, INDICES } from "../../firebase/types";
import Head from "next/head";
import React from "react";
import styled from "@emotion/styled";
import { PICTURES_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";

const ImageContainer = styled.div`
  margin: 2em;
  display: grid;
  grid-template-rows: 1fr 1fr;
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

type Props = {
  image: ImageType;
};

// fixme types etterhvert..
const Id: React.FC<Props> = ({ image }) => {
  return (
    <PageWrapper>
      <Head>
        <title>{image.title}</title>
      </Head>
      <h2>
        <Link href={PICTURES_ROUTE}>Bilder</Link>
      </h2>
      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <ImageContainer>
          <Image src={image.href} alt={image.title} />
          <InfoContainer>
            <h1>{image.title}</h1>
            <p>{image.price}</p>
            <p>{image.size}</p>
            <button
            // todo onclick
            >
              Legg til i handlevogn
            </button>
          </InfoContainer>
        </ImageContainer>
      </section>
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
  console.log(images);
  return {
    paths: images.map((image) => ({
      params: { id: image.title.replace(" ", "-") },
    })),
    fallback: false,
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
  };
};

export default Id;
