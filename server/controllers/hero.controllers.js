const HeroService = require('../services/hero.service');
const EmailService = require('../services/email.service');
const UserModel = require('../models/user.model');
const path = require('path');
const {max} = require("pg/lib/defaults");

class HeroControllers{
    async addHero(req,res){
        try {
            //TODO ид_медалей
            const {firstname, middlename, lastname, story, rank,/*array_awards_id*/} = req.body;
            req.files.photo.mv(path.resolve('../client/dist/images/heroes/' + req.files.photo.name))
            const flag = await HeroService.addHero(firstname, middlename, lastname, story, rank, req.files.photo.name,/*array_awards_id,*/req.user.id)
            if (!flag){
                return res.status(412).json({message:'Такой герой уже существует.'})
            }
            const user = await UserModel.findByPk(req.user.id)
            const heroes = await HeroService.showMyHeroes(req.user.id)
            await EmailService.addHeroEmail(user.email,heroes[heroes.length-1].id,user.firstname,user.middlename)
            return res.status(200).json({message:'Герой успешно добавлен.'})
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async showAllHeroes(req,res){
        try{
            const heroes = await HeroService.showAllHeroes();
            return res.status(200).json(heroes)
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async showMyHero(req,res){
        try {
            const heroes = await HeroService.showMyHeroes(req.user.id)
            return res.status(200).json(heroes)
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async deleteHero(req,res){
        try{
            const flag = await HeroService.deleteHero(req.user.id,req.params.heroId)
            return res.status(200).json({message:'Герой успешно удален.'})
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async updateHero(req,res){
        try{
            const {firstname,middlename,lastname,story,rank} = req.body;
            const flag = await HeroService.updateHero(firstname,middlename,lastname,story,rank,req.user.id,req.params.heroId)
            if (!flag){
                return res.status(404).json({message:'Ошибка изменения.'})
            }
            req.files.photo.mv(path.resolve(`../../client/dist/images/${req.files.photo.name}`))
            return res.status(200).json({message:'Герой успешно обновлен.'})
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async showOneHero(req,res){
        try{
            const hero = await HeroService.showOneUser(req.params.heroId);
            return res.status(200).json(hero)
        }
        catch (e){
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

}

module.exports = new HeroControllers()