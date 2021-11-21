import { globalStyles } from "../styles/global";
import Header from "../components/header/header";
import Footer from "../components/footer/Footer";
import { AdminProvider } from "../context/admin/AdminContext";
import Head from "next/head";
import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { ShoppingCardProvider } from "../context/cart/ShoppingCartContext";
import styled from "@emotion/styled";
import { FormData } from "../components/checkout/domain";
import { useForm, FormProvider } from "react-hook-form";

const ParentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const App = ({ Component, pageProps }) => {
  const methods = useForm<FormData>();
  return (
    <AdminProvider>
      <ShoppingCardProvider>
        <FormProvider {...methods}>
          <Head>
            <title>Rababroa</title>
            <link rel="icon" href="/favicon.ico" />
            <link
              href="https://fonts.googleapis.com/css2?family=Antonio"
              rel="stylesheet"
            />
            <link
              href="https://fonts.googleapis.com/css2?family=Great+Vibes"
              rel="stylesheet"
            />
          </Head>
          {globalStyles}
          <ParentWrapper>
            <Header />
            <Component {...pageProps} />
            <Footer />
          </ParentWrapper>
        </FormProvider>
      </ShoppingCardProvider>
    </AdminProvider>
  );
};

export default App;
