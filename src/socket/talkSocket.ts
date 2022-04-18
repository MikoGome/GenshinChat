function talkSocket(socket: any, io: any) {
  socket.on('talkTo', (data:any) => {
    console.log(data);
  });
}

export default talkSocket;