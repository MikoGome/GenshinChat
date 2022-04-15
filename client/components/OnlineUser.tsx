import React from "react";
import { useRef } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  account: state.account,
})

function OnlineUser({account, bond, name, gender, main, socket, socketId}): JSX.Element {
  const myName = account.name;
  const li:React.MutableRefObject<HTMLLIElement> = useRef();
  const append = gender === 'male' ? '-aether' : '-lumine';
  const picture = `https://api.genshin.dev/characters/${main}/icon-big${main.startsWith('traveler') ? append : ''}`;
  const backupPicture = `https://api.genshin.dev/characters/${main}/icon`;

  function addFriend(sender) {
    socket.emit('addFriend', {sendee: socketId, sender});
  }

  return(
    <li ref={li}>
      <div className="online-profile">
        <img src={picture} 
          onLoad={() => li.current.classList.add('appearBottom')} 
          onError={(e) => e.target.src=backupPicture}
        />
        <h4>{name}</h4>
      </div>
      {
        myName !== name && (
          <div className="online-bar-buttons">
            <button 
              className={bond ? "hide" : undefined}
              onClick={() => {
                addFriend({
                  name: account.name,
                  main: account.main,
                  id: account.id,
                  socket: socket.id,
                })
              }}
            >
              <PersonAddIcon />
            </button>
            <button><ForumIcon /></button>
          </div>
        )
      }
    </li>
  )
}

export default connect(mapStateToProps, null)(OnlineUser);