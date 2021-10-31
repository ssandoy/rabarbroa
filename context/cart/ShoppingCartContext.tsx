import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image } from "../../firebase/types";

export type ShippingType = "SPORING" | "USPORING" | "HENTE";

type ShoppingCartState = {
  items: Image[];
  setItems: Dispatch<SetStateAction<Image[]>>;
  shippingType: ShippingType;
  setShippingType: Dispatch<SetStateAction<ShippingType>>;
};

const ShoppingCartContext = React.createContext<ShoppingCartState | undefined>(
  undefined
);

export const SHOPPING_CART_KEY = "shopping-cart";
export const SHIPPING_KEY = "shipping";

const ShoppingCardProvider = (props) => {
  const [items, setItems] = useState([]);
  const [shippingType, setShippingType] = useState<ShippingType>("SPORING");

  useEffect(() => {
    const localStorageCart = localStorage.getItem(SHOPPING_CART_KEY);
    if (localStorageCart) {
      setItems(JSON.parse(localStorageCart));
    }
    const localStorageShipping = localStorage.getItem(SHIPPING_KEY);
    if (localStorageShipping) {
      setShippingType(JSON.parse(localStorageShipping));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    window.localStorage.setItem(SHIPPING_KEY, JSON.stringify(shippingType));
  }, [shippingType]);

  const value: ShoppingCartState = useMemo(
    () => ({
      items,
      setItems,
      shippingType,
      setShippingType,
    }),
    [items, shippingType]
  );

  return <ShoppingCartContext.Provider value={value} {...props} />;
};

const useShoppingCartContext = () => {
  const context = React.useContext(ShoppingCartContext);
  if (!context) {
    throw new Error(
      "useShoppingCartContext must be used within a ShoppingCartProvider"
    );
  }
  return context;
};

export { ShoppingCardProvider, useShoppingCartContext };
