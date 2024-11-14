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

router.get('/', autenticar, obtenerTodosLosUsuarios);

router.get('/:id', autenticar, obtenerUsuarioPorId);

router.post('/registro', autenticar, crearUsuario);

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await usersModel.findOne({ username, password });
        if (usuario) {
            const token = jwt.sign({ id: usuario._id, email: usuario.username }, claveSecreta, { expiresIn: '1h' });
            res.json({ mensaje: "Inicio de sesión exitoso", token });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', autenticar, actualizarUsuario);

router.delete('/:id', autenticar, eliminarUsuario);

export default router;
