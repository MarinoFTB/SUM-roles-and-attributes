var lcn = require("../../../source/lcn.js")

var auxils = lcn.auxils;

module.exports = function (game) {

  var alive = game.findAll(x => x.isAlive());
  var juggernaut = game.findAll(x => x.role_identifier === "3p_juggernaut" && x.isAlive());

  if (juggernaut.length >= (alive.length / 2) && juggernaut.length == 1) {

    var winners = juggernaut.filter(x => x.canWin());

    game.setWins(winners);
    game.getMainChannel().send(auxils.getAssetAttachment("juggernaut-wins.png"));
    game.primeWinLog("juggernaut", "Wearing a half-smile as an expression, the Arsonist has burned the Town into oblivion.");

    /* Return true to stop the game/checks
    depending on the configuration below. */

    return true;

  };

  /* Return true to stop the game/checks
  depending on the configuration below. */

  return true;

};

module.exports.STOP_GAME = true;
module.exports.STOP_CHECKS = false;

module.exports.FACTIONAL = false;

module.exports.PRIORITY = 1;
module.exports.CHECK_ONLY_WHEN_GAME_ENDS = false;

// Accepts function
// Should key in wrt to player
module.exports.ELIMINATED = ["mafia", "coven", "town", "3p_serial_killer", "3p_werewolf", "3p_arsonist"];
module.exports.SURVIVING = ["3p_juggernaut"];

module.exports.PREVENT_CHECK_ON_WIN = [];

module.exports.DESCRIPTION = "Kill everyone who can oppose you.";
