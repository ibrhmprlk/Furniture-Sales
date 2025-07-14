import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";
import { MdShoppingCart } from "react-icons/md";

const Delete = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = () => {
    setLoading(true);
    setError(null);

    axios.delete(`/web1/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Product successfully deleted!", { variant: "success" });
        navigate("/");
      })
      .catch((err) => {
        setError("An error occurred while deleting the product!");
        enqueueSnackbar("Error occurred while deleting!", { variant: "error" });
        setLoading(false);
        console.error(err);
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
      <h1 className="text-3xl my-5 text-center">Product Deletion</h1>
      {loading ? <Spinner /> : null}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className="text-2xl">
Are you sure you want to delete this product?
        </h3>
        {error && <p className="text-red-600 mb-4 font-bold">{error}</p>}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="p-4 bg-red-600 text-white m-8 w-full rounded hover:bg-red-700 transition"
        >
          {loading ? "Siliniyor..." : "Sil"}
        </button>
      </div>
    </div>
  );
};

export default Delete;