import express from 'express';
import { categoriesRoute } from './categories/index.js';
import {  customersRoute } from './customers/index.js';
import { gameRoute } from './games/index.js';

const router = express.Router();
router.use(categoriesRoute)
router.use(gameRoute)
router.use(customersRoute)

export default router