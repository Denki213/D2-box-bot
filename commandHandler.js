const fs = require("fs");
const path = require("path");

module.exports = (api, event, prefix) => {
  const message = event.body;
  const args = message.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  const commandsPath = path.join(__dirname, "cmd");
  const commandFile = path.join(commandsPath, `${command}.js`);

  if (fs.existsSync(commandFile)) {
    const executeCommand = require(commandFile);
    executeCommand(api, event, args);
  } else {
    api.sendMessage("Commande inconnues !", event.threadID);
  }
};