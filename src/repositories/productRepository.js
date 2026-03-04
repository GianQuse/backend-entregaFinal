import { ProductModel } from "../models/productModel.js";

class ProductRepository {
    constructor(model) {
        this.model = model;
    }

    getAll = async (filter, options) => {
        return await this.model.paginate(filter, options);
    };

    getById = async (id) => {
        return await this.model.findById(id);
    };

    create = async (body) => {
        return await this.model.create(body);
    };

    update = async (id, body) => {
        return await this.model.findByIdAndUpdate(id, body, { new: true });
    };

    delete = async (id) => {
        return await this.model.findByIdAndDelete(id);
    };
}

export const productRepository = new ProductRepository(ProductModel);