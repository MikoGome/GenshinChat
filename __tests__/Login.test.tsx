import {screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/';
import 'whatwg-fetch';
import React from 'react';

import Login from '../dev/src/containers/Login.tsx';

describe('login', () => {
  
  beforeEach(() => {
    render(<Login />);
  })

  it('should display Login as the heading', () => {
    const headingElement = screen.getByRole('heading', {name: 'Login', level: 1});
    expect(headingElement).toBeInTheDocument();
  });
  
  it('button to sign up should be present', () => {
    const signUpElement = screen.getByRole('button', {name: 'Sign Up'});
    expect(signUpElement).toBeInTheDocument();
  });

  it('should switch to Sign Up when user is registering', () => {
    const signUpElement = screen.getByRole('button', {name: 'Sign Up'});
    fireEvent.click(signUpElement);
    const headingElement = screen.getByRole('heading', {name: 'Sign Up', level: 1});
    expect(headingElement).toBeInTheDocument();
  });

  it('username and password fields and submit button should be present', () => {
    const submitElement = screen.getByRole('button', {name: 'Login'});
    const usernameInputElement = screen.getByTestId('username-input');
    const passwordInputElement = screen.getByTestId('password-input');
    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  it('character image should be present', () => {
    const imageElement = screen.getByAltText(/random genshin character/i);
    expect(imageElement).toBeInTheDocument();
  });

  it('gender should be present when signing up', () => {
    expect(screen.queryByLabelText(/gender/i)).toBeNull();
    const signUpElement = screen.getByRole('button', {name: 'Sign Up'});
    fireEvent.click(signUpElement);
    expect(screen.queryByLabelText(/gender/i)).not.toBeNull();
  })
});
