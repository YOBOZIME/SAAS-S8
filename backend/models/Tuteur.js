const {DataTypes} = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Entreprise =require('./Entreprise');

const Tuteur =sequelize.define('Tuteur',{
    fonction : {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Tuteur.belongsTo(User,{foreignKey: 'userId',onDelete: 'CASCADE'})
Tuteur.belongsTo(Entreprise, {foreignKey: 'entrepriseId', onDelete: 'CASCADE'});
User.hasOne(Tuteur,{foreignKey: 'userId'});
Entreprise.hasMany(Tuteur,{foreignKey : 'entrepriseId'});

module.exports =Tuteur;
