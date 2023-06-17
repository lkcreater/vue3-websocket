<template>
    <div>
        <h1>web socket</h1>
        {{ messages }}<br />
        <button @click="onSend()">Send</button>
        <button @click="connect()">connect</button>
        <button @click="disconnect()">Disconnect</button>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { socket } from "@/socket";

const messages = ref<string[]>([])

socket.on('test', (data: any) => {
    console.log('SERVER: ', data);
})

socket.on('message-client', (data: any) => {
    setMessage(data);
    console.log(data);
})

const setMessage = (msg: string) => {
    messages.value.push(msg);
}

const onSend = () => {
    socket.emit("message", 'test sending message', (response: string) => {
        console.log('response ==> ', response);
    });
}

const connect = () => {
    const bool = socket.connect();
    console.log(bool);
}
const disconnect = () => {
    socket.disconnect();
}
</script>

<style scoped>

</style>