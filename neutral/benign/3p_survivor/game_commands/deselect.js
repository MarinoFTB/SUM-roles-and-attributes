// Register heal

var lcn = require("../../../../../source/lcn.js");
var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  var from = game.getPlayerById(message.author.id);

  var already_alerting = actions.exists(x => x.from === from.identifier && x.identifier === "3p_survivor/vest");

  if (!already_alerting) {
    message.channel.send(":x: You have already decided not to use a vest tonight. Use `" + config["command-prefix"] + "vest` to choose to use a vest!");
    return null;
  };

  actions.delete(x => x.from === from.identifier && x.identifier === "3p_survivor/vest");

  message.channel.send(":safety_vest:  You have decided not to use a vest tonight.");

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
