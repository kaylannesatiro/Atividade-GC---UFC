const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3001;


app.use(express.json());

mongoose.connect('mongodb://mongo:27017/meuBanco', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
    console.log('Conectado ao MongoDB');
    })
    .catch((err) => {
    console.error('Erro ao conectar ao MongoDB', err);
    });

const Item = mongoose.model('Item', { name: String });

app.post('/api', async (req, res) => {
    const { name } = req.body;
    const item = new Item({ name });
    await item.save();
    res.status(201).json({ message: 'Item adicionado', item });
});


app.get('/api', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});