var lcn = require("../../../../../source/lcn.js");

// Routines
// Runs every cycle

// Function should be synchronous

var auxils = lcn.auxils;

module.exports = function (player) {

  var config = player.game.config;
  var game = player.game;

  // Nighttime actions
  var channel = player.getPrivateChannel();

  if (game.period === 3) {
    player.game.sendPeriodPin(channel, ":dagger: You may choose to kill a player tonight.\n\nUse `" + config["command-prefix"] + "kill <alphabet/name/nobody>` to select your target.")
  } else if (game.period === 5) {
    if (player.misc.phase_2 === true) {
      player.game.sendPeriodPin(channel, ":dagger: You may choose to kill a player tonight.\n\nUse `" + config["command-prefix"] + "kill <alphabet/name/nobody>` to select your target.")
    }
  } else if (game.period >= 7) {
    player.game.sendPeriodPin(channel, ":dagger: You may choose to kill a player tonight.\n\nUse `" + config["command-prefix"] + "kill <alphabet/name/nobody>` to select your target.")
  }

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
