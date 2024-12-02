import React from 'react';
import { Link } from 'react-router-dom';
import { Preview } from '../types/podcast';
import { GENRE_MAP } from '../types/podcast';
import { formatDistanceToNow } from 'date-fns';
import { Headphones } from 'lucide-react';

interface ShowCardProps {
  show: Preview;
}

/**
 * ShowCard Component
 * 
 * Implements multiple user stories:
 * - Show preview images (P3.9)
 * - Display season count (P3.10)
 * - Show last updated date (P3.11)
 * - Display genre titles (P3.12)
 * 
 * Features:
 * - Responsive design
 * - Hover animations
 * - Accessible links
 * - Human-readable dates
 */
export const ShowCard: React.FC<ShowCardProps> = ({ show }) => {
  return (
    <Link 
      to={`/show/${show.id}`}
      className="group relative flex flex-col overflow-hidden rounded-lg bg-white shadow-lg transition-transform hover:scale-[1.02]"
    >
      {/* Image Container with Gradient Overlay */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={show.image}
          alt={show.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      
      <div className="flex flex-1 flex-col p-4">
        {/* Show Title */}
        <h2 className="mb-2 text-xl font-bold text-gray-900">{show.title}</h2>
        
        {/* Season Count */}
        <div className="mb-2 flex items-center gap-2">
          <Headphones className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{show.seasons} seasons</span>
        </div>
        
        {/* Genre Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {show.genres.map((genreId) => (
            <span
              key={genreId}
              className="rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-800"
            >
              {GENRE_MAP[genreId]}
            </span>
          ))}
        </div>
        
        {/* Description */}
        <p className="line-clamp-2 text-sm text-gray-600">{show.description}</p>
        
        {/* Last Updated */}
        <div className="mt-auto pt-4 text-xs text-gray-500">
          Updated {formatDistanceToNow(new Date(show.updated))} ago
        </div>
      </div>
    </Link>
  );
};