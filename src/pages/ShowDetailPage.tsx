import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Show, Season } from '../types/podcast';
import { ShowHeader } from '../components/ShowHeader';
import { SeasonSelector } from '../components/SeasonSelector';
import { EpisodeList } from '../components/EpisodeList';
import { useThemeStore } from '../store/themeStore';
import { fetchShow, ApiError } from '../services/api';
import { ErrorBoundary } from '../components/ErrorBoundary';

export const ShowDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [show, setShow] = useState<Show | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isDarkMode } = useThemeStore();

  useEffect(() => {
    const loadShow = async () => {
      if (!id) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchShow(id);
        setShow(data);
        setSelectedSeason(data.seasons[0]);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    loadShow();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-red-50 p-4 dark:bg-red-900">
          <p className="text-red-800 dark:text-red-200">{error}</p>
        </div>
      </div>
    );
  }

  if (!show) return null;

  return (
    <div className={`container mx-auto px-4 py-8 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
      <ErrorBoundary>
        <ShowHeader show={show} />
        <SeasonSelector
          seasons={show.seasons}
          selectedSeason={selectedSeason}
          onSeasonChange={setSelectedSeason}
        />
        {selectedSeason && (
          <EpisodeList 
            key={`${show.id}-${selectedSeason.id}`}
            show={show} 
            season={selectedSeason} 
          />
        )}
      </ErrorBoundary>
    </div>
  );
};