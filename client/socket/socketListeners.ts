import * as actions from '../actions/actions';
import { getFriends } from '../actions/asyncActions';

import {sfx} from '../assets/preload';

function socketListeners(socket, dispatch) {

  socket.on('updateOnlineUsers', (data) => {
    dispatch(actions.updateOnlineUsers(data));
  });

  socket.on('newMessage', (data) => {
    dispatch(actions.sendMessage(data));
  });

  socket.on('friendRequest', (data) => {
    sfx(8);
    dispatch(actions.receivedFriendRequest(data));
  });

  socket.on('bonded', (data) => {
    dispatch(getFriends(data));
  });

  socket.on('talkRequest', (data) => {
    sfx(8);
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

  socket.on('typing', (typer:string) => {
    dispatch(actions.typing(typer));
  });

  socket.on('doneTyping', (typer:string) => {
    dispatch(actions.doneTyping(typer));
  });

  socket.on('updatePartner', (data) => {
    dispatch(actions.updateRoom(data));
  });

  socket.on('inactive', (data) => {
    dispatch(actions.updateInactive(data));
  });

  socket.on('active', (data) => {
    dispatch(actions.updateInactive(data));
  });
}

export default socketListeners;