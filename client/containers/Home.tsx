import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import NavBar from '../components/NavBar';
import OnlineBar from '../components/OnlineBar';
import Chat from '../components/chat/Chat';
import Avatar from '../components/Avatar';
import { authenticate } from "../actions/asyncActions";
import './stylesheets/Home.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function Home({account, page, authenticate}): JSX.Element {

  const navigate = useNavigate();

  document.onvisibilitychange = () => {
    if(document.visibilityState === 'hidden') {
      account.socket.emit('inactive');
    } else if(document.visibilityState === 'visible') {
      account.socket.emit('active');
    }
  };
  
  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  return (
    <div className="home">
      <NavBar current="home"/>
      <main>
        <OnlineBar users={page.users} socket={account.socket} friends={page.friends}/>
        <Chat account={account} room={page}/>
        <Avatar />
      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);