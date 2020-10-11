var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "jugg-attack"});

  var juggernaut = game.getPlayerByIdentifier(actionable.from)
  var target = game.getPlayerByIdentifier(actionable.to)
  var channel = juggernaut.getPrivateChannel();

  if (juggernaut.misc.phase_1 === true) {
    var outcome = rs.prototypes.powerfulAttack({from: juggernaut.identifier, to: target.identifier}, game, params, true);
  } else if (juggernaut.misc.phase_2 === true) {
    var outcome = rs.prototypes.powerfulAttack({from: juggernaut.identifier, to: target.identifier}, game, params, true);
  } else if (juggernaut.misc.phase_3 === true) {
    var outcome = rs.prototypes.powerfulAttack({from: juggernaut.identifier, to: target.identifier}, game, params, true);

    // targets any visitors
    game.addAction("3p_juggernaut/powerfulAtt", ["attacked"], {
      name: "jugg-kill",
      expiry: 1,
      from: actionable.from,
      to: actionable.to
    });
  } else if (juggernaut.misc.phase_4 === true) {
    var outcome = rs.prototypes.unstoppableAttack({from: juggernaut.identifier, to: target.identifier}, game, params, true);

    // targets any visitors
    game.addAction("3p_juggernaut/unstoppableAtt", ["attacked"], {
      name: "jugg-kill",
      expiry: 1,
      from: actionable.from,
      to: actionable.to
    });
  }

  if (outcome) {
    juggernaut.misc.kills++;
    switch (juggernaut.misc.kills) {
      case 1:
        juggernaut.misc.phase_1 = false;
        juggernaut.misc.phase_2 = true;
        juggernaut.game.sendPin(channel, ":star2:  You have gained a new ability! You may now attack every night.")
        break;
      case 2:
        juggernaut.misc.phase_3 = true;
        juggernaut.misc.phase_2 = false;
        juggernaut.game.sendPin(channel, ":star2:  You have gained a new ability! You now Rampage when you attack.")
        break;
      case 3:
        juggernaut.misc.phase_4 = true;
        juggernaut.misc.phase_3 = false;
        juggernaut.game.sendPin(channel, ":star2:  You have gained a new ability! You ignore effects that would protect a player.")
        break;
    }
  }

};

module.exports.TAGS = ["drivable", "roleblockable", "visit"];
