import { Client as DiscordClient, Message, VoiceState } from 'discord.js';
import { PREFIX } from '../config';
import { ClientOptions, Command } from '../types';
import { loadCommands } from '../utils/loadCommands';

import * as commandImports from './commands';
import { SessionManager } from './SessionManager';

export class BotClient extends DiscordClient {
    private commands: Command[];

    constructor(options: ClientOptions) {
        super(options);
        this.token = options.token;
        this.commands = loadCommands(commandImports);

        this.on('message', (msg) => {
            if (!msg.author.bot && msg.content.startsWith(PREFIX)) {
                this.handleMessage(msg);
            }
        });

        this.on('voiceStateUpdate', (o, n) => {
            this.handleVoiceStateUpdate(o, n);
        });
    }

    private handleMessage(msg: Message) {
        const { id, args } = this.parseMessage(msg);

        if (!id) return;

        const command = this.findCommand(id);

        if (command) {
            command.exec(msg, args);
        }
    }

    private parseMessage(msg: Message) {
        const content = msg.content.replace(PREFIX, '').split(' ');
        const id = content.shift();
        const args = content;
        return { id, args };
    }

    private findCommand(id: string) {
        for (let cmd of this.commands) {
            if (cmd.options.id.name === id) {
                return cmd;
            }
        }
    }

    private async handleVoiceStateUpdate(
        oldState: VoiceState,
        newState: VoiceState
    ) {
        const oldSelfMute = oldState.selfMute!;
        const newSelfMute = newState.selfMute!;

        if (
            SessionManager.instance.hasSession(
                newState.guild.id,
                newState.channel!.id
            )
        ) {
            if (!oldSelfMute && newSelfMute) {
                await Promise.all(
                    newState.channel!.members.array().map(async (m) => {
                        if (m.id !== newState.member!.id) {
                            await m.voice.setMute(true, 'Shhh!');
                        }
                    })
                );
            } else if (oldSelfMute && !newSelfMute) {
                await Promise.all(
                    newState.channel!.members.array().map(async (m) => {
                        if (m.id !== newState.member!.id) {
                            await m.voice.setMute(false, 'Shhh!');
                        }
                    })
                );
            }
        }
    }

    async init() {
        await this.login();
    }
}
