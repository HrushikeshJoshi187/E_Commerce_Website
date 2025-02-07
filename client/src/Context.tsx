import { createContext, ReactNode } from "react";

import { products } from "./assets/frontend_assets/assets.ts";

interface ContextProps {
  products: typeof products;
  currency: string;
  deliveryCharge: number;
}

const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const currency = "$";
  const deliveryCharge = 10;

  const value = {
    products,
    currency,
    deliveryCharge,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
