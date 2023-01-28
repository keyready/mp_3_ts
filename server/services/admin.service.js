const {AwardModel} = require('../models');
const {UserModel} = require('../models');
const {HeroModel} = require('../models');

class AdminService {
    async showAllUsers() {
        const users = await UserModel.findAll({raw: true});
        return users;
    }

    async banUser(userId, banReason, currentId) {
        const currentUser = await UserModel.findByPk(currentId)
        if (currentUser.role === 'admin') {
            await UserModel.update({
                isBanned: true,
                banReason: banReason || 'по причине пидорас'
            }, {
                where: {
                    id: userId
                }
            })
            return true
        }
        return false
    }

    async unBanUser(userId, currentId) {
        const currentUser = await UserModel.findByPk(currentId)
        if (currentUser.role === 'admin') {
            await UserModel.update({
                isBanned: false,
                banReason: ''
            }, {
                where: {
                    id: userId
                }
            })
            return true
        }
        return false
    }

    async addAward(title, description, photo) {
        const candidate = await AwardModel.findOne({where: {title}})
        if (candidate) {
            return false
        } else {
            await AwardModel.create({
                title,
                description,
                photo
            })
            return true
        }
    }

    async deleteAward(awardId) {
        await AwardModel.destroy({where: {id: awardId}})
        return true
    }

    async updateAward(title, description, awardId) {
        await AwardModel.update({
            title,
            description
        }, {
            where: {
                id: awardId
            }
        })
        return true
    }

    async showAllAwards() {
        const awards = await AwardModel.findAll({raw: true});
        return awards;
    }

    async showOneAward(awardId) {
        const award = await AwardModel.findByPk(awardId);
        return award;
    }

    async deleteHeroFromAdmin(heroId) {
        await HeroModel.destroy({
            where: {
                id: heroId
            }
        })
        return true
    }

    async changeRole(userId, newRole, currentId) {
        const currentUser = await UserModel.findByPk(currentId)
        if (currentUser.role === 'admin') {
            const user = await UserModel.findByPk(userId)
            user.role = newRole
            await user.save()
            return true
        }
        return false
    }

    async showOneUser(userId){
        const user = await UserModel.findByPk(userId)
        return user
    }

}

module.exports = new AdminService();
