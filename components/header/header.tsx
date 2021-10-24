import React from "react";
import styled from "@emotion/styled";
import { GetStaticProps, GetStaticPropsResult } from "next";
import Image from "next/image";
import NavBar from "../nav-bar/NavBar";
import { useRouter } from "next/router";
import { INTRO_ROUTE } from "../../routes/routes";

const Container = styled.header`
  display: flex;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #eaeaea;
  justify-content: space-evenly;
  align-items: center;
`;

type Props = {
  logo: {
    path: string;
    height: number;
    width: number;
    alt: string;
  };
};
// fix so that this ssg-s...
const Header: React.FC<Props> = ({ logo }) => {
  const router = useRouter();
  return (
    <Container>
      <Image
        onClick={() => router.push(INTRO_ROUTE)}
        src="/images/header-logo.png"
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Logo"
      />
      <NavBar />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
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

export default Header;
