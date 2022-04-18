import React from 'react';
import {connect} from 'react-redux';

import './stylesheets/Avatar.scss';

import { portrait } from '../utils/helperFunctions';

const mapStateToProps = state => ({
  account: state.account
});

function Avatar({account}) {
 const avatarPortrait =  portrait(account.main, account.gender);
 
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