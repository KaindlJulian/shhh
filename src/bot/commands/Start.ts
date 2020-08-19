import { Emoji, Message, MessageEmbed } from 'discord.js';
import { COLOR, EMOJI, LOGO_URL } from '../../config';
import { Command, CommandOptions } from '../../types';
import { SessionManager } from '../SessionManager';

export class Start implements Command {
    options: CommandOptions = {
        id: {
            name: 'start',
        },
    };

    exec(msg: Message, args: string[]) {
        const code = args[0];

        if (!msg.member?.voice?.channel) {
            msg.channel.send(
                `${EMOJI.RED_X} **You have to be in a voice channel to use this command**`
            );
            return;
        }

        if (
            SessionManager.instance.hasSession(
                msg.guild!.id,
                msg.member.voice.channel.id
            )
        ) {
            msg.channel.send(
                `${EMOJI.RED_X} Already running Session in **${msg.member.voice.channel.name}**`
            );
            return;
        }

        SessionManager.instance.startSession(
            msg.guild!.id,
            msg.member.voice.channel.id
        );

        const embed = new MessageEmbed();
        embed.setTitle(`Started Session in ${msg.member.voice.channel.name}`);
        embed.setTimestamp(new Date());
        embed.setColor(COLOR.GREEN);
        embed.setThumbnail(LOGO_URL);

        if (code) {
            embed.setDescription(`\`\`\`${code}\`\`\``);
        }

        const players = msg.member.voice.channel.members
            .map((m) => `<@${m.user.id}>`)
            .join(' ');

        msg.channel.send(players, embed);
    }
}
