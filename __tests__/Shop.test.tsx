import {render, screen} from '@testing-library/react';
import React from 'react';
import Shop from '../client/containers/Shop';
import { Provider } from 'react-redux';
import store from '../client/store';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import 'regenerator-runtime';

function MockShop() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Shop />
      </Provider>
    </BrowserRouter>
  )
}

describe('Shop', () => {

  beforeEach(() => {
    render(<MockShop />);
  });

  it('should display two buttons', () => {
    const buttonElements = screen.getAllByRole('button');
    expect(buttonElements.length).toBe(2);
  });

  it('one button should be Wish For A Character', () => {
    const wishButton = screen.getByRole('button', {name: /wish for a character/i});
    expect(wishButton).toBeInTheDocument();
  });

  it('one button should be Spend Your Mora', () => {
    const moraButton = screen.getByRole('button', {name: /spend your mora/i});
    expect(moraButton).toBeInTheDocument();
  });
});