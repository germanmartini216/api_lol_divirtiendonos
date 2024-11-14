import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import champsRoutes from './routes/champsRoutes.js';
import usersRoutes from './routes/usersRoute.js';
import mapsRoutes from './routes/mapsRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/champions', champsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/mapas', mapsRoutes);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
