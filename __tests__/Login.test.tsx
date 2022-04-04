import React from 'react';
import {screen, render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/';
import 'whatwg-fetch';
import { BrowserRouter } from 'react-router-dom';

import Login from '../client/containers/Login';

function MockLogin(): JSX.Element {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  )
}

describe('Login', ():void => {
  
  beforeEach(():void => {
    render(<MockLogin />);
  });

  it('should display Login as the heading', ():void => {
    const headingElement:HTMLElement = screen.getByRole('heading', {name: /Login/i, level: 1});
    expect(headingElement).toBeInTheDocument();
  });
  
  it('button to sign up should be present', ():void => {
    const signUpElement:HTMLElement = screen.getByRole('button', {name: /Sign Up/i});
    expect(signUpElement).toBeInTheDocument();
  });

  it('should switch to Sign Up when user is registering', ():void => {
    const signUpElement:HTMLElement = screen.getByRole('button', {name: /Sign Up/i});
    fireEvent.click(signUpElement);
    const headingElement:HTMLElement = screen.getByRole('heading', {name: /Sign Up/i, level: 1});
    expect(headingElement).toBeInTheDocument();
  });

  it('username and password fields and submit button should be present', ():void => {
    const submitElement:HTMLElement = screen.getByRole('button', {name: /Login/i});
    const usernameInputElement:HTMLElement = screen.getByTestId(/username-input/i);
    const passwordInputElement:HTMLElement = screen.getByTestId(/password-input/i);
    expect(submitElement).toBeInTheDocument();
    expect(usernameInputElement).toBeInTheDocument();
    expect(passwordInputElement).toBeInTheDocument();
  });

  it('character image should be present', ():void => {
    const imageElement:HTMLElement = screen.getByAltText(/random genshin character/i);
    expect(imageElement).toBeInTheDocument();
  });

  it('gender should be present when signing up', ():void => {
    expect(screen.queryByText(/male or female\?/i)).toBeNull();
    const signUpElement:HTMLElement = screen.getByRole('button', {name: /Sign Up/i});
    fireEvent.click(signUpElement);
    expect(screen.queryByText(/male or female\?/i)).not.toBeNull();
  });

  it('should check on gender clicked', ():void => {
    const signUpElement:HTMLElement = screen.getByRole('button', {name: /Sign Up/i});
    fireEvent.click(signUpElement);
    const femaleGenderElement:HTMLElement = screen.getByTestId(/femaleLabel/i);
    fireEvent.click(femaleGenderElement);
    expect(screen.getByTestId('female')).toBeChecked();
  });

  it('textbox value should change when typed in', ():void => {
    const textbox = screen.getByRole('textbox');
    fireEvent.change(textbox, {target: {value: 'Mochi'}});
    expect(textbox).toHaveValue('Mochi');
  });
});
