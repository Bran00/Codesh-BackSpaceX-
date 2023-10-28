const { getAllDataFromMongoDB } = require("../database")
class LaunchesController {
  async index(request, response) {
    try {
      const search = request.query.search
      const limit = parseInt(request.query.limit) || 5000

      const data = await getAllDataFromMongoDB()

      const filterData = (data, searchTerm) => {
        if (!searchTerm) {
          return data
        } else {
          return data.filter((item) => {
            if (
              (item.details &&
                item.details
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (item.name &&
                item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
              item.rocket && 
                item.rocket.includes(searchTerm)
            ) {
              return true
            }
            return false
          })
        }
      }
      // Filtrar os dados com base no parâmetro de busca
      const filteredData = filterData(data, search)

      // Limitar os resultados com base no parâmetro "limit"
      let limitedData = filteredData.slice(0, limit)

      // Construir a estrutura de resposta
      const totalDocs = limitedData.length
      const page = 1
      const totalPages = Math.ceil(totalDocs / limit)
      const hasNext = page < totalPages
      const hasPrev = page > 1

      const responseObject = {
        results: limitedData,
        totalDocs,
        page,
        totalPages,
        hasNext,
        hasPrev,
      }

      if (limitedData.length > 0) {
        return response.status(200).json(responseObject)
      } else {
        return response.status(204).send()
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({ message: "Error message" })
    }
  }

  async stats(request, response) {
    try {
      const data = await getAllDataFromMongoDB()

      // Inicialize contadores
      let successes = 0
      let failures = 0

      // Percorra os dados e conte sucessos e falhas
      data.forEach((item) => {
        if (item.success) {
          successes++
        } else {
          failures++
        }
      })

      // Retorne a contagem no formato apropriado
      return response.status(200).json({
        successes,
        failures,
      })
    } catch (error) {
      console.error("Erro ao buscar dados de sucesso e falha", error)
      response.status(400).json({ message: "Erro message" })
    }
  }

  async reusable(request, response) {
    try {
      const data = await getAllDataFromMongoDB()

      // Inicialize contadores
      let withReusableStages = 0
      let withoutReusableStages = 0

      // Percorra os dados e conte lançamentos com e sem estágios reaproveitáveis
      data.forEach((item) => {
        if (item.cores && item.cores.length > 0) {
          // Verifique se há pelo menos um objeto no array "cores"
          const reusedCores = item.cores.filter((core) => core.reused === true)

          if (reusedCores.length > 0) {
            // Se pelo menos um dos "cores" for reaproveitável, conte-o como com estágios reaproveitáveis
            withReusableStages++
          } else {
            withoutReusableStages++
          }
        } else {
          withoutReusableStages++
        }
      })

      // Retorne a contagem no formato apropriado para o gráfico de pizza
      return response.status(200).json({
        withReusableStages,
        withoutReusableStages,
      })
    } catch (error) {
      console.error("Erro ao buscar dados de estágios reaproveitáveis", error)
      response.status(400).json({ message: "Erro message" })
    }
  }

  async launchesByMonthAndRocket(request, response) {
  const rocketNames = {
    "5e9d0d95eda69955f709d1eb": "Falcon 1",
    "5e9d0d95eda69973a809d1ec": "Falcon 9",
    "5e9d0d95eda69974db09d1ed": "Falcon Heavy",
    "5e9d0d96eda699382d09d1ee": "Starship"
  };

  try {
    const data = await getAllDataFromMongoDB();

    const launchesByMonthAndRocket = {};

    data.forEach((item) => {
      const date = new Date(item.date_utc);
      const year = date.getUTCFullYear();
      const month = date.getUTCMonth() + 1; 
      const rocketId = item.rocket; 

      const rocketName = rocketNames[rocketId] || "Unknown Rocket";

      const key = `${year}-${month}-${rocketName}`;

      if (!launchesByMonthAndRocket[key]) {
        launchesByMonthAndRocket[key] = 0;
      }

      launchesByMonthAndRocket[key]++;
    });

    return response.status(200).json({
      launchesByMonthAndRocket,
    });
  } catch (error) {
    response.status(400).json({ message: "Error Message" });
  }
 }
}


module.exports = LaunchesController
