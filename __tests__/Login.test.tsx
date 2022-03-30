import {screen, render} from '@testing-library/react';
import '@testing-library/jest-dom/';
import React from 'react';

import Login from '../dev/src/Login.tsx';



describe('login', () => {
  
  it('should display Login as the heading', () => {
    render(<Login />);
    const headingElement = screen.getByRole('heading', {name: 'Login', level: 1})
    expect(headingElement).toBeInTheDocument();
  });
});
