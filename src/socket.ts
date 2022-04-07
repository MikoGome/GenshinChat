import { Server } from "socket.io";

export const onlineUsers:{[id:number]: accountShape} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {

    socket.on('signIn', (account: accountShape) => {
      onlineUsers[socket.id] = account;
      io.emit('updateOnlineUsers', onlineUsers);
    });

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      io.emit('updateOnlineUsers', onlineUsers);
    });
  });


}

interface accountShape {
  name: string,
  gender: string,
  main: string
}

export default socket;
