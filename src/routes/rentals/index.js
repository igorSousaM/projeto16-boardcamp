import express from "express";
import { getRentals, postRentals } from "../../controllers/rentals/rentals.controller.js";
import { validatePostRentals } from "../../middleware/rentals/rentals.middleware.js";

const rentalsRoute = express.Router();

rentalsRoute.get('/rentals',getRentals)
rentalsRoute.post('/rentals',validatePostRentals,postRentals)

export {rentalsRoute}