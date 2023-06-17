const config = require('../../../config/config');
const register = require('../../slashsync');

module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });

  process.stdout.write(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━

\x1b[38;2;143;110;250m   ██████╗ ██████╗  ██████╗ ██████╗██╗    ██████╗  ██████╗ ████████╗
\x1b[38;2;157;101;254m   ██╔════╝██╔═══██╗██╔════╝██╔════╝██║    ██╔══██╗██╔═══██╗╚══██╔══╝
\x1b[38;2;172;90;255m   ██║     ██║   ██║██║     ██║     ██║    ██████╔╝██║   ██║   ██║   
\x1b[38;2;188;76;255m   ██║     ██║   ██║██║     ██║     ██║    ██╔══██╗██║   ██║   ██║   
\x1b[38;2;205;54;255m  ╚██████╗╚██████╔╝╚██████╗╚██████╗██║    ██████╔╝╚██████╔╝   ██║   
\x1b[38;2;222;0;255m   ╚═════╝ ╚═════╝  ╚═════╝ ╚═════╝╚═╝    ╚═════╝  ╚═════╝    ╚═╝\x1b[0m  
`)

  console.log(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  ╔═══════════════════════════════════════╗
  ║ [${client.user.username}] Les slash commands sont chargés ! ✅
  ╚═══════════════════════════════════════╝
  
  `)
  console.log(`
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━
  
  ╔═══════════════════════════════════════╗
  ║ [${client.user.username}] Lancement du bot fait avec succès ! ✅
  ╚═══════════════════════════════════════╝
  `)

  const activities = config.STATUT;
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 20000);

};