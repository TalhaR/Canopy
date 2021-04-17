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

        // This will add userId as a column to the Holding table
        models.Holding.belongsTo(models.User);

        // This will add stockId as a column to the Holding table
        models.Holding.belongsTo(models.Stock);
    };

    return Holding;
};
