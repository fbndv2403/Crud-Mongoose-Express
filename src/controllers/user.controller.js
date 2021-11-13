const { response, request } = require("express");
const Usuario = require("../models/usuario");

const userGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "get request - Controller",
    query,
  });
};

const userPost = async (req = request, res = response) => {
  const body = req.body;
  const usuario = new Usuario(body);

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
