var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "Survivor-self-visit"});

  var survivor = game.getPlayerByIdentifier(actionable.from);

  // protection
  survivor.addAttribute("protection", 1, {amount: 1})

  survivor.misc.vests--;

};

module.exports.TAGS = ["roleblockable", "visit"];
