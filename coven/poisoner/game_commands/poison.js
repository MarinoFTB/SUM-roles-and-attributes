// Register heal

var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  // Run checks, etc

  if (params[0] === undefined) {
    message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "poison <alphabet/username/nobody>` instead!");
    return null;
  };

  var to = game.getPlayerMatch(params[0]);
  var from = game.getPlayerById(message.author.id);

  if (to.score < 0.7 || params[0].toLowerCase() === "nobody") {

    actions.delete(x => x.from === from.identifier && x.identifier === "poisoner/poison");

    message.channel.send(":test_tube: You have decided not to poison anyone tonight.");
    return null;
  };

  to = to.player;

  if (!to.isAlive()) {
    message.channel.send(":x: You cannot poison a dead player!" + rs.misc.sarcasm(true));
    return null;
  };

  if (to.id === message.author.id) {

    message.channel.send(":x: You cannot poison yourself!" + rs.misc.sarcasm(true));

    return null;

  } else {

    actions.delete(x => x.from === from.identifier && x.identifier === "poisoner/poison");

    game.addAction("poisoner/poison", ["cycle"], {
      name: "Poisoner-poison",
      expiry: 1,
      from: message.author.id,
      to: to.id
    });

    var mention = to.getDisplayName();

  };

  message.channel.send(":test_tube: You have decided to poison **" + mention + "** tonight.");

  game.addPlayerRoleUsed(from.identifier);

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
