import { productRepository } from "../repositories/productRepository.js";
import { CustomError } from "../utils/customError.js";

class ProductController {
    constructor(repository) {
        this.repository = repository;
    }

    getAll = async (req, res, next) => {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;

            let filter = {};

            if (query) {
                if (query === "true" || query === "false") {
                    filter.status = query === "true";
                } else {
                    filter.category = query;
                }
            }

            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
            };

            if (sort === "asc") options.sort = { price: 1 };
            if (sort === "desc") options.sort = { price: -1 };

            const result = await this.repository.getAll(filter, options);

            res.json({
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage
                    ? `?page=${result.prevPage}&limit=${limit}`
                    : null,
                nextLink: result.hasNextPage
                    ? `?page=${result.nextPage}&limit=${limit}`
                    : null,
            });

        } catch (error) {
            next(error);
        }
    };

    getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.repository.getById(id);
            if (!response) throw new CustomError("Product not found", 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    create = async (req, res, next) => {
        try {
            const response = await this.repository.create(req.body);
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    };

    update = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.repository.update(id, req.body);
            if (!response) throw new CustomError("Product not found", 404);
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    delete = async (req, res, next) => {
        try {
            const { id } = req.params;
            const response = await this.repository.delete(id);
            if (!response) throw new CustomError("Product not found", 404);
            res.json({ message: "Product deleted" });
        } catch (error) {
            next(error);
        }
    };
}

export const productController = new ProductController(productRepository);