const express = require('express');
const db = require('./db');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY; 
require('dotenv').config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

///////// TESTE DE CONEXÃO AO BANCO DE DADOS ///////////
const testDBConnection = () => {
  db.query('SELECT * FROM usuarios', (error, results, fields) => {
    if (error) throw error;
    console.log('A conexão com o banco de dados foi estabelecida com sucesso.');
  });
};

//testDBConnection();
///////////////////////////////////////////////////////

// Rota de login modificada para buscar na tabela usuarios
app.post('/login', async (req, res) => {
  console.log("entrou");
  const { email, senha } = req.body;
  console.log(email,senha);
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  try {
    // Usando await para resolver a promessa retornada por db.query
    const results = await db.query(query, [email]);
    if (results.length === 0) {
        console.log("não encontrou");
        return res.status(401).send('Usuário não encontrado.');
    }

    const user = results[0];
    console.log("deu certo");

    try {
        const match = await bcrypt.compare(senha, user.senha);
        if (match) {
            const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });
            return res.json({ token });
        } else {
            return res.status(401).send('Senha incorreta.');
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send('Erro ao verificar senha');
    }
} catch (error) {
    console.error("Erro antes do if", error);
    return res.status(500).send('Erro no servidor');
}
});

// Middleware para verificar o token
function verificarToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Acesso negado.');

  try {
      const verificado = jwt.verify(token, SECRET_KEY);
      req.usuario = verificado;
      next();
  } catch (erro) {
      res.status(400).send('Token inválido.');
  }
}

//// Rota para registrar um usuário
const hashPassword = (password) => {
  return bcrypt.hashSync(password, 10); // O segundo argumento é o número de rounds de salting
};

app.post('/register', async (req, res) => {
  const { usuario, email, senha } = req.body;

  try{
    const senhaHash = hashPassword(senha);
    const sql = 'INSERT INTO usuarios (usuario, email, senha) VALUES (?, ?, ?)';
    const result = await db.query(sql, [usuario, email, senhaHash]);
    res.send({ success: true, message: 'Usuário registrado com sucesso!' });

  }catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: 'Erro ao registrar usuário.' });
  }
    
  

});
////////////////////////////////////////////////////////////////


app.listen(3000);
console.log("Aplicação rodando na porta 3000");