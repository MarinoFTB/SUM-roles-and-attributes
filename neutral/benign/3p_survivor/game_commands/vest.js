// Register heal

var lcn = require("../../../../../source/lcn.js");
var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  var from = game.getPlayerById(message.author.id);

  if (from.misc.vests < 1) {
    message.channel.send(":x: You do not have any vests left!");
    return null;
  };

  var already_vest = actions.exists(x => x.from === from.identifier && x.identifier === "3p_survivor/vest");

  if (already_vest) {
    message.channel.send(":x: You have already decided to use a vest tonight! Use `" + config["command-prefix"] + "deselect` to not use a vest tonight!");
    return null;
  };

  message.channel.send(":safety_vest:  You have decided to use a vest tonight.");

  game.addPlayerRoleUsed(from.identifier);

  game.addAction("3p_survivor/vest", ["cycle"], {
    name: "Survivor-vest",
    expiry: 1,
    from: message.author.id,
    to: message.author.id
  });

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
