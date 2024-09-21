import { conexion } from "../instancias.js";
import {
  crearPedidoSerializer,
  listarPedidoSerializer,
  actualizarPedidoSerializer,
} from "../serializers/pedido.serializer.js";

export const crearPedidoController = async (req, res) => {
  const { value, error } = crearPedidoSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error al crear el pedido",
      content: error.details,
    });
  }

  const pedidoCreado = await conexion.pedido.create({
    data: {
      extras: value.extras,
      personaId: value.personaId,
    },
  });

  return res.status(201).json({
    message: "Pedido creado exitosamente",
    content: pedidoCreado,
  });
};

export const listarPedidoController = async (req, res) => {
  const { value, error } = listarPedidoSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error al listar los pedidos",
      content: error.details,
    });
  }

  const pedidos = await conexion.pedido.findMany({
    include: {
      persona: true, //esto busca la relacion entre pedido y persona es decir busca a la persona que le pertenece el pedido
      platos: true, //para mostrar todos los platos asociados al pedido
    },
  });

  return res.status(200).json({
    message: "Pedidos",
    content: pedidos,
  });
};

export const actualizarPedidoController = async (req, res) => {
  const { id } = req.params;
  const { value, error } = actualizarPedidoSerializer.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Error al actualizar el pedido",
    });
  }

  const platoEncontrado = await conexion.plato.findFirstOrThrow({
    where: { pedidoId: id, nombre: value.nombre },
  });

  const platoActualizado = await conexion.plato.update({
    where: { id: platoEncontrado.id },
    data: {
      nombre: value.nombreNuevoPlato,
      precio: value.precio,
    },
  });
  //console.log("plato actualizado: ",platoActualizado)

  return res.status(201).json({
    message: "Pedido actualizado exitosamente",
    content: platoActualizado,
  });

  //pasar el id del pedido por la url
  //encontrar el pedido
  //leer el body para ver que plato(platoId) se va a cambiar
};

/*export const eliminarPedidoController = async (req, res) => {
  const { id } = req.params;

  const pedidoEncontrado = await conexion.pedido.findFirstOrThrow({
    where: { id: id },
  });

  //await conexion.pedido.delete({
    //where: {id: id}
  //})
  return res.status(300).json({
    message: "Pedido eliminado exitosamente",
    content: pedidoEncontrado,
  });
};
*/
