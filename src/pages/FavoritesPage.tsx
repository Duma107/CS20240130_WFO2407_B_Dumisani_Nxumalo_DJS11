import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { formatDistanceToNow } from 'date-fns';
import { Play, Trash2, ArrowUpDown } from 'lucide-react';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, setCurrentEpisode } = useStore();
  const [sortBy, setSortBy] = useState<'title' | 'date'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else {
      return sortOrder === 'asc'
        ? new Date(a.addedAt).getTime() - new Date(b.addedAt).getTime()
        : new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime();
    }
  });

  // Group favorites by show
  const groupedFavorites = sortedFavorites.reduce((acc, episode) => {
    const key = episode.showId;
    if (!acc[key]) {
      acc[key] = {
        showTitle: episode.showTitle,
        episodes: [],
      };
    }
    acc[key].episodes.push(episode);
    return acc;
  }, {} as Record<string, { showTitle: string; episodes: typeof favorites }>);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Favorites</h1>
        
        <div className="flex items-center gap-4">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'title' | 'date')}
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="title">Sort by Title</option>
            <option value="date">Sort by Date</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            <ArrowUpDown className="h-4 w-4" />
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
      </div>

      {Object.entries(groupedFavorites).map(([showId, { showTitle, episodes }]) => (
        <div key={showId} className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold">{showTitle}</h2>
          <div className="space-y-4">
            {episodes.map((episode) => (
              <div
                key={episode.id}
                className="flex items-center justify-between rounded-lg bg-white p-4 shadow-md"
              >
                <div className="flex-1">
                  <h3 className="font-medium">{episode.title}</h3>
                  <p className="text-sm text-gray-500">
                    {episode.seasonTitle} • Added {formatDistanceToNow(new Date(episode.addedAt))} ago
                  </p>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentEpisode(episode)}
                    className="rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700"
                  >
                    <Play className="h-5 w-5" />
                  </button>
                  
                  <button
                    onClick={() => removeFavorite(episode.id)}
                    className="rounded-full bg-white p-2 text-gray-600 hover:bg-gray-50"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg bg-white py-16 text-center">
          <p className="text-xl font-medium text-gray-600">No favorites yet</p>
          <p className="text-gray-500">Start adding episodes to your favorites!</p>
        </div>
      )}
    </div>
  );
};