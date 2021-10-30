import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image } from "../../firebase/types";

type ShoppingCartState = {
  items: Image[];
  setItems: Dispatch<SetStateAction<Image[]>>;
};

const ShoppingCartContext = React.createContext<ShoppingCartState | undefined>(
  undefined
);

export const SHOPPING_CART_KEY = "shopping-cart";

const ShoppingCardProvider = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const localStorageCart = localStorage.getItem(SHOPPING_CART_KEY);
    if (localStorageCart) {
      console.log("localStorageCart");
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
    }),
    [items]
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
