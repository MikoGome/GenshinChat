import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import CharactersBox from '../components/profile/CharactersBox';
import './stylesheets/Profile.scss';
import CharactersPreview from '../components/profile/CharactersPreview';
import CharacterDescription from '../components/profile/CharacterDescription';
import { updateSpotlight } from '../actions/actions';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  updateSpotlight: (payload) => dispatch(updateSpotlight(payload))
});

function Profile({account, authenticate, updateSpotlight}): JSX.Element {

  const navigate = useNavigate();
  
  useEffect(() => {
    authenticate();
  }, []);

  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  useEffect(() => {
    return () => {
      account.main && updateSpotlight(account.main);
    }
  }, [account.main]);

  return (
    <div className="profile">
      <NavBar current="profile"/>
      <main>
        <div className="avatar-hold">
          <CharactersPreview characters_owned={account.characters_owned} gender={account.gender}/>
        </div>
        <div className="character-box-hold">
          <CharacterDescription gender={account.gender}/>
          <CharactersBox account={account} gender={account.gender}/>
        </div>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);