import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image } from "../../firebase/types";

export type FormStage = "CART" | "CONTACTINFO" | "PAYMENT";

type ShoppingCartState = {
  items: Image[];
  setItems: Dispatch<SetStateAction<Image[]>>;
  formStage: FormStage; // todo rename
  setFormStage: Dispatch<SetStateAction<FormStage>>;
};

const ShoppingCartContext = React.createContext<ShoppingCartState | undefined>(
  undefined
);

export const SHOPPING_CART_KEY = "shopping-cart";

const ShoppingCardProvider = (props) => {
  const [items, setItems] = useState([]);
  const [formStage, setFormStage] = useState<FormStage>("CART");

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
      formStage,
      setFormStage,
    }),
    [items, formStage]
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
