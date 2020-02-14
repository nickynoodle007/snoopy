const Discord = require('discord.js');
const bot = new Discord.Client();
const token = process.env.TOKEN;
require('dotenv/config');

const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const ms = require('ms');

const fs = require('fs');
bot.commands = new Discord.Collection();
const PREFIX = 'k!';

bot.on('ready', () => {
    console.log('Killer Queen has been summoned!');
    bot.user.setActivity('killer-queen-discord.weeblysite.com', {
        type: ''
    }).catch(console.error);

})

bot.on('message', msg => {
    if (msg.content == "yoshikage kira") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "kira yoshikage") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "his name is yoshikage kira") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "Yoshikage kira") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "Yoshikage Kira") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "Yoshikage Kira is kosaku kawajiri") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "yoshikage kira is kosaku kawajiri") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "Yoshikage Kira is Kosaku Kawajiri") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    if (msg.content == "Killer Queen\'s stand user is yoshikage kira") {
        msg.reply('Killer Queen\'s third bomb, Bites the Dust has gone into effect!');
        msg.reply('It is too late to attack, because Killer Queen is already inside your eye!');
    }
    let args = msg.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            msg.reply('pong!');
            break;
        case 'website':
            msg.channel.sendMessage('killer-queen-discord.weeblysite.com')
            break;
        case 'info':
            if (args[1] === 'version') {
                msg.channel.sendMessage('Version 1.0.0')
            } else {
                msg.channel.sendMessage('Invalid Args')
            }
            break;
        case 'ban':
            if (!msg.member.hasPermission("ADMINISTRATOR", explicit = true)) return msg.channel.send('You don´t have permission to do that.')
            const user = msg.mentions.users.first();

            if (user) {
                const member = msg.guild.member(user);

                if (member) {
                    member.ban({
                        reason: 'Killer Queen has already touched the doorknob'
                    }).then(() => {
                        msg.reply(`${user.tag} was successfully destroyed!`)
                    })
                } else {
                    msg.reply('The target specified doesn\'t exist!')
                }
            } else {
                msg.reply('You need to specify who I need to destroy!')
            }
            break;
        case 'mute':
            if (!msg.member.hasPermission("ADMINISTRATOR", explicit = true)) return msg.channel.send('You don´t have permission to do that.')
            let person = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]))
            if (!person) return msg.reply("The target specified doesn\'t exist!");

            let mainrole = msg.guild.roles.find(role => role.name === "@everyone");
            let muterole = msg.guild.roles.find(role => role.name === "Muted");

            if (!muterole) return msg.reply("There is no mute role! Make sure to create one called \"Muted\"!");

            let time = args[2];

            if (!time) {
                return msg.reply("Specify the amount of time you want to silence the target!");
            }

            person.removeRole(mainrole.id);
            person.addRole(muterole.id);

            msg.channel.send(`The target has been silenced for ${ms(ms(time))}`);

            setTimeout(function () {
                person.addRole(mainrole.id);
                person.removeRole(muterole.id);
                msg.channel.send(`The target has been unsilenced!`)
            }, ms(time));
            break;
        case 'poll':
            if (!msg.member.hasPermission("ADMINISTRATOR", explicit = true)) return msg.channel.send('You don´t have permission to do that.')
            const Embed = new Discord.RichEmbed()
            .setColor(0xFFC300)
            .setTitle("to create a poll")
            .setDescription("use k!poll to initiate the yes or no poll");

            if(!args[1]) {
                msg.channel.send(Embed);
            }

            let msgArgs = args.slice(1).join(" ");

            msg.channel.send(msgArgs).then(msgReaction => {
                msgReaction.react("👍");
                msgReaction.react("👎");
            })
        break;
    case 'clear':
        let numberMessages = args[1];
        if (!args[1]) {
            msg.reply('Specify how many messages to destroy stoopid! (max is 100)');
        }
        if (!msg.deletable) {
            msg.reply('That message cannot be destroyed!');
        }
        if (numberMessages) {
            msg.channel.bulkDelete(args[1]);
            msg.channel.send(`I have successfully destroyed the last ${numberMessages} messages!`)
            .then(msg => msg.delete(3000));
        }
    }
})
bot.login(token);
