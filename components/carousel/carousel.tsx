import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styled from "@emotion/styled";
import Image from "next/image";
import { DotButton, NextButton, PrevButton } from "./embla-button";
import { device } from "../../styles/mixins";

type Props = {
  images: { path: string; height: number; width: number; alt: string }[];
};

const Embla = styled.div`
  position: relative;
  padding: 20px;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
  @media (${device.FOR_PHONE_ONLY}) {
    max-width: 300px;
  }
`;

const EmblaContainer = styled.div`
  display: flex;
`;

const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;
`;

const EmblaSlide = styled.div`
  position: relative;
  min-width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmblaSlideStatus = styled.div`
  display: flex;
  justify-content: center;
`;

const EmblaCarousel: React.FC<Props> = ({ images }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onSelect = useCallback(() => {
    setSelectedIndex(emblaApi?.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    setSelectedIndex(emblaApi?.selectedScrollSnap());
    setScrollSnaps(emblaApi?.scrollSnapList());
    emblaApi?.on("select", onSelect);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  return (
    <Embla>
      <EmblaViewport ref={emblaRef}>
        <EmblaContainer>
          {images.map((image, idx) => (
            <EmblaSlide key={idx}>
              <Image
                src={image.path}
                height={image.height}
                width={image.width}
                alt={image.alt}
              />
            </EmblaSlide>
          ))}
        </EmblaContainer>
        <EmblaSlideStatus>
          {scrollSnaps?.map((item, index) => (
            <DotButton
              key={index}
              selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </EmblaSlideStatus>
      </EmblaViewport>
      <PrevButton onClick={scrollPrev} />
      <NextButton onClick={scrollNext} />
    </Embla>
  );
};

export default EmblaCarousel;
