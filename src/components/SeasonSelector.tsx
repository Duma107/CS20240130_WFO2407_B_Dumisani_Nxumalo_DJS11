import React from 'react';
import { Season } from '../types/podcast';
import { useThemeStore } from '../store/themeStore';

interface SeasonSelectorProps {
  seasons: Season[];
  selectedSeason: Season | null;
  onSeasonChange: (season: Season) => void;
}

export const SeasonSelector: React.FC<SeasonSelectorProps> = ({
  seasons,
  selectedSeason,
  onSeasonChange,
}) => {
  const { isDarkMode } = useThemeStore();

  return (
    <div className="mb-8">
      <select
        value={selectedSeason?.id || ''}
        onChange={(e) => {
          const season = seasons.find(s => s.id === Number(e.target.value));
          if (season) onSeasonChange(season);
        }}
        className={`w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
          isDarkMode ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-800'
        }`}
      >
        {seasons.map((season) => (
          <option 
            key={`season-${season.id}`} 
            value={season.id}
            className={isDarkMode ? 'bg-gray-800' : 'bg-white'}
          >
            {season.title}
          </option>
        ))}
      </select>
    </div>
  );
};