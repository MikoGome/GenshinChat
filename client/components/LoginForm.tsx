import React, {useContext} from "react";
import GenshinLogo from '../assets/genshin-logo.png';

import Gender from './Gender.tsx';
import {GenderContext} from '../containers/Login.tsx';

function LoginForm({login, changeLogin, submit}) {
  const {changeGender} = useContext(GenderContext);

  return(
    <div className="LoginForm appearBottom">
      <img className="genshin-logo" src={GenshinLogo} />
      <form onSubmit={submit}>
      <div>
        <h1>
          {login ? 'Login' : 'Sign Up'}
        </h1>
        <aside>{(login ? 'Continue' : 'Start') + ' your adventure in the continent of Teyvat'}</aside>
      </div>
      <label>Username:
        <input data-testid="username-input" required name="username"/>
      </label>
      <label>Password:
        <input data-testid="password-input" required type="password" name="password"/>
      </label>
      {login || <Gender />}
      <button type='submit'>{login ? 'LOGIN' : 'SIGN UP'}</button>
      </form>
      <div className="switch-caption">
        <p>
          {(login ? 'Not' : 'Already') + ' an adventurer?'}
        </p>
        <button onClick={():void => {
          changeLogin(!login)
          if(login === false) {
            changeGender(null);
          }
        }}>{login ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
  )
}

export default LoginForm;