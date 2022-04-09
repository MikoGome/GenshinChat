import React from 'react';
import {connect} from 'react-redux';
import './stylesheets/Avatar.scss';
import { animateLeft } from '../utils/helperFunctions';

const mapStateToProps = state => ({
  account: state.account
});

function Avatar({account}) {
  let avatarPortrait = `https://api.genshin.dev/characters/${account.main}/portrait`;
  if(account.main?.startsWith('traveler')) {
    if(account.gender === 'male') {
      avatarPortrait += 'm';
    } else if(account.gender === 'female') {
      avatarPortrait += 'f';
    }
  }

  return(
    <div className="avatar">
       <img className="floating" src={account.main && avatarPortrait} onLoad={e => animateLeft(e)}/>
    </div>
  )
}

export default connect(mapStateToProps, null)(Avatar);