const UserService = require('../services/user.service');
const EmailService = require('../services/email.service');
const {generateLink} = require('../config/config');
const crypto = require('crypto')

const path = require('path');

class UserControllers {
    async sign_up(req, res) {
        try {
            const {firstname, middlename, lastname, email, password} = req.body;

            const dot = req.files.photo.name.lastIndexOf('.');
            const newFileName =
                crypto.randomBytes(5).toString('hex') +
                req.files.photo.name.substr(dot)
            req.files.photo.mv(path.resolve(`../client/public/images/users/${newFileName}`))
            // req.files.photo.mv(path.resolve(`../client/dist/images/users/${newFileName}`))

            const link = generateLink();
            const flag = await UserService.sign_up(firstname, middlename, lastname, email, password, link, newFileName)
            if (!flag) {
                return res.status(401).json({message: 'Ошибка регистрации'})
            }
            // await EmailService.successfulSignUp(firstname,middlename,email, link)
            return res.status(200).json({message: 'Регистрация прошла успешно.', link})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async sign_in(req, res) {
        try {
            const {email, password} = req.body;
            const flag = await UserService.sign_in(email, password)
            if (!flag) {
                return res.status(401).json({message: 'Ошибка авторизации.'})
            } else {
                return res.status(200).json(flag)
            }
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async changePassword(req, res) {
        try {
            const {oldPassword, newPassword} = req.body;
            const flag = await UserService.changePassword(req.user.id, newPassword, oldPassword)
            if (!flag) {
                return res.status(400).json({message: 'Пароль не был изменен.'})
            }
            return res.json(200).json({message: 'Пароль был успешно изменен.'})
        } catch (e) {
            console.log(e.message)
            return res.status(500).message(e.message)
        }
    }

    async activate(req, res) {
        try {
            const {link} = req.params;
            const flag = await UserService.activate(link);
            if (!flag) {
                return res.status(400).json({message: 'Ваш профиль не активирован.'})
            }
            return res.status(200).json({message: 'Ваш профиль успешно активирован.'})
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }

    async profile(req, res) {
        try {
            const user = await UserService.profile(req.user.id)
            return res.status(200).json(user)
        } catch (e) {
            console.log(e.message)
            return res.status(500).json(e.message)
        }
    }
}

module.exports = new UserControllers();
