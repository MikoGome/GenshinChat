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

  console.log(account);
  console.log(page.friendRequest);
  const navigate = useNavigate();
  
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
        <OnlineBar users={page.users} socket={account.socket}/>
        <Chat />
        <Avatar />
      </main>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);