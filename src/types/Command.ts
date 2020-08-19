import { Message } from 'discord.js';

export interface Command {
    options: CommandOptions;

    exec(msg: Message, args?: string[]): void;
}

export interface CommandIdentifier {
    name: string;
    aliases?: string[];
}

export interface CommandOptions {
    id: CommandIdentifier;
}
