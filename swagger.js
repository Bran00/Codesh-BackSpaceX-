const swaggerJsdoc = require("swagger-jsdoc")

const options = {
  definition: {
    openapi: "3.0.0", // Especifique a versão do OpenAPI
    info: {
      title: "SpaceX API",
      version: "1.0.0",
      description: "API para listar lançamentos SpaceX e suas informações",
    },
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rota
} 

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
