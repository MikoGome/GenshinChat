import React, {useRef} from "react";
import { useNavigate } from "react-router-dom";
import {connect} from "react-redux";
import { receivedTalkRequest, leaveTalk } from "../actions/actions";
import { iconBig } from "../utils/helperFunctions";

import {sfx} from '../assets/preload';

import './stylesheets/Request.scss';

const mapStateToProps = state => ({
  account: state.account,
  talkRequest: state.talk.talkRequest
});

const mapDispatchToProps = dispatch => ({
  updateTalkRequest: () => dispatch(receivedTalkRequest(null)),
  leaveTalk: () => dispatch(leaveTalk())
})

function TalkRequest({account,leaveTalk, talkRequest, updateTalkRequest}): JSX.Element {
  
  const navigate = useNavigate();

  const talkBox:React.MutableRefObject<HTMLDivElement> = useRef();
  function accept() {
    const participantA = {
      id: account.id,
      socket: account.socket.id
    }
    const participantB = {
      id: talkRequest.sender.id,
      socket: talkRequest.sender.socket 
    }

    const roomId = talkRequest.roomId;

    account.socket.emit('leaveRoom');
    leaveTalk();
    account.socket.emit('initiateTalk', {participantA, participantB, roomId});
    updateTalkRequest();
    sfx(5);
    navigate('/talk');
  }

  function decline() {
    sfx(4);
    updateTalkRequest();
  }

  const senderMain = talkRequest?.sender.main;
  const senderGender = talkRequest?.sender.gender;
  const picture = iconBig(senderMain, senderGender);

  if(talkRequest) {
    sfx(8);
    return (
      <div className="request-box box-bubbling" ref={talkBox}>
        <div className="portrait">
          <img src={picture} />
        </div>
        <div className="request request-bubbling">
          <div>
            <h1>
              {talkRequest.sender.name}
            </h1>
            <h3>wishes to talk</h3>
          </div>
          <div className="buttons">
            <button className="accept" onClick={accept}>Talk</button>
            <button className="decline" onClick={decline}>Ignore</button>
          </div>
        </div>
      </div>
    )
  } else return null;
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TalkRequest);