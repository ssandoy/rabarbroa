import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../components/page-wrapper/page-wrapper";
import { INTRO_ROUTE } from "../routes/routes";
import { Heading1, PrimaryButton } from "../styles/global";

const Container = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Custom404 = () => {
  const router = useRouter();
  return (
    <PageWrapper>
      <Container>
        <Heading1>
          Ups! <br /> Her klarte vi ikke å finne noe innhold, gitt!
        </Heading1>
        <PrimaryButton onClick={() => router.push(INTRO_ROUTE)}>
          Gå tilbake til startsiden
        </PrimaryButton>
      </Container>
    </PageWrapper>
  );
};

export default Custom404;
