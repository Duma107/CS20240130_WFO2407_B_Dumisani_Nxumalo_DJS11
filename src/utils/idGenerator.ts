/**
 * Generates a unique identifier for an episode
 * Combines show, season, and episode IDs to ensure uniqueness
 * Used for React key props and tracking favorites
 * 
 * @param showId - ID of the podcast show
 * @param seasonId - ID of the season
 * @param episodeId - ID of the episode
 * @returns Unique string identifier
 */
export const generateUniqueId = (showId: number, seasonId: number, episodeId: number): string => {
  return `episode-${showId}-${seasonId}-${episodeId}`;
};