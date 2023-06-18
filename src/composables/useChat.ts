import { ref, onMounted, onUnmounted } from 'vue'

export const useChat = () => {
    const useAvatarChat = (username: string) => {
        return username.charAt(0).toUpperCase();
    }

    return {
        useAvatarChat
    }
}