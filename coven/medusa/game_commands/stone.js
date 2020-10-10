// Register heal

var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  var from = game.getPlayerById(message.author.id);

  if (from.misc.gazes_left < 1) {
    message.channel.send(":x: You do not have any Stone Gazes left!");
    return null;
  };

  var already_gazing = actions.exists(x => x.from === from.identifier && x.identifier === "medusa/gazing");

  if (already_gazing) {
    message.channel.send(":x: You have already decided to stone tonight! Use `" + config["command-prefix"] + "deselect` to not stone tonight!");
    return null;
  };

  message.channel.send(":moyai: You have decided to stone any visitors tonight.");

  game.addAction("medusa/gazing", ["cycle"], {
    name: "Medusa-Gazing",
    expiry: 1,
    from: message.author.id,
    to: message.author.id
  });

  game.addPlayerRoleUsed(from.identifier);

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
