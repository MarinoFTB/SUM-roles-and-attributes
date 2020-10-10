// Routines
// Runs every cycle

// Function should be synchronous

var lcn = require("../../../../../source/lcn.js");

var auxils = lcn.auxils;
var rs = lcn.rolesystem;

module.exports = function (player) {

  var config = player.game.config;
  var game = player.game;

  // Nighttime actions
  var channel = player.getPrivateChannel();

  if (game.period === 5) {
    player.getPrivateChannel().send(":performing_arts:  Necronomicon has been activated! You can now deal a basic attack on the first person you control.")
    player.setGameStat("detection-immunity", 1, "set")
    player.setGameStat("basic-defense", 1, "set")
  }

  player.game.sendPeriodPin(channel, ":woman_mage: You may choose to control a player tonight.\n" + "\nUse `" + config["command-prefix"] + "control <alphabet/name/nobody> <alphabet/name>` to select your target.");

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
