import query from '../models/Users';

import { onlineUsers } from './socket';

function authSocket (socket: any, io: any) {
  socket.on('signIn', (account: accountShape) => {
    onlineUsers[socket.id] = account;
    try {
      const username = onlineUsers[socket.id].name;
      const queryEntry:string = `
        UPDATE users
        SET online = true
        WHERE username = $1
      `
      query(queryEntry, [username]);
    } catch(e) {

    }
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
      
    }
    delete onlineUsers[socket.id];
    io.emit('updateOnlineUsers', onlineUsers);
  });
}

import { accountShape } from './socket';

export default authSocket;