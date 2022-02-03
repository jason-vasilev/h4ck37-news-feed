import { render, screen } from '@testing-library/react';
import NewsFeed from './NewsFeed';

test('renders learn react link', () => {
  render(<NewsFeed />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
