import express from "express";
import { deleteRentals, getRentals, postRentals, returnRentals } from "../../controllers/rentals/rentals.controller.js";
import { validateDeleteRentals, validatePostRentals, validateReturnRentals } from "../../middleware/rentals/rentals.middleware.js";

const rentalsRoute = express.Router();

rentalsRoute.get('/rentals',getRentals);
rentalsRoute.post('/rentals',validatePostRentals,postRentals);
rentalsRoute.post('/rentals/:id/return',validateReturnRentals,returnRentals);
rentalsRoute.delete('/rentals/:id',validateDeleteRentals, deleteRentals);

export {rentalsRoute}