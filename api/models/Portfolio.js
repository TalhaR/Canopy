'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Portfolio extends Model {}

    Portfolio.init(
        {
            buyingPower: {
                type: DataTypes.DOUBLE,
                validate: {
                    notEmpty: true,
                },
            },
            netWorth: {
                type: DataTypes.DOUBLE,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'portfolio',
        },
    );

    Portfolio.associate = (models) => {
        // associations can be defined here

        // One-to-One association between User and Portfolio
        // This will add userId as a column to the Portfolio table
        models.Portfolio.belongsTo(models.User);

        // One-to-Many association between Portfolio and Holding Table
        // This will add portfolioId to the Holding model and table
        models.Portfolio.hasMany(models.Holding);

    };

    return Portfolio;
};
