import React, {useRef} from "react";
import {connect} from "react-redux";
import { receivedFriendRequest } from "../actions/actions";

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
  if(friendRequest) {
    return (
      <div className="friend-request friend-bubbling" ref={friendBox}>
        Wishes to be your friend
        <button onClick={accept}>Accept</button>
        <button onClick={decline}>Decline</button>
      </div>
    )
  } else return null;
  
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendRequest);