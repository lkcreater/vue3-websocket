<template>
    <div class="signin-chat">
        <input type="text" class="msger-input" v-model="input" placeholder="Enter your name...">
        <button type="submit" class="btn" @click="onConnect" :disabled="btnDisable">CONNECT</button>
    </div>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useSocketStore } from '@/stores/socket';

const input = ref<string>('');
const btnDisable = ref<boolean>(true);

watchEffect(() => {
    btnDisable.value = !(input.value != '');
});

const storeSocket = useSocketStore();
const { userSocket } = storeToRefs(storeSocket);
const { connectSocket } = storeSocket;

const onConnect = () => {
    connectSocket(input.value);
}

</script>

<style lang="css">
.signin-chat{
    margin: 30px auto;
    text-align: center;
    background-color: #393939;
    width: 250px;
    padding: 15px;
    border-radius: 8px;
}
.signin-chat *{
    display: block;
    margin: auto;
    padding: 10px;
    border: none;
    border-radius: 3px;
    font-size: 1em;
    
}
.signin-chat .btn{
    background: #0dbc7e;
    color: #fff;
    font-weight: bold;
    cursor: pointer;
    width: 100%;
}
.signin-chat .btn:active{
    background-color: #019c66;
    border-color: #005d3c;
}
.signin-chat .btn:disabled{
    background-color: #6b8c80;
    border-color: #005d3c;
    cursor: not-allowed;
}
.signin-chat input{
    width: 100%;
    background: #ddd;
    margin-bottom: 15px;
    text-align: center;
    font-size: 20px;
}
</style>