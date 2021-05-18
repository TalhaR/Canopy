'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Stock extends Model {}

    Stock.init(
        {
            ticker: {
                type: DataTypes.STRING,
                validate: {
                    len: [1, 5],
                    notEmpty: true,
                },
                unique: true,
            },
            name: {
                type: DataTypes.STRING,
                validate: {
                    notEmpty: true,
                },
                unique: true,
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
            modelName: 'stock',
        },
    );

    Stock.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between Stock and StockHistory Table
        // This will add stockId to the StockHistory model and table
        models.Stock.hasMany(models.StockHistory);

        // One-to-Many association between Stock and Transaction Table
        // This will add stockId to the Transaction model and table
        models.Stock.hasMany(models.Transaction);

        // One-to-Many association between Stock and Holding Table
        // This will add stockId to the Transaction model and table
        models.Stock.hasMany(models.Holding);
    };

    return Stock;
};
