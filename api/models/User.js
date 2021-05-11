'use strict';

const bcrypt = require('bcrypt-nodejs');
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {}

    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
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
    }, {
        sequelize,
        modelName: 'user'
    }, {
        getterMethods: {
            fullName() {
                return `${this.firstName} ${this.lastName}`;
            }
        }
    });
    // var User = sequelize.define('User', {
    //     firstName: DataTypes.STRING,
    //     lastName: DataTypes.STRING,
    //     email: DataTypes.STRING,
    //     password: DataTypes.STRING
    // }, {
    //     getterMethods: {
    //         fullName() {
    //             return `${this.firstName} ${this.lastName}`;
    //         }
    //     }
    // });
    User.associate = (models) => {
        // associations can be defined here

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
    };

    User.beforeCreate(function(user, options) {
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
    })

    return User;
};