import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, Film, Calendar, Star, Globe } from 'lucide-react';
import Head from 'next/head';

export default function Home({ theme, darkMode, setDarkMode }) {
  const [mood, setMood] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState([]);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [showRatingDropdown, setShowRatingDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const yearDropdownRef = useRef(null);
  const genreDropdownRef = useRef(null);
  const ratingDropdownRef = useRef(null);
  const languageDropdownRef = useRef(null);

  const years = Array.from({ length: new Date().getFullYear() - 1950 + 1 }, (_, i) => 1950 + i).reverse();
  const genres = ['Action', 'Comedy', 'Drama', 'Sci-Fi', 'Thriller', 'Romance', 'Horror'];
  const ratings = ['1.0', '2.0', '3.0', '4.0', '5.0', '6.0', '7.0', '8.0', '9.0', '10.0'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese', 'Korean'];

  const getRecommendation = async () => {
    setLoading(true);
    setMovie([]);

    try {
      const requestBody = {
        prompt: mood,
        filters: {
          genres: genre,
          year: Number(year),
          rating: Number(rating),
        },
        top_n: 3,
      };

      const response = await axios.post('/api/recommend', requestBody);

      if (response.data.recommendations) {
        setMovie(Array.isArray(response.data.recommendations) ? response.data.recommendations : [response.data.recommendations]);
      } else {
        setMovie([]);
      }
    } catch (error) {
      console.error('Error fetching recommendation', error);
      setMovie([]);
    } finally {
      setLoading(false);
    }
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

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (yearDropdownRef.current && !yearDropdownRef.current.contains(event.target)) {
        setShowYearDropdown(false);
      }
      if (genreDropdownRef.current && !genreDropdownRef.current.contains(event.target)) {
        setShowGenreDropdown(false);
      }
      if (ratingDropdownRef.current && !ratingDropdownRef.current.contains(event.target)) {
        setShowRatingDropdown(false);
      }
      if (languageDropdownRef.current && !languageDropdownRef.current.contains(event.target)) {
        setShowLanguageDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [yearDropdownRef, genreDropdownRef, ratingDropdownRef, languageDropdownRef]);

  return (
    <motion.div
      className={`max-w-lg w-full p-4 md:p-8 rounded-3xl border shadow-lg mx-4`} // Adjusted padding and margin
      style={{ backgroundColor: theme.background, color: 'white', borderColor: theme.secondary }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Head>
        <title>ReelFeel</title>
        <meta name="description" content="Find movies based on your mood!" />
      </Head>
      <h1
        className="text-xl md:text-2xl font-semibold mb-6 md:mb-8" // Adjusted font size for smaller screens
        style={{
          backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.secondary})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: `1px 1px 2px ${theme.secondary}`,
        }}
      >
        <Film size={24} className="inline-block mr-2" /> Because 'I want a movie' is a terrible search term.
      </h1>
      <div className="flex flex-col md:flex-row items-center mb-6 gap-4"> {/* Stack vertically on small screens */}
        <input
          type="text"
          placeholder="Describe the mood you're in..."
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className={`w-full p-3 md:p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-${theme.accent} border`}
          style={{
            backgroundColor: theme.secondary,
            color: 'white',
            borderColor: theme.secondary,
          }}
        />
        <motion.button
          onClick={getRecommendation}
          whileHover={{ scale: 1.1, boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.3)" }}
          whileTap={{ scale: 0.9 }}
          className={`p-3 md:p-4 rounded-xl flex items-center justify-center shadow-md w-full md:w-auto`} // Full width on small screens
          style={{ backgroundColor: theme.accent, color: 'white' }}
        >
          <Search size={24} />
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8"> {/* Stack vertically on small screens */}
        <Dropdown
          label="Select Year"
          value={year}
          options={years.map(y => y.toString())}
          onSelect={(val) => handleSelect('year', val)}
          showDropdown={showYearDropdown}
          toggleDropdown={() => toggleDropdown('year')}
          dropdownRef={yearDropdownRef}
          theme={theme}
          icon={<Calendar size={16} />}
        />
        <Dropdown
          label="Select Genre"
          value={genre}
          options={genres}
          onSelect={(val) => handleSelect('genre', val)}
          showDropdown={showGenreDropdown}
          toggleDropdown={() => toggleDropdown('genre')}
          dropdownRef={genreDropdownRef}
          theme={theme}
          icon={<Film size={16} />}
        />
        <Dropdown
          label="Select Rating"
          value={rating}
          options={ratings}
          onSelect={(val) => handleSelect('rating', val)}
          showDropdown={showRatingDropdown}
          toggleDropdown={() => toggleDropdown('rating')}
          dropdownRef={ratingDropdownRef}
          theme={theme}
          icon={<Star size={16} />}
        />
        <Dropdown
          label="Select Language"
          value={language}
          options={languages}
          onSelect={(val) => handleSelect('language', val)}
          showDropdown={showLanguageDropdown}
          toggleDropdown={() => toggleDropdown('language')}
          dropdownRef={languageDropdownRef}
          theme={theme}
          icon={<Globe size={16} />}
        />
      </div>

      {loading && (
        <div className="text-center mt-8">
          <svg className="animate-spin h-12 w-12" style={{ color: theme.accent }} viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
          </svg>
          <p className="mt-2" style={{ color: 'white' }}>Searching...</p>
        </div>
      )}

      <AnimatePresence>
        {movie.length > 0 ? (
          <motion.div
            className="mt-8 w-full space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {movie.map((m, index) => (
              <motion.div
                key={index}
                className={`p-4 md:p-6 rounded-2xl border`} // Adjusted padding
                style={{
                  backgroundColor: theme.secondary,
                  color: 'white',
                  borderColor: theme.secondary,
                }}
                whileHover={{ scale: 1.03 }}
              >
                <h2 className="text-xl md:text-2xl font-semibold mb-3">{m.name}</h2> {/* Adjusted font size */}
                <p className="text-sm md:text-md mb-2" style={{ color: 'white' }}>{m.description}</p> {/* Adjusted font size */}
                <div className="grid grid-cols-2 gap-4">
                  <p className="text-sm md:text-md font-medium"><Film size={14} className="inline-block mr-1" /> {m.genres}</p>
                  <p className="text-sm md:text-md font-medium"><Calendar size={14} className="inline-block mr-1" /> {m.year}</p>
                  <p className="text-sm md:text-md font-medium"><Star size={14} className="inline-block mr-1" /> {m.rating}</p>
                  <p className="text-sm md:text-md font-medium"><Globe size={14} className="inline-block mr-1" /> {m.language}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          !loading && (
            <motion.div
              className={`mt-8 p-4 md:p-6 rounded-2xl border text-center`} // Adjusted padding
              style={{
                backgroundColor: theme.secondary,
                color: 'white',
                borderColor: theme.secondary,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm md:text-md text-center" style={{ color: 'white' }}>No recommendations found. Try adjusting your search criteria.</p>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const Dropdown = ({ label, value, options, onSelect, showDropdown, toggleDropdown, dropdownRef, theme, icon }) => {
  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className={`w-full p-3 md:p-4 rounded-xl flex items-center justify-between transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-${theme.accent} shadow-sm`}
        style={{ backgroundColor: theme.secondary, color: 'white', borderColor: theme.secondary }}
      >
        <div className="flex items-center" style={{ color: 'white' }}>
          {icon && <span className="mr-2">{icon}</span>}
          {value || label}
        </div>
        <ChevronDown size={20} style={{ color: 'white' }} />
      </button>
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-20 w-full mt-2 rounded-xl shadow-lg overflow-y-auto max-h-48 border`}
            style={{ backgroundColor: theme.secondary, color: 'white', borderColor: theme.secondary }}
          >
            {options.map((option) => (
              <button
                key={option}
                onClick={() => onSelect(option)}
                className={`w-full p-3 text-left transition-all hover:bg-${theme.accent}10`}
                style={{ color: 'white' }}
              >
                {option}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};