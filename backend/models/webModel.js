import mongoose from "mongoose";
const webSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },

    price: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: false,
      },
   description:{
    type:String,
    maxlength: 300,
    required:true,
   }
},
{
    timestamps:true,
  }
);
//Bu kod, MongoDB’de cats koleksiyonuna ait verileri yönetmek için bir Cat modeli oluşturur. Böylece Cat modeliyle kolayca yeni kedi kayıtları ekleyebilir, sorgulayabilir, güncelleyebilir veya silebilirsin.
export const Web = mongoose.model('webs', webSchema);