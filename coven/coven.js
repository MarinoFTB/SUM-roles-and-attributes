var lcn = require("../../../source/lcn.js")

var auxils = lcn.auxils;

module.exports = function (game) {

  var winners = game.findAll(x => x.role.alignment === "coven" && x.canWin());

  game.setWins(winners);
  game.getMainChannel().send(auxils.getAssetAttachment("coven-wins.png"));
  game.primeWinLog("coven", "The Coven has successfully eliminated all threats to itself.");

  return true;

};

module.exports.STOP_GAME = true;
module.exports.STOP_CHECKS = false;

module.exports.FACTIONAL = true;

module.exports.PRIORITY = 10;
module.exports.CHECK_ONLY_WHEN_GAME_ENDS = false;

// Accepts function
// Should key in wrt to player
module.exports.ELIMINATED = ["mafia", "town", "vampires", "3p_serial_killer", "3p_arsonist", "3p_werewolf", "3p_plaguebearer", "3p_pestilence", "3p_juggernaut"];
module.exports.SURVIVING = ["coven"];

module.exports.PREVENT_CHECK_ON_WIN = [];

module.exports.DESCRIPTION = "Destroy anybody who would not submit to the Mafia.";
