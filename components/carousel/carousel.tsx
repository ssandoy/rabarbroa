import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styled from "@emotion/styled";
import Image from "next/image";
import { NextButton, PrevButton } from "./embla-button";
import { device } from "../../styles/mixins";

type Props = {
  images: { path: string; height: number; width: number; alt: string }[];
};

const Embla = styled.div`
  position: relative;
  //background-color: #f7f7f7; // todo
  padding: 20px;
  //max-width: 670px;
  margin-left: auto;
  margin-right: auto;
`;

const EmblaContainer = styled.div`
  display: flex;
`;

const EmblaSlide = styled.div`
  position: relative;
  flex: 0 0 33%;
  @media (${device.FOR_PHONE_ONLY}) {
    flex: 0 0 100%; /* Slide covers 100% of the viewport */
  }
`;

// fixme styling for mobile..

const EmblaCarousel: React.FC<Props> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <Embla>
      <div ref={emblaRef} style={{ overflow: "hidden" }}>
        <EmblaContainer>
          {images.map((image, idx) => (
            <EmblaSlide key={idx}>
              <Image
                src={image.path}
                height={image.height ?? 250} // Desired size with correct aspect ratio
                width={image.width ?? 250} // Desired size with correct aspect ratio
                alt={image.alt}
              />
            </EmblaSlide>
          ))}
        </EmblaContainer>
      </div>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />
    </Embla>
  );
};

export default EmblaCarousel;
