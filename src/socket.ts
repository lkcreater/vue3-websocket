import { reactive } from "vue";
import { io } from "socket.io-client";

export interface SocketUser {
  socketId: string;
  socketUser: any;
}

export const state = reactive({
  connected: false,
  socketId: '',
  fooEvents: [],
  barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:3011";

//Socket<DefaultEventsMap, DefaultEventsMap>'
export const socket = io(URL, {
  autoConnect: true
});

socket.on("connect", () => {
    console.log(`client ${socket.id} connect to server...`);
    state.socketId = socket.id;
    state.connected = true;

    socket.on("user connected", (user: SocketUser) => {
      //state.socketUser = user;
       console.log(user);
    });
});

socket.on("disconnect", () => {
    state.connected = false;
});

// socket.on("foo", (...args) => {
//   state.fooEvents.push(args);
// });

// socket.on("bar", (...args) => {
//   state.barEvents.push(args);
// });