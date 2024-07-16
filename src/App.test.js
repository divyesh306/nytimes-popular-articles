// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/NY Times Most Popular Articles/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for the "toBeInTheDocument" matcher
import App from './App';
import ArticleList from './component/articleList/ArticleList';

// Mock the ArticleList component
jest.mock('./component/articleList/ArticleList', () => () => <div>Mocked ArticleList</div>);

test('renders App component with heading and ArticleList', () => {
  render(<App />);

  // Check for the heading
  const headingElement = screen.getByText(/NY Times Most Popular Articles/i);
  expect(headingElement).toBeInTheDocument();
  expect(headingElement).toHaveClass('text-3xl', 'font-bold', 'mb-6', 'text-center');

  // Check for the ArticleList component
  const articleListElement = screen.getByText('Mocked ArticleList');
  expect(articleListElement).toBeInTheDocument();
});
