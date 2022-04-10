import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import Avatar from '../components/Avatar';
import CharactersBox from '../components/profile/CharactersBox';
import './stylesheets/Profile.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate())
});

function Profile({account, authenticate}): JSX.Element {

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
    <div className="profile">
      <NavBar current="profile"/>
      <main>
        <div className="avatar-hold">
          <h1>{account.name}</h1>
          <Avatar />
        </div>
        <CharactersBox account={account}/>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);