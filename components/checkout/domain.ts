export type ShippingType = "SPORING" | "USPORING" | "HENTE";

interface ContactInfo {
  firstName: string;
  lastName: string;
  address: string;
  postalNumberAndCity: string; // todo..
  email: string;
  phoneNumber: string;
}

export interface FormData {
  shippingType: ShippingType;
  contactInfo: ContactInfo;
}

export const shippingTypeToString = (shippingType: ShippingType) => {
  switch (shippingType) {
    case "SPORING":
      return "Posten m/ sporing";
    case "HENTE":
      return "Hente på Toft";
    case "USPORING":
      return "Posten u/ sporing";
  }
};

export const calculateShippingPrice = (shippingType: ShippingType) => {
  switch (shippingType) {
    case "HENTE":
      return 0;
    case "SPORING":
      return 189;
    case "USPORING":
      return 99;
    default:
      return null;
  }
};
