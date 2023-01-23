const Router = require('express');
const router = new Router();

const AdminControllers = require('../controllers/admin.controller');
const {Middleware} = require('../middlewares/middleware');

//TODO фильтры показа

router.get('/users',[Middleware],AdminControllers.showAllUsers)
router.post('/ban/:userId',[Middleware],AdminControllers.banUser)
router.get('/banUsers',[Middleware],AdminControllers.showBanUsers)
router.get('/noActivatedUsers',[Middleware],AdminControllers.showNoActivatedUsers)
router.get('/awards',[Middleware],AdminControllers.showAllAwards)
router.post('/addAward',[Middleware],AdminControllers.addAward)
router.post('/deleteAward/:awardId',[Middleware],AdminControllers.deleteAward)
router.post('/updateAward/:awardId',[Middleware],AdminControllers.updateAward)
router.get('/award/:awardId',[Middleware],AdminControllers.showOneAward)

module.exports = router;