import { Message } from 'discord.js';
import { EMOJI } from '../../config';
import { Command, CommandOptions } from '../../types';
import { SessionManager } from '../SessionManager';

export class Unmute implements Command {
    options: CommandOptions = {
        id: {
            name: 'unmute',
        },
    };

    async exec(msg: Message) {
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
            await Promise.all(
                msg.member.voice.channel.members.array().map(async (m) => {
                    await m.voice.setMute(false, 'Shhh!');
                })
            );
        }
    }
}
