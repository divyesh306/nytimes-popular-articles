import axios from 'axios';
import Apiservices from './Apiservices';

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
jest.mock('axios', () => ({
    get: jest.fn(() => Promise.resolve({
        data: {
            results: mockArticles
        },
    })),
}));

describe('apiService', () => {
    process.env.REACT_APP_API_KEY = 'ByNSqqptRSRuPiL1yoMPDbktIzSVlANU';
    process.env.REACT_APP_BASE_URL = 'https://api.nytimes.com/svc/mostpopular/v2/viewed';

    it('should fetch the most popular articles', async () => {
        const result = await Apiservices.getMostPopularArticles();

        expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/1.json?api-key=${process.env.REACT_APP_API_KEY}`);
        expect(result).toEqual(mockArticles);
    });

    it('should fetch the most popular articles for a given period', async () => {
        const period = 7;
        const result = await Apiservices.getMostPopularArticles(period);

        expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_BASE_URL}/${period}.json?api-key=${process.env.REACT_APP_API_KEY}`);
        expect(result).toEqual(mockArticles);
    });

    it('should throw an error if the API call fails', async () => {
        axios.get.mockImplementationOnce(() => Promise.reject(new Error('API request failed')));
        await expect(Apiservices.getMostPopularArticles()).rejects.toThrowError('API request failed');
    });
});
