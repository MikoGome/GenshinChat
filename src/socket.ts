import { Server } from "socket.io";

const onlineUsers:{[name:number]: string} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {
    console.log('socket connected');

    socket.on('signIn', (name:string) => {
      socket.name = name;
      onlineUsers[socket.id] = name;
      console.log('onlineUsers', onlineUsers);
    });

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      console.log('socket disconnected');
      console.log('onlineUsers', onlineUsers);
    });
  });


}

export default socket;
