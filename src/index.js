import express from "express"
import {rutas} from "./router.js"
import morgan from "morgan"
import cors from "cors"

const servidor = express()
servidor.use(cors({orgin: "*"}))

const errorHandler = (error, req, res, next) => {
    res.status(400).json({
        message: "Error al iniciar la operacion",
        content: error.message
    })
}

servidor.use(morgan("common"))

const PORT = process.env.PORT

servidor.use(express.json())
servidor.use(rutas)
servidor.use(errorHandler)

servidor.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})