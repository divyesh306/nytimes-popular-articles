# NY Times Most Popular Articles

## Description
This app fetches and displays the most popular articles from the NY Times using their Most Popular API. 

## Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add your API key: `REACT_APP_API_KEY=your_api_key` and BASE Url: `REACT_APP_BASE_URL=https://api.nytimes.com/svc/mostpopular/v2/viewed`
4. Run the app: `npm start`

## Running Tests
- To run unit tests: `npm test`

## Running E2E test using Cypress
- Run the app: `npm start`
- Check app run on your http://localhost:3000
- To run E2E tests: `npx cypress open` or `npm run e2e:chrome`

## Build
- To build the project: `npm run build`
