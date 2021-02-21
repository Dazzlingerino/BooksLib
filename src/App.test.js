import { render, screen } from '@testing-library/react';
import BooksList from "./components/BooksList";

test('renders learn react link', () => {
  render(<BooksList />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
