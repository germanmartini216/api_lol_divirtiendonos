import Champions from "../models/lolModel.js";
import { validateChamp, validateUpdateChamp } from "../validations/validation.js";

export const obtenerTodosLosChamps = async (req, res) => {
    try {
        const champs = await Champions.find();
        res.json(champs);
    } catch (error) {
        console.error('Error al obtener campeones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const obtenerChampPorId = async (req, res) => {
    try {
        const champ = await Champions.findById(req.params.id);
        if (!champ) {
            return res.status(404).json({ mensaje: "Campeón no encontrado" });
        }
        res.json(champ);
    } catch (error) {
        console.error('Error al obtener campeón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const updateChamp = async (req, res) => {
    const { error } = validateUpdateChamp(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const updateChamp = await Champions.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updateChamp) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }
        res.json(updateChamp);
    } catch (error) {
        console.error('Error al actualizar campeón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

export const deleteChamp = async (req, res) => {
    try {
        const deleteChamp = await Champions.findByIdAndDelete(req.params.id);
        if (!deleteChamp) {
            return res.status(404).json({ error: 'Campeón no encontrado' });
        }
        res.json(deleteChamp);
    } catch (error) {
        console.error('Error al eliminar campeón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por línea
export const filtrarChampsPorLinea = async (req, res) => {
    try {
        const linea = req.params.linea;
        const champs = await Champions.find({ lineas: linea });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por línea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por recurso
export const filtrarChampsPorRecurso = async (req, res) => {
    try {
        const recurso = req.params.recurso;
        const champs = await Champions.find({ recursos: recurso });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por recurso:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por origen
export const filtrarChampsPorOrigen = async (req, res) => {
    try {
        const origen = req.params.origen;
        const champs = await Champions.find({ origen: origen });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por origen:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por rol
export const filtrarChampsPorRol = async (req, res) => {
    try {
        const rol = req.params.rol;
        const champs = await Champions.find({ roles: rol });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por rol:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por dificultad
export const filtrarChampsPorDificultad = async (req, res) => {
    try {
        const dificultad = req.params.dificultad;
        const champs = await Champions.find({ dificultad: dificultad });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por dificultad:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Filtrar campeones por nombre
export const filtrarChampsPorNombre = async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const champs = await Champions.find({ nombre: { $regex: nombre, $options: 'i' } }); // Búsqueda insensible a mayúsculas
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por nombre:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Crear un nuevo campeón
export const crearChamp = async (req, res) => {
    const { error } = validateChamp(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const nuevoChamp = new Champions(req.body);
        const champGuardado = await nuevoChamp.save();
        res.status(201).json(champGuardado);
    } catch (error) {
        console.error('Error al crear campeón:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};
