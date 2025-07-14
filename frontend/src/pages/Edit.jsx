import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { MdShoppingCart } from "react-icons/md";

const Edit = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const { id } = useParams();

  // Sayfa açıldığında ürünü getir
  useEffect(() => {
    setLoading(true);
    axios
      .get(`/web1/${id}`) // localhost kaldırıldı, relative path
      .then((res) => {
        const urun = res.data.webs || res.data.data || res.data; // backend cevabına göre uyarlayabilirsin
        setName(urun.name);
        setPrice(urun.price);
        setImage(urun.image);
        setDescription(urun.description);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Product could not be retrieved.:", err);
        enqueueSnackbar("An error occurred while loading the product!!", { variant: "error" });
        setLoading(false);
      });
  }, [id, enqueueSnackbar]);

  // Güncelleme butonu
  const handleUpdate = () => {
    if (Number(price) < 0) {
      enqueueSnackbar("Price cannot be negative!", { variant: "error" });
      return;
    }

    const data = {
      name,
      price,
      image,
      description,
    };

    setLoading(true);

    axios
      .put(`/web1/${id}`, data) // relative path
      .then(() => {
        setLoading(false);
        enqueueSnackbar("The product has been updated successfully!", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        console.error("Update error:", error);
        enqueueSnackbar("Error occurred during update!", { variant: "error" });
        setLoading(false);
      });
  };

  return (
    <div className="p-4">
      <h1
        className="text-3xl my-5 cursor-pointer flex items-center gap-2"
        onClick={() => window.history.back()}
      >
        Furniture Product List
        <MdShoppingCart />
      </h1>
      <h1 className="text-3xl my-5 text-center">Product Update</h1>
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

        {/* Güncelle Butonu */}
        <button
          onClick={handleUpdate}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default Edit;
