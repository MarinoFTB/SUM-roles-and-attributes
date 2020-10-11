var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

module.exports = function (actionable, game, params) {

  rs.prototypes.unstoppableAttack({from: actionable.from, to: params.attacker}, game, params);

};
