export class SessionManager {
    private static _instance: SessionManager;
    sessions: { [key: string]: Set<string> } = {};

    static get instance() {
        if (!this._instance) {
            this._instance = new SessionManager();
        }
        return this._instance;
    }

    startSession(guildId: string, channelId: string) {
        if (this.sessions[guildId] !== undefined) {
            this.sessions[guildId].add(channelId);
        } else {
            this.sessions[guildId] = new Set([channelId]);
        }
    }

    endSession(guildId: string, channelId: string) {
        if (this.sessions[guildId] !== undefined) {
            this.sessions[guildId].delete(channelId);
        }
    }

    hasSession(guildId: string, channelId: string) {
        const r =
            this.sessions[guildId] !== undefined &&
            this.sessions[guildId].has(channelId);
        return r;
    }
}
