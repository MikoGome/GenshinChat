import React, {useContext, useRef} from "react";
import GenshinLogo from '../../assets/genshin-logo.png';
import Gender from './Gender';
import {GenderContext} from '../../containers/Login';

import {sfx} from '../../assets/preload';

function LoginForm({message, login, changeLogin, submit}) {
  const {changeGender} = useContext(GenderContext);
  const error = useRef<HTMLElement>();
  
  return(
    <div className="login-form appearBottom">
      <img className="genshin-logo" src={GenshinLogo} />
      <form onSubmit={submit}>
      <div>
        <h1>
          {login ? 'Login' : 'Sign Up'}
        </h1>
        <aside>{(login ? 'Continue' : 'Start') + ' your adventure in the continent of Teyvat'}</aside>
        <aside className="error-message" ref={error}>{message}</aside>
      </div>
      <label>Username:
        <input 
          data-testid="username-input" 
          required 
          name="username" 
          maxLength={20} 
          minLength={3} 
          pattern="[\w]+" 
          title="Must contain only letters/numbers/underscores"
          autoComplete="off"
        />
      </label>
      <label>Password:
        <input 
          data-testid="password-input" 
          required type="password" 
          name="password"
          minLength={4}
        />
      </label>
      {login || <Gender />}
      <button type='submit'>
        {login ? 'LOGIN' : 'SIGN UP'}
      </button>
      </form>
      <div className="switch-caption">
        <p>
          {(login ? 'Not' : 'Already') + ' an adventurer?'}
        </p>
        <button onClick={():void => {
          error.current.innerText='';
          changeLogin(!login)
          sfx(3);
          if(login === false) {
            changeGender(null);
          }
        }}>{login ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
  )
}

export default LoginForm;