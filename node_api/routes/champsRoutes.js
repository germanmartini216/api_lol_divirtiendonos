import express from "express";
import { obtenerTodosLosChamps, obtenerChampPorId, filtrarChampsPorLinea, updateChamp, deleteChamp, crearChamp, filtrarChampsPorRecurso, 
filtrarChampsPorOrigen, filtrarChampsPorRol, filtrarChampsPorDificultad, filtrarChampsPorNombre } from "../controllers/champsController.js";

const router = express.Router();

// Ruta para crear un nuevo campeón
router.post("/", crearChamp); // Crea un nuevo campeón

// Ruta para obtener todos los campeones con paginación
router.get("/", obtenerTodosLosChamps); // Obtiene todos los campeones

// Ruta para obtener campeones con un límite específico
router.get("/:limit", obtenerTodosLosChamps); // Obtiene campeones con un límite específico

// Ruta para filtrar campeones por línea
router.get("/linea/:linea", filtrarChampsPorLinea); // Filtra campeones por línea

router.get("/recurso/:recurso", filtrarChampsPorRecurso); // Filtra campeones por recurso

router.get("/origen/:origen", filtrarChampsPorOrigen); // Filtra campeones por origen

router.get("/roles/:rol", filtrarChampsPorRol); // Filtra campeones por rol

router.get("/dificultad/:dificultad_uso", filtrarChampsPorDificultad); // Filtra campeones por dificultad de uso

router.get("/nombre/:nombre", filtrarChampsPorNombre); // Filtra campeones por nombre


// Ruta para actualizar un campeón por ID
router.put("/:id", updateChamp); // Actualiza un campeón por ID

// Ruta para eliminar un campeón por ID
router.delete("/:id", deleteChamp); // Elimina un campeón por ID

// Ruta para obtener un campeón por ID
router.get("/:id", obtenerChampPorId); // Obtiene un campeón por ID

export default router;
