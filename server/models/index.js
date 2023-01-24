const UserModel = require('./user.model');
const HeroModel = require('./hero.model');
const AwardModel = require('./award.model');
const HeroAwardModel = require('./hero-award.model');

UserModel.hasMany(HeroModel)
HeroModel.belongsTo(UserModel)

HeroModel.belongsToMany(AwardModel, {through: HeroAwardModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
AwardModel.belongsToMany(HeroModel, {through: HeroAwardModel, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
