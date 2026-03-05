import { cartRepository } from "../repositories/cartRepository.js";
import { CustomError } from "../utils/customError.js";

class CartController {

    constructor(repository) {
        this.repository = repository;
    }

    create = async (req, res, next) => {
        try {

            const cart = await this.repository.create();

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {

            const { cid } = req.params;

            const cart = await this.repository.getById(cid);

            if (!cart) throw new CustomError("Cart not found", 404);

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

    deleteProduct = async (req, res, next) => {
        try {

            const { cid, pid } = req.params;

            const cart = await this.repository.deleteProduct(cid, pid);

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

    updateCart = async (req, res, next) => {
        try {

            const { cid } = req.params;

            const cart = await this.repository.updateCart(cid, req.body.products);

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

    updateQuantity = async (req, res, next) => {
        try {

            const { cid, pid } = req.params;

            const { quantity } = req.body;

            const cart = await this.repository.updateQuantity(
                cid,
                pid,
                quantity
            );

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

    clearCart = async (req, res, next) => {
        try {

            const { cid } = req.params;

            const cart = await this.repository.clearCart(cid);

            res.json(cart);

        } catch (error) {
            next(error);
        }
    };

}

export const cartController = new CartController(cartRepository);