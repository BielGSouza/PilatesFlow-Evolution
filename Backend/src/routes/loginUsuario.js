import express from "express";
import { hashSenha, compararSenha } from "../utils/hash.js";
import { gerarToken } from "../utils/jwt.js";
import pool from "../services/db.js";

const router = express.Router();

router.post('/cadastrar', async (req, res) => {
    const { nome, email, senha, telefone } = req.body;

    if (!nome || !email || !senha || !telefone) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
        const hashedSenha = await hashSenha(senha);

        const resultado = await pool.query(
            'INSERT INTO usuario (nome, email, senha, telefone) VALUES (?, ?, ?, ?)',
            [nome, email, hashedSenha, telefone]
        );
        res.status(201).json(resultado);
    } catch (error) {
        console.error('Erro ao registrar usuário:', error);
        if (error.errno === 1062) {
            // Código de erro para chave duplicada no MySQL
            return res.status(409).json({ error: 'Email já cadastrado, faça login para acessar.' });
        }
        res.status(500).json({ error: 'Erro ao registrar usuário.' });
    }
})

router.post('/logar', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    try {
        const [resultado] = await pool.query(
            'SELECT * FROM usuario WHERE email = ?',
            [email]
        )

        if (resultado.length === 0) {
            return res.status(404).json({ error: 'Usuário inexistente' });
        }

        const usuario = resultado[0];
        console.log(usuario)

        const senhValida = await compararSenha(senha, usuario.senha)
        if (!senhValida) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const token = gerarToken({ id: usuario.id, email: usuario.email});

        res.status(200).json({ message: "Login bem-sucedido", token });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
})

export default router;