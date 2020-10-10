var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var target = game.getPlayerByIdentifier(actionable.to);
  var necromancer = game.getPlayerByIdentifier(actionable.from);

  // Considered as visit to player driven to
  game.execute("visit", {visitor: actionable.from,
    target: actionable.target,
    priority: actionable.priority,
    reason: "CL-visit"});

  var drivables = game.actions.findAll(x => x.tags.includes("drivable") && x.to === actionable.to);

  for (var i = 0; i < drivables.length; i++) {
    drivables[i].to = actionable.target;
  };

  if (game.period >= 5 && necromancer.hasAttribute("necronomicon")) {
    if (target.identifier === necromancer.identifier) {
      var outcome = rs.prototypes.basicAttack({from: necromancer.identifier, to: target.identifier}, game, params, true);
    }
  }

  var player1 = game.getPlayerByIdentifier(actionable.to);
  var player2 = game.getPlayerByIdentifier(actionable.target);

  switch (player1.role_identifier) {
    case "3p_arsonist":
      break;
    case "3p_serial_killer":
      rs.prototypes.basicAttack({from: player1.identifier, to: player2.identifier}, game, params, true);
      break;
    case "medium":
      break;
    case "town_sheriff_cop":
      necromancer.getPrivateChannel().send(target2.getDisplayName() + "'s role is __" + target2.getDisplayRole(true) + "__")
      break;
    case "veteran":
      break;
    case "town_doctor":
      rs.prototypes.removePoison({from: player1.identifier, to: player2.identifier}, game, params, true);
      rs.prototypes.powerfulDefense({from: player1.identifier, to: player2.identifier}, game, params, true);
      break;
    case "town_bodyguard":
      target2.addAttribute("protection", 1, {amount: 1});
      rs.prototypes.basicAttack({from: params.attacker, to: actionable.target}, game, params);
      break;
    case "vigilante":
      rs.prototypes.basicAttack({from: player1.identifier, to: player2.identifier}, game, params, true);
      break;
    case "mafia_goon":
      rs.prototypes.basicAttack({from: player1.identifier, to: player2.identifier}, game, params, true);
      break;
    case "mafia_godfather":
      rs.prototypes.basicAttack({from: player1.identifier, to: player2.identifier}, game, params, true);
      break;
    case "consigliere":
      necromancer.getPrivateChannel().send(target2.getDisplayName() + "'s role is __" + target2.getDisplayRole(true) + "__")
      break;
    case "consort":
      break;
  }

};

module.exports.TAGS = ["visit"];
