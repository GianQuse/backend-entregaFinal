import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const prodductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    status: { type: Boolean, default: true },
});

prodductSchema.plugin(mongoosePaginate);

//Para Postman:
// {   "title": " ",
//     "description": " ",
//     "price": 0,
//     "category": " ",
//     "stock": 0
// }

export const Product = mongoose.model('Product', prodductSchema);