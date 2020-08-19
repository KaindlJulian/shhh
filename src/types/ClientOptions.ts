import { ClientOptions as DiscordClientOptions } from 'discord.js';

export interface ClientOptions extends DiscordClientOptions {
    token: string;
}
