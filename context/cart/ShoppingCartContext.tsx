import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image } from "../../firebase/types";

export type FormStage = "CART" | "CONTACTINFO" | "PAYMENT" | "RECEIPT";

type ShoppingCartState = {
  items: Image[];
  setItems: Dispatch<SetStateAction<Image[]>>;
  activeFormStage: FormStage;
  setActiveFormStage: Dispatch<SetStateAction<FormStage>>;
};

const ShoppingCartContext = React.createContext<ShoppingCartState | undefined>(
  undefined
);

export const SHOPPING_CART_KEY = "shopping-cart";

const ShoppingCardProvider = (props) => {
  const [items, setItems] = useState([]);
  const [activeFormStage, setActiveFormStage] = useState<FormStage>("CART");

  useEffect(() => {
    const localStorageCart = localStorage.getItem(SHOPPING_CART_KEY);
    if (localStorageCart) {
      setItems(JSON.parse(localStorageCart));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(SHOPPING_CART_KEY, JSON.stringify(items));
  }, [items]);

  const value: ShoppingCartState = useMemo(
    () => ({
      items,
      setItems,
      activeFormStage,
      setActiveFormStage,
    }),
    [items, activeFormStage]
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
