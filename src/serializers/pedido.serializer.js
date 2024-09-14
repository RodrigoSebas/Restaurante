import Joi from "joi";

export const crearPedidoSerializer = Joi.object({
  extras: Joi.string().optional(),
  personaId: Joi.string().required(),
  //siempre un pedido tiene que tener una persona asociada
});

export const listarPedidoSerializer = Joi.object({
  extras: Joi.string().optional(),
});

export const actualizarPedidoSerializer = Joi.object({
  nombre: Joi.string().required(),
  nombreNuevoPlato: Joi.string().required(),
  precio: Joi.number().required(),
});
