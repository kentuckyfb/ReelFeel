import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer({ darkMode, theme }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <motion.div
        className="w-full md:w-[70%] p-4 flex flex-col md:flex-row justify-between items-center rounded-t-xl shadow-vercel dark:shadow-vercel-dark glass"
        style={{
          backgroundColor: theme.background + '80',
          color: theme.text,
          borderTop: `1px solid ${theme.border}`,
          backdropFilter: 'blur(10px)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
      >
        <motion.div 
          className="flex items-center space-x-4 mb-4 md:mb-0"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/pp-nobg.png"
              alt="Developer"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <p className="text-sm font-medium" style={{ color: theme.text }}>Developed by kentuckyfb</p>
        </motion.div>
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a
            href="https://github.com/your-github"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-effect p-2 rounded-full hover:bg-hover"
            style={{ color: theme.text }}
          >
            <Github size={24} />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-effect p-2 rounded-full hover:bg-hover"
            style={{ color: theme.text }}
          >
            <Linkedin size={24} />
          </a>
        </motion.div>
      </motion.div>
    </footer>
  );
}