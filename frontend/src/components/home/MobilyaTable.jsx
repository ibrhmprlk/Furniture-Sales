import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
const MobilyaTable = ({webs})=>{
    return(
             <table className="w-full border-separate border-spacing-2">
        <thead>
          <tr>
            <th className="border border-slate-600 rounded-md">#</th>
            <th className="border border-slate-600 rounded-md">İsim</th>
            <th className="border border-slate-600 rounded-md">Fiyat</th>
            <th className="border border-slate-600 rounded-md">Görsel</th>
            <th className="border border-slate-600 rounded-md">Açıklama</th>
            <th className="border border-slate-600 rounded-md">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {webs?.map((web, index) => (
            <tr key={index}>
              <td className="border border-slate-700 rounded-md text-center">{index + 1}</td>
              <td className="border border-slate-700 rounded-md text-center">{web.name}</td>
              <td className="border border-slate-700 rounded-md text-center">{web.price}₺</td>
              <td className="border border-slate-700 rounded-md text-center">
                <img
                  src={web.image}
                  alt="ürün görseli"
                  className="w-20 h-20 object-cover mx-auto"
                />
              </td>
              <td className="border border-slate-700 rounded-md text-center">{web.description}</td>
              <td className="border border-slate-700 rounded-md text-center">
                <div className="flex justify-center gap-x-4">
                  <Link to={`/web1/details/${web._id}`}>
                    <BsInfoCircle className="text-2xl text-green-800" />
                  </Link>
                  <Link to={`/web1/edit/${web._id}`}>
                    <AiOutlineEdit className="text-2xl text-yellow-600" />
                  </Link>
                  <Link to={`/web1/delete/${web._id}`}>
                    <MdOutlineDelete className="text-2xl text-red-600" />
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}
export default MobilyaTable;