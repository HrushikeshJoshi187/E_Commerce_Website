import { useState, useEffect, useContext } from "react";

import { Context } from "../Context.tsx";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";
import { product } from "../assets/assets.ts";

const LatestCollection = (): JSX.Element => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("LatestCollection must be used within a ContextProvider");
  }

  const { products } = context;
  const [latestProducts, setLatestProducts] = useState<product[] | undefined>(
    []
  );

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, []);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProducts &&
          latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
      </div>
    </div>
  );
};

export default LatestCollection;
