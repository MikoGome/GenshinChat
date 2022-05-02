import React, {useRef} from 'react';
import {connect} from 'react-redux';

import './stylesheets/Avatar.scss';

import { portrait } from '../utils/helperFunctions';

const mapStateToProps = state => ({
  account: state.account
});

function Avatar({account}) {
 const avatarPortrait =  portrait(account.main, account.gender);

 const avatar = useRef<HTMLImageElement>();

 function appear(e: React.SyntheticEvent<HTMLImageElement>): void {
  if(account.main === 'ayaka') {
    avatar.current.style.top = '-15%';
  }
  (e.target as HTMLImageElement).classList.add('avatar-appear'); 
 }
 
  return(
    <div className="avatar">
      <img
         src={account.main && avatarPortrait} 
         onLoad={appear}
         ref={avatar}
      />
    </div>
  )
}

export default connect(mapStateToProps, null)(Avatar);