import React, {useRef} from "react";
import {connect} from "react-redux";
import { receivedTalkRequest } from "../actions/actions";
import { iconBig } from "../utils/helperFunctions";

import './stylesheets/Request.scss';

const mapStateToProps = state => ({
  account: state.account,
  talkRequest: state.talk.talkRequest
});

const mapDispatchToProps = dispatch => ({
  updateTalkRequest: () => dispatch(receivedTalkRequest(null))
})

function TalkRequest({account, talkRequest, updateTalkRequest}): JSX.Element {
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

    account.socket.emit('initiateTalk', {participantA, participantB});
    updateTalkRequest();
  }

  function decline() {
    updateTalkRequest();
  }

  const senderMain = talkRequest?.sender.main;
  const senderGender = talkRequest?.sender.gender;
  const photo = iconBig(senderMain, senderGender);

  if(talkRequest) {
    return (
      <div className="request-box box-bubbling" ref={talkBox}>
        <div className="portrait">
          <img src={photo.picture} onError={e => e.target.src=photo.backupPicture}/>
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