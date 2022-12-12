import express from 'express';
import { categoriesRoute } from './categories/index.js';
import { gameRoute } from './games/index.js';

const router = express.Router();
router.use(categoriesRoute)
router.use(gameRoute)

export default router