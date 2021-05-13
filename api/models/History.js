'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class History extends Model {}

    History.init(
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
            modelName: 'history',
        },
    );

    History.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and History Table
        // This will add userId as a column to the History table
        models.History.belongsTo(models.User);
    };

    return History;
};
