import React from 'react';
import {render, screen} from '@testing-library/react';
import OnlineBar from '../client/components/OnlineBar';
import '@testing-library/jest-dom';

describe('OnlineBar', () => {
  const users = [
    {
      name: 'Miko',
      gender: 'male',
      main: 'traveler-anemo'
    },
    {
      name: 'Mochi',
      gender: 'female',
      main: 'traveler-anemo'
    }
  ]
  beforeEach(() => {
    render(<OnlineBar users={users}/>)
  });

  it('online users box should be present', () => {
    const onlineUsersElement = screen.getByText(/online/i);
    expect(onlineUsersElement).toBeInTheDocument();
  });

  it('online Users box should display users that are online', () => {
    screen.debug();
    const user1 = screen.getByText(/Miko/i);
    const user2 = screen.getByText(/Mochi/i);
    expect(user1).toBeInTheDocument();
    expect(user2).toBeInTheDocument();
  });
})