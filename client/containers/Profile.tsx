import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import CharactersBox from '../components/profile/CharactersBox';
import './stylesheets/Profile.scss';
import CharactersPreview from '../components/profile/CharactersPreview';
import CharacterDescription from '../components/profile/CharacterDescription';

const mapStateToProps = (state) => ({
  account: state.account,
  page: state.page,
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
});

function Profile({account, authenticate}): JSX.Element {
  
  let characterInit = account.main;
  if(account.main?.startsWith('traveler')) {
    if(account.gender === 'male') {
      characterInit = 'aether';
    } else if(account.gender === 'female') {
      characterInit = 'lumine';
    }
  }

  const [characterPreview, setCharacterPreview] = useState<string>(characterInit);

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
          <CharactersPreview spotlight={characterPreview} characters_owned={account.characters_owned} gender={account.gender}/>
        </div>
        <div className="character-box-hold">
          <CharacterDescription name={characterPreview}/>
          <CharactersBox account={account} change={setCharacterPreview} gender={account.gender}/>
        </div>
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);