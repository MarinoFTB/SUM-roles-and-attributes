// Routines
// Runs every cycle

// Function should be synchronous

var lcn = require("../../../../../source/lcn.js");

var auxils = lcn.auxils;

module.exports = function (player) {

  var config = player.game.config;
  var game = player.game;

  // Nighttime actions
  var channel = player.getPrivateChannel();

  //if (game.period === 5) {
    //player.setGameStat("detection-immunity", 1, "set")
    //player.misc.gazes_left = Infinity,
    //channel.send(':performing_arts: Necronomicon has been activated! You have gained **Detection Immunity** And **Infinite Gazes**')
  //}

  if (game.period >= 5 && player.hasAttribute("necronomicon")) {
    player.game.sendPeriodPin(channel, ":moyai: You may choose to visit a player tonight. Use `" + config["command-prefix"] + "visit <alphabet/name/nobody` to visit a player.")
    player.game.sendPeriodPin(channel, ":moyai: You may choose to stone gaze tonight.\n\nYou have __" + player.misc.gazes_left + "__ gaze" + auxils.vocab("s", player.misc.gazes_left) + " left.\n\nUse `" + config["command-prefix"] + "stone` to stone gaze any visitors and `" + config["command-prefix"] + "deselect` to choose not to stone gaze.")
  } else {
    if (player.misc.gazes_left > 0) {
      player.game.sendPeriodPin(channel, ":moyai: You may choose to stone gaze tonight.\n\nYou have __" + player.misc.gazes_left + "__ gaze" + auxils.vocab("s", player.misc.gazes_left) + " left.\n\nUse `" + config["command-prefix"] + "stone` to stone gaze any visitors and `" + config["command-prefix"] + "deselect` to choose not to stone gaze.")
    } else {
      player.game.sendPeriodPin(channel, ":x: You have used up all your gazes.");
    };
  }

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
