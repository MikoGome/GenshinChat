import { Server } from "socket.io";


import authSocket from "./authSocket";
import chatSocket from "./chatSocket";
import friendSocket from "./friendSocket";
import talkSocket from "./talkSocket";

export const onlineUsers:{[id:number]: accountShape} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {
    authSocket(socket, io);
    chatSocket(socket, io);
    friendSocket(socket, io);
    talkSocket(socket, io);
  });
}

export interface accountShape {
  name: string,
  gender: string,
  main: string,
}

export default socket;
