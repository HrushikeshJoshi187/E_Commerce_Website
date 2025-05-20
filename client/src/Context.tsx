import { useState, createContext, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { products } from "./assets/assets.ts";

interface CartItemsType {
  [itemID: string]: {
    [size: string]: number;
  };
}

interface ContextProps {
  products: typeof products;
  currency: string;
  deliveryCharge: number;
  search: string;
  setSearch: (search: string) => void;
  showSearch: boolean;
  setShowSearch: (showSearch: boolean) => void;
  cartItems: CartItemsType;
  addToCart: (itemID: string, size: string) => void;
  getCartCount: () => number;
  updateQuantity: (itemID: string, size: string, quantity: number) => void;
  getCartAmount: () => number;
  navigate: (path: string) => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

const ContextProvider = ({ children }: { children: ReactNode }) => {
  const currency = "$";
  const deliveryCharge = 10;
  const [search, setSearch] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<CartItemsType>({});
  const navigate = useNavigate();

  const addToCart = async (itemID: string, size: string) => {
    if (!size) {
      toast.error("Please select product size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] += 1;
      } else {
        cartData[itemID][size] = 1;
      }
    } else {
      cartData[itemID] = {};
      cartData[itemID][size] = 1;
    }
    setCartItems(cartData);
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const item in cartItems) {
      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalCount += cartItems[item][size];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    return totalCount;
  };

  const updateQuantity = (itemID: string, size: string, quantity: number) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemID]) {
      if (cartData[itemID][size]) {
        cartData[itemID][size] = quantity;
      }
    }

    setCartItems(cartData);
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = products.find((product) => product._id === item);

      if (!itemInfo) {
        continue;
      }

      for (const size in cartItems[item]) {
        try {
          if (cartItems[item][size] > 0) {
            totalAmount += itemInfo.price * cartItems[item][size];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }

    return totalAmount;
  };

  const value = {
    products,
    currency,
    deliveryCharge,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, ContextProvider };
