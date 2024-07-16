import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider,  } from 'react-redux';
import configureStore from 'redux-mock-store';
import ArticleList from './ArticleList';
import Apiservices from '../../services/Apiservices';
import { getPopulerNews } from '../../store/slices/mostPopulerNewssSlice';

jest.mock('../../services/Apiservices');
const mockStore = configureStore([]);
const mockArticles = [
  {
    id: 1,
    title: 'Test Article 1',
    abstract: 'This is a test abstract 1.',
    updated: '2023-07-15T12:00:00Z',
    byline: 'By Test Author 1',
    media: [
      {
        'media-metadata': [
          { url: 'https://example.com/image1.jpg' },
          { url: 'https://example.com/image2.jpg' },
          { url: 'https://example.com/image3.jpg' }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Test Article 2',
    abstract: 'This is a test abstract 2.',
    updated: '2023-07-16T12:00:00Z',
    byline: 'By Test Author 2',
    media: [
      {
        'media-metadata': [
          { url: 'https://example.com/image1.jpg' },
          { url: 'https://example.com/image2.jpg' },
          { url: 'https://example.com/image3.jpg' }
        ]
      }
    ]
  }
];

describe('ArticleList', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      populernewsSlice: {
        populerNews: []
      }
    });

    Apiservices.getMostPopularArticles.mockResolvedValue(mockArticles);
  });

  it('fetches and displays articles', async () => {
    render(
      <Provider store={store}>
        <ArticleList />
      </Provider>
    );

    // Verify that the API service is called once
    await waitFor(() => {
      expect(Apiservices.getMostPopularArticles).toHaveBeenCalledTimes(1);
    });

    // Dispatch the action to update the store
    store.dispatch(getPopulerNews(mockArticles));

    // Re-render the component with the updated store
    render(
      <Provider store={store}>
        <ArticleList />
      </Provider>
    );

    // Verify that articles are displayed
    waitFor(() => {
    const articleElements = screen.findAllByText(/Article/i);
    expect(articleElements).toHaveLength(2);
    });
  });

  it('renders ArticleDetails when an article is selected', async () => {
    store = mockStore({
      populernewsSlice: {
        populerNews: mockArticles
      }
    });

    render(
      <Provider store={store}>
        <ArticleList />
      </Provider>
    );

    const articleTitle = screen.getByText('Test Article 1');
    fireEvent.click(articleTitle);

    await waitFor(() => {
      expect(screen.getByText('This is a test abstract 1.')).toBeInTheDocument();
      expect(screen.getByText('By Test Author 1')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /back to list/i })).toBeInTheDocument();
    });
  });

  it('returns to article list when back button is clicked in ArticleDetails', async () => {
    store = mockStore({
      populernewsSlice: {
        populerNews: mockArticles
      }
    });

    render(
      <Provider store={store}>
        <ArticleList />
      </Provider>
    );

    const articleTitle = screen.getByText('Test Article 1');
    fireEvent.click(articleTitle);

    await waitFor(() => {
      expect(screen.getByText('This is a test abstract 1.')).toBeInTheDocument();
    });

    const backButton = screen.getByRole('button', { name: /back to list/i });
    fireEvent.click(backButton);

    await waitFor(() => {
      mockArticles.forEach(article => {
        expect(screen.getByText(article.title)).toBeInTheDocument();
      });
    });
  });
});
