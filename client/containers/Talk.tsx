import React, {useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import { leaveTalk } from '../actions/actions';

import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';
import MyAvatar from '../components/talk/MyAvatar';
import Partner from '../components/talk/Partner';
import Participant from '../components/talk/Participant';

import { account } from '../reducers/accountReducer';
import { talkStateShape } from '../reducers/talkReducer';

import './stylesheets/Talk.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  talk: state.talk
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  leaveTalk: () => dispatch(leaveTalk())
});

interface TalkProps {
  account: account,
  authenticate: Function,
  talk: talkStateShape,
  leaveTalk: Function
}


const Talk: React.FC<TalkProps> = ({account, authenticate, talk, leaveTalk}): JSX.Element => {
  console.log('account');
  const navigate = useNavigate();

  
  useEffect(() => {
    authenticate();
  }, []);
  
  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  if(!talk.roomId) {
    return(
     <div className="talk-inactive">
        <NavBar current="talk"/>
        <main>
        <div className="info-box">
            <h1>Currently Not Talking To Anyone</h1>
            <h1>Invite Someone To Talk To</h1>
        </div>
        <MyAvatar name={account.name} gender={account.gender} main={account.main} typer={talk.typer}/>
        </main>
      </div>
    )
  }

  const partners = [];
  const participants = [];

  talk.participants.forEach((el: talkStateShape["focus"], index) => {
    if(el.name !== account.name) {
      partners.push(<Partner key={'partner_' + index} {...el}/>);
      participants.push(<Participant key={'participant_' + index} {...el}/>);
    }
  });

  function leaveRoom() {
    account.socket.emit('leaveRoom');
    leaveTalk();
  }

  return(
    <div className="talk">
      <NavBar current="talk"/>
      <main>
      <div className="chat-bar">
        <div className="participants">{participants}</div>
        <button className="button-hover" onClick={leaveRoom}>Leave</button>
      </div>
      <div className="partners">
        {partners}
      </div>
      <Chat account={account} room={talk}/>
      <MyAvatar name={account.name} gender={account.gender} main={account.main} typer={talk.typer}/>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk);