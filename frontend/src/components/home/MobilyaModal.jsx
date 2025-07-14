import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineWeb } from "react-icons/md";
import { BiUserCircle } from "react-icons/bi";
import { BsCardText } from "react-icons/bs";

const MobilyaModal = ({ webs, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/15 z-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full bg-white rounded-xl p-6 flex flex-col relative shadow-lg"
      >
        {/* Kapat */}
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />

        {/* Fiyat */}
        <h2 className="w-fit px-4 py-1 bg-red-300 text-white rounded-lg font-semibold mb-4">
          {webs.price ? Number(webs.price).toLocaleString("tr-TR") : "0"}₺
        </h2>

        {/* Resim */}
   <div className="w-full h-[300px] rounded-md overflow-hidden mb-4 flex justify-center items-center bg-gray-100">
  <img
    src={webs.image}
    alt={webs.name}
    className="min-w-full min-h-full object-cover"
  />
</div>

        {/* İsim */}
        <div className="flex items-center gap-x-2 mb-3">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="text-lg font-semibold">{webs.name}</h2>
        </div>

        {/* Açıklama */}
        <div className="flex items-center gap-x-2">
          <BsCardText className="text-red-300 text-2xl" />
          <p className="text-gray-700">{webs.description}</p>
        </div>
      </div>
    </div>
  );
};

export default MobilyaModal;
