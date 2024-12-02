// Types for the podcast data structures
export interface Preview {
  id: number;
  title: string;
  description: string;
  seasons: number;
  image: string;
  genres: number[];
  updated: string;
}

export interface Show {
  id: number;
  title: string;
  description: string;
  seasons: Season[];
  image: string;
}

export interface Season {
  id: number;
  title: string;
  image: string;
  episodes: Episode[];
}

export interface Episode {
  id: number;
  title: string;
  description: string;
  file: string;
}

export interface Genre {
  id: number;
  title: string;
}

// Genre mapping as specified in requirements
export const GENRE_MAP: Record<number, string> = {
  1: 'Personal Growth',
  2: 'Investigative Journalism',
  3: 'History',
  4: 'Comedy',
  5: 'Entertainment',
  6: 'Business',
  7: 'Fiction',
  8: 'News',
  9: 'Kids and Family'
};