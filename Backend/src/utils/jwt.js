import dotenv from 'dotenv';
dotenv.config() // Carrega as variáveis de ambiente do arquivo .env
import pkg from 'jsonwebtoken';
import jwt from 'jsonwebtoken';

const { sign } = pkg

const JWT_SECRET = process.env.JWT_SECRET

export const gerarToken = (payload) => {
    return sign(payload, JWT_SECRET, { expiresIn: '1h'})
}

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token não fornecido ou inválido' });
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token não fornecido' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user;
        next();
    })
}