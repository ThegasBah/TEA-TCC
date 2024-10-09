const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');  


const Usuarios = sequelize.define('Usuarios', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    sexo: {
        type: DataTypes.ENUM('Masculino', 'Feminino', ''),
        allowNull: false
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: true  
});

module.exports = Usuarios;
