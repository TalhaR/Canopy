'use strict';
const Sequelize = require('sequelize');
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Watchlist extends Model {}

    Watchlist.init(
        {
            tickers: {
                type: Sequelize.ARRAY(Sequelize.TEXT)
            },
        },
        {
            sequelize,
            modelName: 'watchlist'
        },
    );

    Watchlist.associate = (models) => {
        // associations can be defined here

        // One-to-Many association between User and Watchlist Table
        // This will add userId as a column to the Watchlst table
        models.Watchlist.belongsTo(models.User);
    };

    return Watchlist;
};
