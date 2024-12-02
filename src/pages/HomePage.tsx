import React, { useState, useEffect } from 'react';
import { Preview } from '../types/podcast';
import { ShowCard } from '../components/ShowCard';
import { Search, Filter } from 'lucide-react';
import { fetchPreviews, ApiError } from '../services/api';
import { ErrorDisplay } from '../components/ErrorDisplay';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useThemeStore } from '../store/themeStore';

/**
 * HomePage Component
 * 
 * Key Features Implemented:
 * - Show browsing with alphabetical sorting (P3.5)
 * - Genre filtering (P3.37)
 * - Search functionality
 * - Loading states (P3.18)
 * - Error handling with retry capability
 * - Responsive design (P3.44)
 */
export const HomePage: React.FC = () => {
  // State management for shows and UI controls
  const [shows, setShows] = useState<Preview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { isDarkMode } = useThemeStore();

  /**
   * Fetches show data from the API
   * Implements error handling and loading states
   */
  const loadShows = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPreviews();
      setShows(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred while fetching shows');
      }
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    loadShows();
  }, []);

  /**
   * Filters and sorts shows based on user preferences
   * Implements:
   * - Title search
   * - Genre filtering
   * - Alphabetical sorting
   */
  const filteredAndSortedShows = shows
    .filter((show) => {
      const matchesSearch = show.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre ? show.genres.includes(selectedGenre) : true;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    });

  // Loading state implementation (P3.18)
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ErrorBoundary>
        {error ? (
          <ErrorDisplay message={error} onRetry={loadShows} />
        ) : (
          <>
            {/* Search and Filter Controls */}
            <div className="mb-8 flex flex-wrap items-center gap-4">
              <div className="relative flex-1">
                <Search className={`absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 ${
                  isDarkMode ? 'text-gray-400' : 'text-gray-400'
                }`} />
                <input
                  type="text"
                  placeholder="Search shows..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full rounded-lg border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                    isDarkMode
                      ? 'border-gray-700 bg-gray-800 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-800 placeholder-gray-500'
                  }`}
                />
              </div>

              {/* Sort Order Toggle */}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className={`rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                  isDarkMode
                    ? 'border-gray-700 bg-gray-800 text-white'
                    : 'border-gray-300 bg-white text-gray-800'
                }`}
              >
                <option value="asc">A-Z</option>
                <option value="desc">Z-A</option>
              </select>
            </div>

            {/* Show Grid with Responsive Layout */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAndSortedShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>

            {/* Empty State */}
            {filteredAndSortedShows.length === 0 && (
              <div className={`mt-8 text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                <p className="text-lg">No shows found matching your criteria</p>
              </div>
            )}
          </>
        )}
      </ErrorBoundary>
    </div>
  );
};