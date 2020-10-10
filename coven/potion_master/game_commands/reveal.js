var lcn = require("../../../../../source/lcn.js");

// Register heal

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  // Run checks, etc

  if (params[0] === undefined) {
    message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "reveal <alphabet/username/nobody>` instead!");
    return null;
  };

  var to = game.getPlayerMatch(params[0]);
  var from = game.getPlayerById(message.author.id);

  actions.delete(x => x.from === from.identifier && x.identifier === "potion_master/reveal");

  if (to.score < 0.7 || params[0].toLowerCase() === "nobody") {
    message.channel.send(":notepad_spiral: You have decided to reveal nobodys role.");
    return null;
  };

  to = to.player;

  if (!to.isAlive()) {
    message.channel.send(":x: You cannot reveal a dead players role!" + rs.misc.sarcasm(true));
    return null;
  };

  if (to.id === message.author.id) {
    message.channel.send(":x: You cannot reveal your role to yourself!" + rs.misc.sarcasm(true));
    return null;
  };

  game.addAction("potion_master/reveal", ["cycle"], {
    name: "PK-reveal",
    expiry: 1,
    from: message.author.id,
    to: to.id
  });

  var mention = to.getDisplayName();

  message.channel.send(":notepad_spiral: You have decided to reveal **" + mention + "**'s role.");

  game.addPlayerRoleUsed(from.identifier);

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
