const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const userGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "get request - Controller",
    query,
  });
};

const userPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    return res.status(404).json({
      msg: `El correo ${usuario.correo} ya se encuentra registrado`,
    });
  }

  // encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en base de dato
  await usuario.save();

  res.json({
    msg: "post request - Controller",
    usuario,
  });
};

const userPut = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: "put request - Controller",
    id,
  });
};

const userDelete = (req, res = response) => {
  res.json({
    msg: "delete request - Controller",
  });
};

module.exports = {
  userGet,
  userPost,
  userPut,
  userDelete,
};
