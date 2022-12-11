import express from 'express';
import { categoriesRoute } from './categories/index.js';

const router = express.Router();
router.use(categoriesRoute)

export default router