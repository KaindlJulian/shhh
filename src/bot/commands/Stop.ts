import { Message, MessageEmbed } from 'discord.js';
import { COLOR, EMOJI, LOGO_URL } from '../../config';
import { Command, CommandOptions } from '../../types';
import { SessionManager } from '../SessionManager';

export class Stop implements Command {
    options: CommandOptions = {
        id: {
            name: 'stop',
        },
    };

    exec(msg: Message) {
        if (!msg.member?.voice?.channel) {
            msg.channel.send(
                `${EMOJI.RED_X} **You have to be in a voice channel to use this command**`
            );
            return;
        }

        if (
            !SessionManager.instance.hasSession(
                msg.guild!.id,
                msg.member.voice.channel.id
            )
        ) {
            msg.channel.send(
                `${EMOJI.RED_X} No running Session in **${msg.member.voice.channel.name}**`
            );
            return;
        }

        SessionManager.instance.endSession(
            msg.guild!.id,
            msg.member.voice.channel.id
        );

        const embed = new MessageEmbed();
        embed.setTitle(`Stopped Session in ${msg.member.voice.channel.name}`);
        embed.setTimestamp(new Date());
        embed.setColor(COLOR.RED);
        embed.setThumbnail(LOGO_URL);

        msg.channel.send(embed);
    }
}
