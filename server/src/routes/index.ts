import { Router } from 'express'
import { getOrder,createOrder,updateOrder, deleteOrder, orderId, getOrderStatus } from '../controllers/orderController'
import { getUser,createUser,login, postForgotPassword, checkUser, updatePassword} from '../controllers/userController'
import { checkJwt } from '../middleware/checkJwt';
const  validator = require('../validations/validator');
const router: Router = Router()

router.get('/getorder', [checkJwt], getOrder)
router.post('/createorder', [checkJwt], createOrder)
router.post('/updateorder', [checkJwt], updateOrder)
router.put('/deleteorder', [checkJwt], deleteOrder)
router.get('/orderId/:id', [checkJwt], orderId)
router.get('/orderstatus', [checkJwt], getOrderStatus)

router.get('/getuser', getUser)
router.post('/user', [ validator.registerValidator(), validator.validateInput ], createUser)
router.post('/signup', [ validator.registerValidator(), validator.validateInput ], createUser)
router.post('/login', [ validator.loginValidator(), validator.validateInput ], login)
router.post('/forgotPassword', postForgotPassword)
router.post('/resetPassword/:token', checkUser)
router.post('/confirm-reset-password/:token', updatePassword)



export default router
