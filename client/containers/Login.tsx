import React, { createContext, useEffect, useState } from "react";
import LoginForm from '../components/registration/LoginForm';
import LoginCharacter from '../components/registration/LoginCharacter';
import { validate } from '../utils/helperFunctions';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from '../actions/asyncActions';

import './stylesheets/Login.scss';
import { sfx } from "../assets/preload";

export const GenderContext = createContext(null);

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  logIn: (url, account):void => dispatch(logIn(url, account))
});

function Login({account, logIn}): JSX.Element {
  
  const [login, changeLogin] = useState<boolean>(true);
  const [gender, changeGender] = useState<string>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if(account.authenticated === true) {
      sfx(9);
      navigate('/');
    } else if(account.authenticated === 'signedUp') {
      sfx(9);
      changeLogin(true);
    } else {
      sfx(4);
    }
  }, [account.authenticated]);
  
  function submit(e):void {
    e.preventDefault();
   
    const endPoint:string = '/api/' + (login ? 'login' : 'signup');

    interface accountStructure {
      readonly username: string,
      readonly password: string,
      gender?: string
    }

    const accountInfo: accountStructure = {
      username: e.target.username.value,
      password: e.target.password.value,
    }

    if(e.target.gender) {
      accountInfo.gender = e.target.gender.value;
    }

    if(!validate(login, accountInfo)) return;

    logIn(endPoint, accountInfo);
    e.target.username.value = '';
    e.target.password.value = '';
  }

  return (
    <GenderContext.Provider value={{gender, changeGender}}>
      <div className='login'>
        <LoginForm message={account.authenticated?.message} login={login} changeLogin={changeLogin} submit={submit} />
        <LoginCharacter login={login}/>
      </div>
    </GenderContext.Provider>
    
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);