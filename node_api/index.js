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
app.get("/api/champions/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const champion = champions.find(c => c.id === id);
    if (champion) {
        res.json(champion);
    } else {
        res.status(404).json({ mensaje: "Campeón no encontrado" });
    }
});

// Obtener campeones por nombre
app.get("/api/champions/nombre/:nombre", (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const championsPorNombre = champions.filter(c => c.nombre.toLowerCase().includes(nombre));
    if (championsPorNombre.length > 0) {
        res.json(championsPorNombre);
    } else {
        res.status(404).json({ mensaje: "No se encontraron campeones con ese nombre" });
    }
});

// Obtener campeones por línea
app.get("/api/champions/linea/:linea", (req, res) => {
    const linea = req.params.linea.toLowerCase();
    const championsPorLinea = champions.filter(c => c.lineas.map(l => l.toLowerCase()).includes(linea));
    res.json(championsPorLinea);
});

// Obtener campeones por rol
app.get("/api/champions/rol/:rol", (req, res) => {
    const rol = req.params.rol.toLowerCase();
    const championsPorRol = champions.filter(c => c.roles.map(r => r.toLowerCase()).includes(rol));
    res.json(championsPorRol);
});

// Obtener campeones por dificultad de uso
app.get("/api/champions/dificultad/:dificultad", (req, res) => {
    const dificultad = req.params.dificultad.toLowerCase();
    const championsPorDificultad = champions.filter(c => c.dificultad_uso.toLowerCase() === dificultad);
    res.json(championsPorDificultad);
});

// Obtener campeones por origen
app.get("/api/champions/origen/:origen", (req, res) => {
    const origen = req.params.origen.toLowerCase();
    const championsPorOrigen = champions.filter(c => c.origen.toLowerCase() === origen);
    res.json(championsPorOrigen);
});

// Obtener campeones por recurso
app.get("/api/champions/recurso/:recurso", (req, res) => {
    const recurso = req.params.recurso.toLowerCase();
    const championsPorRecurso = champions.filter(c => c.recurso.toLowerCase() === recurso);
    res.json(championsPorRecurso);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
