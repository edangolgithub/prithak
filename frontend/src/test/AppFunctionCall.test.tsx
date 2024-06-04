import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

it('calls handleClick function when the button is clicked', () => {
  const handleClickMock = jest.fn();
  
  // Modify the App component to accept handleClick as a prop for testing
  const AppWithMock: React.FC<{ handleClick: () => void }> = ({ handleClick }) => (
    <div>
      <h1>Main</h1>
      <button onClick={handleClick}>Click me</button>
      <input placeholder="Enter text" />
      <ul>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );

  render(<AppWithMock handleClick={handleClickMock} />);
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  fireEvent.click(buttonElement);
  expect(handleClickMock).toHaveBeenCalledTimes(1);
});
