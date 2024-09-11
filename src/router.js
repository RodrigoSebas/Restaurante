import { Router } from "express";
import asyncHandler from "express-async-handler";
import {
  actualizarPersona,
  crearPersona,
  eliminarPersona,
  listarPersonas,
  registroPersona,
  login,
  perfilPersona,
} from "./controllers/persona.controller.js";
import { validarToken } from "./utils.js";

export const rutas = Router();

rutas
  .route("/personas")
  .post(asyncHandler(crearPersona))
  .get(asyncHandler(listarPersonas));

rutas.route("/registro").post(asyncHandler(registroPersona))
rutas.route("/login").post(asyncHandler(login));
rutas.route("/perfil").get(asyncHandler(validarToken), asyncHandler(perfilPersona))

rutas
  .route("/persona/:id")
  .delete(asyncHandler(eliminarPersona))
  .put(asyncHandler(actualizarPersona));
