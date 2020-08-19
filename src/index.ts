import * as dotenv from 'dotenv';
import { BotClient } from './bot/bot';

dotenv.config();

const bot = new BotClient({
    token: process.env.TOKEN!,
    messageCacheMaxSize: 1000,
});

(async () => {
    await bot.init();
})();
