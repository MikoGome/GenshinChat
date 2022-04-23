import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';

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
  authenticate: () => dispatch(authenticate())
});


const Talk: React.FC<{account: account, authenticate:Function, talk: talkStateShape}> = ({account, authenticate, talk}): JSX.Element => {
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
        <MyAvatar name={account.name} gender={account.gender} main={account.main}/>
        </main>
      </div>
    )
  }

  const partners = [];
  const participants = [];

  talk.participants.forEach((el: talkStateShape["focus"]) => {
    if(el.name !== account.name) {
      partners.push(<Partner {...el}/>);
      participants.push(<Participant {...el}/>);
    }
  });

  function leaveRoom() {
    account.socket.emit('leaveRoom');
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
      <MyAvatar name={account.name} gender={account.gender} main={account.main} />
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk);