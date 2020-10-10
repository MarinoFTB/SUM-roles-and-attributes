var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  // Veteran seen as self-visit
  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "Medusa-Gazing"});

  // Increase immunity
  //  ----- rs.prototypes.basicDefense(...arguments);

  // Add killing action
  game.addAction("medusa/stone_visitors", ["retrovisit"], {
    name: "Medusa-Stone-Visitors",
    expiry: 1,
    from: actionable.from,
    to: actionable.from,
    priority: 10
  });

  var medusa = game.getPlayerByIdentifier(actionable.from);

  medusa.misc.gazes_left--;

};

module.exports.TAGS = ["roleblockable", "visit"];
