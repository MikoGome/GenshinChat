import React from 'react';
import {screen, render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'whatwg-fetch';

import Chatroom from '../client/containers/Chatroom';


xdescribe('Chatroom', () => {
  beforeEach(() => {
    render(<Chatroom/>);
  });

  xit('message box should be empty when rendered', () => {
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveValue('');
  });

  xit('message should disappear when submit is clicked', () => {
    const submitElement = screen.getByRole('button');
    const inputElement = screen.getByRole('textbox');
    userEvent.type(inputElement, 'hello');
    userEvent.click(submitElement);
    expect(inputElement).toHaveValue('');
  });

  // xit('should render a message when submit is clicked', async () => {
  //   const submitElement = screen.getByRole('button');
  //   const inputElement = screen.getByRole('textbox');
  //   userEvent.type(inputElement, 'hello');
  //   userEvent.click(submitElement);
  //   const messageElement = await screen.findByText('hello');
  //   expect(messageElement).toBeInTheDocument();
  // });
});