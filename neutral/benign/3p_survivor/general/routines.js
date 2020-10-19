// Routines
// Runs every cycle

// Function should be synchronous

var lcn = require("../../../../../source/lcn.js");

var auxils = lcn.auxils;
var rs = lcn.rolesystem;

module.exports = function (player) {

  var config = player.game.config;

  // Nighttime actions
  var channel = player.getPrivateChannel();

  if (player.misc.vests > 0) {
    player.game.sendPeriodPin(channel, ":safety_vest:  You may choose to use a vest tonight.\n\nYou have __" + player.misc.vests + "__ vest" + auxils.vocab("s", player.misc.vests) + " left.\n\nUse `" + config["command-prefix"] + "vest` to use a vest and `" + config["command-prefix"] + "deselect` to choose not to use a vest.")
  } else {
    player.game.sendPeriodPin(channel, ":safety_vest:  You have used up all your vests.");
  };

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
