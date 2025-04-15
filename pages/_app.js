import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css'; // Ensure you have global styles

function MyApp({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);
  const themeColors = {
    light: {
      background: '#ffffff',
      text: '#000000',
      accent: '#0070f3',
      secondary: '#fafafa',
      border: '#eaeaea',
      hover: '#f5f5f5'
    },
    dark: {
      background: '#111111',
      text: '#ffffff',
      accent: '#0070f3',
      secondary: '#1a1a1a',
      border: '#333333',
      hover: '#2a2a2a'
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