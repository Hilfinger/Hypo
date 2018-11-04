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

    bot.on('guildMemberAdd', message => {
        console.log("Bruker ", + member.user.username + " har joinet serveren");

        var role = member.guild.roles.fins('name', 'Medlem');

        member.addRole(role);
    });

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
        .setDescription("Bot Informasjon")
        .setColor("#4f8ef2")
        .addField("Bot Navn", bot.user.username)
        .addField("Laget Den", bot.user.createdAt)
        .addField("Laget Av", "Thwisted");

        return message.channel.send(bembed);
    }

    if(cmd === `${prefix}clear`){
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**(!)** Du har ikke tilgang til denne kommandoen");
        if(!args[0]) return message.channel.send("**(!)** Skriv inn mengden meldinger du vil fjerne");
        message.channel.bulkDelete(args[0]).then(() => {
            message.channeld.send(`Fjernet **${args[0]}** medlinger`).then(msg => msg.delete(5000));
        });
    }

    if(cmd === `${prefix}kick`){
        
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("**(!)** Kunne ikke finne den brukeren");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**(!)** Du har ikke tilgang til denne kommandoen");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**(!)** Denne brukeren kan ikke bli sparket");

        let kickEmbed = new discord.RichEmbed()
        .setDescription("__Kick__")
        .setColor("#a80000")
        .addField("Bruker Sparket", `${kUser}`)
        .addField("Sparket Av", message.author)
        .addField("Tid", message.createdAt)
        .addField("Grunn", kReason);

        let kickChannel = message.guild.channels.find(`name`, "kicks");
        if(!kickChannel) return message.channel.send("**(!)** Kunne ikke finne kicks kanalen");

        message.guild.member(kUser).kick(kReason);
        
        kickChannel.send(kickEmbed);
        return;
    }

    if(cmd === `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("**(!)** Kunne ikke finne den brukeren");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**(!)** Du har ikke tilgang til dette");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("**(!)** Den brukeren kan ikke bli bannet");

        let banEmbed = new discord.RichEmbed()
        .setDescription("__Ban__")
        .setColor("#a80000")
        .addField("Bruker Bannet", `${bUser}`)
        .addField("Bannet Av", message.author)
        .addField("Tid", message.createdAt)
        .addField("Grunn", bReason);

        let bansChannel = message.guild.channels.find(`name`, "bans");
        if(!bansChannel) return message.channel.send("**(!)** Kunne ikke finne bans kanalen");

        message.guild.member(bUser).ban(bReason);

        bansChannel.send(banEmbed);
        return;
    }

    if(cmd === `${prefix}report`){
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("**(!)** Kunne ikke finne den brukeren");
        let rReason = args.join(" ").slice(22);
        
        let reprotEmbed = new discord.RichEmbed()
        .setDescription("Report")
        .setColor("#4f8ef2")
        .addField("Bruker Rapportert", `${rUser}`)
        .addField("Rapportert Av", message.author)
        .addField("Tid", message.createdAt)
        .addField("Grunn", rReason);

        let reportsChannel = message.guild.channels.find(`name`, "reports");
        if(!reportsChannel) return message.channel.send("**(!)** Kunne ikke finne reports kanalen");

        reportsChannel.send(reprotEmbed);
        return;
    }

    if(cmd === `${prefix}staff`){

        let staffEmbed = new discord.RichEmbed()
        .setDescription("Staff Kommandoer")
        .setColor("#4f8ef2")
        .addField("!clear <tall>", "Fjerner et bestemt tall meldinger")
        .addField("!ban <spiller> <grunn>", "Bannlyser en spiller fra serveren")
        .addField("!kick <spiller> <grunn>", "Sparker en spiller fra serveren");

        return message.channel.send(staffEmbed);
    }

    if(cmd === `${prefix}hjelp`){

        let hjelpEmbed = new discord.RichEmbed()
        .setDescription("Kommandoer For Spillere")
        .setColor("#4f8ef2")
        .addField("!hjelp", "Viser dette")
        .addField("!report <spiller> <grunn>", "Rapporter en spiller");

        return message.channel.send(hjelpEmbed);
    }




});

bot.login(process.env.token);
