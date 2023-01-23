const AwardModel = require('../models/award.model');
const UserModel = require('../models/user.model');
const HeroModel = require('../models/hero.model');

class AdminService{
    async showAllUsers(){
        const users = await UserModel.findAll({raw:true});
        return users;
    }

    async banUser(userId,banReason){
        await UserModel.update({
            isBanned:true,
            banReason:banReason
        },{
            where:{
                userId:userId
            }
        })
        return true
    }

    async unBanUser(userId){
        await UserModel.update({
            isBanned: false
        },{
            where:{
                userId:userId
            }
        })
        return true
    }

    async addAward(title,description,photo){
        const candidate = await AwardModel.findOne({where:{title}})
        if (candidate){
            return false
        }
        else {
            await AwardModel.create({
                title,
                description,
                photo
            })
            return true
        }
    }

    async deleteAward(awardId){
        await AwardModel.destroy({where:{id:awardId}})
        return true
    }

    async updateAward(title,description,awardId){
        await AwardModel.update({
            title,
            description
        },{
            where:{
                id:awardId
            }
        })
        return true
    }

    async showAllAwards(){
        const awards = await AwardModel.findAll({raw:true});
        return awards;
    }

    async showOneAward(awardId){
        const award = await AwardModel.findByPk(awardId);
        return award;
    }

    async deleteHeroFromAdmin(heroId){
        await HeroModel.destroy({
            where:{
                id:heroId
            }
        })
        return true
    }

    async changeRole(userId,newRole){
        await HeroModel.update({
            role:newRole
        },{
            where:{
                userId
            }
        })
        return true
    }

}

module.exports = new AdminService();