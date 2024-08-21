import {accessToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }

    sendMessage(userId, message) {
        const randomId = Math.floor(Math.random() * 1e9);  // Генерируем уникальный random_id
        return `${this.url}/messages.send?user_id=${userId}&message=${encodeURIComponent(message)}&random_id=${randomId}&${this.commonInfo}`
    }

    markAsRead(messageId) {
        return `${this.url}/messages.markAsRead?message_ids=${messageId}&${this.commonInfo}`;
    }

    getMessageStatus(messageId) {
        return `${this.url}/messages.getById?message_ids=${messageId}&${this.commonInfo}`;
    }

    getConversationById(peerId) {
        return `${this.url}/messages.getConversationsById?peer_ids=${peerId}&${this.commonInfo}`;
    }

}

export const urls = new Urls()
