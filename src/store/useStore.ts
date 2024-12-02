import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Episode, Show } from '../types/podcast';

/**
 * Extended Episode interface that includes additional metadata
 * for favorites and show/season association
 */
interface FavoriteEpisode extends Episode {
  showId: number;
  showTitle: string;
  seasonId: number;
  seasonTitle: string;
  addedAt: string;
}

/**
 * Audio player state interface
 * Tracks current episode, playback status, and progress
 */
interface AudioState {
  currentEpisode: FavoriteEpisode | null;
  isPlaying: boolean;
  progress: number;
}

/**
 * Main application state interface
 * Manages favorites, completed episodes, and audio playback
 */
interface StoreState {
  favorites: FavoriteEpisode[];
  completedEpisodes: number[];
  audioState: AudioState;
  addFavorite: (episode: Episode, show: Show, seasonId: number, seasonTitle: string) => void;
  removeFavorite: (episodeId: number) => void;
  setCurrentEpisode: (episode: FavoriteEpisode | null) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  addCompletedEpisode: (episodeId: number) => void;
  resetProgress: () => void;
}

/**
 * Global state management using Zustand
 * Includes persistence middleware for localStorage
 */
export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      // Initial state
      favorites: [],
      completedEpisodes: [],
      audioState: {
        currentEpisode: null,
        isPlaying: false,
        progress: 0,
      },

      // Actions for managing favorites
      addFavorite: (episode, show, seasonId, seasonTitle) => set((state) => ({
        favorites: [
          ...state.favorites,
          {
            ...episode,
            showId: show.id,
            showTitle: show.title,
            seasonId,
            seasonTitle,
            addedAt: new Date().toISOString(),
          },
        ],
      })),
      removeFavorite: (episodeId) => set((state) => ({
        favorites: state.favorites.filter((fav) => fav.id !== episodeId),
      })),

      // Audio player controls
      setCurrentEpisode: (episode) => set((state) => ({
        audioState: { ...state.audioState, currentEpisode: episode },
      })),
      setIsPlaying: (isPlaying) => set((state) => ({
        audioState: { ...state.audioState, isPlaying },
      })),
      setProgress: (progress) => set((state) => ({
        audioState: { ...state.audioState, progress },
      })),

      // Episode progress tracking
      addCompletedEpisode: (episodeId) => set((state) => ({
        completedEpisodes: [...state.completedEpisodes, episodeId],
      })),
      resetProgress: () => set({ completedEpisodes: [] }),
    }),
    {
      name: 'podcast-storage', // localStorage key
    }
  )
);