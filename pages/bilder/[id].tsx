import Link from "next/link";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { getPictureData } from "../../lib/pictures";
import { GetStaticProps } from "next";
import Head from "next/head";

// fixme types etterhvert..
const Id = ({ pictureData }) => {
  return (
    <PageWrapper>
      <Head>
        <title>{pictureData.title}</title>
      </Head>
      <h1>First Poeest</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      {/* Add this <section> tag below the existing <section> tag */}
      <section>
        <h2>Blog</h2>
        <ul>
          <li key={pictureData.id}>
            {pictureData.title}
            <br />
            {pictureData.price}
          </li>
        </ul>
      </section>
    </PageWrapper>
  );
};

export async function getStaticPaths() {
  // Return a list of possible value for id
  return {
    paths: [
      { params: { id: "ansikt" } },
      { params: { id: "ballonger" } },
      { params: { id: "ond-stemor" } },
      { params: { id: "fargerik" } },
      { params: { id: "mange-bilder" } },
    ],
    fallback: false,
  };
}

// vs getServerSideProps(context) for each request, which may be useful in these cases..
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pictureData = getPictureData(params.id as string);
  return {
    props: {
      pictureData,
    },
  };
};

export default Id;
