import { ref, reactive, computed } from 'vue'
import { io } from "socket.io-client";
import { defineStore } from 'pinia'
import type { sendMessageType } from '@/components/chat/type';

export interface interSocketStore {
    readonly url: string | undefined;
}

export interface interUserSocket {
    socketId: string | null;
    username: string;
    connected: boolean;
}

export const useSocketStore = defineStore('socket', () => {

    const state = reactive<interSocketStore>({
        url: process.env.NODE_ENV === "production" ? undefined : "http://localhost:3011",
    });
    const userSocket = reactive<interUserSocket>({
        socketId: null,
        username: '',
        connected: false
    });

    //-- connect socket url
    const socket = io(state.url as string, {
        autoConnect: false
    });
    //-- event socket
    socket.on("connect", () => {
        userSocket.connected = true;
        userSocket.socketId = socket.id;
    });
    socket.on("disconnect", () => {
        userSocket.connected = false;
        userSocket.socketId = null;
        userSocket.username = '';
    });

    //-- action store
    const connectSocket = (username: string) => {
        if(userSocket.connected === false){
            socket.connect();
        }
        userSocket.username = username;
    }
    const disconnectSocket = () => {
        socket.disconnect();
    }

    //-- action message
    const sendMessage = (msg: string) => {
        if(userSocket.connected === true){
            socket.emit('message', <sendMessageType>{
                socketId: userSocket.socketId,
                username: userSocket.username,
                time: Date.now(),
                message: msg
            })
        }
    }
    const onMessage = (callback: Function) => {
        socket.on('message-client', (response) => {
            callback(response);
        });
    }

    return {
        state,
        userSocket,
        socket,
        connectSocket,
        disconnectSocket,
        sendMessage,
        onMessage
    }
})