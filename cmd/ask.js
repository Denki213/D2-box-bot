const axios = require("axios");
require("dotenv").config();

module.exports = async (api, event, args) => {
  const userName = event.senderName || "Utilisateur";
  const question = args.join(" ");

  if (!question) {
    return api.sendMessage("Veuillez poser une question après la commande DX.", event.threadID);
  }

  try {
    const response = await axios.post(process.env.API_URL, {
      question: question,
      apiKey: process.env.API_KEY
    });

    const apiResponse = response.data.answer || "Je n'ai pas pu trouver une réponse à votre question.";
    const reply = `Salut ${userName}, voilà la réponse à votre question : "${question}"

${apiResponse}`;
    api.sendMessage(reply, event.threadID);
  } catch (error) {
    console.error("Erreur lors de l'appel à l'API :", error);
    api.sendMessage("Désolé, une erreur s'est produite lors de la récupération de la réponse.", event.threadID);
  }
};
