const HeroModel = require('../models/hero.model');
const HeroAwardModel = require('../models/hero-award.model');
const AwardModel = require('../models/award.model')
const {Op} = require('sequelize');

const fs = require('fs')
const path = require('path')

class HeroService {
    async addHero(firstname, middlename, lastname, story, rank, photo,/*array_awards_id,*/userId) {
        console.log(userId)
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

        // const selectedAwards = await AwardModel.findAll({
        //     where:{
        //         [Op.in]:{
        //             id:array_awards_id
        //         }
        //     },
        //     attributes:['id']
        // })

        // for (let i = 0; i < selectedAwards.length; i++){
        //     await HeroAwardModel.create({
        //         heroId:hero.id,
        //         awardId:selectedAwards[i].id
        //     })
        // }
        return true
    }

    async showAllHeroes() {
        const heroes = await HeroModel.findAll({raw: true})
        return heroes
    }

    async showMyHeroes(userId) {
        const heroes = await HeroModel.findAll({where: {userId: userId}})
        return heroes
    }

    async deleteHero(userId, heroId) {
        const hero = await HeroModel.destroy({where: {userId: userId, heroId: heroId}})
        fs.rm(path.resolve(`../../client/dist/images/heroes/${hero.photo}`))
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

    async showOneUser(heroId) {
        const hero = await HeroModel.findByPk(heroId);

        const awards_heroes_table = await HeroAwardModel.findAll({where: {heroId}, attributes: ['awardId']})
        let awards_id = []
        for (let i = 0; i < awards_heroes_table.length; i++) {
            awards_id.push(awards_heroes_table[i].awardId)
        }
        const awards = await AwardModel.findAll({
            where: {
                [Op.in]: awards_id
            }
        })
        return {hero: hero, awards: awards}
    }

}

module.exports = new HeroService();
