const { Router } = require("express")
const LaunchesController = require("../controllers/LaunchesController")
const launchesRoutes = Router()
const launchesController = new LaunchesController()

/**
 * @swagger
 * /launches:
 *   get:
 *     summary: Retorna a lista de lançamentos.
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filtro por termo de busca.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Limite de resultados a serem retornados.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna a lista de lançamentos.
 *       400:
 *         description: Error. Error Message
 *
 */
launchesRoutes.get("/", launchesController.index)

/**
 * @swagger
 * /launches/stats:
 *   get:
 *     summary: Retorna estatísticas de lançamentos (sucessos e falhas).
 *     responses:
 *       200:
 *         description: Sucesso. Retorna estatísticas.
 *       400:
 *         description: Error. Error Message
 *
 */

launchesRoutes.get("/stats", launchesController.stats)

/**
 * @swagger
 * /launches/stats/reusable:
 *   get:
 *     summary: Retorna estatísticas de lançamentos com estágios reaproveitáveis.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna estatísticas.
 *       400:
 *         description: Error. Error Message
 *
 */

launchesRoutes.get("/stats/reusable", launchesController.reusable)

/**
 * @swagger
 * /launches/stats/monthrocket:
 *   get:
 *     summary: Retorna estatísticas de lançamentos por mês e tipo de foguete.
 *     responses:
 *       200:
 *         description: Sucesso. Retorna estatísticas.
 *       400:
 *         description: Error. Error Message
 *
 */

launchesRoutes.get(
  "/stats/monthrocket",
  launchesController.launchesByMonthAndRocket
)

module.exports = launchesRoutes
