const fs = require("fs");
const login = require("facebook-chat-api");
const commandHandler = require("./commandHandler");
require("dotenv").config();

const config = JSON.parse(fs.readFileSync("account.json", "utf8"));
const prefix = config.prefix;

login({ email: config.email, password: config.password }, (err, api) => {
  if (err) return console.error("Erreur de connexion :", err);

  console.log("Bot connecter !");
  api.setOptions({ listenEvents: true });

  api.listen((err, event) => {
    if (err) return console.error(err);

    if (event.type === "message") {
      const message = event.body;

      if (message.startsWith(prefix)) {
        commandHandler(api, event, prefix);
      } else if (message.toLowerCase() === "prefix") {

        api.sendMessage(`Mon prefix est "${prefix}"`, event.threadID);
      }
    }
  });
});