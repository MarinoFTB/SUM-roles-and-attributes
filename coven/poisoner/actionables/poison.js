var lcn = require("../../../../../source/lcn.js")

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var poisoned = game.getPlayerByIdentifier(actionable.to);
  var poisoner = game.getPlayerByIdentifier(actionable.from);

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "Poisoner-poison"});

  game.addAction("poisoner/poison_kill", ["cycle"], {
    name: "Poison-kill",
    expiry: 3,
    execution: 3,
    from: actionable.from,
    to: actionable.to,
    attack: actionable.target,
    priority: 4,
    tags: ["poison"]
  });

  if (game.period >= 5 && poisoner.hasAttribute("necronomicon")) {
    game.addMessage(poisoned, ":exclamation: You were poisoned! You will die before tomorrow!")

    game.addAction("poisoner/poison_kill", ["cycle"], {
      name: "Poison-kill",
      expiry: 3,
      execution: 3,
      from: actionable.from,
      to: actionable.to,
      attack: actionable.target,
      priority: 4,
      tags: ["incurable-posion"]
    });

    return;
  }

  game.addMessage(poisoned, ":exclamation: You were poisoned last night! You will die from the poison if you are not cured before tomorrow.");

};

module.exports.TAGS = ["drivable", "roleblockable", "visit"];
