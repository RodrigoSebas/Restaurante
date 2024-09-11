import { PERSONA_ROL } from "@prisma/client";
import Joi from "joi";

export const crearPersonaSerializer = Joi.object({
  email: Joi.string().email().optional(),
  nombre: Joi.string().required(),
  apellido: Joi.string().optional(),
  numeroTelefono: Joi.number().optional(),
  password: Joi.string().optional(),
  rol: Joi.string().allow(PERSONA_ROL.ADMINISTRADOR, PERSONA_ROL.CLIENTE),
});

export const registroPersonaSerializer = Joi.object({
  nombre: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string()
    .required()
    // [a-z] > Al menos una minuscula
    // [A-Z] > Al menos una mayuscula
    // [0-9] > Al menos un digito
    // [W_] > Al menos un caracter especial
    // {6,} > Longitud minima de 6 caracteres
    .regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[W_]).{6,}$")),
  rol: Joi.string()
    .required()
    .allow(PERSONA_ROL.ADMINISTRADOR, PERSONA_ROL.CLIENTE),
});

export const loginSerializer = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
