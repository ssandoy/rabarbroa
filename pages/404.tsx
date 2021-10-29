import styled from "@emotion/styled";
import Link from "next/link";
import PageWrapper from "../components/page-wrapper/page-wrapper";
import { INTRO_ROUTE } from "../routes/routes";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Custom404 = () => {
  return (
    <PageWrapper>
      <Container>
        <h1>
          Ups! <br /> Her klarte vi ikke å finne noe innhold, gitt!
        </h1>
        <p>
          <Link href={INTRO_ROUTE}>
            <a style={{ color: "white" }}>Her</a>
          </Link>{" "}
          kan du gå tilbake til startsiden og prøve igjen
        </p>
      </Container>
    </PageWrapper>
  );
};

export default Custom404;
