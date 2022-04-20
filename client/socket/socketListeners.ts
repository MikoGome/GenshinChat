import * as actions from '../actions/actions';
import { getFriends } from '../actions/asyncActions';

function socketListeners(socket, dispatch) {

  socket.on('updateOnlineUsers', (data) => {
    const onlineUsers = Object.entries(data);
    dispatch(actions.updateOnlineUsers(onlineUsers));
  });

  socket.on('newMessage', (data) => {
    dispatch(actions.sendMessage(data));
  });

  socket.on('friendRequest', (data) => {
    dispatch(actions.receivedFriendRequest(data));
  });

  socket.on('bonded', (data) => {
    dispatch(getFriends(data));
  });

  socket.on('talkRequest', (data) => {
    dispatch(actions.receivedTalkRequest(data));
  });

  socket.on('beginTalk', (roomId) => {
    socket.emit('joinTalkRoom', roomId);
  });

  socket.on('joinTalkRoom', (data) => {
    dispatch(actions.joinRoom(data));
  });

  socket.on('newTalk', (data) => {
    dispatch(actions.sendTalk(data));
  });

  socket.on('updateRoom', (data) => {
    dispatch(actions.updateRoom(data));
  });
}

export default socketListeners;