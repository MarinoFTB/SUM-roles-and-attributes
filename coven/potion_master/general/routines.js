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
    //player.misc.healing_potion = Infinity;
    //player.misc.revealing_potion = Infinity;
    //player.misc.attack_potion = Infinity;
    //channel.send(':performing_arts: Necronomicon has been activated! You have gained **Detection Immunity** and **Infinite Potions** (all)')
  //}

  player.game.sendPeriodPin(channel, ":alembic: You may choose to heal/reveal/attack a player tonight.\n\nYou have: \n\n**" + player.misc.healing_potion + "** healing potion" + auxils.vocab("s", player.misc.healing_potion) +" left.\n\n**" + player.misc.revealing_potion + "** revealing potion" + auxils.vocab("s", player.misc.revealing_potion) + " left.\n\n**" + player.misc.attack_potion + "** attack potion" + auxils.vocab("s", player.misc.attack_potion) + "left."  + "\n\nUse `" + config["command-prefix"] + "heal/reveal/attack <alphabet/name/nobody>` to select your target.");

};

module.exports.ALLOW_DEAD = false;
module.exports.ALLOW_NIGHT = true;
module.exports.ALLOW_DAY = false;
