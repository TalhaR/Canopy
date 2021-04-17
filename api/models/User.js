'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init(
        {
            username: {
                type: DataTypes.STRING,
                validate: {
                    len: [3, 250],
                    notEmpty: true,
                },
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'user',
        },
    );

    User.associate = (models) => {
        // associations can be defined here

        // One-to-One association between User and Portfolio
        models.User.hasOne(models.Porfolio);

        // This will add userId to the Transaction model and table
        models.User.hasMany(models.Transaction);
    };

    return User;
};
