import mysql from 'mysql2/promise';
// Importando o módulo mysql2/promise para trabalhar com o MySQL

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'dsf4rweqioplt601',
    database: 'pilatesflow-evolution',
  });
  
  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Conexão bem-sucedida!');
      connection.release();
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  })();
  
  export default pool;