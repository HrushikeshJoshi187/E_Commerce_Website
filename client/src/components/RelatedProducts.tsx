import { useState, useEffect, useContext } from "react";

import { Context } from "../Context.tsx";
import { product } from "../assets/assets.ts";
import Title from "./Title.tsx";
import ProductItem from "./ProductItem.tsx";

interface RelatedProductsProps {
  category: string;
  subCategory: string;
}

const RelatedProducts = ({
  category,
  subCategory,
}: RelatedProductsProps): JSX.Element => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("RelatedProducts must be used within a ContextProvider");
  }
  const { products } = context;
  const [relatedProducts, setRelatedProducts] = useState<product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();

      productsCopy = productsCopy.filter((item) => category === item.category);

      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );

      setRelatedProducts(productsCopy.slice(0, 5));
    }
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((item, index) => (
          <ProductItem
            key={index}
            id={item._id}
            name={item.name}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
