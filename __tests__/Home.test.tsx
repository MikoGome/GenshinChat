import {render,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';
import Home from '../client/containers/Home';
import { BrowserRouter } from 'react-router-dom';

function MockHome():JSX.Element {
  return (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  )
}

describe('Home', () => {
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
});