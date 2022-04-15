import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate, getFriendsPossession } from '../actions/asyncActions';
import NavBar from '../components/NavBar';
import Friend from '../components/friends/Friend';
import './stylesheets/Friends.scss';

const mapStateToProps = (state) => ({
  account: state.account,
  friends: state.page.friends,
  online: state.page.users
});

const mapDispatchToProps = (dispatch) => ({
  authenticate: () => dispatch(authenticate()),
  getFriendsPossession: (payload) => dispatch(getFriendsPossession(payload))
});

function Friends({account, authenticate, friends, getFriendsPossession}): JSX.Element {
  console.log('friends', friends);

  const navigate = useNavigate();

  useEffect(() => {
    authenticate();
    console.log('mounted');
    account.authenticated && getFriendsPossession(friends);
  }, []);
  
  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
    getFriendsPossession(friends);
  }, [account.authenticated]);

  const friendsList = [];
  let counter = 0;
  for(const key in friends) {
    counter++;
    const main = friends[key].possession?.main;
    console.log('main', main);
    const friend = main && 
      <Friend 
        key={key + '_' + main} 
        index={counter} name={key} 
        gender={friends[key].gender} 
        main={main}
      />;
    friendsList.push(friend);
  }
  console.log('friendsList', friendsList);

  return (
    <div className="friends">
      <NavBar current="friends"/>
      <main>
        {friendsList}
      </main>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(Friends);