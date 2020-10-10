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


  //if (game.period === 5) {
    //player.setGameStat("detection-immunity", 1, "set")

    //channel.send(':performing_arts: Necronomicon has been activated! You have gained **Detection Immunity**')
  //}

  if (game.period >= 5 && player.hasAttribute("necronomicon")) {
    player.game.sendPeriodPin(channel, ":zombie: You may choose to control a player or summon a ghoul by controlling yourself tonight.\n" + "\nUse `" + config["command-prefix"] + "reanimate <alphabet/name/nobody> <alphabet/name>` to select your target.");
  } else {
    player.game.sendPeriodPin(channel, ":zombie: You may choose to control a player tonight.\n" + "\nUse `" + config["command-prefix"] + "reanimate <alphabet/name/nobody> <alphabet/name>` to select your target.");
  }

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
