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
});

bot.login(process.env.token);