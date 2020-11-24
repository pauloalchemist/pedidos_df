const routes = require('express').Router();
const CustomerController = require('./controllers/CustomerController');
const OrderController = require('./controllers/OrderController');
const { newProduct } = require('./controllers/ProudctController');

routes.post('/neworder', CustomerController.newCustumer);
routes.post('/newproduct', newProduct);

module.exports = routes;
