const express = require('express');
require('dotenv').config();
const cors = require('cors');
const database = require('./conexao');  
const Usuarios = require('./models/usuarios'); 
const GameStatistics = require('./models/status');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');  

const app = express();
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await database.sync();
        console.log('Banco de dados sincronizado com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar o banco de dados:', error);
    }
})();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post('/api/cadastro', async (req, res) => {
    console.log("Recebendo requisição de cadastro...");
    try {
        const { nome, email, sexo, senha } = req.body;

        if (!nome || !email || !sexo || !senha) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
        }

        const existingUser = await Usuarios.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email já cadastrado.' });
        }

        const hashedSenha = await bcrypt.hash(senha, 10);

        const novoUsuario = await Usuarios.create({
            nome,
            email,
            sexo,
            senha: hashedSenha
        });

        return res.status(201).json({ status: "success", message: 'Usuário criado com sucesso!', usuario: novoUsuario });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        return res.status(500).json({ error: 'Erro ao criar o usuário.' });
    }
});

app.post('/api/login', async (req, res) => {
    console.log("Recebendo requisição de login...");
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
        }

        const usuario = await Usuarios.findOne({ where: { email } });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(senha, usuario.senha);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta.' });
        }

        res.json({ message: 'Login bem-sucedido!', usuario });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro no login.' });
    }
});

const express = require('express');
const GameStatistics = require('../models/gameStatistics');  // Importe o modelo
const router = express.Router();

router.post('/status', async (req, res) => {
    const { userId, gameName, time } = req.body;

    if (!userId || !gameName || !time) {
        return res.status(400).json({ error: 'Dados insuficientes' });
    }

    try {
        // Inserir estatísticas no banco de dados
        const newStatistic = await GameStatistics.create({
            userId,
            gameName,
            timeSeconds: time,
            playDate: new Date()
        });

        res.status(201).json({ message: 'Estatísticas registradas com sucesso!', data: newStatistic });
    } catch (error) {
        console.error('Erro ao salvar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao salvar estatísticas' });
    }
});

module.exports = router;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
