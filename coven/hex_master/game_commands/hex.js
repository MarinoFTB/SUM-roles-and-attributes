var lcn = require("../../../../../source/lcn.js");

// Register heal

var rs = lcn.rolesystem;

module.exports = function (game, message, params) {

  var actions = game.actions;
  var config = game.config;

  // Run checks, etc

  if (params[0] === undefined) {
    message.channel.send(":x:  Wrong syntax! Please use `" + config["command-prefix"] + "hex <alphabet/username/nobody>` instead!");
    return null;
  };

  var to = game.getPlayerMatch(params[0]);
  var from = game.getPlayerById(message.author.id);

  if (to.score < 0.7 || params[0].toLowerCase() === "nobody") {

    actions.delete(x => x.from === from.identifier && x.identifier === "hex_master/hex");

    message.channel.send(":cross:  You have now selected to not to hex anyone tonight.");

    game.addPlayerRoleUsed(from.identifier);
    return null;
  };

  to = to.player;

  if (!to.isAlive()) {
    message.channel.send(":x:  You cannot hex a dead player!");
    return null;
  };

  if (to.id === message.author.id) {

    message.channel.send(":x:  You cannot hex yourself!");

    return null;

  } else {

    actions.delete(x => x.from === from.identifier && x.identifier === "hex_master/hex");

    game.addAction("hex_master/hex", ["cycle"], {
      name: "hm-hex",
      expiry: 1,
      from: message.author.id,
      to: to.id,
      priority: 1
    });

    var mention = to.getDisplayName();

  };

  var extra_display = ""
  if (to.misc.infected == true) {
    var extra_display = ", despite him __already being hexed__";
  }

  message.channel.send(":cross:  You have now selected to hex **" + mention + "** tonight" + extra_display + ".");

  game.addPlayerRoleUsed(from.identifier);

};

module.exports.ALLOW_NONSPECIFIC = false;
module.exports.PRIVATE_ONLY = true;
module.exports.DEAD_CANNOT_USE = true;
module.exports.ALIVE_CANNOT_USE = false;
module.exports.DISALLOW_DAY = true;
module.exports.DISALLOW_NIGHT = false;
