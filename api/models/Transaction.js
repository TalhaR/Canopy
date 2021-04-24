'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Transaction extends Model {}

    Transaction.init(
        {
            date: {
                type: DataTypes.DATE,
                validate: {
                    notEmpty: true,
                },
            },
            buy: {
                type: DataTypes.BOOLEAN,
                validate: {
                    notEmpty: true,
                },
            },
            quantity: {
                type: DataTypes.INTEGER,
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
            modelName: 'transaction',
        },
    );

    Transaction.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and Transaction Table
        // This will add userId as a column to the Transaction table
        models.Transaction.belongsTo(models.User);

        // One-to-Many association between Stock and Transaction Table
        // This will add stockId as a column to the Transaction table
        models.Transaction.belongsTo(models.Stock);
        
    };

    return Transaction;
};
