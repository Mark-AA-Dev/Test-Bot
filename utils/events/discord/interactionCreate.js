const {MessageActionRow, MessageButton, MessageEmbed, MessageSelectMenu } = require("discord.js");
const embeds = require("../../../config/embeds")
const messages = require("../../../config/messages")
const config = require("../../../config/config")
const { create } = require("sourcebin_js")

module.exports = async (client, interaction) => {
    if (interaction.isCommand()) {

        if (!interaction.guild) return interaction.reply({content: "> :x: Vous ne pouvez éxécuter aucune commande en DM !"});

        const command = client.interactions.get(interaction.commandName);

        if (!command) return interaction.reply({
            content: "> :x: Une erreur vient de survenir, veuillez signaler le problème au Développeur",
            ephemeral: true
        });

        command.run(client, interaction);
    }


    if (interaction.isButton()) {

        const rows = new MessageActionRow().addComponents([
            new MessageButton()
                .setLabel(embeds.ticket_setup.button_open_ticket_name)
                .setEmoji(embeds.ticket_setup.button_open_ticket_emoji)
                .setStyle('SUCCESS')
                .setCustomId('open-ticket'),
        ]);

        const member = interaction.member;


        if (interaction.customId === "open-ticket") {

            const ChannelMember = interaction.message.guild.channels.cache.find(channel => channel.name === `ticket-${member.user.username}`);
            if(ChannelMember) return interaction.reply({ content: messages.plusieurs_tickets, ephemeral: true})

            const TicketChannelName = embeds.in_ticket.name.replace("{member}", member.user.username);

            const ticketChannel = await interaction.message.guild.channels.create(TicketChannelName, {
                permissionOverwrites: [
                    {
                        id: member.id,
                        allow: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                    },
                    {
                        id: config.staff_role,
                        allow: ["VIEW_CHANNEL"],
                        deny: ["SEND_MESSAGES"],
                    },
                    {
                        id: interaction.message.guild.roles.everyone,
                        deny: ["VIEW_CHANNEL"],
                    },
                ],
                type: 'text',
                parent: config.category_ticket,
            });

            const row = new MessageActionRow().addComponents([
                new MessageButton()
                    .setLabel(embeds.in_ticket.default_close_button_name)
                    .setEmoji(embeds.in_ticket.default_close_button_emoji)
                    .setStyle('DANGER')
                    .setCustomId('close-tickets'),
            ]);

            const EmbedTicket = new MessageEmbed()
                .setTitle(embeds.in_ticket.title)
                .setDescription(embeds.in_ticket.description)
                .setColor(embeds.default_embed_info.color)
                .setFooter({
                    text: embeds.default_embed_info.copyright,
                    iconURL: embeds.default_embed_info.iconurl,
                });

            await ticketChannel.send(`${member}`);
            await ticketChannel.send({ embeds: [EmbedTicket], components: [row] });

            await interaction.reply({ content: messages.open_ticket.replaceAll("{channel}", ticketChannel), ephemeral: true, fetchReply: true})

        } else if (interaction.customId === "close-tickets") {

            const row = new MessageActionRow().addComponents([
                new MessageButton()
                    .setEmoji(embeds.in_ticket.close.emoji1)
                    .setStyle('SUCCESS')
                    .setCustomId('yesclose-tickets'),
                new MessageButton()
                    .setEmoji(embeds.in_ticket.close.emoji2)
                    .setStyle('DANGER')
                    .setCustomId('noclose-tickets'),
            ]);

            await interaction.reply({ content: messages.check_close_ticket, components: [row] });

        } else if (interaction.customId === "noclose-tickets") {

            await interaction.message.delete();

        } else if (interaction.customId === "yesclose-tickets") {

            await interaction.reply({ content: "Fermeture du ticket.."})

            const transcriptChannel = interaction.guild.channels.cache.get(config.transcriptChannelId);
            const guild = interaction.client.guilds.cache.get(interaction.guild.id);
            const chan = guild.channels.cache.get(interaction.channelId);

            const messages = await chan.messages.fetch();
            const formattedMessages = messages
                .filter((message) => !message.author.bot)
                .map((message) => {
                    const timestamp = new Date(message.createdTimestamp).toLocaleString('fr-FR');
                    const author = `${message.author.username}#${message.author.discriminator}`;
                    const content = message.attachments.size > 0 ? message.attachments.first().proxyURL : message.content;
                    return `${timestamp} - ${author}: ${content}`;
                })
                .reverse()
                .join('\n');

            const content = formattedMessages.length > 0 ? formattedMessages : "Aucun message.";

            const transcript = [
                {
                    name: interaction.channel.name,
                    content: content,
                    language: "javascript",
                },
            ];

            const options = {
                title: interaction.channel.name,
            };

            const transcriptValue = await create(transcript, options);
            const transcriptUrl = transcriptValue.url;

            const embedtr = new MessageEmbed()
                .setTitle(embeds.in_ticket.transcript.title)
                .setDescription(
                    embeds.in_ticket.transcript.description
                        .replace("{channel}", interaction.channel.name)
                        .replace("{mod}", member.id)
                        .replace("{date}", new Date(interaction.createdTimestamp).toLocaleString('fr-FR'))
                        .replace("{url}", transcriptUrl)
                )
                .setColor(embeds.default_embed_info.color)
                .setFooter({ iconURL: embeds.default_embed_info.iconurl, text: embeds.default_embed_info.copyright })
                .setTimestamp();

            await transcriptChannel.send({ embeds: [embedtr] });

            await interaction.channel.delete();

        }
    }


}