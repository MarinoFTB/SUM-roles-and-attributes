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

  if (game.period === 3 || game.period >= 7) {
    player.game.sendPeriodPin(channel, ":wolf: You may choose to transform and kill a player tonight.\n\nUse `" + config["command-prefix"] + "attack <alphabet/name/nobody>` to select your target.")
  }

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
