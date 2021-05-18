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
            modelName: 'user'
        },
    );

    User.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and Watchlist Table
        // This will add userId to the Watchlist model and table
        models.User.hasMany(models.Watchlist);

        // One-to-Many association between User and Transaction Table
        // This will add userId to the Transaction model and table
        models.User.hasMany(models.Transaction);

        // One-to-Many association between User and Holding Table
        // This will add userId to the Holding model and table
        models.User.hasMany(models.Holding);

        // One-to-Many association between User and History Table
        // This will add userId to the History model and table
        models.User.hasMany(models.History);

        // One-to-One association between User and Portfolio Table
        models.User.hasOne(models.Portfolio);

        // One-to-Many association between User and PortfolioHistory Table
        // This will add userId to the PortfolioHistory model and table
        models.User.hasMany(models.PortfolioHistory);
    };

    return User;
};
