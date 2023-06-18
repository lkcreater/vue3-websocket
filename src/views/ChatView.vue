<template>
    <div>
        <SignInChat v-if="!userSocket.connected"/>
        <ChatUi v-else/>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSocketStore } from '@/stores/socket';

import ChatUi from '@/components/chat/ChatUi.vue';
import SignInChat from '@/components/chat/SignInChat.vue';

const storeSocket = useSocketStore();
const { userSocket } = storeToRefs(storeSocket);

// import { socket } from "@/socket";

// const messages = ref<string[]>([])

// socket.on('test', (data: any) => {
//     console.log('SERVER: ', data);
// })

// socket.on('message-client', (data: any) => {
//     setMessage(data);
//     console.log(data);
// })

// const setMessage = (msg: string) => {
//     messages.value.push(msg);
// }

// const onSend = () => {
//     socket.emit("message", 'test sending message', (response: string) => {
//         console.log('response ==> ', response);
//     });
// }

// const connect = () => {
//     const bool = socket.connect();
//     console.log(bool);
// }
// const disconnect = () => {
//     socket.disconnect();
// }
</script>

<style scoped>

</style>