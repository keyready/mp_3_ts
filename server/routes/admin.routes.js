const Router = require('express');
const router = new Router();

const AdminControllers = require('../controllers/admin.controller');
const {Middleware} = require('../middlewares/middleware');

router.get('/users',[Middleware],AdminControllers.showAllUsers)
router.post('/ban/:userId',[Middleware],AdminControllers.banUser)
router.post('/unban/:userId',[Middleware],AdminControllers.unBanUser)
router.post('/deteteHeroFromAdmin/:heroId',[Middleware],AdminControllers.deleteHeroFromAdmin)
router.post('/awards',[Middleware],AdminControllers.showAllAwards)
router.post('/addAward',[Middleware],AdminControllers.addAward)
router.post('/deleteAward/:awardId',[Middleware],AdminControllers.deleteAward)
router.post('/updateAward/:awardId',[Middleware],AdminControllers.updateAward)
router.post('/award/:awardId',[Middleware],AdminControllers.showOneAward)
router.post('/changeRole/:userId',[Middleware],AdminControllers.changeRole)
module.exports = router;