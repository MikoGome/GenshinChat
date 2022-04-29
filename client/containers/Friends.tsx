import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {connect} from 'react-redux';
import { authenticate, removeFriend } from '../actions/asyncActions';
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
  removeFriend: (payload: {removeId:string, accountId:string}) => dispatch(removeFriend(payload))
});

function Friends({account, authenticate, friends, removeFriend}): JSX.Element {

  const navigate = useNavigate();

  useEffect(() => {
    authenticate();
  }, []);
  
  useEffect(() => {
    if(account.authenticated === false) {
      navigate('/login');
    }
  }, [account.authenticated]);

  const friendsList = [];
  let counter = 0;
  for(const key in friends) {
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
        online={friends[key].online}
        handleRemoveFriend={removeFriend}
      />;
    friendsList.push(friend);
    counter++;
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