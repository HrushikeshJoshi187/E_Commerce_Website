import { useContext } from "react";

import { Context } from "../Context.tsx";
import Title from "./Title.tsx";

const CartTotal = (): JSX.Element => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Product must be used within a ContextProvider");
  }
  const { currency, deliveryCharge, getCartAmount } = context;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTAL"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {getCartAmount()}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency} {deliveryCharge}.00
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}{" "}
            {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryCharge}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
