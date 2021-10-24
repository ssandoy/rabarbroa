import { globalStyles } from "../styles/global";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import Head from "next/head";
import React from "react";

const App = ({ Component, pageProps, props }) => {
  return (
    <>
      <Head>
        <title>Rababroa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {globalStyles}
      <Header logo={pageProps.logo} />
      <Component {...pageProps} />
      <Footer />
    </>
  );
};

export const getStaticProps = async () => {
  // todo svg and inside header instead...
  const logo = {
    path: "/images/header-logo.png",
    height: 200,
    width: 200,
    alt: "Logo",
  };
  return {
    props: {
      logo,
    },
  };
};

export default App;
