import Link from "next/link";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { Image as ImageType, INDICES } from "../../firebase/types";
import Head from "next/head";
import Modal from "react-modal";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { PRODUCTS_ROUTE } from "../../routes/routes";
import { device } from "../../styles/mixins";
import firebase from "../../firebase/init";
import {
  PrimaryButton,
  Heading1,
  modalStyles,
  StyledImage,
  StyledImageDiv,
} from "../../styles/global";
import { formatPrice, formatSize } from "./index";
import { useShoppingCartContext } from "../../context/cart/ShoppingCartContext";
import {
  imageListContainsImage,
  removeImageFromImages,
} from "../../firebase/domain";
import { HandlevognModal } from "../../components/handlevogn-modal/HandlevognModal";
import Custom404 from "../404";
import { BackArrow } from "../../components/icons/back-arrow/BackArrow";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr 1fr;
  @media (${device.FOR_TABLET_PORTRAIT_DOWN}) {
    width: 75vw;
    grid-template-columns: 1fr;
    grid-gap: 8px;
  }
  @media (${device.FOR_TABLET_PORTRAIT_UP}) {
    max-width: 800px;
    margin: 16px;
  }
  grid-gap: 32px;
`;

const ReturnHeading = styled.h2`
  font-weight: lighter;
  margin: 12px;
  font-size: 1rem;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: right;
  padding-top: 32px;
  @media (${device.FOR_PHONE_ONLY}) {
    padding-top: 0;
    margin-top: 0;
  }
`;

const InfoText = styled.p`
  font-family: Arial, Helvetica, sans-serif;
  margin: 12px 0;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
`;

const ArrowContainer = styled.div`
  position: absolute;
  top: 12px;
  left: -12px;
`;

type Props = {
  image: ImageType;
};

const Id: React.FC<Props> = ({ image }) => {
  const { items, setItems } = useShoppingCartContext();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  // todo why is this necessary
  if (image === null) {
    return <Custom404 />;
  }

  const imageInShoppingCart = imageListContainsImage(items)(image);
  return (
    <PageWrapper>
      <Head>
        <title>{image.title}</title>
      </Head>

      <Section>
        <Container>
          <div>
            <ReturnHeading>
              <Link href={PRODUCTS_ROUTE}>
                <a
                  style={{
                    color: "black",
                    position: "relative",
                    textDecoration: "none",
                  }}
                >
                  Tilbake til produkter
                  <ArrowContainer>
                    <BackArrow />
                  </ArrowContainer>
                </a>
              </Link>
            </ReturnHeading>
            <StyledImageDiv>
              <StyledImage src={image.href} alt={image.title} layout="fill" />
            </StyledImageDiv>
          </div>
          <InfoContainer>
            <Heading1 style={{ margin: "8px 0 0 0", fontSize: "2rem" }}>
              {image.title}
            </Heading1>
            <InfoText>{formatSize(image.size)}</InfoText>
            <InfoText>H??ndtegnet p?? lerret med tusj.</InfoText>
            <InfoText style={{ fontWeight: "bold" }}>
              {formatPrice(image.price)}
            </InfoText>
            {imageInShoppingCart ? (
              <PrimaryButton
                style={{ marginTop: "auto" }}
                onClick={() => {
                  const newItems = removeImageFromImages(items)(image);
                  setItems(newItems);
                }}
              >
                Fjern fra handlevogn
              </PrimaryButton>
            ) : (
              <PrimaryButton
                style={{ marginTop: "auto", fontSize: "1rem" }}
                onClick={() => {
                  setItems((prevItems) => [...prevItems, image]);
                  setModalOpen(true);
                }}
              >
                LEGG TIL I HANDLEKURV
              </PrimaryButton>
            )}
          </InfoContainer>
        </Container>
      </Section>
      <Modal isOpen={modalOpen} onRequestClose={closeModal} style={modalStyles}>
        <HandlevognModal image={image} onClick={closeModal} />
      </Modal>
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
  const image = snapshot.docs[0]?.data() as ImageType;
  return {
    props: {
      image: image ?? null,
    },
    revalidate: 60,
  };
};

export default Id;
