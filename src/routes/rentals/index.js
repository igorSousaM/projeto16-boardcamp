import express from "express";
import { deleteRentals, getRentals, postRentals } from "../../controllers/rentals/rentals.controller.js";
import { validateDeleteRentals, validatePostRentals } from "../../middleware/rentals/rentals.middleware.js";

const rentalsRoute = express.Router();

rentalsRoute.get('/rentals',getRentals);
rentalsRoute.post('/rentals',validatePostRentals,postRentals);
rentalsRoute.delete('/rentals/:id',validateDeleteRentals, deleteRentals)

export {rentalsRoute}