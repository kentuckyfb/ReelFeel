// pages/api/recommend.js
import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    
    try {
      // Extract the request body
      const { prompt, filters, top_n } = req.body;

      // Forward the request to the FastAPI backend
      const fastApiResponse = await axios.post('http://localhost:8000/recommend', {
        prompt,
        filters,
        top_n,
      });
      // Return the recommendations from the FastAPI backend
      res.status(200).json(fastApiResponse.data);
    } catch (error) {
      console.error('Error in recommend API route:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Internal Server Error', details: error.response ? error.response.data : error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}