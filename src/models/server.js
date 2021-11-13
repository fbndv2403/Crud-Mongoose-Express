const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersRoutePath = "/api/users";

    // Conectar a base de datos
    this.conectarDB();
    // Middlewares
    this.middleware();

    // Rutas de la aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("./src/public"));
  }

  routes() {
    this.app.use(this.usersRoutePath, require("../routes/user.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`server on port ${this.port}`);
    });
  }
}

module.exports = Server;
