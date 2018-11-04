const discord = require("discord.js");
const bot = new discord.Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is now online`);
    bot.user.setActivity("Geektopia");
});

bot.on("message", async message =>{

    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = "!";
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(cmd === `${prefix}ping`){
        return message.channel.send("pong");
    }
    
    if(cmd === `${prefix}serverinfo`){
        let sembed = new discord.RichEmbed()
        .setDescription("Server Informasjon")
        .setColor("#4f8ef2")
        .addField("Server Navn", message.guild.name)
        .addField("Totale Medlemmer", message.guild.memberCount)
        .addField("Laget Den", message.guild.createdAt);

        return message.channel.send(sembed);
    }
    
    if(cmd === `${prefix}botinfo`){
        let bembed = new discord.RichEmbed()
        .setDescription("Server Informasjon")
        .setColor("#4f8ef2")
        .addField("Bot Navn", bot.user.username)
        .addField("Laget Den", message.guild.createdAt)
        .addField("Laget Av", "Thwisted");

        return message.channel.send(bembed);
    }
});

bot.login(process.env.token);
