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

// Obtener campeones por dificultad
app.get("/api/champions/dificultad/:dificultad", (req, res) => {
    const dificultad = req.params.dificultad.toLowerCase();
    const championsPorDificultad = champions.filter(c => c.dificultad_uso.toLowerCase() === dificultad);
    res.json(championsPorDificultad);
});
// Obtener campeones por región
app.get("/api/champions/region/:region", (req, res) => {
    const region = req.params.region.toLowerCase();
    const championsPorRegion = champions.filter(c => c.region.toLowerCase() === region);
    res.json(championsPorRegion);
});

// Obtener campeones por tipo de daño
app.get("/api/champions/tipo-dano/:tipoDano", (req, res) => {
    const tipoDano = req.params.tipoDano.toLowerCase();
    const championsPorTipoDano = champions.filter(c => c.tipo_dano.toLowerCase() === tipoDano);
    res.json(championsPorTipoDano);
});

// Obtener campeones por recurso
app.get("/api/champions/recurso/:recurso", (req, res) => {
    const recurso = req.params.recurso.toLowerCase();
    const championsPorRecurso = champions.filter(c => c.recurso.toLowerCase() === recurso);
    res.json(championsPorRecurso);
});

// Obtener campeones por rango de ataque
app.get("/api/champions/rango-ataque/:rangoAtaque", (req, res) => {
    const rangoAtaque = req.params.rangoAtaque.toLowerCase();
    const championsPorRangoAtaque = champions.filter(c => c.rango_ataque.toLowerCase() === rangoAtaque);
    res.json(championsPorRangoAtaque);
});

// Obtener campeones por año de lanzamiento
app.get("/api/champions/año-lanzamiento/:año", (req, res) => {
    const año = parseInt(req.params.año);
    const championsPorAño = champions.filter(c => new Date(c.fecha_lanzamiento).getFullYear() === ano);
    res.json(championsPorAño);
});
// Obtener campeones por imagen
app.get("/api/champions/imagen/:imagen", (req, res) => {
    const imagen = req.params.imagen.toLowerCase();
    const championsPorImagen = champions.filter(c => c.imagen.toLowerCase().includes(imagen));
    res.json(championsPorImagen);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
