import {
  crearPersonaSerializer,
  registroPersonaSerializer,
  loginSerializer,
} from "../serializers/persona.serializer.js";
import { conexion } from "../instancias.js";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken"

export const crearPersona = async (req, res) => {
  const { error, value } = crearPersonaSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error al crear la persona",
      content: error.details,
    });
  }

  const personaCreada = await conexion.persona.create({
    data: {
      nombre: value.nombre,
      apellido: value.apellido,
      email: value.email,
      numeroTelefono: value.numeroTelefono,
      password: value.password,
      rol: value.rol,
    },
  });

  return res.status(201).json({
    message: "Persona creada exitosamente",
    content: personaCreada,
  });
};

export const listarPersonas = async (req, res) => {
  const personas = await conexion.persona.findMany();

  return res.status(404).json({
    message: "Personas",
    content: personas,
  });
};

export const eliminarPersona = async (req, res) => {
  const { id } = req.params;

  const personaEncontrada = await conexion.persona.findUniqueOrThrow({
    where: { id: id },
    select: { id: true, nombre: true },
  });

  if (!personaEncontrada) {
    return res.status(404).json({
      message: "La persona seleccionada no existe en la base de datos",
      content: id,
    });
  } else {
    const personaEliminada = await conexion.persona.delete({
      where: { id: id },
      select: { id: true, nombre: true },
    });

    return res.status(200).json({
      message: "Persona eliminada correctamente",
      content: personaEncontrada,
    });
  }
};

export const actualizarPersona = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  //validamos la data del body
  const { error, value } = crearPersonaSerializer.validate(body);

  if (error) {
    return res.status(400).json({
      message: "Error al actualizar la persona",
      content: error.details,
    });
  }

  //Encontramos a la persona a actualizar
  const personaEncontrada = await conexion.persona.findUniqueOrThrow({
    where: { id: id },
  });

  if (!personaEncontrada) {
    return res.status(404).json({
      message: "Persona no encontrada en la base de datos",
    });
  }

  const personaActualizada = await conexion.persona.update({
    where: { id: personaEncontrada.id },
    data: {
      nombre: value.nombre,
      apellido: value.apellido,
      email: value.email,
      numeroTelefono: value.numeroTelefono,
    },
  });

  return res.json({
    message: "Receta actualizada correctamente",
    content: personaActualizada,
  });
};


export const registroPersona = async (req, res) => {
    const { error, value } = registroPersonaSerializer.validate(req.body);
  
    if (error) {
      return res.status(400).json({
        message: "Error al crear la persona",
        content: error.details,
      });
    }
  
    const passwordHashed = bcrypt.hashSync(value.password, 10);
  
    const personaCreada = await conexion.persona.create({
      data: { nombre: value.nombre, email: value.email, password: passwordHashed, rol: value.rol },
      select: { email: true, id: true, rol: true },
    });
  
    return res.status(201).json({
      message: "Persona creada exitosamente",
      content: personaCreada,
    });
  };
  
  export const login = async (req, res) => {
    const { error, value } = loginSerializer.validate(req.body);
    
    if (error) {
      return res.status(400).json({
        message: "Error al hacer el login",
        content: error.details,
      });
    }
  
    const personaEncontrada = await conexion.persona.findUniqueOrThrow({
      where: { email: value.email },
    });
    //console.log(personaEncontrada)
  
    const esLaPassword = bcrypt.compareSync(
      value.password,
      personaEncontrada.password
    );
  
    if (esLaPassword === false) {
      return res.status(400).json({
        message: "La password es incorrecta",
      });
    }
  
    //generar la token
  
    const token = jsonwebtoken.sign(
      { personaId: personaEncontrada.id },
      process.env.JWT_SECRET,
      // Si colocamos numeros entonces el valor sera representado en milisegundos
      // Caso contrario utilizaremos el formato
      // 2 days | 2d
      // 10 hours | 10h
      // 5 seconds | 5s
      // 1 year | 1y
      { expiresIn: "5h" }
    );
  
    return res.json({
      content: token,
    });
  };
  
  export const perfilPersona = async (req, res) => {
    const { password, ...data } = req.persona;
    return res.json({
      message: "El perfil es",
      content: data,
    });
  };