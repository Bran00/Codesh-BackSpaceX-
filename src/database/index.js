const { MongoClient, ServerApiVersion } = require("mongodb")

require("dotenv/config")

const password = process.env.PASSWORD
const uri = `mongodb+srv://brandorocha00:${password}@cluster0.idrd4na.mongodb.net/?retryWrites=true&w=majority`

async function storeDataInMongoDB(data) {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  try {
    await client.connect()
    const database = client.db("Cluster0")
    const collection = database.collection("testCol")
    const docCount = await collection.countDocuments({})

    await collection.deleteMany({})
    await collection.insertMany(data.results)

    console.log("Dados armazenados com sucesso no MongoDB!")
  } catch (error) {
    console.error("Erro ao armazenar dados no MongoDB:", error)
  } finally {
    await client.close()
  }
}

async function getAllDataFromMongoDB() {
  const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  })

  try {
    await client.connect()
    const database = client.db("Cluster0")
    const collection = database.collection("testCol")

    const allData = await collection.find({}).toArray()

    return allData
  } catch (error) {
    console.error("Erro ao buscar dados do MongoDB:", error)
    throw error
  } finally {
    await client.close()
  }
}

module.exports = {
  storeDataInMongoDB,
  getAllDataFromMongoDB,
}
