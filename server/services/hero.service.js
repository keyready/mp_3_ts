const {HeroModel, UserModel} = require('../models');
const {HeroAwardModel} = require('../models');
const {AwardModel} = require('../models')
const {Op} = require('sequelize');

const fs = require('fs')
const path = require('path')

class HeroService {
    async addHero(firstname, middlename, lastname, story, rank, photo,/*SelectArrayAwardsId,*/userId) {
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

        return true
    }

    async showAllHeroes() {
        // TODO в каждого героя добавить всю информацию о пользователе, который его оставил, т.е.
        // heroes: [
        //     {
        //         id: 1,
        //         firstname: '',
        //         awards: [
        //             {
        //                 id: '',
        //                 title: '',
        //                 ...
        //             },
        //             {
        //                 id: '',
        //                 title: '',
        //                 ...
        //             }
        //         ],
        //         ...
        //     },
        //     {
        //         id: 1,
        //         firstname: '',
        //         awards: [
        //             {
        //                 id: '',
        //                 title: '',
        //                 ...
        //             },
        //             {
        //                 id: '',
        //                 title: '',
        //                 ...
        //             }
        //         ],
        //         ...
        //     },
        // ]

        const heroes = await HeroModel.findAll({raw: true})

        // let PersonalAwardsObjects = []
        // heroes.map(async(hero) =>{
        //     const tmp = await HeroAwardModel.findAll({
        //         where:{
        //             heroId:hero.id
        //         },
        //         attributes:['awardId','heroId']
        //     })
        //     PersonalAwardsObjects.push(tmp)
        // })
        //
        // PersonalAwardsObjects.map(async(PersonalAwardsOneObject) =>{
        //     const PersonalAwards = await AwardModel.findAll({
        //         where:{
        //             id:PersonalAwardsOneObject.awardId
        //         }
        //     })
        //     heroes.forEach(async(hero)=>{
        //         hero.awards=PersonalAwards
        //         await hero.save()
        //     })
        // })

        // let PersonalAwardsIdArray=[]
        // PersonalAwardsIdObjects.map(async(oneObject) =>{
        //     PersonalAwardsIdArray.push(oneObject.awardId)
        // })
        //TODO вернуть все медальки
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
