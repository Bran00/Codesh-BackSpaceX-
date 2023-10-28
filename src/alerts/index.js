require("dotenv/config")

const accountSid = process.env.SID
const authToken = process.env.TOKEN
const client = require("twilio")(accountSid, authToken)
const phoneTwi = process.env.PHONETWI
const myPhone = process.env.MYPHONE

const sendSmsAlert = (message) => { 
  console.log(message)
  client.messages
    .create({
      body: `Alerta de erro: ${message}`,
      from: phoneTwi,
      to: myPhone, 
    })
    .then((message) => console.log(`Mensagem SMS enviada: ${message.sid}`))
    .catch((error) => console.error("Erro ao enviar SMS:", error))
}

module.exports = sendSmsAlert