'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class PortfolioHistory extends Model {}

    PortfolioHistory.init(
        {
            date: {
                type: DataTypes.DATE,
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
            modelName: 'portfolioHistory',
        },
    );

    PortfolioHistory.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and PortfolioHistory Table
        // This will add userId as a column to the PortfolioHistory table
        models.PortfolioHistory.belongsTo(models.User);

    };

    return PortfolioHistory;
};
