var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  // Run checks, etc

  var from = game.getPlayerById(message.author.id);

  if (game.period === 5 || game.period === 1) {
    if (from.misc.phase_1 === true) {
      message.channel.send(":x:  It's not a full moon!")
      return;
    }
  }

  if (params[0] === undefined) {
    message.channel.send(":x:  Wrong syntax! Please use `" + config["command-prefix"] + "kill <alphabet/username/nobody>` instead!");
    return null;
  };

  var to = game.getPlayerMatch(params[0]);

  if (to.score < 0.7 || params[0].toLowerCase() === "nobody") {

    actions.delete(x => x.from === from.identifier && x.identifier === "3p_juggernaut/kill");

    message.channel.send(":knife:  You have now selected to not kill anyone tonight.");
    return null;
  };

  to = to.player;

  if (!to.isAlive()) {
    message.channel.send(":x:  You cannot kill a dead player!");
    return null;
  };

  if (to.id === message.author.id) {

    message.channel.send(":x:  You cannot kill yourself!");

    return null;

  } else {

    actions.delete(x => x.from === from.identifier && x.identifier === "3p_juggernaut/kill");

    game.addAction("3p_juggernaut/kill", ["cycle"], {
      name: "jugg-kill",
      expiry: 1,
      from: message.author.id,
      to: to.id
    });

    var mention = to.getDisplayName();

  };

  message.channel.send(":knife:  You have now selected to kill **" + mention + "** tonight.");

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
