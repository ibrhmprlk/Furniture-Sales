import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineWeb } from "react-icons/md";
import { BiShow, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import MobilyaModal from "./MobilyaModal";

const MobilyaSingleCard = ({ webs }) => {
  const [showModal, setShowModal] = useState(false);

  if (!webs) {
    // webs undefined ise hata vermesin diye
    return null;
  }

  return (
    <div
      className="
        border-2 border-gray-500 rounded-lg px-4 py-3 m-4 relative 
        bg-white
        hover:bg-blue-100
        hover:shadow-[0_0_10px_3px_rgba(239,68,68,0.4)]
        transition-colors transition-shadow duration-300
      "
    >
      {/* Fiyat */}
      <h2
        className="absolute top-2 right-3 px-3 py-1 bg-red-300 text-white 
                   rounded-lg text-sm font-semibold shadow-md select-none"
      >
        {webs.price ? Number(webs.price).toLocaleString("tr-TR") : "0"}₺
      </h2>

      {/* Resim */}
      <div className="w-full h-44 overflow-hidden rounded-md mb-3">
        {webs.image ? (
          <img
            src={webs.image}
            alt={webs.name || "Ürün resmi"}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            Resim yok
          </div>
        )}
      </div>

      {/* ID (isteğe bağlı) */}
      <h4 className="text-gray-500 text-xs mb-1 truncate">{webs._id || "ID yok"}</h4>

      {/* İsim */}
      <div className="flex items-center gap-x-2 text-gray-800 text-base font-medium truncate">
        <BiUserCircle className="text-red-300 text-xl flex-shrink-0" />
        <p>{webs.name || "İsim yok"}</p>
      </div>

      {/* Alt ikonlar: göz, bilgi, düzenle, sil */}
      <div className="flex justify-center items-center gap-x-12 mt-5">
        <div
          onClick={() => setShowModal(true)}
          className="cursor-pointer"
          title="Detay Gör"
        >
          <BiShow className="text-3xl text-blue-800 hover:text-black transition-colors" />
        </div>
        <Link to={`/web1/details/${webs._id}`} title="Detay">
          <BsInfoCircle className="text-3xl text-green-800 hover:text-black transition-colors" />
        </Link>
        <Link to={`/web1/edit/${webs._id}`} title="Düzenle">
          <AiOutlineEdit className="text-3xl text-yellow-600 hover:text-black transition-colors" />
        </Link>
        <Link to={`/web1/delete/${webs._id}`} title="Sil">
          <MdOutlineDelete className="text-3xl text-red-600 hover:text-black transition-colors" />
        </Link>
      </div>

      {/* Modal */}
      {showModal && <MobilyaModal webs={webs} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default MobilyaSingleCard;
