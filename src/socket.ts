import { Server } from "socket.io";
import query from './models/Users';

export const onlineUsers:{[id:number]: accountShape} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {

    socket.on('signIn', (account: accountShape) => {
      //To-Do change associated account status to true
      onlineUsers[socket.id] = account;
      io.emit('updateOnlineUsers', onlineUsers);
    });

    socket.on('disconnect', async () => {
      //To-Do change associated account status to false
      delete onlineUsers[socket.id];
      io.emit('updateOnlineUsers', onlineUsers);
    });

    socket.on('sendMessage', (data:{name: string, main:string, gender:string, message: string}) => {
      io.emit('newMessage', data);
    });

    socket.on('addFriend', (data:any) => {
      socket.to(data.sendee).emit('friendRequest', data);
    })

    socket.on('friendship', async (friendship:any) => {
      const {friendA, friendB} = friendship;
      const queryString = `
      INSERT INTO friendship
      VALUES($1, $2)
      `
      await query(queryString, [friendA.id, friendB.id]);

      io.to(friendB.socket).emit('bonded', friendB.id);
      io.to(friendA.socket).emit('bonded', friendA.id);
    });
  });

}

interface accountShape {
  name: string,
  gender: string,
  main: string,
}

export default socket;
