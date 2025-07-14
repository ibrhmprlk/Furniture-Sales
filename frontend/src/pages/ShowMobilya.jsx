import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdShoppingCart } from "react-icons/md";

const ShowMobilya = () => {
  const [web, setWeb] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/web1/${id}`)
      .then((response) => {
        console.log("Data Received:", response.data);

        // Backend'den gelen veri yapısına göre güncelle
        const gelen = response.data.webs || response.data.data || response.data;

        if (gelen && typeof gelen === "object") {
          setWeb(gelen);
          setError(null);
        } else {
          setError("Product not found.");
        }
      })
      .catch((error) => {
        console.error("Data extraction error:", error);
        setError("Data could not be fetched.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (error)
    return (
      <p className="text-red-600 font-bold p-4">
        {error}
      </p>
    );
  if (!web)
    return (
      <p className="text-red-600 font-bold p-4">
        No record found.
      </p>
    );

  return (
    <div className="p-4">
      <h1
        className="text-3xl my-5 cursor-pointer flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        Furniture Product List <MdShoppingCart />
      </h1>
      <h2 className="text-3xl my-5 text-center">Product Detail</h2>

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">ID:</span>
          <span>{web._id}</span>
        </div>

        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Name:</span>
          <span>{web.name}</span>
        </div>

        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Price:</span>
          <span>{web.price}₺</span>
        </div>

        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Image:</span>
          <img
            src={web.image}
            alt="Ürün görseli"
            className="w-40 h-40 object-cover mt-2"
          />
        </div>

        <div className="my-4">
          <span className="text-xl mr-4 text-gray-500">Explanation:</span>
          <span>{web.description}</span>
        </div>
      </div>
    </div>
  );
};

export default ShowMobilya;
