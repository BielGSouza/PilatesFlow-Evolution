import dotenv from 'dotenv';
dotenv.config() // Carrega as variáveis de ambiente do arquivo .env
import express from 'express';
import cors from 'cors';

import loginUsuario from './src/routes/loginUsuario.js';
import rotaUsuario from './src/routes/rotaUsuario.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/login', loginUsuario);
app.use('/usuario', rotaUsuario);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});