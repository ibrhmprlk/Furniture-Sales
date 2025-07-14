import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MdShoppingCart } from "react-icons/md";

const Mobilya = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleSaveWeb = () => {
    const data = {
      name,
      price,
      image,
      description,
    };

    setLoading(true);

    axios
      .post("/web1/", data)  // <<< Burada localhost kaldırıldı, relative path yapıldı
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Web added successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        enqueueSnackbar("Error while adding!", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h1
        className="text-3xl my-5 cursor-pointer flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        Furniture Product List <MdShoppingCart />
      </h1>
      <h1 className="text-3xl my-5 text-center">Adding a Product</h1>
      {loading && <Spinner />}

      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        {/* İsim */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Fiyat */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Price:</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "" || Number(val) >= 0) {
                setPrice(val);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e" || e.key === "+") {
                e.preventDefault();
              }
            }}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Görsel */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Image URL:</label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full"
          />
        </div>

        {/* Açıklama */}
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Explanation:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-2 w-full h-24 resize-none"
          />
        </div>

        {/* Kaydet Butonu */}
        <button
          onClick={handleSaveWeb}
          disabled={loading}
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Mobilya;
