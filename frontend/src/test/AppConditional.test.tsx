
import { render, screen, fireEvent ,act} from '@testing-library/react';
import App1 from './Test';

it('renders a specific element conditionally', () => {
    act(() =>
        { 
       render(<App1 />);
      });
  const conditionalElement = screen.queryByText(/conditional element/i);
  expect(conditionalElement).toBeNull(); // Element should not be present initially

  act(() => {
    const button = screen.getByRole('button', { name: /show element/i });
    fireEvent.click(button);
  });


  const updatedElement = screen.getByText(/conditional element/i);
  expect(updatedElement).toBeInTheDocument();
});
