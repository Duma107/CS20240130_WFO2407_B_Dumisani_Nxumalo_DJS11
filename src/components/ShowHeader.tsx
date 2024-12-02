import React from 'react';
import { Show } from '../types/podcast';
import { useThemeStore } from '../store/themeStore';

interface ShowHeaderProps {
  show: Show;
}

export const ShowHeader: React.FC<ShowHeaderProps> = ({ show }) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="mb-8 grid gap-8 md:grid-cols-[300px,1fr]">
      <img
        src={show.image}
        alt={show.title}
        className="h-[300px] w-full rounded-lg object-cover shadow-lg md:w-[300px]"
      />
      
      <div>
        <h1 className={`mb-4 text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {show.title}
        </h1>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
          {show.description}
        </p>
      </div>
    </div>
  );
};