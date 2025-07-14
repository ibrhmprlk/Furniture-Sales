import React from "react";
import { Link } from "react-router-dom";
import { MdOutlineWeb } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import MobilyaSingleCard from "./MobilyaSingleCard";

const MobilyaCard = ({ webs }) => {
  if (!webs || !Array.isArray(webs)) {
    return <p>Ürünler yükleniyor veya bulunamadı.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4">
      {webs.map((item) => (
        <MobilyaSingleCard key={item._id} webs={item} />
      ))}
    </div>
  );
};

export default MobilyaCard;
