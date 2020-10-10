var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

var responses = {
    neutral: ":mag: Your target is a __Neutral__. Their role is **{;role}**.",
    cult: ":mag: Your target belongs to the __Cult__. Their role is **{;role}**.",
    mafia: ":mag: Your target is a member of the __Mafia__. Their role is **{;role}**.",
    town: ":mag: Your target appears to be part of the __Town__. Their role is **{;role}**.",

    role: ":mag: Your target's role is **{;role}**."
}

module.exports = function (actionable, game, params) {

  game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "PK-reveal"});

  var from = game.getPlayerByIdentifier(actionable.from);
  var to = game.getPlayerByIdentifier(actionable.to);

  if (to.role["reveal-role-on-interrogation"] === true) {
    var response = responses["role"].replace(new RegExp("{;role}", "g"), to.getDisplayRole(true));
    game.addMessage(from, response);
  } else {
    var response = responses[to.role.alignment];

    response = (response ? response : responses["town"]).replace(new RegExp("{;role}", "g"), to.getDisplayRole(true));

    game.addMessage(from, response);
  };

  from.misc.revealing_potion--;

};

module.exports.TAGS = ["drivable", "roleblockable", "visit"];
