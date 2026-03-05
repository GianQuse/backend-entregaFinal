import { Router } from "express";
import { cartController } from "../controllers/cartController.js";

const router = Router();

router.post("/", cartController.create);

router.get("/:cid", cartController.getById);

router.post("/:cid/products/:pid", cartController.addProduct);

router.delete("/:cid/products/:pid", cartController.deleteProduct);

router.put("/:cid", cartController.updateCart);

router.put("/:cid/products/:pid", cartController.updateQuantity);

router.delete("/:cid", cartController.clearCart);

export default router;