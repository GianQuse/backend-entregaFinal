import { Router } from "express";
import { Product } from "../models/productModel.js";
import { Cart } from "../models/cartModel.js";

const router = Router();

router.get("/products", async (req, res) => {
    let { page = 1 } = req.query;

    const result = await Product.paginate({}, {
        page,
        limit: 5,
        lean: true
    });

    res.render("index", {
        products: result.docs,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage
    });
});


router.get("/products/:pid", async (req, res) => {
    const product = await Product.findById(req.params.pid).lean();
    res.render("productDetail", { product });
});


router.get("/carts/:cid", async (req, res) => {
    const cart = await Cart.findById(req.params.cid)
        .populate("products.product")
        .lean();

    res.render("cart", { products: cart.products });
});

export default router;