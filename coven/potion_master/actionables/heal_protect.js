var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  rs.prototypes.powerfulDefense(...arguments);
  var poisoned = rs.prototypes.removePoison(...arguments);

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "Doctor-visit"});

  var from = game.getPlayerByIdentifier(actionable.from);
  var to = game.getPlayerByIdentifier(actionable.to);

  if (poisoned) {

    if (from.identifier === to.identifier) {

      game.addMessage(":exclamation: You cured yourself of poison!");

    } else {

      game.addMessage(to, ":exclamation: You were cured of poison!");

    };

  };

  from.misc.healing_potion--;

};

module.exports.TAGS = ["drivable", "roleblockable", "visit"];
