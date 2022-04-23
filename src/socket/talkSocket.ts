import { Socket } from 'socket.io';
import {v4 as uuidv4} from 'uuid';
import {onlineUsers} from './socket';


interface talkRoomsShape {
  [roomId:string]: {name:string, main: string, gender:string}[]
}

export const talkRooms:talkRoomsShape = {}

function talkSocket(socket: any, io: any) {
  socket.on('talkTo', (data:any) => {
    socket.to(data.sendee).emit('talkRequest', data);
  });

  socket.on('initiateTalk', (data:any) => {
    const roomId = data.roomId || uuidv4();
    if(!talkRooms[roomId]?.length) talkRooms[roomId] = []; //if condition, stops resetting the room every invite
    const {participantA, participantB} = data;
    io.to(participantA.socket).emit('beginTalk', roomId);
    io.to(participantB.socket).emit('beginTalk', roomId);
  });

  socket.on('joinTalkRoom', (roomId:string) => {
    socket.join(roomId);
    if(!socket.room) {
      socket.room = roomId;
      talkRooms[roomId].push(onlineUsers[socket.id]);
    }
    io.to(roomId).emit('joinTalkRoom', {roomId, participants: talkRooms[roomId]});
  });

  socket.on('talk', (data:{name: string, main:string, gender:string, message: string, roomId: string}) => {
    const {name, main, gender ,message, roomId} = data;
    const newTalk = {name, main, gender, message};
    io.to(roomId).emit('newTalk', newTalk);
  });

  socket.on('leaveRoom', () => {
    if(talkRooms[socket.room]) {
      const filteredRoom = talkRooms[socket.room].filter(el => {
        return el.name !== onlineUsers[socket.id].name
      });
      talkRooms[socket.room] = filteredRoom;
      io.to(socket.room).emit('updateRoom', {participants: filteredRoom});
      delete socket.room;
    }
  });
}

export default talkSocket;