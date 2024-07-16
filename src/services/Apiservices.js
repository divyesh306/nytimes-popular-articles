import axios from 'axios';

const apiService = {
  async getMostPopularArticles(period = 1) {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/${period}.json?api-key=${process.env.REACT_APP_API_KEY}`);
      return response.data.results; // Return the array of articles
    } catch (error) {
      throw error;
    }
  }
}

export default apiService;