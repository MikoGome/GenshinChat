import React from 'react';
import {connect} from 'react-redux';

import './stylesheets/Avatar.scss';

import { portrait } from '../utils/helperFunctions';

const mapStateToProps = state => ({
  account: state.account
});

function Avatar({account}) {
 const avatarPortrait =  portrait(account.main, account.gender);

 function appear(e: React.SyntheticEvent<HTMLImageElement>): void {
  (e.target as HTMLImageElement).classList.add('avatar-appear'); 
 }
 
  return(
    <div className="avatar">
      <img
         src={account.main && avatarPortrait} 
         onLoad={appear}
      />
    </div>
  )
}

export default connect(mapStateToProps, null)(Avatar);