const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Importar los datos de los campeones
const championsData = require('./campeon.json');
const champions = championsData.champions;

// Ruta principal que sirve index.html
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Obtener todos los campeones
app.get("/api/champions", (req, res) => {
    res.json(champions);
});

// Obtener un campeón por ID
app.get('/api/champions/:id', (req, res) => {
    const champion = champions.find(c => c.id === parseInt(req.params.id));
    if (!champion) return res.status(404).send('Campeón no encontrado');
    res.json(champion);
});

// Obtener campeones por línea
app.get('/api/champions/linea/:linea', (req, res) => {
    const linea = req.params.linea.toLowerCase();
    const championsEnLinea = champions.filter(c => 
        c.lineas.some(l => l.toLowerCase() === linea)
    );
    if (championsEnLinea.length === 0) return res.status(404).send('No se encontraron campeones en esta línea');
    res.json(championsEnLinea);
});

// Obtener campeones por rol
app.get('/api/champions/rol/:rol', (req, res) => {
    const rol = req.params.rol.toLowerCase();
    const championsConRol = champions.filter(c => 
        c.roles.some(r => r.toLowerCase() === rol)
    );
    if (championsConRol.length === 0) return res.status(404).send('No se encontraron campeones con este rol');
    res.json(championsConRol);
});

// Obtener campeones por dificultad
app.get('/api/champions/dificultad/:dificultad', (req, res) => {
    const dificultad = req.params.dificultad.toLowerCase();
    const championsConDificultad = champions.filter(c => 
        c.dificultad_uso.toLowerCase() === dificultad
    );
    if (championsConDificultad.length === 0) return res.status(404).send('No se encontraron campeones con esta dificultad');
    res.json(championsConDificultad);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
