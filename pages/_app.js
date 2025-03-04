import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css'; // Ensure you have global styles

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const themeColors = {
    light: {
      
      background: '#727D73',  
      text: '#F0F0D7',        
      accent: '#D0DDD0',      
      secondary: '#AAB99A',  
    },
    dark: {
      background: '#A27B5C',
      text: '#DCD7C9',
      accent: '#2C3930',
      secondary: '#3F4F44',
    },
  };
  const currentTheme = darkMode ? themeColors.dark : themeColors.light;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: currentTheme.background, color: currentTheme.text }}
    >
      <Header darkMode={darkMode} setDarkMode={setDarkMode} theme={currentTheme} />
      <main className="flex-grow flex items-center justify-center"> {/* Centering Content */}
        <Component {...pageProps} theme={currentTheme} /> {/* Pass theme to page components */}
      </main>
      <Footer darkMode={darkMode} theme={currentTheme} />
    </div>
  );
}

export default MyApp;