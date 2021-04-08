
module.exports = {
    name:"help",
    async run(client, message, args, db) {
        const Discord = require("discord.js")
        let embed = new Discord.MessageEmbed()
        .setTitle("Commands")
        .addField("`!autorole`", `Sets the autorole.  Usage: \`!autorole (on/off) {role}\``)

        message.channel.send(embed)
    }
}