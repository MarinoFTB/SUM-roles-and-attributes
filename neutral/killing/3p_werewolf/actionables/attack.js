var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

var auxils = lcn.auxils;

module.exports = function (actionable, game, params) {

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "WW-attack"});

  var werewolf = game.getPlayerByIdentifier(actionable.from);
  var visit_log = game.actions.visit_log

  var outcome = rs.prototypes.powerfulAttack(...arguments);

  // targets any visitors
  game.addAction("3p_werewolf/powerfulAtt", ["attacked"], {
    name: "WW-kill",
    expiry: 1,
    from: actionable.from,
    to: actionable.to
  });

};

module.exports.TAGS = ["drivable", "roleblockable", "visit"];
