import {v4 as uuidv4} from 'uuid';
import {onlineUsers} from './socket';


interface talkRoomsShape {
  [roomId:string]: {[name:string]: {main: string, gender:string}}
}

export const talkRooms:talkRoomsShape = {}

function talkSocket(socket: any, io: any) {
  socket.on('talkTo', (data:any) => {
    socket.to(data.sendee).emit('talkRequest', data);
  });

  socket.on('initiateTalk', (data:any) => {
    const roomId = data.roomId || uuidv4();
    if(!talkRooms[roomId]) talkRooms[roomId] = {}; //if condition stops resetting the room every invite
    const {participantA, participantB} = data;
    io.to(participantA.socket).emit('beginTalk', roomId);
    io.to(participantB.socket).emit('beginTalk', roomId);
  });

  socket.on('joinTalkRoom', (roomId:string) => {
    socket.join(roomId);
    if(!socket.room && onlineUsers[socket.id]) {
      socket.room = roomId;
      const {name, main, gender} = onlineUsers[socket.id];
      talkRooms[roomId][name] = {main, gender};
    }
    io.to(roomId).emit('joinTalkRoom', {roomId, participants: talkRooms[roomId]});
  });

  socket.on('talk', (data:{name: string, main:string, gender:string, message: string, roomId: string, possession: string}) => {
    const {name, main, gender ,message, roomId, possession} = data;
    const newTalk = {name, main, gender, message, possession};
    io.to(roomId).emit('newTalk', newTalk);
  });

  socket.on('leaveRoom', () => {
    if(talkRooms[socket.room]) {
      const {name} = onlineUsers[socket.id];
      delete talkRooms[socket.room][name];
      const filteredRoom = talkRooms[socket.room];
      io.to(socket.room).emit('updateRoom', {participants: filteredRoom});
      socket.leave(socket.room);
      delete socket.room;
    }
  });

  socket.on('typing', (roomId:string) => {
    const typer = onlineUsers[socket.id]?.name;
    io.to(roomId).emit('typing', typer)
  });

  socket.on('doneTyping', (roomId: string) => {
    const typer = onlineUsers[socket.id]?.name;
    io.to(roomId).emit('doneTyping', typer);
  });
}

export default talkSocket;