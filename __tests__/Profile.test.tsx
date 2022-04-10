import {render, screen, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import React from 'react';
import userEvent from '@testing-library/user-event';
import Profile from '../client/containers/Profile';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../client/store';
import io from 'socket.io-client';
import 'regenerator-runtime';

jest.mock('socket.io-client', () => {
  const mSocket = {
    emit: jest.fn(),
  };
  return jest.fn(() => mSocket);
});

function MockProfile({account}):JSX.Element {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Profile account={account}/>
      </BrowserRouter>
    </Provider>
  )
}

describe('Profile', () => {

  it('should display your username', () => {
    render(<MockProfile account={{name: 'Miko'}}/>);
    const headingElement = screen.getByRole('heading', {name: 'Miko', level: 1});
    expect(headingElement).toBeInTheDocument();
  });

  it('should display your main', () => {
    render(<MockProfile account={{main: 'hu-tao'}} />);
    const hutaoElement = screen.getByText(/Hu Tao/i);
    expect(hutaoElement).toBeInTheDocument();

  });

  it('name of character should be title case', () => {
    render(<MockProfile account={{main: 'hu-tao'}} />);
    const hutaoElement = screen.getByRole('heading', {name: 'Hu Tao', level: 1});
    expect(hutaoElement.textContent).toBe('Hu Tao');
    render(<MockProfile account={{main: 'qiqi'}} />);
    const qiqiElement = screen.getByRole('heading', {name: 'Qiqi', level: 1});
    expect(qiqiElement.textContent).toBe('Qiqi');
    render(<MockProfile account={{main: 'traveler-anemo', gender: 'male'}} />);
    const aetherElement = screen.getByRole('heading', {name: 'Aether', level: 1});
    expect(aetherElement.textContent).toBe('Aether');
    render(<MockProfile account={{main: 'traveler-anemo', gender: 'female'}} />);
    const lumineElement = screen.getByRole('heading', {name: 'Lumine', level: 1});
    expect(lumineElement.textContent).toBe('Lumine');
  });

  it('should have a box named Characters', () => {
    expect(screen.getByText(/characters/i)).toBeInTheDocument();
  });

  it('should render how the correct number of characters in boxes according to the prop passed in', () => {
    const {container} = render(<MockProfile account = {{characters_owned:[{name: 'hu-tao'}, {name: 'aether'}]}}/>);
    const characters = container.querySelectorAll('.character-profile');
    expect(characters.length).toBe(2);
  });
});