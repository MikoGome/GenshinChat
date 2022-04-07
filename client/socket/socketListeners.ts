import {updateOnlineUsers, sendMessage} from '../actions/actions';

function socketListeners(socket, dispatch) {

  socket.on('updateOnlineUsers', (data) => {
    const onlineUsers = Object.values(data);
    dispatch(updateOnlineUsers(onlineUsers));
  });

  socket.on('newMessage', (data) => {
    dispatch(sendMessage(data));
  });
}

export default socketListeners;