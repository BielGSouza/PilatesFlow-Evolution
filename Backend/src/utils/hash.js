import bcrypt from 'bcryptjs';

//Função para gerar o hash da senha, que será armazenada no banco de dados
export const hashSenha = async (senha) => {
    return await bcrypt.hash(senha, 10)
};

//Função para comparar a senha fornecida pelo usuário com o hash armazenado no banco de dados
export const compararSenha = async (senha, hashedSenha) => {
    return await bcrypt.compare(senha, hashedSenha);
};