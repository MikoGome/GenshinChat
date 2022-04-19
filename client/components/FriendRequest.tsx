import React, {useRef} from "react";
import {connect} from "react-redux";
import { receivedFriendRequest } from "../actions/actions";
import { iconBig } from "../utils/helperFunctions";

import './stylesheets/Request.scss';

const mapStateToProps = state => ({
  account: state.account,
  friendRequest: state.page.friendRequest
});

const mapDispatchToProps = dispatch => ({
  updateFriendRequest: () => dispatch(receivedFriendRequest(null))
})

function FriendRequest({account, friendRequest, updateFriendRequest}): JSX.Element {
  const friendBox:React.MutableRefObject<HTMLDivElement> = useRef();
  function accept() {
    const friendA = {
      id: account.id,
      socket: account.socket.id
    }
    const friendB = {
      id: friendRequest.sender.id,
      socket: friendRequest.sender.socket 
    }

    account.socket.emit('friendship', {friendA, friendB});
    updateFriendRequest();
  }

  function decline() {
    updateFriendRequest();
  }

  const senderMain = friendRequest?.sender.main;
  const senderGender = friendRequest?.sender.gender;
  const photo = iconBig(senderMain, senderGender);

  if(friendRequest) {
    return (
      <div className="request-box box-bubbling" ref={friendBox}>
        <div className="portrait">
          <img src={photo.picture} onError={e => e.target.src=photo.backupPicture}/>
        </div>
        <div className="request request-bubbling">
          <div>
            <h1>
              {friendRequest.sender.name}
            </h1>
            <h3>wishes to be your friend</h3>
          </div>
          <div className="buttons">
            <button className="accept" onClick={accept}>Accept</button>
            <button className="decline" onClick={decline}>Decline</button>
          </div>
        </div>
      </div>
    )
  } else return null;
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);