const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const sequelize = new Sequelize( 
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASS, 
    { 
        host: process.env.DB_HOST, 
        port: process.env.DB_PORT, 
        dialect: 'postgres', logging: false, // remove logs SQL no console 
       } 
); 

sequelize.authenticate() 
.then(() => console.log('Conexão com PostgreSQL estabelecida!')) 
.catch(err => console.error('Erro ao conectar:', err));

// Exemplo de rota
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

module.exports = sequelize;

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
