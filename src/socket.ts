import { Server } from "socket.io";

const onlineUsers:{[name:string]: number} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {
    console.log('socket connected');

    socket.on('signIn', (account:{id:number, name:string}) => {
      const {id, name} = account;
      socket.id = id;
      socket.name = name;
      onlineUsers[name] = Date.now();
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
