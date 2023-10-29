const { Router } = require("express")

const launchesRoutes = require("./launches.routes")

const routes = Router()

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retorna Fullstack Challenge 🏅 - Space X API.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a Messagem.
 *       400:
 *         description: Error. Error Message
 *
 */

routes.get("/", (req, res) => {
  return res.json({
    message: "Fullstack Challenge 🏅 - Space X API",
  })
})

routes.use("/launches", launchesRoutes)

module.exports = routes
