import express from "express"
import {  getCustomers, getSpecificCustomer, postCustomers } from "../../controllers/customers/customers.controller.js";
import {  validadePostCustomers } from "../../middleware/customers/customers.middleware.js";

const customersRoute = express.Router();

customersRoute.post('/customers',validadePostCustomers, postCustomers)
customersRoute.get('/customers',getCustomers)
customersRoute.get('/customers/:id',getSpecificCustomer)

export {customersRoute}