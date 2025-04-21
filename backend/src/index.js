import express from 'express';
import cors from 'cors';

const app = express();
const port = 3333;

app.use(cors());
app.use(express.json());

const usuarios = []; 

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios); 
});

app.post('/usuarios', (req, res) => {
  const { name, email, senha } = req.body;

  if (!name || !email || !senha) {
    return res.status(400).json({ error: 'Preencha todos os campos.' });
  }

  usuarios.push({ name, email, senha });
  res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});