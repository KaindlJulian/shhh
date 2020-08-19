import { Message, MessageEmbed } from 'discord.js';
import { EMOJI, LOGO_URL } from '../../config';
import { Command, CommandOptions } from '../../types';

export class Help implements Command {
    options: CommandOptions = {
        id: {
            name: 'help',
            aliases: ['h'],
        },
    };

    exec(msg: Message, args: string[]) {
        if (args.length === 0) {
            this.printGeneral(msg);
        } else {
            this.printCommand(msg, args[0]);
        }
    }

    private printCommand(msg: Message, name: string) {
        const embed = new MessageEmbed();
        embed.setTitle(`About the  \`!!${name}\` command`);

        switch (name) {
            case 'start':
                embed.setDescription(
                    `This command starts a Session. You need to be in a voice channel that has no active Session.\n\n**Parameters**\n${EMOJI.LIST_ITEM_POINT} (code), is an optional parameter to include a code in the info message`
                );
                break;
            case 'stop':
                embed.setDescription(
                    'This command ends an active Session. You need to be in a voice channel that has an active Session.'
                );
                break;
            case 'mute':
                embed.setDescription(
                    'If in a voice channel with an active Session this command server mutes all members in this voice channel.'
                );
                break;
            case 'unmute':
                embed.setDescription(
                    'If in a voice channel with an active Session this command server unmutes all members in this voice channel.'
                );
                break;
            default:
                return;
        }

        msg.channel.send(embed);
    }

    private printGeneral(msg: Message) {
        const embed = new MessageEmbed();
        embed.setTitle('How to Shhh!');
        embed.setDescription(
            `**What is a Session**\nIf there is an active Session in a Voice Channel the Bot will provide following functionality for the Members in this Voice Channel:\n\n${EMOJI.LIST_ITEM_POINT} Any Member __self__ mutes -> All others get __server__ muted\n${EMOJI.LIST_ITEM_POINT} The Member __self__ unmutes -> All others get __server__ unmuted\n\nThis means the first person to mute will mute all others, but also has the responsibility to unmute himself and therefore all others. You can also choose to manually do that with \`!!mute\` and \`!!unmute\`\n\n**Example Command Flow**\n`
        );

        embed.addField(
            `${EMOJI.DIGITS[1]} \`!!start (code)\``,
            'This starts a new Session for the voice channel you are in. Meaning the functionality described above becomes active. You can optionally give a game code to display it in the bot message.'
        );

        embed.addField(
            `${EMOJI.DIGITS[2]}`,
            'Start the Among Us game. The first player to mute his mic will also mute all others. When a meeting is called this person has to unmute himself to also unmute all others. Others can not unmute because they are force/server muted. If the person fails to do that you can use `!!unmute` to unmute everyone. After the meeting again the first player to mute his mic will mute all others.'
        );

        embed.addField(
            `${EMOJI.DIGITS[3]} \`!!stop\``,
            'ServerUnmutes everyone and ends the Session.'
        );

        msg.channel.send(embed);
    }
}
