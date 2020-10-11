var lcn = require("../../../source/lcn.js")

var auxils = lcn.auxils;

module.exports = function (game) {

  var alive = game.findAll(x => x.isAlive());
  var arsonist = game.findAll(x => x.role_identifier === "3p_arsonist" && x.isAlive());

  if (arsonist.length >= (alive.length / 2) && arsonist.length == 1) {

    var winners = arsonist.filter(x => x.canWin());

    game.setWins(winners);
    game.getMainChannel().send(auxils.getAssetAttachment("arsonist-wins.png"));
    game.primeWinLog("arsonist", "Wearing a half-smile as an expression, the Arsonist has burned the Town into oblivion.");

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
module.exports.ELIMINATED = ["mafia", "coven", "town", "3p_serial_killer"];
module.exports.SURVIVING = ["3p_arsonist"];

module.exports.PREVENT_CHECK_ON_WIN = [];

module.exports.DESCRIPTION = "Kill everyone who can oppose you.";
