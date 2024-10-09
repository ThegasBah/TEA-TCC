const { Sequelize } = require('sequelize');


const sequelize = new Sequelize("bancotea", "root", "", {
    host: "localhost",
    dialect: 'mysql'
});

module.exports = sequelize;
