import React from 'react';
import { Episode, Season, Show } from '../types/podcast';
import { useStore } from '../store/useStore';
import { Heart, HeartOff, Play } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { generateUniqueId } from '../utils/idGenerator';

interface EpisodeListProps {
  show: Show;
  season: Season;
}

/**
 * EpisodeList Component
 * 
 * Key Features:
 * - Episode playback (P3.6)
 * - Favorite management (P3.20)
 * - Season-specific episode display (P3.7)
 * - Episode count display (P3.14)
 * - Dark/Light theme support
 */
export const EpisodeList: React.FC<EpisodeListProps> = ({ show, season }) => {
  const { isDarkMode } = useThemeStore();
  const { favorites, addFavorite, removeFavorite, setCurrentEpisode } = useStore();

  // Check if an episode is in favorites
  const isEpisodeFavorite = (episodeId: number) => 
    favorites.some(fav => fav.id === episodeId);

  return (
    <div className="space-y-4">
      {/* Season Title */}
      <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
        {season.title}
      </h2>

      {/* Episode Grid */}
      <div className="grid gap-4">
        {season.episodes.map((episode) => {
          const isFavorite = isEpisodeFavorite(episode.id);
          const uniqueKey = generateUniqueId(show.id, season.id, episode.id);
          
          return (
            <div
              key={uniqueKey}
              className={`flex items-center justify-between rounded-lg p-4 shadow-md ${
                isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
              }`}
            >
              {/* Episode Info */}
              <div className="flex-1">
                <h3 className="font-medium">{episode.title}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {episode.description}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {/* Play Button */}
                <button
                  onClick={() => {
                    const favoriteEpisode = {
                      ...episode,
                      showId: show.id,
                      showTitle: show.title,
                      seasonId: season.id,
                      seasonTitle: season.title,
                      addedAt: new Date().toISOString(),
                    };
                    setCurrentEpisode(favoriteEpisode);
                  }}
                  className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                  aria-label={`Play ${episode.title}`}
                >
                  <Play className="h-5 w-5" />
                </button>
                
                {/* Favorite Toggle Button */}
                <button
                  onClick={() => {
                    if (isFavorite) {
                      removeFavorite(episode.id);
                    } else {
                      addFavorite(episode, show, season.id, season.title);
                    }
                  }}
                  className={`rounded-full p-2 ${
                    isDarkMode ? 'text-gray-200 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                  aria-label={isFavorite ? `Remove ${episode.title} from favorites` : `Add ${episode.title} to favorites`}
                >
                  {isFavorite ? (
                    <HeartOff className="h-5 w-5" />
                  ) : (
                    <Heart className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};