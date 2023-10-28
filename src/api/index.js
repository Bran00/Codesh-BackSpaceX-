const axios = require("axios")
const { storeDataInMongoDB, getAllDataFromMongoDB } = require("../database")
const sendSmsAlert = require("../alerts")

async function dataSearched() {
  try {
    const response = await axios.get("https://api.spacexdata.com/v5/launches")

    const spacexData = response.data

    const results = spacexData
    const totalDocs = results.length
    const page = 1
    const totalPages = Math.ceil(totalDocs / 10)
    const hasNext = page < totalPages
    const hasPrev = page > 1

    const responseObject = {
      results,
      totalDocs,
      page,
      totalPages,
      hasNext,
      hasPrev,
    }

    const latestData = await getAllDataFromMongoDB()
    if (latestData.length !== responseObject.length) {
      storeDataInMongoDB(responseObject)
    } else {
      latestData 
    }
  } catch (error) {
    sendSmsAlert("Detalhes da falha na sincronização dos dados. Erro na API")
    console.error("Erro ao buscar e armazenar dados da SpaceX API", error)
  }
}

module.exports = dataSearched
