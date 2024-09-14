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
import {
  actualizarPedidoController,
  crearPedidoController,
  listarPedidoController,
} from "./controllers/pedido.controller.js";
import { validarToken } from "./utils.js";
import {
  crearPlatoController,
  listarPlatoController,
} from "./controllers/plato.controller.js";

import {
  generarUrlFirmada,
  crearImagen,
  devolverImagen,
} from "./controllers/imagen.controller.js";

export const rutas = Router();

rutas
  .route("/personas")
  .post(asyncHandler(crearPersona))
  .get(asyncHandler(listarPersonas));

rutas.route("/registro").post(asyncHandler(registroPersona));
rutas.route("/login").post(asyncHandler(login));
rutas
  .route("/perfil")
  .get(asyncHandler(validarToken), asyncHandler(perfilPersona));

rutas
  .route("/persona/:id")
  .delete(asyncHandler(eliminarPersona))
  .put(asyncHandler(actualizarPersona));

rutas
  .route("/pedidos")
  .post(asyncHandler(crearPedidoController))
  .get(asyncHandler(listarPedidoController));

rutas.route("/pedido/:id").put(asyncHandler(actualizarPedidoController));

rutas
  .route("/plato")
  .post(asyncHandler(crearPlatoController))
  .get(asyncHandler(listarPlatoController));

rutas.route("/generar-url").post(asyncHandler(generarUrlFirmada));
//luego en la url usar put para subir la imagen
rutas.route("/imagen").post(asyncHandler(crearImagen));

rutas.route("/image/:id").get(asyncHandler(devolverImagen));
