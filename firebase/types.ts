export type Image = {
  id: string;
  href: string;
  title: string;
  price: number;
  size: string;
  description?: string;
  sold: boolean;
};

export enum INDICES {
  PICTURES_INDEX = "pictures",
}
