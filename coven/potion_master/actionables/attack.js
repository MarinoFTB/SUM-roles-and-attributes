var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  rs.prototypes.basicAttack.reason = "killed by a mysterious potion.";

  var outcome = rs.prototypes.basicAttack(...arguments);

  if (!outcome) {
    var from = game.getPlayerByIdentifier(actionable.from);
    var to = game.getPlayerByIdentifier(actionable.to);

    game.addMessage(from, ":exclamation: Your target could not be attacked last night!");

  };

  var potion_master = getPlayerByIdentifier(actionable.from)

  potion_master.misc.attack_potion--;

};

// Traits are compared with the stats before executing
module.exports.TAGS = ["drivable", "roleblockable", "visit"];
