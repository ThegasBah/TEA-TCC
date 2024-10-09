const { DataTypes } = require('sequelize');
const sequelize = require('../conexao');  
const Usuarios = require('./usuarios'); 

const GameStatistics = sequelize.define('estatisticas', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuarios,  // Referência à tabela Usuarios
            key: 'id'
        },
        onDelete: 'CASCADE' // Remove estatísticas se o usuário for deletado
    },
    gameName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timeSeconds: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    playDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW 
    }
}, {
    timestamps: true,
    tableName: 'estatisticas' // Define um nome específico para a tabela, se necessário
});

// Adicionar relacionamento com o modelo Usuarios
GameStatistics.belongsTo(Usuarios, { foreignKey: 'userId' });

module.exports = GameStatistics;
