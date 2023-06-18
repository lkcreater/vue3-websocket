

<style scoped>

</style>

<template>
    <section class="msger">
        <header class="msger-header">
            <div class="msger-header-title">
                {{ props.title }}
            </div>
            <div class="msger-header-options">
              
            </div>
        </header>

        <main class="msger-chat">
            <template v-for="msg in listMessage">
                <BoxChatRight 
                    v-if="msg.socketId == userSocket.socketId"
                    :name="msg.username"
                    :time="moment(msg.time).fromNow()"
                    :message="msg.message" />

                <BoxChatLeft 
                    v-else 
                    :name="msg.username"
                    :time="moment(msg.time).fromNow()"
                    :message="msg.message" />
            </template>
        </main>

        <form class="msger-inputarea" @submit="onSubmit">
            <input v-model="input" type="text" class="msger-input" placeholder="Enter your message...">
            <button type="submit" class="msger-send-btn" :disabled="btnDisable">Send</button>
        </form>
    </section>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSocketStore } from '@/stores/socket';
import type { sendMessageType } from '@/components/chat/type';
import moment from 'moment'

import BoxChatRight from '@/components/chat/BoxChatRight.vue';
import BoxChatLeft from '@/components/chat/BoxChatLeft.vue';

interface InterChatProp {
    title?: string 
}
const props = withDefaults(defineProps<InterChatProp>(), {
    title: 'Chat WebSocket V.1'
});

const storeSocket = useSocketStore();
const { userSocket } = storeToRefs(storeSocket);
const { sendMessage, onMessage } = storeSocket;

const input = ref<string>('');
const btnDisable = ref<boolean>(true);
const listMessage = ref<sendMessageType[]>([]);

watchEffect(() => {
    btnDisable.value = !(input.value != '');
});

const onSubmit = (e: Event) => {
    e.preventDefault();
    sendMessage(input.value);
    input.value = '';
}
onMessage((response: sendMessageType) => {
    listMessage.value.push(response);
});
</script>

<style lang="css" >
.msger {
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    width: 100%;
    max-width: 867px;
    margin: 25px 10px;
    height: calc(100% - 50px);
    border: var(--border);
    border-radius: var(--msg-border-radius);
    background: var(--msger-bg);
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.2);
}

.msger-header {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: var(--border);
    background: #535353;
    color: #e1e1e1;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.msger-chat {
    flex: 1;
    overflow-y: auto;
    padding: 10px;
}
.msger-chat::-webkit-scrollbar {
    width: 6px;
}
.msger-chat::-webkit-scrollbar-track {
    background: #ddd;
}
.msger-chat::-webkit-scrollbar-thumb {
    background: #bdbdbd;
}
.msg {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;
}
.msg:last-of-type {
    margin: 0;
}
.msg-img {
    width: 50px;
    height: 50px;
    margin-right: 10px;
    background: #836ae4;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    text-align: center;
    font-weight: bold;
    color: #fff;
    line-height: 2em;
    font-size: 1.5em;
}
.msg-bubble {
    max-width: 450px;
    padding: 15px;
    border-radius: 15px;
    background: #1a1a1a;
}
.msg-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}
.msg-info-name {
    margin-right: 10px;
    font-weight: bold;
}
.msg-info-time {
    font-size: 0.85em;
}

.left-msg .msg-bubble {
    border-bottom-left-radius: 0;
}

.right-msg {
    flex-direction: row-reverse;
}
.right-msg .msg-bubble {
    background: #545454;
    color: #fff;
    border-bottom-right-radius: 0;
}
.right-msg .msg-img {
    margin: 0 0 0 10px;
}

.msger-inputarea {
    display: flex;
    padding: 10px;
    border-top: var(--border);
    background: #626262;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
}
.msger-inputarea * {
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
}
.msger-input {
    flex: 1;
    background: #ddd;
}
.msger-send-btn {
    margin-left: 10px;
    background: #0dbc7e;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
}
.msger-send-btn:active{
    background-color: #019c66;
    border-color: #005d3c;
}
.msger-send-btn:disabled{
    background-color: #6b8c80;
    border-color: #005d3c;
    cursor: not-allowed;
}
.msger-chat {
    background-color: #434343;
}

</style>