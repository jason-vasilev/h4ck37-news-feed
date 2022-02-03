import { render, screen } from '@testing-library/react';
import NewsCard from './NewsCard';

test('renders learn react link', () => {
  render(<NewsCard />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
