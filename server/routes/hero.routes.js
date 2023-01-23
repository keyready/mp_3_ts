const Router = require('express');
const router = new Router();

const HeroControllers = require('../controllers/hero.controllers')
const {Middleware} = require('../middlewares/middleware');

router.post('/create',[Middleware],HeroControllers.addHero)
router.post('/heroes',[Middleware],HeroControllers.showAllHeroes)
router.post('/deleteHero/:heroId',[Middleware],HeroControllers.deleteHero)
router.post('/updateHero/:heroId',[Middleware],HeroControllers.updateHero)
router.post('/myHeroes',[Middleware],HeroControllers.showMyHero)
router.post('/hero/:heroId',[Middleware],HeroControllers.showOneHero)

module.exports = router;