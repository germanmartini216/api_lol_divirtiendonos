import usersModel from "../models/usersModels.js";

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = await usersModel.find();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await usersModel.findById(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;
        const nuevoUsuario = new usersModel({ username, password });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const iniciarSesion = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuario = await usersModel.findOne({ username, password });
        if (usuario) {
            res.json({ mensaje: "Inicio de sesión exitoso" });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { username, password } = req.body;
        const usuarioActualizado = await usersModel.findByIdAndUpdate(
            req.params.id,
            { username, password },
            { new: true }
        );
        if (usuarioActualizado) {
            res.json(usuarioActualizado);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await usersModel.findByIdAndDelete(req.params.id);
        if (usuarioEliminado) {
            res.json({ mensaje: "Usuario eliminado correctamente" });
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export {
    obtenerTodosLosUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    iniciarSesion,
    actualizarUsuario,
    eliminarUsuario
};
