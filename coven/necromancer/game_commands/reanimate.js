var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

const UsedCorpses = new Set();

module.exports = function (game, message, params) {

    var actions = game.actions;
    var config = game.config;

    // Run checks, etc

    var from = game.getPlayerById(message.author.id);
    var coven_roles = game.findAll(x => x.role.alignment === "coven")

    if (params[0] === undefined) {
      message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "reanimate <alphabet/name/nobody> <alphabet/name>` instead!");
      return null;
    };

    actions.delete(x => x.from === from.identifier && x.identifier === "necromancer/reanimate");

    if (coven_roles.identifier) {
      message.channel.send(":x: You cannot reanimate coven members.");
      return null;
    }

    if (UsedCorpses.has(player1)) {
      message.channel.send(":x: You cannot reanimate a dead player twice!" + rs.misc.sarcasm(true));
      return null;
    }

    var player1 = game.getPlayerMatch(params[0]);

    if (player1.score < 0.7 || params[0].toLowerCase() === "nobody") {
      message.channel.send(":zombie: You have decided not to control anyone tonight.");
      return null;
    };

    player1 = player1.player;

    if (params[1] === undefined) {
      message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "reanimate <alphabet/name/nobody> <alphabet/name>` instead!");
      return null;
    };

    var player2 = game.getPlayerMatch(params[1]);

    if (player2.score < 0.7) {
      message.channel.send(":x: Wrong syntax! Please use `" + config["command-prefix"] + "reanimate <alphabet/name/nobody> <alphabet/name>` instead!");
      return null;
    };

    player2 = player2.player;

    if (game.period >= 5 && from.hasAttribute("necronomicon")) {
      if (player1.isAlive() && player1.identifier === from.identifier) {
        game.addAction("necromancer/reanimate", ["cycle"], {
          name: "necromancer-reanimate",
          expiry: 1,
          from: message.author.id,
          to: from.identifier,
          target: player2.identifier
        });

        var p2_name = player2.identifier === from.identifier ? "yourself" : player2.getDisplayName();

        message.channel.send(":zombie: You have decided to summon a ghoul and attack **" + p2_name + "** tonight.");

        game.addPlayerRoleUsed(from.identifier);

        return null;
      };
    }

    if (player1.isAlive() && player1.identifier !== from.identifier) {
      message.channel.send(":x: Your first target has to be dead!");
      return null;
    };

    if (player1.identifier === player2.identifier) {
      message.channel.send(":x: Your targets cannot be the same player!");
      return null;
    };

    game.addAction("necromancer/reanimate", ["cycle"], {
      name: "necromancer-reanimate",
      expiry: 1,
      from: message.author.id,
      to: player1.identifier,
      target: player2.identifier
    });

    var p1_name = player1.identifier === from.identifier ? "yourself" : player1.getDisplayName();
    var p2_name = player2.identifier === from.identifier ? "yourself" : player2.getDisplayName();

    message.channel.send(":zombie: You have decided to reanimate **" + p1_name + "** and use their abilities on **" + p2_name + "** tonight.");

    game.addPlayerRoleUsed(from.identifier);

    UsedCorpses.add(player1);

  };

  module.exports.ALLOW_NONSPECIFIC = false;
  module.exports.PRIVATE_ONLY = true;
  module.exports.DEAD_CANNOT_USE = true;
  module.exports.ALIVE_CANNOT_USE = false;
  module.exports.DISALLOW_DAY = true;
  module.exports.DISALLOW_NIGHT = false;
