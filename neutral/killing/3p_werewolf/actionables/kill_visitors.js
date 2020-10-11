var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var werewolf = game.getPlayerByIdentifier(actionable.from);
  var visitor = game.getPlayerByIdentifier(params.visitor);

  /* For some reason, if the veteran visits self after the
  alert action was sent, it should not go through */

  if (werewolf.identifier === werewolf.identifier) {
    return null;
  };

  // Deal basic attack to anyone
  rs.prototypes.powerfulAttack.reason = "killed by a __Werewolf__";

  // Attack is astral
  var outcome = rs.prototypes.powerfulAttack({from: werewolf.identifier, to: visitor.identifier}, game, params, true);

  if (!outcome) {
    game.addMessage(":exclamation: Someone visited you but they could not be attacked!");
  };

};
