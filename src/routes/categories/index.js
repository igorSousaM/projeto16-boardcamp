import connection from "../../database/index.js";
import express from "express";
import { getCategories, postCategories } from "../../controllers/categories/categories.controller.js";
import { validatePostCategories } from "../../middleware/categories/categories.middleware.js";

const categoriesRoute = express.Router();

categoriesRoute.get("/categories", getCategories);

categoriesRoute.post("/categories",validatePostCategories, postCategories)

export { categoriesRoute };
