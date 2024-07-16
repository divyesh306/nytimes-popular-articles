import { configureStore } from '@reduxjs/toolkit';
import mostPopulerNewssSlice, { getPopulerNews } from './slices/mostPopulerNewssSlice';

// Test the store configuration
describe('Redux Store', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                populernewsSlice: mostPopulerNewssSlice,
            },
        });
    });

    test('should configure store with the mostPopulerNewssSlice reducer', () => {
        const state = store.getState();
        expect(state.populernewsSlice).toEqual({
            populerNews: [],
        });
    });

    test('should handle getPopulerNews action', () => {
        const newPopulerNews = [
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

        store.dispatch(getPopulerNews(newPopulerNews));
        const state = store.getState();
        expect(state.populernewsSlice.populerNews).toEqual(newPopulerNews);
    });
});
