import { config } from "dotenv";
config();

import Server from "./config/server.js";

// Crear una instancia del servidor
const server = new Server();

// Iniciar el servidor
server.listen();
