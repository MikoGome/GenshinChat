import React, { createContext, useState } from "react";
import LoginForm from '../components/LoginForm';
import LoginCharacter from '../components/LoginCharacter';
import { validate } from '../utils/helperFunctions';
import { useNavigate } from "react-router-dom";

import './stylesheets/Login.scss';

export const GenderContext = createContext(null);

function Login(): JSX.Element {
  
  const [login, changeLogin] = useState<boolean>(true);
  const [gender, changeGender] = useState<string>(null);

  document.title = 'Genshin Chat | ' + (login ? 'Login' : 'Sign Up');

  const navigate = useNavigate();
  
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


    fetch(endPoint, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(accountInfo)
    })
      .then(res => res.json())
      .then(data => {
        if(data) {
          navigate('/');
        }
      });
  }

  return (
    <GenderContext.Provider value={{gender, changeGender}}>
      <div className='Login'>
        <LoginForm login={login} changeLogin={changeLogin} submit={submit} />
        <LoginCharacter login={login}/>
      </div>
    </GenderContext.Provider>
    
  );
}

export default Login;