const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

const lol =[
    {id:1, name:"John", email:"john@gmail.com"},
    {id:2, name:"Jane", email:"jane@gmail.com"},
    {id:3, name:"Doe", email:"doe@gmail.com"},
]

// Ruta principal que sirve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get("/api/lol", (req, res) => {
    res.send(lol);
});

app.get('/api/lol/:id', (req, res) => {
    const person = lol.find(p => p.id === parseInt(req.params.id));
    if(!person) return res.status(404).send('Personaje no encontrado');
    else res.send(person);
});

app.post('/api/lol', (req, res) => {
    const person = {
        id: lol.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    lol.push(person);
    res.send(person);
});

app.delete('/api/lol/:id', (req, res) => {
    const person = lol.find(p => p.id === parseInt(req.params.id));
    if(!person) return res.status(404).send('Personaje no encontrado');
    else {
        const index = lol.indexOf(person);
        lol.splice(index, 1);
        res.send(person);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
