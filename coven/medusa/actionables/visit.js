var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var medusa = game.getPlayerByIdentifier(actionable.from);
  var visited = game.getPlayerByIdentifier(actionable.to);

  /* For some reason, if the veteran visits self after the
  alert action was sent, it should not go through */

  if (medusa.identifier === visited.identifier) {
    return null;
  };

  // Deal basic attack to anyone
  rs.prototypes.powerfulAttack.reason = "stoned";
  // Clean role
  visited.misc.role_stoned = true;
  visited.setDisplayRole("Stoned")
  visited.setPrecedentWill(null)

  // Attack is astral
  rs.prototypes.powerfulAttack({from: medusa.identifier, to: visited.identifier}, game, params, true);

};
