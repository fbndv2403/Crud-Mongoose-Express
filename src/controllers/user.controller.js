const { response, request } = require("express");

const userGet = (req, res = response) => {
  const query = req.query;

  res.json({
    msg: "get request - Controller",
    query,
  });
};

const userPost = (req = request, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: "post request - Controller",
    nombre,
    edad,
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
