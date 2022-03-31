import React, { useState } from "react";
import LoginForm from '../components/LoginForm.tsx';
import LoginCharacter from '../components/LoginCharacter.tsx';

import './stylesheets/Login.scss';

function Login(): JSX.Element {
  const [login, changeLogin] = useState<boolean>(true);

  document.title = 'Genshin Chat | ' + (login ? 'Login' : 'Sign Up');
  
  function submit(e):void {
    e.preventDefault();
    
    const endPoint:string = '/api/' + (login ? 'login' : 'signup');

    interface validation {
      readonly username: string,
      readonly password: string,
      readonly gender?: string
    }

    const accountInfo: validation = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    fetch(endPoint, {
      method: 'POST',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify(accountInfo)
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }

  return (
    <div className='Login'>
      <LoginForm login={login} changeLogin={changeLogin} submit={submit} />
      <LoginCharacter />
    </div>
  );
}

export default Login;