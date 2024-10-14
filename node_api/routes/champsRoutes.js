import express from "express";
import { obtenerTodosLosChamps, obtenerChampPorId, filtrarChampsPorLinea, updateChamp, deleteChamp } from "../controllers/champsController.js";

const router = express.Router();

// Ruta para obtener todos los campeones
router.get("/", obtenerTodosLosChamps);

// Ruta para filtrar por línea
router.get("/linea/:linea", filtrarChampsPorLinea);

// Ruta para actualizar un campeón
router.put("/", updateChamp);
router.delete("/", deleteChamp);


// Ruta para obtener un campeón por ID (debe ir al final)
router.get("/:id", obtenerChampPorId);


export default router;
