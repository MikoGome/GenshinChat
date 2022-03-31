import React, { useState } from "react";
import LoginForm from '../components/LoginForm.tsx';
import LoginCharacter from '../components/LoginCharacter.tsx';

import './stylesheets/Login.scss';

function Login(): JSX.Element {
  const [login, changeLogin] = useState(true);

  document.title = 'Genshin Chat | ' + (login ? 'Login' : 'Sign Up');
  
  function submit(e) {
    e.preventDefault();
    const endPoint = '/api/' + (login ? 'login' : 'signup');

    type validation = {
      username: String,
      password: String
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