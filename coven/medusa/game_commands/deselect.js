// Register heal

var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  var from = game.getPlayerById(message.author.id);

  var already_alerting = actions.exists(x => x.from === from.identifier && x.identifier === "medusa/gazing");

  if (!already_alerting) {
    message.channel.send(":x: You have already decided not to stone gaze tonight. Use `" + config["command-prefix"] + "stone` to choose to stone gaze visitors!");
    return null;
  };

  actions.delete(x => x.from === from.identifier && x.identifier === "medusa/gazing");

  message.channel.send(":cloud: You have decided not to stone gaze tonight.");

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
