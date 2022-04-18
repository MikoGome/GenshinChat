import query from '../models/Users';

function friendSocket(socket: any, io: any) {
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
}

export default friendSocket;