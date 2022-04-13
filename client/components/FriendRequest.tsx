import React, {useRef} from "react";
import {connect} from "react-redux";
import { receivedFriendRequest } from "../actions/actions";

const mapStateToProps = state => ({
  friendRequest: state.page.friendRequest
});

const mapDispatchToProps = dispatch => ({
  updateFriendRequest: () => dispatch(receivedFriendRequest(null))
})

function FriendRequest({friendRequest, updateFriendRequest}): JSX.Element {
  const friendBox:React.MutableRefObject<HTMLDivElement> = useRef();
  console.log('render');
  console.log(friendRequest);

  function accept() {
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