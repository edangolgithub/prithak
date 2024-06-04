import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

it('renders a list with the correct number of items', () => {
  render(<App />);
  const listItems = screen.getAllByRole('listitem');
  expect(listItems).toHaveLength(3); // Assuming there are 3 items in the list
});
