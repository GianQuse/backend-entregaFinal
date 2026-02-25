import { Router } from "express";
import { Product } from "../models/productModel.js";

const router = Router();

router.post("/", async (req, res) => {
    const product = await Product.create(req.body);
    res.json(product);
});

router.get("/", async (req, res) => {
    try {
        let { limit = 10, page = 1, sort, query } = req.query;

        limit = parseInt(limit);
        page = parseInt(page);

        let filter = {};

        if (query) {
            if (query === "true" || query === "false") {
                filter.status = query === "true";
            } else {
                filter.category = query;
            }
        }

        let sortOption = {};
        if (sort === "asc") sortOption.price = 1;
        if (sort === "desc") sortOption.price = -1;

        const result = await Product.paginate(filter, {
            page,
            limit,
            sort: sortOption,
            lean: true
        });

        res.json({
            status: "success",
            payload: result.docs,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `?page=${result.prevPage}` : null,
            nextLink: result.hasNextPage ? `?page=${result.nextPage}` : null
        });

    } catch (error) {
        res.status(500).json({ status: "error", error: error.message });
    }
});

export default router;