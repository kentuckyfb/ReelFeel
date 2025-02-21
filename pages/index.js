import { useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Search, ChevronDown } from 'lucide-react';
import Head from 'next/head';

export default function Home() {
  const [mood, setMood] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const yearDropdownRef = useRef(null);
  const genreDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  const years = Array.from({ length: new Date().getFullYear() - 2010 + 1 }, (_, i) => 2010 + i).reverse();
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Horror'];
  const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese', 'Korean'];

  const getRecommendation = async () => {
    setLoading(true);
    setMovie(null);
    try {
      const response = await axios.post('/api/recommend', { mood, year, genre, rating, language });
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching recommendation', error);
    }
    setLoading(false);
  };

  const toggleDropdown = (dropdownType) => {
    switch (dropdownType) {
      case 'year':
        setShowYearDropdown(!showYearDropdown);
        setShowGenreDropdown(false);
        setShowRatingDropdown(false);
        setShowLanguageDropdown(false);
        break;
      case 'genre':
        setShowGenreDropdown(!showGenreDropdown);
        setShowYearDropdown(false);
        setShowRatingDropdown(false);
        setShowLanguageDropdown(false);
        break;
      case 'rating':
        setShowRatingDropdown(!showRatingDropdown);
        setShowYearDropdown(false);
        setShowGenreDropdown(false);
        setShowLanguageDropdown(false);
        break;
      case 'language':
        setShowLanguageDropdown(!showLanguageDropdown);
        setShowYearDropdown(false);
        setShowGenreDropdown(false);
        setShowRatingDropdown(false);
        break;
      default:
        break;
    }
  };

  const handleSelect = (type, value) => {
    switch (type) {
      case 'year':
        setYear(value);
        setShowYearDropdown(false);
        break;
      case 'genre':
        setGenre(value);
        setShowGenreDropdown(false);
        break;
      case 'rating':
        setRating(value);
        setShowRatingDropdown(false);
        break;
      case 'language':
        setLanguage(value);
        setShowLanguageDropdown(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 font-Poppins ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white' : 'bg-gradient-to-br from-gray-100 via-white to-gray-200 text-gray-900'}`}>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-3 rounded-full ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'} shadow-lg transition flex items-center justify-center`}
        >
          {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} className="text-gray-800" />}
        </button>
      </div>

      <div className={`max-w-lg w-full p-8 rounded-3xl ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} shadow-2xl backdrop-blur-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'} text-center flex flex-col items-center`}>
        <h1 className="text-5xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          REELFEEL
        </h1>
        <input
          type="text"
          placeholder="Enter your mood..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6 transition-all`}
        />

        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="relative">
            <button
              onClick={() => toggleDropdown('year')}
              className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all shadow-sm`}
            >
              {year || 'Select Year'} <ChevronDown size={20} />
            </button>
            <AnimatePresence>
              {showYearDropdown && (
                <motion.div
                  ref={yearDropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} overflow-y-auto max-h-48`}
                >
                  {years.map((y) => (
                    <button
                      key={y}
                      onClick={() => handleSelect('year', y.toString())}
                      className={`w-full p-3 text-left hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'} transition-all`}
                    >
                      {y}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('genre')}
              className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all shadow-sm`}
            >
              {genre || 'Select Genre'} <ChevronDown size={20} />
            </button>
            <AnimatePresence>
              {showGenreDropdown && (
                <motion.div
                  ref={genreDropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} overflow-y-auto max-h-48`}
                >
                  {genres.map((g) => (
                    <button
                      key={g}
                      onClick={() => handleSelect('genre', g)}
                      className={`w-full p-3 text-left hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'} transition-all`}
                    >
                      {g}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('rating')}
              className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all shadow-sm`}
            >
              {rating || 'Select Rating'} <ChevronDown size={20} />
            </button>
            <AnimatePresence>
              {showRatingDropdown && (
                <motion.div
                  ref={ratingDropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} overflow-y-auto max-h-48`}
                >
                  {ratings.map((r) => (
                    <button
                      key={r}
                      onClick={() => handleSelect('rating', r)}
                      className={`w-full p-3 text-left hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'} transition-all`}
                    >
                      {r}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('language')}
              className={`w-full p-4 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center transition-all shadow-sm`}
            >
              {language || 'Select Language'} <ChevronDown size={20} />
            </button>
            <AnimatePresence>
              {showLanguageDropdown && (
                <motion.div
                  ref={languageDropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute z-10 w-full mt-2 rounded-xl shadow-lg ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} border ${darkMode ? 'border-gray-600' : 'border-gray-200'} overflow-y-auto max-h-48`}
                >
                  {languages.map((l) => (
                    <button
                      key={l}
                      onClick={() => handleSelect('language', l)}
                      className={`w-full p-3 text-left hover:${darkMode ? 'bg-gray-600' : 'bg-gray-100'} transition-all`}
                    >
                      {l}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <button
          onClick={getRecommendation}
          className={`w-16 h-16 rounded-full ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-all flex items-center justify-center shadow-lg hover:shadow-xl`}
        >
          <Search size={24} />
        </button>

        {loading && <div className="text-center mt-8 animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-12 h-12"></div>}

        <AnimatePresence>
          {movie && (
            <motion.div
              className={`mt-8 p-6 rounded-xl ${darkMode ? 'bg-gray-700/90' : 'bg-white/90'} shadow-lg backdrop-blur-lg border ${darkMode ? 'border-gray-600' : 'border-gray-200'} text-left w-full`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-3">{movie.title}</h2>
              <p className="text-md mb-2">{movie.description}</p>
              <p className="text-md font-semibold">Genre: {movie.genre}</p>
              <p className="text-md font-semibold">Year: {movie.year}</p>
              <p className="text-md font-semibold">Rating: {movie.rating}</p>
              <p className="text-md font-semibold">Language: {movie.language}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
};