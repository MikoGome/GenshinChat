import {updateOnlineUsers} from '../actions/actions';

function socketListeners(socket, dispatch) {

  socket.on('updateOnlineUsers', (data) => {
    const onlineUsers = Object.values(data);
    dispatch(updateOnlineUsers(onlineUsers));
  });
}

export default socketListeners;