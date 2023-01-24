const EmailService = require('../services/email.service');
const AdminService = require('../services/admin.service');
const UserService = require('../services/user.service');
const UserModel = require('../models/user.model');

const path = require('path')

class AdminController {
    async showAllUsers(req, res) {
        try {
            const currentUser = await UserModel.findByPk(req.user.id)
            if (currentUser.role !== 'admin') {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            }
            const users = await AdminService.showAllUsers();
            return res.status(200).json(users)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async banUser(req, res) {
        try {
            const {userId} = req.params;
            const {banReason} = req.body;
            const user = await UserModel.findByPk(userId)
            const flag = await AdminService.banUser(userId, banReason,req.user.id)
            if (!flag) {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            } else {
                await EmailService.banUser(user.firstname, user.middlename, banReason, user.email)
                return res.status(200).json({message: `Пользователь ${userId} успешно заблокирован.`})
            }
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async unBanUser(req, res) {
        try {
            const {userId} = req.params;
            const flag = await AdminService.unBanUser(userId, req.user.id);
            if (!flag) {
                return res.status(400).json({message: 'У вас нет прав на осуществление данного запроса.'})
            } else {
                return res.status(200).json({message: `Пользователь ${userId} успешно разблокирован.`})
            }
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async addAward(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            }
            const {title, description} = req.body;
            req.files.photo.mv(path.resolve(`../../client/dist/images/awards/${req.files.photo.name}`))
            const flag = await AdminService.addAward(title, description, req.files.photo.name)
            if (!flag) {
                return res.status(403).json({message: 'Ошибка добавления награды.'})
            }
            return res.status(200).json({message: 'Награда успешно добавления.'})
        } catch (e) {
            console.log(e.message)
            return res.status(200).json(e.message)
        }
    }

    async deleteAward(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            }
            const {awardId} = req.params;
            const flag = await AdminService.deleteAward(awardId);
            if (!flag) {
                return res.status(403).json({message: 'Ошибка удаления награды'})
            }
            return res.status(200).json({message: 'Нагрда успешно удалена.'})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async updateAward(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            }
            const {awardId} = req.params;
            const flag = await AdminService.updateAward(awardId);
            //TODO ОБНОВЛЕНИЕ ФОТКИ
            if (!flag) {
                return res.status(403).json({message: 'Ошибка обновления награды.'})
            }
            return res.status(200).json({message: 'Награда успешно обновлена.'})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async showAllAwards(req, res) {
        try {
            const awards = await AdminService.showAllAwards();
            return res.status(200).json(awards)
            //TODO ТУТ
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async showOneAward(req, res) {
        try {
            const {awardId} = req.params;
            const award = await AdminService.showOneAward(awardId)
            return res.status(200).json(award)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async deleteHeroFromAdmin(req, res) {
        try {
            if (req.user.role !== 'admin') {
                return res.status(403).json({message: 'У вас нет прав на осуществление данного запроса.'})
            }
            const {heroId} = req.params;
            await AdminService.deleteHeroFromAdmin(heroId)
            return res.status(200).json({message: `Герой ${heroId} успешно удален.`})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async changeRole(req, res) {
        try {
            const {userId} = req.params;
            const {newRole} = req.body;
            const flag = await AdminService.changeRole(userId, newRole, req.user.id)
            if (!flag) {
                return res.status(403).json({message: 'У вас нет прав для осуществления данного действия.'})
            }
            return res.status(200).json({message: `Роль пользователя ${userId} успешно изменена.`})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

}

module.exports = new AdminController()
