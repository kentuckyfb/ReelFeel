import Link from 'next/link';
import { Moon, Sun, Bug, Home, Info, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ darkMode, setDarkMode, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full flex justify-center z-50">
      <div
        className="w-full md:w-[70%] p-4 flex justify-between items-center rounded-b-xl shadow-lg"
        style={{
          backgroundColor: theme.secondary,
          color: 'white',
          borderBottom: `1px solid ${theme.accent}`,
        }}
      >
        <div className="text-2xl font-bold" style={{ color: theme.accent }}>
          <Link href="/" className="hover:text-orange-500 transition-all" style={{ fontWeight: '600' }}>
            REELFEEL
          </Link>
        </div>

        {/* Hamburger Menu Button (Mobile) */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-full transition-all"
          style={{ color: 'white' }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            style={{ color: 'white', fontWeight: '500' }}
            className="transition-all hover:text-orange-500 flex items-center"
          >
            <Home size={20} className="mr-2" /> Home
          </Link>
          <Link
            href="/about"
            style={{ color: 'white', fontWeight: '500' }}
            className="transition-all hover:text-orange-500 flex items-center"
          >
            <Info size={20} className="mr-2" /> About Us
          </Link>
          <Link
            href="/bug-fixes"
            style={{ color: 'white', fontWeight: '500' }}
            className="transition-all hover:text-orange-500 flex items-center"
          >
            <Bug size={20} className="mr-2" /> Bug/Fixes
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full shadow-lg transition flex items-center justify-center"
            style={{ backgroundColor: theme.background }}
          >
            {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} style={{ color: 'white' }} />}
          </button>
        </nav>

        {/* Mobile Navigation (Dropdown) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-16 left-0 w-full bg-gray-800 md:hidden rounded-b-xl shadow-lg"
              style={{ backgroundColor: theme.secondary }}
            >
              <div className="flex flex-col space-y-4 p-4">
                <Link
                  href="/"
                  style={{ color: 'white', fontWeight: '500' }}
                  className="transition-all hover:text-orange-500 flex items-center"
                  onClick={toggleMenu}
                >
                  <Home size={20} className="mr-2" /> Home
                </Link>
                <Link
                  href="/about"
                  style={{ color: 'white', fontWeight: '500' }}
                  className="transition-all hover:text-orange-500 flex items-center"
                  onClick={toggleMenu}
                >
                  <Info size={20} className="mr-2" /> About Us
                </Link>
                <Link
                  href="/bug-fixes"
                  style={{ color: 'white', fontWeight: '500' }}
                  className="transition-all hover:text-orange-500 flex items-center"
                  onClick={toggleMenu}
                >
                  <Bug size={20} className="mr-2" /> Bug/Fixes
                </Link>
                <button
                  onClick={() => {
                    setDarkMode(!darkMode);
                    toggleMenu();
                  }}
                  className="p-3 rounded-full shadow-lg transition flex items-center justify-center"
                  style={{ backgroundColor: theme.background }}
                >
                  {darkMode ? <Sun size={24} className="text-yellow-400" /> : <Moon size={24} style={{ color: 'white' }} />}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}