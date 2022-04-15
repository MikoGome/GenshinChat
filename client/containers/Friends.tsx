import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate, getFriendsPossession, removeFriend } from '../actions/asyncActions';
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
  getFriendsPossession: (payload) => dispatch(getFriendsPossession(payload)),
  removeFriend: (payload: {removeId:string, accountId:string}) => dispatch(removeFriend(payload))
});

function Friends({account, authenticate, friends, getFriends, getFriendsPossession, removeFriend}): JSX.Element {

  const navigate = useNavigate();

  useEffect(() => {
    authenticate();
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
    const id = friends[key].id;
    const friend = main && 
      <Friend 
        key={key + '_' + main} 
        index={counter}
        accountId={account.id}
        friendId={id}
        name={key} 
        gender={friends[key].gender} 
        main={main}
        handleRemoveFriend={removeFriend}
      />;
    friendsList.push(friend);
  }

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