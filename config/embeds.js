module.exports = {

    default_embed_info: {
        color: "#EE82EE",
        copyright: "Par Cocci <3",
        iconurl: "https://cdn.discordapp.com/attachments/1107687341625180282/1119729040610299934/Logo_no_back.png",
    },


    ticket_setup: {

        title: "🔧 Contacter l'équipe de support",
        description: `
        ➥ Afin de pouvoir contacter notre équipe plus facilement, nous avons mis en place un système de ticket. Pour votre demande, nous vous demandons de cliquer sur le bouton afin de donner la raison de votre ticket.
        
        ➥ Notre équipe fera au mieux afin de pouvoir répondre le plus rapidement possible aux tickets. Nous vous demandons de la compréhension.`,

        button_open_ticket_name: "Contacter le support",
        button_open_ticket_emoji: "🎫",

    },

    in_ticket: {

        error_ticket_number: "Vous ne pouvez pas avoir plusieurs tickets en même temps. Supprimer le premier, pour en ouvrir un autre.",

        name: "ticket-{member}",
        title: "❓ Nouvelle demande de support ",
        description: `
            ➥ Nous vous souhaitons la bienvenue dans votre ticket ! 👋🏼
            C'est ici que ce passera la discussion entre un membre de notre équipe et vous. Nous vous demandons d'être le plus clair possible dans votre demande.
            
            > Nous espérons que l'échange se passera bien entre notre équipe et vous.`,

        default_close_button_name: "Fermer le ticket",
        default_close_button_emoji: "❌",

        close: {
            emoji1: "✔️",
            emoji2: "❌",
        },

        transcript: {
            title: "📜 | SYSTEME DE TRANSCRIPT",
            description: `
            🔧 Ci-dessous vous **retrouvez** le Ticket de \`{channel}\`:
            
            ❌ Fermé par ➥ <@{mod}>
            ⌚ Date Fermeture ➥ \`{date}\`
            📋 Transcript ➥ [[Clique-ici]]({url})`,

            // {channel} ==> NOM DU CHANNEL
            // {mod} ==> MODERATEUR QUI FAIT LE TRANSCRIPT
            // {date} ==> DATE DU TRANSCRIPT
            // {url} ==> URL DU TRANSCRIPT

        },

    },


    ticket_command: {

        add: {
            success: {
                title: ":white_check_mark: Succès !",
                description: `
                Vous venez d'ajouter {member} au ticket avec succès !`

                // {member} <== PING DU MEMBRE
            },

            error: {
                title: ":warning: Attention !",
                description: `
              Vous êtes dans le mauvais channel pour ajouter un membre au ticket !`,
            },

        },

        remove: {
            success: {
                title: ":white_check_mark: Succès !",
                description: `
                Vous venez de retirer {member} au ticket avec succès !`

                // {member} <== PING DU MEMBRE
            },

            error: {
                title: ":warning: Attention !",
                description: `
              Vous êtes dans le mauvais channel pour retirer un joueur d'un ticket !`,
            },
        },

    },
}