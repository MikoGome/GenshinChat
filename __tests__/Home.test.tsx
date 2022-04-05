import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'whatwg-fetch';
import React from 'react';
import Home from '../client/containers/Home';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../client/store';

function MockHome():JSX.Element {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </Provider>
  )
}

describe('Elements present', () => {
  beforeEach(() => {
    render(<MockHome />);
  });

  it('should have a shop tab in the navbar', () => {
    const shopElement = screen.getByText(/shop/i);
    expect(shopElement).toBeInTheDocument();
  });

  it('should have friends tab in the navbar', () => {
    const friendsElement = screen.getByText(/friends/i);
    expect(friendsElement).toBeInTheDocument();
  });

  it('should have a talks tab in the navbar', () => {
    const talksElement = screen.getByText(/talks/i);
    expect(talksElement).toBeInTheDocument();
  });

  it('should have a profile tab in the navbar', () => {
    const profileElement = screen.getByText(/profile/i);
    expect(profileElement).toBeInTheDocument();
  });

  it('should have a logout tab in the navbar', () => {
    const logoutElement = screen.getByText(/logout/i);
    expect(logoutElement).toBeInTheDocument();
  });

  it('should have list items', () => {
    const listElement = screen.getAllByRole('listitem');
    expect(listElement.length).toBe(5);
  });

  it('should have a message textbox', () => {
    const textBoxElement = screen.getByRole('textbox');
    expect(textBoxElement).toBeInTheDocument();
  });

  it('it should have a list to hold all all the messages', () => {
    const chatDisplayElement = screen.getByTestId(/chat-display/i);
    console.log(chatDisplayElement);
    expect(chatDisplayElement).toBeInTheDocument();
  });
});

describe('Functionality', () => {
  beforeEach(() => {
    render(<MockHome />);
  });

  it('textbox should be empty initially', () => {
    const textBoxElement = screen.getByRole('textbox') as HTMLInputElement;
    expect(textBoxElement.value).toBe('');
  });

  it('typing will change the textbox value', () => {
    const textBoxElement = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(textBoxElement, {target: {value: 'hello'}})
    expect(textBoxElement.value).toBe('hello');
  });

  it('click on send button should send the message to chat display', () => {
    const textBoxElement = screen.getByRole('textbox');
    const sendButton = screen.getByRole('button');
    expect(screen.queryByText(/hello/i)).toBe(null);
    fireEvent.change(textBoxElement, {target: {value: 'hello'}})
    fireEvent.click(sendButton);
    expect(screen.getByText(/hello/i)).toBeInTheDocument();
  });

  it('after clicking send, the value of message box should be empty', () => {
    const textBoxElement = screen.getByRole('textbox') as HTMLInputElement;
    const sendButton = screen.getByRole('button');
    fireEvent.change(textBoxElement, {target: {value: 'hello'}})
    fireEvent.click(sendButton);
    expect(textBoxElement.value).toBe('');
  });
});