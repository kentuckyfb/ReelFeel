import Image from 'next/image';
import { Github, Linkedin } from 'lucide-react';

export default function Footer({ darkMode, theme }) {
  return (
    <footer className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <div
        className="w-full md:w-[70%] p-4 flex flex-col md:flex-row justify-between items-center rounded-t-xl shadow-lg"
        style={{
          backgroundColor: theme.secondary,
          color: 'white',
          borderTop: `1px solid ${theme.accent}`,
        }}
      >
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src="/pp-nobg.png" // Replace with your image path
              alt="Developer"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          <p style={{ color: 'white', fontWeight: '500' }}>Developed by kentuckyfb</p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://github.com/your-github" // Replace with your GitHub link
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <Github size={24} className="hover:text-orange-500 transition-all" />
          </a>
          <a
            href="https://linkedin.com/in/your-linkedin" // Replace with your LinkedIn link
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <Linkedin size={24} className="hover:text-orange-500 transition-all" />
          </a>
        </div>
      </div>
    </footer>
  );
}