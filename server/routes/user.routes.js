const Router = require('express')
const router = new Router()

const UserControllers = require('../controllers/user.controllers');
const {Middleware} = require('../middlewares/middleware');

router.post('/sign_up',UserControllers.sign_up)
router.post('/sign_in',UserControllers.sign_in)
router.post('/changePassword',[Middleware],UserControllers.changePassword)
router.post('/activate/:link',UserControllers.activate)

module.exports = router;