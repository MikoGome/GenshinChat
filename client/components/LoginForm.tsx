import React from "react";

function LoginForm({login, changeLogin, submit}) {

  const gender:JSX.Element = (
    <label>Male or Female?
      <p>
        <button onClick={(e):void => e.preventDefault()}>Male</button>
        <button onClick={(e):void => e.preventDefault()}>Female</button>
      </p>
    </label>
  )

  return(
    <div className="LoginForm appearBottom">
      <img className="genshin-logo" src="https://cdn.steamgriddb.com/logo_thumb/944eefd22dfe99fe7631b8ecc732c7cf.png" />
      <form onSubmit={submit}>
      <h1>{login ? 'Login' : 'Sign Up'}</h1>
      <label>Username:
        <input data-testid="username-input" required name="username"/>
      </label>
      <label>Password:
        <input data-testid="password-input" required type="password" name="password"/>
      </label>
      {login || gender}
      <button type='submit'>Login</button>
      </form>
        <div className="switch-caption">
        <p>
          {login ? 'Not a member?' : 'Already a member?'}
        </p>
        <button onClick={():void => changeLogin(!login)}>{login ? 'Sign Up' : 'Login'}</button>
      </div>
    </div>
  )
}

export default LoginForm;