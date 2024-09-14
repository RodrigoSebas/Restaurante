import Joi from "joi";

export const crearPlatoSerializer = Joi.object({
  nombre: Joi.string().required(),
  precio: Joi.number().required(),
  pedidoId: Joi.string().required(),
  imagenId: Joi.string().optional()
});
