const express = require('express'); // Declara o express apenas uma vez
const db = require('./config/db');  // Importa a conexão com o banco de dados
const app = express();

app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('API rodando!');
});

// Rota para listar todos os cargos
app.get('/cargos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM cargo');
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar cargos', error: err });
  }
});

// Rota para listar todas as tabelas do banco de dados 'rhAC1'
app.get('/tabelas', async (req, res) => {
  try {
    const [rows] = await db.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'rhAC1'");
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar as tabelas', error: err });
  }
});

// Definindo a porta e iniciando o servidor (apenas uma vez)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor rodando na porta ' + PORT);
});
app.get('/cargos', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM cargo');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar cargos', error: err });
    }
  });
  app.get('/setores', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM setor');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar setores', error: err });
    }
  });
  app.get('/funcionarios', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM funcionario');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar funcionários', error: err });
    }
  });
  app.get('/setor', async (req, res) => {
    const nome = req.query.nome;
    try {
      const [rows] = await db.query('SELECT * FROM setor WHERE nome = ?', [nome]);
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar setor', error: err });
    }
  });
  app.get('/funcionario/:nome', async (req, res) => {
    const nome = req.params.nome;
    try {
      const [rows] = await db.query('SELECT * FROM funcionario WHERE nome = ?', [nome]);
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar funcionário', error: err });
    }
  });
  app.get('/funcionariosCargo', async (req, res) => {
    const { cod_cargo } = req.body;
    try {
      const [rows] = await db.query('SELECT * FROM funcionario WHERE cod_cargo = ?', [cod_cargo]);
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar funcionários', error: err });
    }
  });
  app.get('/cargosSemFuncionario', async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM cargo WHERE cod_cargo NOT IN (SELECT cod_cargo FROM funcionario)');
      res.status(200).json(rows);
    } catch (err) {
      res.status(500).json({ message: 'Erro ao buscar cargos', error: err });
    }
  });
  app.post('/funcionario', async (req, res) => {
    const { nome, cod_setor, cod_cargo, salario } = req.body;
    try {
      const result = await db.query('INSERT INTO funcionario (nome, cod_setor, cod_cargo, salario) VALUES (?, ?, ?, ?)', [nome, cod_setor, cod_cargo, salario]);
      res.status(201).json({ message: 'Funcionário criado com sucesso', funcionarioId: result.insertId });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao criar funcionário', error: err });
    }
  });
  app.put('/funcionario/:id', async (req, res) => {
    const { nome, cod_setor, cod_cargo, salario } = req.body;
    const { id } = req.params;
    try {
      await db.query('UPDATE funcionario SET nome = ?, cod_setor = ?, cod_cargo = ?, salario = ? WHERE cod_funcionario = ?', [nome, cod_setor, cod_cargo, salario, id]);
      res.status(200).json({ message: 'Funcionário atualizado com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao atualizar funcionário', error: err });
    }
  });
  app.delete('/funcionario/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await db.query('DELETE FROM funcionario WHERE cod_funcionario = ?', [id]);
      res.status(200).json({ message: 'Funcionário excluído com sucesso' });
    } catch (err) {
      res.status(500).json({ message: 'Erro ao excluir funcionário', error: err });
    }
  });
  
