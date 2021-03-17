var lcn = require("../../../../../source/lcn.js");

var rs = lcn.rolesystem;

var auxils= lcn.auxils;

module.exports = function(actionable, game, params) {
    game.execute("visit", {visitor: actionable.from,
    target: actionable.to,
    priority: actionable.priority,
    reason: "Hypnotist-hypnotise"});

    var hypnotist = game.getPlayerByIdentifier(actionable.from)
    var target = game.getPlayerByIdentifier(actionable.to)

    var channel = game.getPrivateChannel(target.identifier)
    var channel1 = game.getPrivateChannel(hypnotist.identifier)

    game.sendMessage(channel1, "1️⃣ You were transported to another location.\n2️⃣ Someone occupied your night. You were role blocked!\n3️⃣ You were attacked but someone fought off your attacker!\n4️⃣ You were attacked but someone nursed you back to health!\n5️⃣ You feel a mystical power dominating you. You were controlled by a Witch!\n6️⃣ You were poisoned. You will die tomorrow!\n7️⃣ You were attacked but someone protected you!\n8️⃣ You were poisoned but someone nursed you back to health!\n9️⃣ Someone tried to poison you but someone fought off your attacker!\n🔟 You triggered a trap!\n️#️⃣ You were attacked but a trap saved you!\n*️⃣ A trap attacked you but someone nursed you back to health!")

    message.react('1️⃣')
        .then(() => message.react('2️⃣')
        .then(() => message.react('3️⃣'))
        .then(() => message.react('4️⃣'))
        .then(() => message.react('5️⃣'))
        .then(() => message.react('6️⃣'))
        .then(() => message.react('7️⃣'))
        .then(() => message.react('8️⃣'))
        .then(() => message.react('9️⃣'))
        .then(() => message.react('🔟'))
        .then(() => message.react('️️#️⃣'))
        .then(() => message.react('*️⃣'))
    );

    const filter = (reaction, user) => {
        return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '#️⃣', '*️⃣'].includes(reaction.emoji.name) && user.id === message.author.id;
    };

    message.awaitReactions(filter, {max: 1, time: 60000, errors: ['time'] }).then(collected => {
        const reaction = collected.first();

        switch (reaction.emoji.name) {
            case '1️⃣':
                message_selection = "You were transported to another location."
                message.delete()
                break;
            case '2️⃣':
                message_selection = "Someone occupied your night. You were role blocked!"
                message.delete()
                break;
        
            case '3️⃣':
                message_selection = "You were attacked but someone fought off your attacker!"
                message.delete()
                break;
                
            case '4️⃣':
                message_selection = "You were attacked but someone nursed you back to health!"
                message.delete()
                break;
                
            case '5️⃣':
                message_selection = "You feel a mystical power dominating you. You were controlled by a Witch!"
                message.delete()
                break;
            
            case '6️⃣':
                message_selection = "You were poisoned. You will die tomorrow!"
                message.delete()
                break;
            
            case '7️⃣':
                message_selection = "You were attacked but someone protected you!"
                message.delete()
                break;
            
            case '8️⃣':
                message_selection = "You were poisoned but someone nursed you back to health!"
                message.delete()
                break;
            
            case '9️⃣':
                message_selection = "Someone tried to poison you but someone fought off your attacker!"
                message.delete()
                break;

            case '🔟':
                message_selection = "You triggered a trap!"
                message.delete()
                break;

            case '#️⃣':
                message_selection = "You were attacked but a trap saved you!"
                message.delete()
                break;

            case '*️⃣':
                message_selection = "A trap attacked you but someone nursed you back to health!"
                message.delete()
                break;

            default:
                break;
        }
    })

    game.sendMessage(channel, `${message_selection}`)
}

module.exports.TAGS = ["drivable", "roleblockable", "visit"]