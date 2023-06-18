<template>
    <div class="msg right-msg">
        <div class="msg-img" >
            {{ useAvatarChat(props.name) }}
        </div>

        <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">{{ props.name }}</div>
                <div class="msg-info-time">{{ props.time }}</div>
            </div>

            <div class="msg-text">
                {{ props.message }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useChat } from '@/composables/useChat';
import { type boxChatProp } from './type';

const props = defineProps<boxChatProp>();
const { useAvatarChat } = useChat();

</script>

<style scoped>

</style>