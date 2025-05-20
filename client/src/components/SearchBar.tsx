import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { Context } from "../Context.tsx";
import { assets } from "../assets/assets.ts";

const Searchbar = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("LatestCollection must be used within a ContextProvider");
  }
  const { search, setSearch, showSearch, setShowSearch } = context;

  const location = useLocation();
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    if (location.pathname === "/collection") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="border-t border-b bg-gray-50 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="flex-1 outline-none bg-inherit text-sm"
          type="text"
          placeholder="Search"
        />
        <img className="w-4" src={assets.search_icon} alt="search icon" />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 cursor-pointer"
        src={assets.cross_icon}
      />
    </div>
  ) : null;
};

export default Searchbar;
