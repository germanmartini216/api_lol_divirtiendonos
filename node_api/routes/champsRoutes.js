import express from "express";
import { obtenerTodosLosChamps, obtenerChampPorId, filtrarChampsPorLinea, updateChamp, deleteChamp, crearChamp, filtrarChampsPorRecurso, 
filtrarChampsPorOrigen, filtrarChampsPorRol, filtrarChampsPorDificultad, filtrarChampsPorNombre } from "../controllers/champsController.js";

const router = express.Router();

router.post("/", crearChamp);

router.get("/", obtenerTodosLosChamps);

router.get("/:limit", obtenerTodosLosChamps);

router.get("/linea/:linea", filtrarChampsPorLinea);

router.get("/recurso/:recurso", filtrarChampsPorRecurso);

router.get("/origen/:origen", filtrarChampsPorOrigen);

router.get("/roles/:rol", filtrarChampsPorRol);

router.get("/dificultad/:dificultad_uso", filtrarChampsPorDificultad);

router.get("/nombre/:nombre", filtrarChampsPorNombre);

router.put("/:id", updateChamp);

router.delete("/:id", deleteChamp);

router.get("/:id", obtenerChampPorId);

export default router;
