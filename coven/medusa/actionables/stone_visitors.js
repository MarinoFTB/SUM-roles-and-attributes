var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var medusa = game.getPlayerByIdentifier(actionable.from);
  var visitor = game.getPlayerByIdentifier(params.visitor);

  /* For some reason, if the veteran visits self after the
  alert action was sent, it should not go through */

  if (medusa.identifier === visitor.identifier) {
    return null;
  };

  // Deal basic attack to anyone
  rs.prototypes.powerfulAttack.reason = "stoned";
  // Clean role
  visitor.misc.role_stoned = true;
  visitor.setDisplayRole("Stoned")
  visitor.setPrecedentWill(null)

  // Attack is astral
  var outcome = rs.prototypes.powerfulAttack({from: medusa.identifier, to: visitor.identifier}, game, params, true);

  if (!outcome) {
    game.addMessage(":exclamation: Someone visited you but they could not be stoned!");
  };

};
