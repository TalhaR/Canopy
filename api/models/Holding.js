'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Holding extends Model {}

    Holding.init(
        {
            quantity: {
                type: DataTypes.INTEGER,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'holding',
        },
    );

    Holding.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and Holding Table
        // This will add userId as a column to the Holding table
        models.Holding.belongsTo(models.User);

        // One-to-Many association between Stock and Holding Table
        // This will add stockId as a column to the Holding table
        models.Holding.belongsTo(models.Stock);

        // One-to-Many association between Porfolio and Holding Table
        // This will add portfolioId as a column to the Holding table
        models.Holding.belongsTo(models.Portfolio);

    };

    return Holding;
};
