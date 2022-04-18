function chatSocket(socket: any, io: any) {
  socket.on('sendMessage', (data:{name: string, main:string, gender:string, message: string}) => {
    io.emit('newMessage', data);
  });
}

export default chatSocket;