
import { render, screen, fireEvent,act } from '@testing-library/react';
import App from '../App';

it('renders an input field and allows typing', () => {
    act(() =>
        { 
       render(<App />);
      });
  const inputElement = screen.getByPlaceholderText(/enter text/i) as HTMLInputElement;
  expect(inputElement).toBeInTheDocument();
  fireEvent.change(inputElement, { target: { value: 'test' } });
  expect(inputElement.value).toBe('test');
});
