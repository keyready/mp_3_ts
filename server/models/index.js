const UserModel = require('./user.model');
const HeroModel = require('./hero.model');
const AwardModel = require('./award.model');
const HeroAwardModel = require('./hero-award.model');

UserModel.hasMany(HeroModel,{foreignKey:{
    name:'userId'
}})
HeroModel.belongsTo(UserModel)

<<<<<<< HEAD
HeroModel.belongsToMany(AwardModel,{through:HeroAwardModel,onDelete:'CASCADE',onUpdate:'CASCADE'})
AwardModel.belongsToMany(HeroModel,{through:HeroAwardModel,onDelete:'CASCADE',onUpdate:'CASCADE'})


module.exports = {
    UserModel:UserModel,
    HeroModel:HeroModel,
    AwardModel:AwardModel,
    HeroAwardModel:HeroAwardModel
}
=======
HeroModel.belongsToMany(AwardModel, {through: HeroAwardModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
AwardModel.belongsToMany(HeroModel, {through: HeroAwardModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
>>>>>>> 00bbaf282eba0541893a7264e0930606384c3daa
