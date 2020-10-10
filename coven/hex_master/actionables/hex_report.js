var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  var hex_master = game.getPlayerByIdentifier(actionable.from);
  var not_coven = game.findAll(x => x.isAlive() && x.role_identifier !== "hex_master" && x.role_identifier !== "coven_leader" && x.role_identifier !== "necromancer" && x.role_identifier !== "medusa" && x.role_identifier !== "poisoner" && x.role_identifier !== "potion_master")

  var players_hexed = 0;

  var hexed = "";
  var not_hexed = "";

  for (var i = 0; i < not_coven.length; i++) {
    if (not_coven[i].misc.hexed) {
      players_hexed++;

      hexed = hexed + "\n" + not_coven[i].getDisplayName();
    } else {
      not_hexed = not_hexed + "\n" + not_coven[i].getDisplayName();
    }
  };

  if (players_hexed == not_coven.length) {

    rs.prototypes.unstoppableAttack({from: hex_master.identifier, to: hexed.identifier}, game, params, true)

    if (!hex_master.isAlive()) {
      rs.prototypes.unstoppableAttack({from: hex_master.identifier, to: hexed.identifier}, game, params, true)
    }

  } else {

    var display = "There are **" + players_hexed + "**/**" + not_coven.length + "** players hexed:\n```md\n< Hexed >\n" + hexed + "\n\n< Not Hexed >" + not_hexed + "\n```";

    game.addMessage(hex_master, display);

  };

};
