import { Cart } from "../models/cartModel.js";

class CartRepository {

    constructor(model) {
        this.model = model;
    }

    create = async () => {
        try {
            return await this.model.create({ products: [] });
        } catch (error) {
            throw new Error(error);
        }
    };

    getById = async (cid) => {
        try {
            return await this.model
                .findById(cid)
                .populate("products.product");
        } catch (error) {
            throw new Error(error);
        }
    };

    addProduct = async (cid, pid) => {

        const cart = await this.model.findById(cid);

        if (!cart) throw new Error("Cart not found");

        const productIndex = cart.products.findIndex(
            p => p.product.toString() === pid
        );

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({
                product: pid,
                quantity: 1
            });
        }

        await cart.save();

        return cart;
    };

    deleteProduct = async (cid, pid) => {
        try {

            const cart = await this.model.findById(cid);

            cart.products = cart.products.filter(
                p => p.product.toString() !== pid
            );

            return await cart.save();

        } catch (error) {
            throw new Error(error);
        }
    };

    updateCart = async (cid, products) => {
        try {

            return await this.model.findByIdAndUpdate(
                cid,
                { products },
                { new: true }
            );

        } catch (error) {
            throw new Error(error);
        }
    };

    updateQuantity = async (cid, pid, quantity) => {
        try {

            const cart = await this.model.findById(cid);

            const product = cart.products.find(
                p => p.product.toString() === pid
            );

            if (product) {
                product.quantity = quantity;
            }

            return await cart.save();

        } catch (error) {
            throw new Error(error);
        }
    };

    clearCart = async (cid) => {
        try {

            return await this.model.findByIdAndUpdate(
                cid,
                { products: [] },
                { new: true }
            );

        } catch (error) {
            throw new Error(error);
        }
    };

}

export const cartRepository = new CartRepository(Cart);