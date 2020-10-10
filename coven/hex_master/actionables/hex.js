var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;
var auxils = lcn.auxils;

module.exports = function (actionable, game, params) {

  var target = game.getPlayerByIdentifier(actionable.to);
  var hex_master = game.getPlayerByIdentifier(actionable.from)

  // Visit the target
  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "hm-hex"}
  );

  if (game.period >= 5 && hex_master.hasAttribute("necronomicon")) {
    rs.prototypes.basicAttack({from: hex_master.identifier, to: target.identifier}, game, params, true)
  }

  target.misc.hexed = true;

};

module.exports.TAGS = ["roleblockable", "drivable", "visit"];
