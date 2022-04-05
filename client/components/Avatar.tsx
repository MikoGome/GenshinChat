import React from 'react';
import {connect} from 'react-redux';

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
    <img src={account.main && avatarPortrait}/>
  )
}

export default connect(mapStateToProps, null)(Avatar);