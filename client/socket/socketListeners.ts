import {updateOnlineUsers, sendMessage, receivedFriendRequest} from '../actions/actions';
import { getFriends } from '../actions/asyncActions';

function socketListeners(socket, dispatch) {

  socket.on('updateOnlineUsers', (data) => {
    const onlineUsers = Object.entries(data);
    dispatch(updateOnlineUsers(onlineUsers));
  });

  socket.on('newMessage', (data) => {
    dispatch(sendMessage(data));
  });

  socket.on('friendRequest', (data) => {
    dispatch(receivedFriendRequest(data));
  });

  socket.on('bonded', (data) => {
    dispatch(getFriends(data));
  });
}

export default socketListeners;