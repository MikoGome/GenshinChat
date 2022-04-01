import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../client/containers/Home.tsx';

function MockHome() {
  return (
    <BrowserRouter>
      <Home/>
    </BrowserRouter>
  )
};

describe('home', () => {
  it('filler', ():void => {
    render(<MockHome />);
    screen.debug();
  });
});