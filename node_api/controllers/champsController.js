import Champions from "../models/lolModel.js";
import { validateChamp } from "../validations/validation.js";

export const obtenerTodosLosChamps = async (req, res) => {
    const { error } = validateChamp(req.body);
    console.log(error);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        const champs = await Champion.find();
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
    console.log(error);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const updateChamp = await Champions.findByIdAndUpdate(req.body.id, req.body, { new: true });
    res.json(updateChamp);
    
}

export const deleteChamp = async (req, res) => {
    const { error } = validateUpdateChamp(req.body);
    console.log(error);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    const deleteChamp = await Champions.findByIdAndDelete(req.body.id);
    res.json(deleteChamp);
}



export const filtrarChampsPorLinea = async (req, res) => {
    try {
        const linea = req.params.linea;
        const champs = await Champion.find({ lineas: linea });
        res.json(champs);
    } catch (error) {
        console.error('Error al filtrar campeones por línea:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

