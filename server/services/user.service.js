const bcrypt = require('bcrypt');
const {UserModel} = require('../models');
const {generateAccessToken} = require('../config/config');

class UserService {
    async sign_up(firstname, middlename, lastname, email, password, link, photo) {
        const candidate = await UserModel.findOne({where: {email}})
        if (candidate) {
            return false
        } else {
            await UserModel.create({
                firstname: firstname,
                middlename: middlename,
                lastname: lastname,
                email: email,
                password: bcrypt.hashSync(password, 5),
                link: link,
                photo: photo
            })
            return true
        }
    }

    async sign_in(email, password) {
        const user = await UserModel.findOne({where: {email}})
        if (!user) {
            return false
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) {
            return false
        }
        if (user.isActivated == false){
              return false
        }
        if (user.isBanned === true) {
            return false
        }
        const token = generateAccessToken(user.id, user.email, user.role)
        return {secretToken: token}
    }

    async activate(link) {
        const user = await UserModel.findOne({where: {link}})
        if (!user) {
            return false
        } else {
            user.isActivated = true
            await user.save()
            return true
        }
    }

    async changePassword(userId, newPassword, oldPassword) {
        const user = await UserModel.findOne({where: {id: userId}})
        const checkPassword = bcrypt.compareSync(oldPassword, user.password)
        if (!checkPassword) {
            return false
        }
        user.password = await bcrypt.hashSync(newPassword, 5)
        await user.save()
        return true
    }

    async profile(userId) {
        const user = await UserModel.findByPk(userId);
        return user
    }

    async updateProfile(firstname,middlename,lastname,userId){
        await UserModel.update({
            firstname,
            middlename,
            lastname
        },{
            where:{
                id:userId
            }
        })
        return true
    }

}

module.exports = new UserService()
