export interface boxChatProp {
    name: string;
    time: string;
    message: string 
}

export interface sendMessageType {
    socketId: string;
    username: string;
    time: number;
    message: string;
}