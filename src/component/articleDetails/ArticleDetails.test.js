import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ArticleDetails from './ArticleDetails';
import DefaultImg from '../../assets/default-image-icon-missing-picture.jpg';

describe('ArticleDetails component', () => {
  const mockArticle = {
    title: 'Test Article',
    abstract: 'This is a test abstract.',
    updated: '2023-07-15T12:00:00Z',
    byline: 'By Test Author',
    media: [
      {
        'media-metadata': [
          { url: 'https://example.com/image1.jpg' },
          { url: 'https://example.com/image2.jpg' },
          { url: 'https://example.com/image3.jpg' }
        ]
      }
    ]
  };

  const onBackToList = jest.fn();

  it('renders the article details correctly', () => {
    render(<ArticleDetails article={mockArticle} onBacktoList={jest.fn()} />);

    // Check if the title is rendered
    expect(screen.getByText('Test Article')).toBeInTheDocument();

    // Check if the abstract is rendered
    expect(screen.getByText('This is a test abstract.')).toBeInTheDocument();

    // Check if the updated date is rendered correctly
    expect(screen.getByText('Sat Jul 15 2023')).toBeInTheDocument();

    // Check if the byline is rendered
    expect(screen.getByText('By Test Author')).toBeInTheDocument();

    // Check if the image is rendered with the correct src
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/image3.jpg');
    expect(img).toHaveAttribute('alt', 'Test Article');
  });

  it('renders the default image if no media is provided', () => {
    const articleWithoutMedia = { ...mockArticle, media: [] };
    render(<ArticleDetails article={articleWithoutMedia} onBacktoList={jest.fn()} />);

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', DefaultImg);
  });

  it('calls onBackToList when button is clicked', () => {
    const mockOnBacktoList = jest.fn();
    render(<ArticleDetails article={mockArticle} onBacktoList={mockOnBacktoList} />);

    const button = screen.getByRole('button', { name: /back to list/i });
    fireEvent.click(button);

    expect(mockOnBacktoList).toHaveBeenCalledWith(null);
  });
});