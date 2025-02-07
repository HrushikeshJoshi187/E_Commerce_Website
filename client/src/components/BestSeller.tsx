import { useState, useEffect, useContext } from "react";

import { Context } from "../Context.tsx";
import { product } from "../assets/frontend_assets/assets.ts";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

const BestSeller = (): JSX.Element => {
  const context = useContext(Context);
  const [bestSeller, setBestSeller] = useState<product[] | undefined>([]);

  if (!context) {
    throw new Error("LatestCollection must be used within a ContextProvider");
  }

  const { products } = context;

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller &&
          bestSeller.map((item, index) => {
            return (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BestSeller;
