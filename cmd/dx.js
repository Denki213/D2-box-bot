module.exports = (api, event, args) => {
  api.sendMessage("Salut !", event.threadID);
};
