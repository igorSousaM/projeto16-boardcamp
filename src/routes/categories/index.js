import connection from "../../database/index.js";
import express from "express";
import { getCategories, postCategories } from "../../controllers/categories/categories.controller.js";

const categoriesRoute = express.Router();

categoriesRoute.get("/categories", getCategories);

categoriesRoute.post("/categories", postCategories)

export { categoriesRoute };
