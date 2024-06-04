
import { fireEvent, render, screen,act } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  act(() =>
     { 
    render(<App />);
   });

  const linkElement = screen.getByText(/main/i);
  expect(linkElement).toBeInTheDocument();
});

// it('renders a button with specific text', () => {
//   render(<App />);
//   const buttonElement = screen.getByRole('button', { name: /click me/i });
//   expect(buttonElement).toBeInTheDocument();
// });

// it('renders an input field and allows typing', () => {
//   render(<App />);
//   const inputElement = screen.getByPlaceholderText(/enter text/i) as HTMLInputElement;
//   expect(inputElement).toBeInTheDocument();
//   fireEvent.change(inputElement, { target: { value: 'test' } });
//   expect(inputElement.value).toBe('test');
// });
// it('n1',()=>{
//   render(<App />);

// })