import { Server } from "socket.io";

const onlineUsers:{[id:string]: string} = {}

function socket(server:any) {


  const io = new Server(server);
  
  io.on('connection', (socket:any) => {
    console.log('socket connected');

    socket.on('signIn', (account:{id:number, name:string}) => {
      const {id, name} = account;
      socket.id = id;
      socket.name = name;
      onlineUsers[id] = name;
    });

    socket.on('disconnect', () => {
      delete onlineUsers[socket.id];
      console.log('socket disconnected');
    });
  });


}

export default socket;
