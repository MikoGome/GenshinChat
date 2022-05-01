import React, { useRef } from "react";
import {connect} from "react-redux";
import '../stylesheets/Friend.scss';
import ForumIcon from '@mui/icons-material/Forum';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { iconBig } from "../../utils/helperFunctions";

const mapStateToProps = state => ({
  account: state.account,
  roomId: state.talk.roomId
})

function Friend({account, accountId, friendId, name, handleRemoveFriend, gender, main, roomId, online, index, socket}): JSX.Element {
  const friend:React.MutableRefObject<HTMLDivElement> = useRef();
  const picture = iconBig(main, gender);

  console.log('socket', socket);

  setTimeout(() => {
    friend.current.classList.add('slow-bubbling');
    online && friend.current.classList.remove('offline');
    friend.current.classList.remove('hide');
  }, 50 * index);

  
  const sender = {
    name: account.name,
    main: account.main,
    gender: account.gender,
    id: account.id,
    socket: account.socket.id,
  }

  
  function talkTo() {
    account.socket.emit('talkTo', {sendee: socket, sender, roomId});
  }

  return(
    <div className="friend hide offline" ref={friend}>
      <div className="left">
        <img 
          src={picture} 
        />
        <h1>{name}</h1>
        <h4 className={'status ' + (online && 'online')}>{online ? 'online' : 'offline'}</h4>
      </div>
      <div className="right">
        <button onClick={() => handleRemoveFriend({removeId: friendId, accountId})}>
          <PersonRemoveIcon className="friend-list-icons" />
        </button>
        {socket && (
          <button onClick={talkTo}>
            <ForumIcon className="friend-list-icon"/>
          </button>
        )}
      </div>
    </div>
  )
}

export default connect(mapStateToProps, null)(Friend);