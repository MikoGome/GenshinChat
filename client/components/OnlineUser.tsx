import React from "react";
import { useRef } from "react";
import ForumIcon from '@mui/icons-material/Forum';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {connect} from 'react-redux';
import { iconBig } from "../utils/helperFunctions";

const mapStateToProps = state => ({
  account: state.account,
})

function OnlineUser({account, bond, name, gender, main, socket, socketId}): JSX.Element {
  const li:React.MutableRefObject<HTMLLIElement> = useRef();
  const {picture, backupPicture} = iconBig(main, gender);
  const myName = account.name;

  const sender = {
    name: account.name,
    main: account.main,
    gender: account.gender,
    id: account.id,
    socket: socket.id,
  }

  function addFriend() {
    socket.emit('addFriend', {sendee: socketId, sender});
  }

  function talkTo() {
    socket.emit('talkTo', {sendee: socketId, sender});
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
            <button className={bond ? "hide" : undefined} onClick={addFriend}>
              <PersonAddIcon />
            </button>
            <button onClick={talkTo}>
              <ForumIcon />
            </button>
          </div>
        )
      }
    </li>
  )
}

export default connect(mapStateToProps, null)(OnlineUser);