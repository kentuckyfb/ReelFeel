import axios from 'axios';

const apiKey = 'be73b5e81e23018f70909d074e1b8f79';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { mood, year, genre, language, rating } = req.body;

  try {
    const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
      params: {
        api_key: apiKey,
        with_genres: genre,
        primary_release_year: year,
        certification_country: 'US', // Adjust as needed
        certification: rating,
        sort_by: 'popularity.desc',
      },
    });

    let movies = response.data.results;

    if (!movies || movies.length === 0) {
      return res.status(404).json({ error: 'No movies found matching your criteria.' });
    }

    // Client-side language filtering
    movies = movies.filter((movie) => movie.original_language === language.substring(0, 2).toLowerCase());

    if (movies.length === 0) {
      return res.status(404).json({ error: `No movies found with the specified language: ${language}.` });
    }

    // Randomly select one movie
    const randomIndex = Math.floor(Math.random() * movies.length);
    const recommendedMovie = movies[randomIndex];

    if (recommendedMovie) {
      res.json({
        title: recommendedMovie.title,
        description: recommendedMovie.overview,
        genre,
        year,
        language,
        rating,
      });
    } else {
      res.status(404).json({ error: 'No movies found.' });
    }
  } catch (error) {
    console.error('API Error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      res.status(error.response.status).json({ error: `API Error: ${error.response.data.status_message || error.message}` });
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).json({ error: 'Network error. Please check your connection.' });
    } else {
      // Something happened in setting up the request that triggered an Error
      res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
    }
  }
}