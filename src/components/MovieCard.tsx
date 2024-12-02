import React from 'react';
import { Star } from 'lucide-react';
import { Movie } from '../types/movie';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config/api';

interface MovieCardProps {
  movie: Movie;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const fallbackImage = 'https://via.placeholder.com/500x750?text=No+Image+Available';

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img
        src={movie.poster_path ? `${IMAGE_BASE_URL}/${POSTER_SIZE}${movie.poster_path}` : fallbackImage}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = fallbackImage;
        }}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 truncate dark:text-white">{movie.title}</h3>
        {typeof movie.vote_average === 'number' && (
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="dark:text-gray-200">{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {movie.overview || 'No description available'}
        </p>
      </div>
    </div>
  );
};