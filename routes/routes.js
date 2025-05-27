const express = require('express');
const router = express.Router();
const db = require('../database/db');

// Adicionar tecnologia a um projeto
router.post('/tec_pro', (req, res) => {
  const { projeto_id, tecnologia_id } = req.body;
  const sql = 'INSERT INTO projeto_tecnologia (projeto_id, tecnologia_id) VALUES (?, ?)'
  db.query(sql, [projeto_id, tecnologia_id], (err, result) => {
    if (err) return res.status(500).send(err)
    res.send({ mensagem: 'Tecnologia adicionada ao projeto com sucesso' })
  })
})

// Remover tecnologia de um projeto
router.delete('/tec_pro', (req, res) => {
  const { projeto_id, tecnologia_id } = req.body
  const sql = 'DELETE FROM projeto_tecnologia WHERE projeto_id = ? AND tecnologia_id = ?'
  db.query(sql, [projeto_id, tecnologia_id], (err, result) => {
    if (err) return res.status(500).send(err)
    if (result.affectedRows === 0) {
      return res.status(404).send({ mensagem: 'Relacionamento não encontrado' })
    }
    res.send({ mensagem: 'Tecnologia removida do projeto com sucesso' })
  })
})

// Ver tecnologias de um projeto
router.get('/tec_pro/projeto/:projeto_id', (req, res) => {
  const sql = `
    SELECT tecnologias.id, tecnologias.nome 
    FROM tecnologias 
    JOIN projeto_tecnologia ON tecnologias.id = projeto_tecnologia.tecnologia_id
    WHERE projeto_tecnologia.projeto_id = ?;
  `;
  db.query(sql, [req.params.projeto_id], (err, results) => {
    if (err) return res.status(500).send(err)
    res.send(results)
  })
})

// Ver projetos que usam uma tecnologia
router.get('/tec_pro/tecnologia/:tecnologia_id', (req, res) => {
  const sql = `
    SELECT projetos.id, projetos.nome, projetos.descricao 
    FROM projetos 
    JOIN projeto_tecnologia ON projetos.id = projeto_tecnologia.projeto_id
    WHERE projeto_tecnologia.tecnologia_id = ?;
  `;
  db.query(sql, [req.params.tecnologia_id], (err, results) => {
    if (err) return res.status(500).send(err)
    res.send(results)
  })
})




// CREATE projetos
router.post('/projeto', (req, res) => {
  const { nome, descricao, link } = req.body
  const sql = 'INSERT INTO projetos (nome, descricao, link) VALUES (?, ?, ?)'
  db.query(sql, [nome, descricao, link], (err, result) => {
    if (err) return res.status(500).send(err)
    res.send({ id: result.insertId, nome, descricao, link })
  })
})

// READ projetos
router.get('/projeto', (req, res) => {
  db.query('SELECT * FROM projetos', (err, results) => {
    if (err) return res.status(500).send(err)
    res.send(results)
  })
})

// READ projetos
router.get('/projeto/:id', (req, res) => {
  db.query('SELECT * FROM projetos WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err)
    if (result.length === 0) return res.status(404).send({ mensagem: 'Projeto não encontrado' })
    res.send(result[0])
  })
})

// UPDATE projetos
router.put('/projeto/:id', (req, res) => {
  const { nome, descricao, link } = req.body
  const sql = 'UPDATE projetos SET nome = ?, descricao = ?, link = ? WHERE id = ?'
  db.query(sql, [nome, descricao, link, req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.send({ mensagem: 'Projeto atualizado' })
  })
})

// DELETE projetos
router.delete('/projeto/:id', (req, res) => {
  db.query('DELETE FROM projetos WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.send({ mensagem: 'Projeto excluído' })
  })
})


//CREATE tecnologia
router.post('/tecnologia', (req, res) => {
    const { nome } = req.body;
    const sql = 'INSERT INTO tecnologias (nome) VALUES (?)';
    db.query(sql, [nome], (err, result) => {
        if (err) return res.status(500).send(err);
        res.send({ id: result.insertId, nome });
    });
})

//READ tecnologia
router.get('/tecnologia', (req, res) => {
    db.query('SELECT * FROM tecnologias', (err, results) => {
        if (err) return res.status(500).send(err)
        res.send(results)
    })
})

// READ tecnologia
router.get('/tecnologia/:id', (req, res) => {
  db.query('SELECT * FROM tecnologias WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).send(err)
    if (result.length === 0) return res.status(404).send({ mensagem: 'Tecnologia não encontrada' })
    res.send(result[0])
  })
})

// UPDATE tecnologia
router.put('/tecnologia/:id', (req, res) => {
  const { nome } = req.body
  const sql = 'UPDATE tecnologias SET nome = ? WHERE id = ?'
  db.query(sql, [nome, req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.send({ mensagem: 'Tecnologia atualizada com sucesso' })
  })
})

// DELETE tecnologia
router.delete('/tecnologia/:id', (req, res) => {
  db.query('DELETE FROM tecnologias WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).send(err)
    res.send({ mensagem: 'Tecnologia excluída com sucesso' })
  })
})


router.get('/ping', (req, res) => {
  res.send({ status: 'ok', mensagem: 'API está funcionando!' });
});
module.exports = router