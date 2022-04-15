import React from 'react';
import {render, screen} from '@testing-library/react';
import Friends from '../client/containers/Friends';
import {Provider} from 'react-redux';
import store from '../client/store';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import 'regenerator-runtime';

function MockFriends(): JSX.Element {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Friends />
      </BrowserRouter>
    </Provider>
  )
}

describe('Friends', () => {
  beforeEach(() => {
    render(<MockFriends />)
  });
  
});