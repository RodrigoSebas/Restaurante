import jsonwebtoken from "jsonwebtoken";
import { conexion } from "./instancias.js";

//middlewares manual
export const validarToken = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(403).json({
      message: "Se necesita una token para realizar esta peticion",
    });
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    return res.status(403).json({
      message: "Debe enviar la token formato 'Bearer TOKEN' ",
    });
  }

  try {
    const payload = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    const personaEncontrada = await conexion.persona.findUniqueOrThrow({
      where: { id: payload.personaId },
    });
    console.log(personaEncontrada);
    //se crea el usuario en el request para guardar el usuarioencontrado y poder verlo despues en el controlador final
    req.persona = personaEncontrada;
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Error al verificar la token",
      content: error.message,
    });
  }
};