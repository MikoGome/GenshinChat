import { Server } from "socket.io";
import query from './models/Users';

export const onlineUsers:{[id:number]: accountShape} = {}

function socket(server:any) {
  
  const io = new Server(server);
  
  io.on('connection', (socket:any) => {

    socket.on('signIn', (account: accountShape) => {
      onlineUsers[socket.id] = account;
      io.emit('updateOnlineUsers', onlineUsers);
    });

    socket.on('disconnect', () => {
      try {
        const username = onlineUsers[socket.id].name;
        const queryEntry: string = `
          UPDATE users
          SET online = false
          WHERE username = $1
        `
        query(queryEntry, [username]);
      } catch (e) {
        console.log(e);
      }
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
