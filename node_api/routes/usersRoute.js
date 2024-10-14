import express from "express"
import { obtenerTodosLosUsuarios, obtenerUsuarioPorId, crearUsuario, iniciarSesion, actualizarUsuario, eliminarUsuario } from "../controllers/usersController.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config();

const claveSecreta = process.env.SECRET;

const router = express.Router();

const autenticar = (req, res, next) => {
    const tokenRecibido = req.headers.authorization;

    if(tokenRecibido){
        const token = tokenRecibido.split(" ")[1];
        jwt.verify(token, claveSecreta, (error, datos) => {
            if(error){
                return res.status(403).json({ mensaje: "Token inválido" });
            }
            req.usuario = {id: datos.id, email: datos.email};
            next();
        });
    } else {
        res.status(401).json({ mensaje: "No se proporcionó token de autenticación" });
    }
};

// Obtener todos los usuarios
router.get('/', autenticar, obtenerTodosLosUsuarios);

// Obtener usuario por ID
router.get('/:id', autenticar, obtenerUsuarioPorId);

// Crear usuario
router.post('/registro', crearUsuario);

// Iniciar sesión
router.post('/login', iniciarSesion);

// Actualizar usuario
router.put('/:id', autenticar, actualizarUsuario);

// Eliminar usuario
router.delete('/:id', autenticar, eliminarUsuario);

export default router;
