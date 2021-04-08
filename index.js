const Discord = require("discord.js");
const client = new Discord.Client()
const prefix = "!"; // the bots prefix. This can be anything. Here I'm using "!";
const fs = require("fs");
client.commands = new Discord.Collection()
const db = require("quick.db");
const path = require("path");
const commandFiles = fs.readdirSync(path.join(__dirname, "commands")).filter(file => file.endsWith(".js"))
for(const file of commandFiles) {
    const command = require(path.join(__dirname, "commands", `${file}`))
    client.commands.set(command.name, command)
}
client.on("error", console.error)


client.on("message", async message => {

    if(message.channel.type === "dm" || message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    try {
        client.commands.get(command).run(client, message, args, db);
    }catch (error) {
        console.log(`An error occured: ${error}`)
        return message.channel.send(`An error occured: ${error}`)

    }
})

client.on("ready", async () => {
    console.log("I am ready")
    console.log("-----------------------------------")
    console.log(`${client.commands.map(cd => `${cd.name}.js ✅`).join("\n")}`)
    console.log("-----------------------------------")
    client.user.setActivity("idk", {type: "WATCHING"})
})




client.on("guildMemberAdd", async member => {
    var autoRoleStatus = db.get(`autorole-status_${member.guild.id}`)
    if(autoRoleStatus === "off" || autoRoleStatus === null) return;
    var roleId = db.get(`autorole_${member.guild.id}`);
    var role = member.guild.roles.cache.get(roleId);
    if(!role) {
        return;
    }

    member.roles.add(role);
})
client.login("your token");