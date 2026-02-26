import { Router } from "express";
import { Cart } from "../models/cartModel.js";

const router = Router();


//Crear carrito
router.post("/", async (req, res) => {
    try {
        const cart = await Cart.create({ products: [] });
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Obtener carrito con populate
router.get("/:cid", async (req, res) => {
    try {
        const cart = await Cart.findById(req.params.cid)
            .populate("products.product")
            .lean();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//Agregar producto al carrito
router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const cart = await Cart.findById(cid);

        const productInCart = cart.products.find(
            p => p.product.toString() === pid
        );

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }

        await cart.save();

        res.json({ status: "product added" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//Actualizar cantidad de producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;

        await Cart.updateOne(
            { _id: cid, "products.product": pid },
            { $set: { "products.$.quantity": quantity } }
        );

        res.json({ status: "quantity updated" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Eliminar producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;

        await Cart.findByIdAndUpdate(cid, {
            $pull: { products: { product: pid } }
        });

        res.json({ status: "product removed" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// Vaciar carrito
router.delete("/:cid", async (req, res) => {
    try {
        await Cart.findByIdAndUpdate(req.params.cid, {
            products: []
        });

        res.json({ status: "cart emptied" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;