import query from '../models/Users';

import { onlineUsers } from './socket';

import {talkRooms} from './talkSocket';

const inactive:{[name:string]: true} = {};

function authSocket (socket: any, io: any) {
  socket.on('signIn', (account: accountShape) => {
    onlineUsers[socket.id] = account;
    try {
      const username = onlineUsers[socket.id].name;
      socket.username = username;
      const queryEntry:string = `
        UPDATE users
        SET online = true
        WHERE username = $1
      `
      query(queryEntry, [username]);
    } catch(e) {

    }
    io.emit('updateOnlineUsers', onlineUsers);
    if(socket.room) {
      const {name, gender, main} = onlineUsers[socket.id];
      talkRooms[socket.room][name] = {main, gender};
      io.to(socket.room).emit('updatePartner', {participants: talkRooms[socket.room]});
    }
  });

  socket.on('active', () => {
    if(onlineUsers[socket.id] && socket.room) {
      const {name} = onlineUsers[socket.id];
      delete inactive[name];
      io.to(socket.room).emit('active', inactive);
    }
  });

  socket.on('inactive', () => {
    if(onlineUsers[socket.id] && socket.room) {
      const {name} = onlineUsers[socket.id];
      inactive[name] = true;
      io.to(socket.room).emit('inactive', inactive);
    }
  });

  socket.on('disconnect', async () => {
    const username = socket.username;

    try {
      const queryEntry: string = `
      UPDATE users
      SET online = false
      WHERE username = $1
      `
      query(queryEntry, [username]);
    } catch (e) {
      console.log('e', e);
    }
    
    if(talkRooms[socket.room]) {
      const {name} = onlineUsers[socket.id];
      delete talkRooms[socket.room][name];
      const filteredRoom = talkRooms[socket.room];
      io.to(socket.room).emit('updateRoom', {participants: filteredRoom});
      socket.leave(socket.room);
      delete socket.room;
    }
   
    delete onlineUsers[socket.id];
    io.emit('updateOnlineUsers', onlineUsers);
  });
}

import { accountShape } from './socket';

export default authSocket;