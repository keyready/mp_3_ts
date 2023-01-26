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

        // SelectArrayAwardsId.forEach((awardId) =>{
        //     HeroAwardModel.create({
        //         heroId:hero.id,
        //         awardId:awardId
        //     })
        // })

        // const awards = await AwardModel.findAll({
        //     where:{
        //         id:{
        //             [Op.in]:SelectArrayAwardsId
        //         }
        //     },
        //     raw:true
        // })

        SelectArrayAwardsId.map(async (awardId) =>{
            await HeroAwardModel.create({
                awardId:awardId,
                heroId:hero.id
            })
        })

        //await hero.save()
        return true
    }

    async showAllHeroes(){
        const heroes = await HeroModel.findAll()

        // heroes.map(async (hero) =>{
        //     const AwardsIdObjects = await HeroAwardModel.findAll({
        //         where:{
        //             heroId:hero.id
        //         },
        //         raw:true,
        //         attributes:['awardId']
        //     })
        //     console.log(AwardsIdObjects)
        //     let ArrayAwardsId = []
        //     AwardsIdObjects.map((oneObj) =>{
        //         ArrayAwardsId.push(oneObj.awardId)
        //     })
        //
        //     const awards = await AwardModel.findAll({
        //         where:{
        //             id:{
        //                 [Op.in]:ArrayAwardsId
        //             }
        //         },
        //         raw:true
        //     })
        //
        //     hero.awards = awards
        //     await hero.save()
        // })
        return heroes
    }

    async showMyHeroes(userId) {
        const heroes = await HeroModel.findAll({where: {userId: userId}})
        //TODO вернуть все медальки
        return heroes
    }

    async showAllHeroes() {
        const heroes = await HeroModel.findAll({raw: true})
        return heroes
    }

    async deleteHero(userId, heroId) {
        const hero = await HeroModel.destroy({where: {userId: userId, id: heroId}})
        // fs.rm(path.resolve(`../../client/public/images/heroes/${hero.photo}`))
        return true
    }

    async updateHero(firstname, middlename, lastname, story, rank, userId, heroId) {
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
        await hero.save()
        return true
    }

    async showOneHero(heroId) {
        const hero = await HeroModel.findByPk(heroId);

        const PersonalAwardsIdObjects = await HeroAwardModel.findAll({
            where: {
                heroId
            },
            attributes: ['awardId']
        })

        let PersonalAwardsIdArray = []
        PersonalAwardsIdObjects.map((elem) => {
            PersonalAwardsIdArray.push(elem.awardId)
        })

        const awards = await AwardModel.findAll({
            where: {
                id: {
                    [Op.in]: PersonalAwardsIdArray
                }
            }
        })

        hero.awards = awards
        //await hero.save()

        return hero
    }

}

module
    .exports = new HeroService();
