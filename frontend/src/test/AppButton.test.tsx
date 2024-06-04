
import { render, screen, act } from '@testing-library/react';
import App from '../App';

it('renders a button with specific text', () => {
    act(() =>
        { 
       render(<App />);
      });
  const buttonElement = screen.getByRole('button', { name: /click me/i });
  expect(buttonElement).toBeInTheDocument();
});
