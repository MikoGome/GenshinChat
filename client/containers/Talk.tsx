import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';

import NavBar from '../components/NavBar';
import Chat from '../components/chat/Chat';
import Avatar from '../components/Avatar';
import Partner from '../components/talk/Partner';

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
     <div className="talk">
        <NavBar current="talk"/>
        <main>
        <h1>Currently Not Talking To Anyone</h1>
        <Avatar />
        </main>
      </div>
    )
  }

  const partners = talk.participants
    .map((el: talkStateShape["focus"]) => {
      if(el.name !== account.name) return <Partner {...el}/>;
    });

  return(
    <div className="talk">
      <NavBar current="talk"/>
      <main>
      <div className="partners">
        {partners}
      </div>
      <Chat account={account} room={talk}/>
      <Avatar />
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Talk);