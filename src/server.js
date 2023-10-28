const express = require("express")
const cors = require("cors")
const routes = require("./routes")
const cron = require("node-cron")
const dataSearched = require("./api")
const swaggerUi = require("swagger-ui-express")
const swaggerSpec = require("../swagger")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

cron.schedule("0 9 * * *", () => {
  dataSearched()
  console.log("Cron job executed at 9 in the morning.")
})

app.use(routes)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

const PORT = 3333
app.listen(PORT, () => {
  console.log("Servidor funcionando na porta " + PORT)
})
