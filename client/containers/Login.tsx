import React, { createContext, useEffect, useState } from "react";
import LoginForm from '../components/registration/LoginForm';
import LoginCharacter from '../components/registration/LoginCharacter';
import { validate } from '../utils/helperFunctions';
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { logIn } from '../actions/asyncActions';

import './stylesheets/Login.scss';

export const GenderContext = createContext(null);

const mapStateToProps = state => ({
  account: state.account
});

const mapDispatchToProps = dispatch => ({
  logIn: (url, account) => dispatch(logIn(url, account))
});

function Login({account, logIn}): JSX.Element {
  
  const [login, changeLogin] = useState<boolean>(true);
  const [gender, changeGender] = useState<string>(null);

  document.title = 'Genshin Chat | ' + (login ? 'Login' : 'Sign Up');

  const navigate = useNavigate();

  useEffect(() => {
    if(account.authenticated === true) {
      navigate('/');
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

    if(!validate(login, accountInfo)) return console.log('invalid');

    logIn(endPoint, accountInfo);
  }

  return (
    <GenderContext.Provider value={{gender, changeGender}}>
      <div className='login'>
        <LoginForm login={login} changeLogin={changeLogin} submit={submit} />
        <LoginCharacter login={login}/>
      </div>
    </GenderContext.Provider>
    
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);