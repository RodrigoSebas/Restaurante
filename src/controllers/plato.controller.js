import { conexion } from "../instancias.js";
import { crearPlatoSerializer } from "../serializers/plato.serializer.js";

export const crearPlatoController = async (req, res) => {
  const { value, error } = crearPlatoSerializer.validate(req.body);

  console.log(error);
  if (error) {
    return res.status(400).json({
      message: "Error al crear el plato",
    });
  }
  //las llaves foraneas nunca pueden faltar
  const platoCreado = await conexion.plato.create({
    data: {
      nombre: value.nombre,
      precio: value.precio,
      pedidoId: value.pedidoId,
      imagenId: value.imagenId,
    },
  });
  //console.log(platoCreado)

  //const platos = await conexion.plato.findMany()

  //esto es para mostrar las relaciones del plato
  const platos = await conexion.plato.findUniqueOrThrow({
    where: {id: platoCreado.id},
    include: { pedido: true, imagen: true },
  });
  return res.status(201).json({
    message: "Plato creado exitosamente",
    content: platos,
  });
};

export const listarPlatoController = async (req, res) => {
  const platos = await conexion.plato.findMany({
    include: { pedido: true, imagen: true },
  });
  console.log(platos);
  return res.status(200).json({
    message: "Platos",
    content: platos,
  });
};


