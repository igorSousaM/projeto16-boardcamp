import express from 'express';
import { categoriesRoute } from './categories/index.js';
import {  customersRoute } from './customers/index.js';
import { gameRoute } from './games/index.js';
import { rentalsRoute } from './rentals/index.js';

const router = express.Router();
router.use(categoriesRoute)
router.use(gameRoute)
router.use(customersRoute)
router.use(rentalsRoute)

export default router