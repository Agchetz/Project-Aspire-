"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const userController_1 = require("../controllers/userController");
const checkJwt_1 = require("../middleware/checkJwt");
const validator = require('../validations/validator');
const router = (0, express_1.Router)();
router.get('/getorder', [checkJwt_1.checkJwt], orderController_1.getOrder);
router.post('/createorder', [checkJwt_1.checkJwt], orderController_1.createOrder);
router.post('/updateorder', [checkJwt_1.checkJwt], orderController_1.updateOrder);
router.put('/deleteorder', [checkJwt_1.checkJwt], orderController_1.deleteOrder);
router.get('/orderId/:id', [checkJwt_1.checkJwt], orderController_1.orderId);
router.get('/orderstatus', [checkJwt_1.checkJwt], orderController_1.getOrderStatus);
router.get('/getuser', userController_1.getUser);
router.post('/user', [validator.registerValidator(), validator.validateInput], userController_1.createUser);
router.post('/signup', [validator.registerValidator(), validator.validateInput], userController_1.createUser);
router.post('/login', [validator.loginValidator(), validator.validateInput], userController_1.login);
<<<<<<< HEAD:server/dist/routes/index.js
router.post('/forgotPassword', userController_1.postForgotPassword);
router.post('/resetPassword/:token', userController_1.checkUser);
router.post('/confirm-reset-password/:token', userController_1.updatePassword);
=======
>>>>>>> 3ef7251bc909695ba407ff9c0281f4f26072d7a5:server/server/dist/routes/index.js
exports.default = router;
