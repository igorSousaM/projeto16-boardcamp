import express from "express"
import {  getCustomers, postCustomers } from "../../controllers/customers/customers.controller.js";
import {  validadePostCustomers } from "../../middleware/customers/customers.middleware.js";

const customersRoute = express.Router();

customersRoute.post('/customers',validadePostCustomers, postCustomers)
customersRoute.get('/customers',getCustomers)

export {customersRoute}