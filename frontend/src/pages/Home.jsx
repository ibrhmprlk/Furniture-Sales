import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import MobilyaTable from "../components/home/MobilyaTable";
import MobilyaCard from "../components/home/MobilyaCard";
import { MdShoppingCart } from "react-icons/md";
const Home = () => {
  const [webs, setWebs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showType, setShowType] = useState("card"); // Başlangıçta 'card'

  useEffect(() => {
  setLoading(true);
  axios
    .get("/web1")
    .then((response) => {
      setWebs(response.data.data);
      setError(null);
    })
    .catch(() => {
      setError("Data could not be fetched.");
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  if (loading) return <Spinner />;
  if (error)
    return <p className="text-blue-600 font-bold p-4">{error}</p>;

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-4 mb-6 p-4">
        <button
          className={`px-4 py-1 rounded-lg ${
            showType === "table"
              ? "bg-sky-600 text-white"
              : "bg-sky-300 hover:bg-sky-600"
          }`}
          onClick={() => setShowType("table")}
        >
          TABLE
        </button>
        <button
          className={`px-4 py-1 rounded-lg ${
            showType === "card"
              ? "bg-sky-600 text-white"
              : "bg-sky-300 hover:bg-sky-600"
          }`}
          onClick={() => setShowType("card")}
        >
          CARD
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl flex items-center gap-2">
  Furniture Product List
  <MdShoppingCart />
</h1>
        
        <Link to="/web1/create">
          <MdOutlineAddBox
            className="text-sky-800 text-4xl cursor-pointer"
            title="Add Product"
          />
        </Link>
      </div>

      {showType === "table" ? (
        <MobilyaTable webs={webs} />
      ) : (
        <MobilyaCard webs={webs} />
      )}
    </div>
  );
};

export default Home;