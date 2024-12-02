import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Heart } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useThemeStore } from '../store/themeStore';

export const Header: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <header className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-sm transition-colors duration-200`}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <Headphones className="h-6 w-6" />
          <span>Podcast App</span>
        </Link>
        
        <nav className="flex items-center gap-4">
          <Link 
            to="/favorites" 
            className={`flex items-center gap-2 rounded-lg px-4 py-2 ${
              isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Heart className="h-5 w-5" />
            <span>Favorites</span>
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};