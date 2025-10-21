import express from 'express';
import pool from '../services/db.js';
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/perfil', verificarToken, async (req, res) => {
    try {
        const emailUsuario = req.user.email

        const [resultado] = await pool.query(
            'SELECT * FROM usuario WHERE email = ?',
            [emailUsuario]
        );
        if (resultado.length === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const usuario = resultado[0];
        delete usuario.senha
        res.json(usuario);
    } catch (error) {
        console.error('Erro ao buscar perfil do usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar perfil do usuário' });
    }
})

export default router;