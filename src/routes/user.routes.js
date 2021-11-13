const { Router } = require("express");
const { check } = require("express-validator");

const Role = require("../models/role");
const { validarCampos } = require("../middlewares/validar-campos");

const {
  userGet,
  userPost,
  userPut,
  userDelete,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", userGet);

router.post(
  "/",
  [
    check("correo", "El correo no es valido").isEmail(),
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "El password es obligatorio y de ser mas de 6 letras"
    ).isLength({ min: 6 }),
    // check("rol", "No es un rol permitido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    check("rol").custom(async (rol = "") => {
      const existeRol = await Role.findOne({ rol });
      if (!existeRol) {
        throw new Error(`El rol ${rol} no est registrado en la base de datos`);
      }
    }),
    validarCampos,
  ],
  userPost
);

router.put("/:id", userPut);

router.delete("/", userDelete);

module.exports = router;
