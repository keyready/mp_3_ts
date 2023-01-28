const {HeroModel, UserModel} = require('../models');
const {HeroAwardModel} = require('../models');
const {AwardModel} = require('../models')
const {Op} = require('sequelize');

const fs = require('fs')
const path = require('path')

class HeroService {
    async addHero(firstname, middlename, lastname, story, rank, photo,SelectArrayAwardsId,userId) {
        const candidate = await HeroModel.findOne({
            where: {
                firstname, middlename, lastname, rank, story
            }
        })
        if (candidate) {
            return false
        }
        const hero = await HeroModel.create({
            firstname,
            middlename,
            lastname,
            story,
            rank,
            photo,
            userId
        })

        SelectArrayAwardsId.map(async (awardId) =>{
            await HeroAwardModel.create({
                awardId:awardId,
                heroId:hero.id
            })
        })
        return true
    }

    async showAllHeroes(){
        const heroes = await HeroModel.findAll({raw:true})
        for (let i = 0; i < heroes.length; i++) {
            const AwardsIdObjects = await HeroAwardModel.findAll({
                where: {
                    heroId: heroes[i].id
                },
                raw: true,
                attributes: ['awardId']
            })
            let ArrayAwardsId = []
            AwardsIdObjects.map((oneObj) => {
                ArrayAwardsId.push(oneObj.awardId)
            })
            const awards = await AwardModel.findAll({
                where: {
                    id: {
                        [Op.in]: ArrayAwardsId
                    }
                },
                raw: true
            })
            const author = await UserModel.findByPk(heroes[i].userId)
            heroes[i].awards = awards
            heroes[i].userId=author
        }
        return heroes
    }

    async showMyHeroes(userId) {
        const heroes = await HeroModel.findAll({where: {userId: userId}})
        for(let i = 0; i < heroes.length;i++){
            const AwardsObjectsId = await HeroAwardModel.findAll({
                where:{
                    heroId:heroes[i].id
                },
                raw:true,
                attributes:['awardId']
            })
            let AwardsIdArray=[]
            AwardsObjectsId.map((oneObj) =>{
                AwardsIdArray.push(oneObj.awardId)
            })
            const awards = await AwardModel.findAll({
                where:{
                    id:{
                        [Op.in]:AwardsIdArray
                    }
                },
                raw:true
            })
            const author = await UserModel.findByPk(heroes[i].userId)
            heroes[i].userId = author
            heroes[i].awards = awards
        }
        return heroes
    }

    async deleteHero(userId, heroId) {
        const hero = await HeroModel.destroy({where: {userId: userId, id: heroId}})
        fs.rm(path.resolve(`../../client/public/images/heroes/${hero.photo}`))
        return true
    }

    async updateHero(firstname, middlename, lastname, story, rank, userId, heroId,photo) {
        const hero = await HeroModel.findOne({
            where: {
                userId: userId,
                heroId: heroId
            }
        })
        hero.firstname = firstname
        hero.middlename = middlename
        hero.story = story
        hero.rank = rank
        if (photo != ''){
            fs.rm(path.resolve(`../../client/dist/images/heroes/${hero.photo}`))
            photo.mv(path.resolve(`../../client/dist/images/heroes/${photo.name}`))
            hero.photo = photo.name
        }
        await hero.save()
        return true
    }

    async showOneHero(heroId) {
        const hero = await HeroModel.findByPk(heroId, {raw: true});
        const AwardsIdObjects = await HeroAwardModel.findAll({
            where:{
                heroId
            },
            raw:true,
            attributes:['awardId']
        });
        let AwardsIdArray=[]
        AwardsIdObjects.map((oneObj) =>{
            AwardsIdArray.push(oneObj.awardId)
        })
        const awards = await AwardModel.findAll({
            where:{
                id:{
                    [Op.in]: AwardsIdArray
                }
            },
            raw:true
        })

        const author = await UserModel.findByPk(hero.userId)
        hero.awards = awards
        hero.userId = author
        return hero
    }
}

module.exports = new HeroService();
