const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")
const config = require("../config/config")
const embeds = require("../config/embeds")
const messages = require("../config/messages")

module.exports = {
    name: 'tickets',
    description: 'Ticket command.',
    options: [
        {
            name: "add",
            description: "Permet d'ajouter un membre à un ticket",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "joueur",
                    description: "Joueur à PING",
                    type: "USER",
                    required: true
                },
            ]
        },
        {
            name: "remove",
            description: "Permet de retirer un membre d'un ticket",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "joueur",
                    description: "Joueur à PING",
                    type: "USER",
                    required: true
                },
            ]
        },
        {
            name: "panel",
            description: "Permet d'envoyer le message des tickets",
            type: "SUB_COMMAND",
            options: [
                {
                    name: "channel",
                    description: "Channel",
                    type: "CHANNEL",
                    required: true
                },
            ]
        },
    ],
    run: async (client, interaction) => {

        if (!interaction.member.permissions.has("ADMINISTRATOR")) return interaction.reply({ content: messages.no_perm_use_command, ephemeral: true})

        const subCommand = interaction.options.getSubcommand();
        const member = interaction.options.getUser('joueur');
        const channel = interaction.options.getChannel('channel')

        if(subCommand === "panel"){

            const embed = new MessageEmbed()
                .setTitle(embeds.ticket_setup.title)
                .setDescription(embeds.ticket_setup.description)
                .setFooter({ text: embeds.default_embed_info.copyright, iconURL: embeds.default_embed_info.iconurl})
                .setColor(embeds.default_embed_info.color)
                .setThumbnail(embeds.default_embed_info.iconurl)
                .setTimestamp();
            const rows = new MessageActionRow()
                .addComponents([
                    new MessageButton()
                        .setLabel(embeds.ticket_setup.button_open_ticket_name)
                        .setEmoji(embeds.ticket_setup.button_open_ticket_emoji)
                        .setStyle('SUCCESS')
                        .setCustomId('open-ticket'),
                ])


            await channel.send({ embeds: [embed], components: [rows] })
            await interaction.reply({ content: messages.admin_ticket_setup.replaceAll("{channel}", channel), ephemeral: true})


        } else if(subCommand === "add"){

            if(interaction.channel.name.includes('ticket-')) {

                await interaction.channel.permissionOverwrites.edit(member, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    ATTACH_FILES: true,
                    READ_MESSAGE_HISTORY: true,
                })
                .catch(err => { console.log("Je n'ai pas les permissions pour ajouter quelqu'un au ticket.")})

                const embed = new MessageEmbed()
                    .setTitle(embeds.ticket_command.add.success.title)
                    .setDescription(embeds.ticket_command.add.success.description.replaceAll("{member}", member))
                    .setColor(embeds.ticket_command.add.success.color)
                    .setFooter({text: embeds.default_embed_info.copyright, iconURL: embeds.default_embed_info.iconurl})
                    .setTimestamp()
                await interaction.reply({embeds: [embed]});

            } else {
                const embed_err = new MessageEmbed()
                    .setTitle(embeds.ticket_command.add.error.title)
                    .setDescription(embeds.ticket_command.add.error.description.replaceAll("{member}", member))
                    .setColor(embeds.ticket_command.add.error.color)
                    .setFooter({text: embeds.default_embed_info.copyright, iconURL: embeds.default_embed_info.iconurl})
                    .setTimestamp()
                await interaction.reply({ embeds: [embed_err], ephemeral: true});
            }



        } else if(subCommand === "remove"){

            if(interaction.channel.name.includes('ticket-')) {

                await interaction.channel.permissionOverwrites.edit(member, {
                    VIEW_CHANNEL: false,
                    SEND_MESSAGES: false,
                    ATTACH_FILES: false,
                    READ_MESSAGE_HISTORY: false,
                })
                    .catch(err => { console.log("Je n'ai pas les permissions pour ajouter quelqu'un au ticket.")})

                const embed = new MessageEmbed()
                    .setTitle(embeds.ticket_command.remove.success.title)
                    .setDescription(embeds.ticket_command.remove.success.description.replaceAll("{member}", member))
                    .setColor(embeds.ticket_command.remove.success.color)
                    .setFooter({text: embeds.default_embed_info.copyright, iconURL: embeds.default_embed_info.iconurl})
                    .setTimestamp()
                await interaction.reply({embeds: [embed]});

            } else {
                const embed_err = new MessageEmbed()
                    .setTitle(embeds.ticket_command.remove.error.title)
                    .setDescription(embeds.ticket_command.remove.error.description.replaceAll("{member}", member))
                    .setColor(embeds.ticket_command.remove.error.color)
                    .setFooter({text: embeds.default_embed_info.copyright, iconURL: embeds.default_embed_info.iconurl})
                    .setTimestamp()
                await interaction.reply({ embeds: [embed_err], ephemeral: true});
            }

        }

    },
};