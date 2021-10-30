import { Image } from "./types";

export const calculateTotalPrice = (images: Image[]) =>
  images.reduce((acc, curr) => {
    return acc + curr.price;
  }, 0);

// fixme use id? this breaks if multiple titles
export const imageListContainsImage = (images: Image[]) => (image: Image) => {
  return images.filter((i) => i.title === image.title).length;
};

export const removeImageFromImages = (images: Image[]) => (image: Image) => {
  return images.filter((i) => i.title !== image.title);
};
