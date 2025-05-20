import { useState, useEffect, useContext } from "react";

import { Context } from "../Context.tsx";
import { assets, product } from "../assets/assets.ts";
import Title from "../components/Title.tsx";
import ProductItem from "../components/ProductItem.tsx";

const Collection = (): JSX.Element => {
  const context = useContext(Context);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<
    product[] | undefined
  >();
  const [Category, setCategory] = useState<string[]>([]);
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [sortType, setSortType] = useState<string>("relavent");

  const toggleCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (Category?.includes(e.target.value)) {
      setCategory(Category.filter((item) => item !== e.target.value));
    } else {
      setCategory([...Category, e.target.value]);
    }
  };

  const toggleSubCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (subCategory?.includes(e.target.value)) {
      setSubCategory(subCategory.filter((item) => item !== e.target.value));
    } else {
      setSubCategory([...subCategory, e.target.value]);
    }
  };

  if (!context) {
    throw new Error("LatestCollection must be used within a ContextProvider");
  }

  const { products, search, showSearch } = context;

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (Category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        Category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    setFilteredProducts(productsCopy);
  };

  const sortProducts = () => {
    let productsCopy = filteredProducts?.slice();

    switch (sortType) {
      case "low-high":
        productsCopy?.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy?.sort((a, b) => b.price - a.price);
        break;
      default:
        applyFilter();
        break;
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  useEffect(() => {
    applyFilter();
  }, [Category, subCategory, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="dropdown icon"
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>

        <div
          className={`border border-gray-300 pl-5 py-3 my-5 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Topwear"}
                onChange={toggleSubCategory}
              />
              Topwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Bottomwear"}
                onChange={toggleSubCategory}
              />
              Bottomwear
            </p>
            <p className="flex gap-2">
              <input
                className="w-3"
                type="checkbox"
                value={"Winterwear"}
                onChange={toggleSubCategory}
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />

          <select
            className="border-2 border-gray-300 text-sm px-2"
            onChange={(e) => {
              setSortType(e.target.value);
            }}
          >
            <option value="relavent">Sort by: Relavant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts &&
            filteredProducts.map((item, index) => {
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
    </div>
  );
};

export default Collection;
