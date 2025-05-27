const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const app = express();
const port = 3000;

// Configuração do body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rotas da API
app.use('/api', routes);

// View engine EJS
app.set('view engine', 'ejs');
app.set('views', './views');

// Arquivos estáticos
app.use(express.static('public'));

// Página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Início do servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
