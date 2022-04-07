import React from 'react';
import {connect} from 'react-redux';
import './stylesheets/Avatar.scss';

const mapStateToProps = state => ({
  account: state.account
});

function Avatar({account}) {
  let avatarPortrait = account.main;
  if(account.main?.startsWith('traveler')) {
    if(account.gender === 'male') {
      avatarPortrait = `https://api.genshin.dev/characters/${account.main}/portraitm`;
    } else if(account.gender === 'female') {
      avatarPortrait = `https://api.genshin.dev/characters/${account.main}/portraitf`;
    }
  }

  return(
    <div className="avatar">
       <img src={account.main && avatarPortrait}/>
    </div>
  )
}

export default connect(mapStateToProps, null)(Avatar);