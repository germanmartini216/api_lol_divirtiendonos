import usersModel from "../models/usersModels.js";

const obtenerTodosLosUsuarios = async (req, res) => {
    try {
        const usuarios = usersModel.readUsersFile();
        res.json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuarios = usersModel.readUsersFile();
        const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
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
        const usuarios = usersModel.readUsersFile();
        const nuevoUsuario = { ...req.body, id: usuarios.length + 1 };
        usuarios.push(nuevoUsuario);
        usersModel.writeUsersFile(usuarios);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const iniciarSesion = async (req, res) => {
    res.status(501).json({ mensaje: "Función no implementada" });
};

const actualizarUsuario = async (req, res) => {
    try {
        const usuarios = usersModel.readUsersFile();
        const index = usuarios.findIndex(u => u.id === parseInt(req.params.id));
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...req.body };
            usersModel.writeUsersFile(usuarios);
            res.json(usuarios[index]);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        let usuarios = usersModel.readUsersFile();
        const usuariosFiltrados = usuarios.filter(u => u.id !== parseInt(req.params.id));
        if (usuarios.length !== usuariosFiltrados.length) {
            usersModel.writeUsersFile(usuariosFiltrados);
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
