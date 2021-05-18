'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class StockHistory extends Model {}

    StockHistory.init(
        {
            date: {
                type: DataTypes.DATE,
                validate: {
                    notEmpty: true,
                },
            },

            price: {
                type: DataTypes.DOUBLE,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            sequelize,
            modelName: 'stockHistory',
        },
    );

    StockHistory.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between Stock and StockHistory Table
        // This will add stockId as a column to the Transaction table
        models.StockHistory.belongsTo(models.Stock);

    };

    return StockHistory;
};
