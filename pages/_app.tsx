import { globalStyles } from "../styles/global";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { AdminProvider } from "../context/admin/AdminContext";
import Head from "next/head";
import React from "react";
import "react-image-crop/dist/ReactCrop.css";
import { ShoppingCardProvider } from "../context/cart/ShoppingCartContext";

const App = ({ Component, pageProps }) => {
  return (
    <AdminProvider>
      <ShoppingCardProvider>
        <Head>
          <title>Rababroa</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {globalStyles}
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ShoppingCardProvider>
    </AdminProvider>
  );
};

export default App;
