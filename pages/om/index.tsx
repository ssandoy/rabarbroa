import styled from "@emotion/styled";
import Image from "next/image";
import PageWrapper from "../../components/page-wrapper/page-wrapper";
import { CardContainer, Heading1 } from "../../styles/global";
import barbro from "../../public/images/mamma.png";
import { device } from "../../styles/mixins";

const Text = styled.p`
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
  margin: 28px 0;
`;

const Signatur = styled.p`
  font-family: Great Vibes, sans-serif;
  font-size: 28px;
`;

const Container = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  width: 524px;
  @media (${device.FOR_PHONE_ONLY}) {
    width: 90vw;
  }
`;

const ImageContainer = styled.div`
  grid-row-start: 1;
  grid-column-start: 1;
  align-self: start; /* top of column */
  justify-self: end; /* right of row */
`;

const MammaContainer = styled(CardContainer)`
  padding: 0 32px;
  grid-row-start: 1;
  grid-column-start: 1;

  @media (${device.FOR_PHONE_ONLY}) {
    margin-top: 100px;
    width: 250px;
  }
`;

const About = () => {
  return (
    <PageWrapper>
      <Heading1>Barbro</Heading1>
      <Container>
        <MammaContainer>
          <Text>
            <b>Jeg er Barbro.</b>
          </Text>
          <Text>
            Her skrives en tekst om Barbro og hennes erfaring med kunst.
            Eksempelvis tekst og tekst med mer tekst.
          </Text>
          <Text>
            Så skrives noe mer tekst om Barbro og kunsten hennes, også fyller vi
            ut denne tekstboksen så godt det lar seg.
          </Text>
          <Text>
            Gjerne mer tekst her også. Og litt mer tekst foreksempel som
            beskriver livet til Barbro og hvorfor kunsten er viktig.
          </Text>
          <Signatur>Barbro</Signatur>
        </MammaContainer>
        <ImageContainer>
          <Image
            src={barbro}
            alt="Bilde av Rabarbro"
            width={150}
            height={150}
          />
        </ImageContainer>
      </Container>
    </PageWrapper>
  );
};

export default About;
