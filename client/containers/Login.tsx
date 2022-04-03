import React, { createContext, useState } from "react";
import LoginForm from '../components/LoginForm.tsx';
import LoginCharacter from '../components/LoginCharacter.tsx';
import { validate } from '../utils/helperFunctions.ts';

import './stylesheets/Login.scss';

export const GenderContext = createContext(null);

function Login(): JSX.Element {
  
  const [login, changeLogin] = useState<boolean>(true);
  const [gender, changeGender] = useState<string>(null);

  document.title = 'Genshin Chat | ' + (login ? 'Login' : 'Sign Up');
  
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
      .then(data => console.log(data));
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