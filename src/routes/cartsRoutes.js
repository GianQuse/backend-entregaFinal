import { Router } from "express";
import { Cart } from "../models/cartModel.js";

const router = Router();

// Crear carrito
router.post("/", async (req, res) => {
    const cart = await Cart.create({ products: [] });
    res.json(cart);
});

// Obtener carrito con populate
router.get("/:cid", async (req, res) => {
    const cart = await Cart.findById(req.params.cid)
        .populate("products.product")
        .lean();

    res.json(cart);
});

// Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    await Cart.findByIdAndUpdate(cid, {
        $push: { products: { product: pid, quantity: 1 } }
    });

    res.json({ status: "product added" });
});

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    await Cart.findByIdAndUpdate(cid, {
        $pull: { products: { product: pid } }
    });

    res.json({ status: "product removed" });
});

// Vaciar carrito
router.delete("/:cid", async (req, res) => {
    await Cart.findByIdAndUpdate(req.params.cid, { products: [] });
    res.json({ status: "cart emptied" });
});

export default router;