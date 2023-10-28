const { Router } = require("express")

const launchesRoutes = require("./launches.routes")

const routes = Router()

// Sua rota inicial
routes.get("/", (req, res) => {
  return res.json({
    message: "Fullstack Challenge 🏅 - Space X API",
  })
})

// Rotas de lançamentos
routes.use("/launches", launchesRoutes)

module.exports = routes
