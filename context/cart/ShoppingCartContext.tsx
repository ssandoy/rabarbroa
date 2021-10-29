import React, { Dispatch, SetStateAction, useMemo, useState } from "react";
import { Image } from "../../firebase/types";

type ShoppingCartState = {
  items: Image[];
  setItems: Dispatch<SetStateAction<Image[]>>;
};

const ShoppingCartContext = React.createContext<ShoppingCartState | undefined>(
  undefined
);

const ShoppingCardProvider = (props) => {
  // todo needs to be persisted after refresh. localStorage?
  const [items, setItems] = useState([]);

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
