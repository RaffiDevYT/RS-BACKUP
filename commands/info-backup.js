const Discord = require('discord.js');
const backup = require('discord-backup');

module.exports = {
    name: "info-backup",
    aliases: ["info-bac"],
    description: "Displays the list of servers the bot is in!",
    usage: " ",
    ownerOnly: true,
    run: async (bot, message, args) => {
      if (!message.guild.me.hasPermission("ADMINISTRATOR"))
        return message.channel.send("I Dont Have Permissions")

    // If the member doesn't have enough permissions
    if(!message.member.hasPermission('MANAGE_MESSAGES')){
        return message.channel.send('<:MAWrong:1055502057899032646> You need to have the manage messages permissions to create a backup in this server.');
    }

    const backupID = args.join(' ');

    if (!backupID)
        return message.channel.send('<:MAWrong:1055502057899032646> Please specify a valid backup ID!');

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('ℹ️ Backup', backup.data.iconURL)
            .addField('Server name', backup.data.name)
            .addField('Size', backup.size + ' kb')
            .addField('Created at', formattedDate)
            .setFooter('Backup ID: '+backup.id);

        return message.channel.send(embed);

    }).catch((err) => {

        if (err === 'No backup found')
            return message.channel.send('<:MAWrong:1055502057899032646> No backup found for ID '+backupID+'!');
        else
            return message.channel.send('<:MAWrong:1055502057899032646> An error occurred: '+(typeof err === 'string') ? err : JSON.stringify(err));

    });
    }
};
