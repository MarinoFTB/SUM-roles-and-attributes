module.exports = async function (game) {

    // big ass shit for coven
    let coven_roles = ["coven_leader", "hex_master", "poisoner", "necromancer", "medusa", "potion_master"]

    var coven = game.findAll(x => x.role.alignment === "coven" && !x.isAlive());

    var coven_leader = game.find(x => x.role_identifier === "coven_leader" && x.isAlive())
    var coven_leader_dead = game.find(x => x.role_identifier === "coven_leader" && !x.isAlive())

    var hex_master = game.find(x => x.role_identifier === "hex_master" && x.isAlive())
    var hex_master_dead = game.find(x => x.role_identifier === "hex_master" && !x.isAlive())

    var poisoner = game.find(x => x.role_identifier === "poisoner" && x.isAlive())
    var poisoner_dead = game.find(x => x.role_identifier === "poisoner" && !x.isAlive())

    var necromancer = game.find(x => x.role_identifier === "necromancer" && x.isAlive())
    var necromancer_dead = game.find(x => x.role_identifier === "necromancer" && !x.isAlive())

    var medusa = game.find(x => x.role_identifier === "medusa" && x.isAlive())
    var medusa_dead = game.find(x => x.role_identifier === "medusa" && !x.isAlive())

    var potion_master = game.find(x => x.role_identifier === "potion_master" && x.isAlive())
    var potion_master_dead = game.find(x => x.role_identifier === "potion_master" && !x.isAlive())

    if (coven) {
      return;
    }

    // This is bad coding, reworked soon.
    if (coven_leader && coven_leader.hasAttribute("necronomicon")) {
      return null;
    }

    if (hex_master && hex_master.hasAttribute("necronomicon")) {
      return null;
    }

    if (poisoner && poisoner.hasAttribute("necronomicon")) {
      return null;
    }

    if (necromancer && necromancer.hasAttribute("necronomicon")) {
      return null;
    }

    if (medusa && medusa.hasAttribute("necronomicon")) {
      return null;
    }

    if (potion_master && potion_master.hasAttribute("necronomicon")) {
      return null;
    }

    //

    var randomize = Math.floor(Math.random() * coven_roles.length)

    if (game.period === 5) {
      switch (coven_roles[randomize]) {
        case "hex_master":
          if (poisoner.hasAttribute("necronomicon")) {
            return null;
          }
          hex_master.addAttribute("necronomicon", Infinity, {amount: 1})
          break;
        case "poisoner":
          if (poisoner.hasAttribute("necronomicon")) {
            return null;
          }
          poisoner.addAttribute("necronomicon", Infinity, {amount: 1})
          break;
        case "medusa":
          if (poisoner.hasAttribute("necronomicon")) {
            return null;
          }
          medusa.addAttribute("necronomicon", Infinity, {amount: 1})
          break;
        case "potion_master":
          if (potion_master.hasAttribute("necronomicon")) {
            return null;
          }
          potion_master.addAttribute("necronomicon", Infinity, {amount: 1})
          break;
        case "necromancer":
          if (necromancer.hasAttribute("necronomicon")) {
            return null;
          }
          necromancer.addAttribute("necronomicon", Infinity, {amount: 1})
          break;
        default:
          console.log(coven_roles[randomize])
      }
    }

  };
