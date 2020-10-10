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

  //if (game.period === 5) {
    //player.setGameStat("detection-immunity", 1, "set")

    //channel.send(':performing_arts: Necronomicon has been activated! You have gained **Detection Immunity** and a **Basic Attack** on each hex.')
  //}

  player.game.sendPeriodPin(channel, ":cross: You may choose to hex a player tonight.\n\nUse `" + config["command-prefix"] + "hex <alphabet/name/nobody>` to select your target.");

  player.game.addAction("hex_master/hex_report", ["cycle"], {
    name: "hm-hex-report",
    expiry: 1,
    from: player,
    to: player,
    priority: 100
  });

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
