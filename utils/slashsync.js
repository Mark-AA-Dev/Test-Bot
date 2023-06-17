const Discord = require('discord.js');

module.exports = async (client, commands, options = { debug: false, guildId: null }) => {
    const log = (message) => options.debug && console.log(message);

    await client.application.fetch();

    const currentCommands = await client.application.commands.fetch(options.guildId);

    log(`Synchronisation des commandes.`);
    log(`Actuellement ${currentCommands.size} commandes sont enregistrées dans le bot.`);

    const newCommands = commands.filter((command) => !currentCommands.some((c) => c.name === command.name));
    for (let newCommand of newCommands) {
        await client.application.commands.create(newCommand, options.guildId);
    }

    log(`Créé ${newCommands.length} commandes !`);

    const deletedCommands = currentCommands.filter((command) => !commands.some((c) => c.name === command.name));
    for (let deletedCommand of deletedCommands.values()) {
        await client.application.commands.delete(deletedCommand.id, options.guildId);
    }

    log(`Supprimé ${deletedCommands.size} commandes !`);

    let updatedCommandCount = 0;
    for (let updatedCommand of commands) {
        const previousCommand = currentCommands.find((c) => c.name === updatedCommand.name);
        if (!previousCommand) continue;

        if (
            previousCommand.description !== updatedCommand.description ||
            !Discord.ApplicationCommand.optionsEqual(previousCommand.options ?? [], updatedCommand.options ?? [])
        ) {
            await previousCommand.edit(updatedCommand);
            updatedCommandCount++;
        }
    }

    log(`Mise à jour ${updatedCommandCount} commandes !`);

    log(`Commandes synchronisées !`);

    return {
        currentCommandCount: currentCommands.size,
        newCommandCount: newCommands.length,
        deletedCommandCount: deletedCommands.size,
        updatedCommandCount,
    };
};
