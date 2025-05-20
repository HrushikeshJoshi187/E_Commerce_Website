import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.tsx";
import Sidebar from "./components/Sidebar.tsx";
import Add from "./pages/Add.tsx";
import List from "./pages/List.tsx";
import Orders from "./pages/Orders.tsx";
import Login from "./components/Login.tsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const server_url = import.meta.env.VITE_SERVER_URL;

const App = () => {
  const [token, setToken] = useState<string>(
    localStorage.getItem("token") || ""
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />

            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />} />
                <Route path="/list" element={<List token={token} />} />
                <Route path="/orders" element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
