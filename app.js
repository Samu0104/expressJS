const express = require('express');
const app = express();

// Middleware para ler o corpo da requisição em JSON
app.use(express.json());

// Array de pessoas (será usado para armazenar as pessoas)
let pessoas = [
  { id: 1, nome: 'João' },
  { id: 2, nome: 'Maria' },
  { id: 3, nome: 'Pedro' }
];

// Rota GET: Listar todas as pessoas
app.get('/pessoa', (req, res) => {
  res.json(pessoas);
});

// Rota GET: Buscar pessoa por ID
app.get('/pessoa/:id', (req, res) => {
  const pessoa = pessoas.find(p => p.id === parseInt(req.params.id));
  if (!pessoa) {
    return res.status(404).json({ message: 'Pessoa não encontrada' });
  }
  res.json(pessoa);
});

// Rota POST: Criar uma nova pessoa
app.post('/pessoa', (req, res) => {
  const { nome } = req.body;
  if (!nome) {
    return res.status(400).json({ message: 'Nome é obrigatório' });
  }

  const novaPessoa = {
    id: pessoas.length + 1,  // Incrementa o ID automaticamente
    nome
  };

  pessoas.push(novaPessoa);
  res.status(201).json(novaPessoa);
});

// Rota PUT: Atualizar uma pessoa
app.put('/pessoa/:id', (req, res) => {
  const { id } = req.params;
  const { nome } = req.body;

  const pessoa = pessoas.find(p => p.id === parseInt(id));
  if (!pessoa) {
    return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  pessoa.nome = nome;  // Atualiza o nome da pessoa
  res.json(pessoa);
});

// Rota DELETE: Excluir uma pessoa
app.delete('/pessoa/:id', (req, res) => {
  const { id } = req.params;
  const index = pessoas.findIndex(p => p.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ message: 'Pessoa não encontrada' });
  }

  pessoas.splice(index, 1);  // Remove a pessoa do array
  res.status(204).send();  // Retorna resposta sem corpo
});

// Iniciar o servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
