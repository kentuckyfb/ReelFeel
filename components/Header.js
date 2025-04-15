import Link from 'next/link';
import { Moon, Sun, Bug, Home, Info, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header({ darkMode, setDarkMode, theme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorFollowerPosition, setCursorFollowerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      setTimeout(() => {
        setCursorFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className="cursor"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          borderColor: theme.accent,
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: `${cursorFollowerPosition.x}px`,
          top: `${cursorFollowerPosition.y}px`,
          backgroundColor: theme.accent + '20',
        }}
      />
      <header className="fixed top-0 left-0 w-full flex justify-center z-50">
        <div
          className="w-full md:w-[70%] p-4 flex justify-between items-center rounded-b-xl shadow-vercel dark:shadow-vercel-dark glass floating"
          style={{
            backgroundColor: theme.background + '80',
            color: theme.text,
            borderBottom: `1px solid ${theme.border}`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <div className="text-2xl font-bold">
            <Link href="/" className="hover:text-accent transition-all font-semibold glow-border">
              REELFEEL
            </Link>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-full transition-all hover:bg-hover glow-border"
            style={{ color: theme.text }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="hover-effect flex items-center text-sm font-medium glow-border"
              style={{ color: theme.text }}
            >
              <Home size={20} className="mr-2" /> Home
            </Link>
            <Link
              href="/about"
              className="hover-effect flex items-center text-sm font-medium glow-border"
              style={{ color: theme.text }}
            >
              <Info size={20} className="mr-2" /> About Us
            </Link>
            <Link
              href="/bug-fixes"
              className="hover-effect flex items-center text-sm font-medium glow-border"
              style={{ color: theme.text }}
            >
              <Bug size={20} className="mr-2" /> Bug/Fixes
            </Link>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 rounded-full shadow-vercel dark:shadow-vercel-dark transition hover:bg-hover glow-border"
              style={{ backgroundColor: theme.secondary }}
            >
              {darkMode ? <Sun size={24} className="text-accent" /> : <Moon size={24} style={{ color: theme.text }} />}
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
                className="absolute top-16 left-0 w-full md:hidden rounded-b-xl shadow-vercel dark:shadow-vercel-dark glass"
                style={{ 
                  backgroundColor: theme.background + '80',
                  borderBottom: `1px solid ${theme.border}`,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div className="flex flex-col space-y-4 p-4">
                  <Link
                    href="/"
                    className="hover-effect flex items-center text-sm font-medium glow-border"
                    style={{ color: theme.text }}
                    onClick={toggleMenu}
                  >
                    <Home size={20} className="mr-2" /> Home
                  </Link>
                  <Link
                    href="/about"
                    className="hover-effect flex items-center text-sm font-medium glow-border"
                    style={{ color: theme.text }}
                    onClick={toggleMenu}
                  >
                    <Info size={20} className="mr-2" /> About Us
                  </Link>
                  <Link
                    href="/bug-fixes"
                    className="hover-effect flex items-center text-sm font-medium glow-border"
                    style={{ color: theme.text }}
                    onClick={toggleMenu}
                  >
                    <Bug size={20} className="mr-2" /> Bug/Fixes
                  </Link>
                  <button
                    onClick={() => {
                      setDarkMode(!darkMode);
                      toggleMenu();
                    }}
                    className="p-3 rounded-full shadow-vercel dark:shadow-vercel-dark transition hover:bg-hover glow-border"
                    style={{ backgroundColor: theme.secondary }}
                  >
                    {darkMode ? <Sun size={24} className="text-accent" /> : <Moon size={24} style={{ color: theme.text }} />}
                  </button>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  );
}