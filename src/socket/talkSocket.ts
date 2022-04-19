import {v4 as uuidv4} from 'uuid';

function talkSocket(socket: any, io: any) {
  socket.on('talkTo', (data:any) => {
    socket.to(data.sendee).emit('talkRequest', data);
  });

  socket.on('initiateTalk', (data:any) => {
    const {participantA, participantB} = data;

    const roomId = uuidv4();
    io.to(participantA.socket).emit('beginTalk', roomId);
    io.to(participantB.socket).emit('beginTalk', roomId);
  });

  socket.on('joinTalkRoom', (roomId:string) => {
    socket.join(roomId);
    io.to(roomId).emit('joinTalkRoom', roomId);
  });

  socket.on('talk', (data:{name: string, main:string, gender:string, message: string, roomId: string}) => {
    const {name, main, gender ,message, roomId} = data;
    const newTalk = {name, main, gender, message};
    io.to(roomId).emit('newTalk', newTalk);
  });
}

export default talkSocket;