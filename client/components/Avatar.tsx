import React from 'react';
import {connect} from 'react-redux';
import './stylesheets/Avatar.scss';

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
      <img
         src={account.main && avatarPortrait} 
         onLoad={(e:any) => e.target.classList.add('avatar-appear')}
      />
    </div>
  )
}

export default connect(mapStateToProps, null)(Avatar);