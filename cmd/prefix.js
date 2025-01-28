module.exports = (api, event, args) => {
  const config = require("../account.json");
  api.sendMessage(`Le prefix actuel est "${config.prefix}"`, event.threadID);
};
