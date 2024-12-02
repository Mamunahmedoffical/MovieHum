import React from 'react';
import { Trophy } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface TopIMDBSectionProps {
  movies: Movie[];
}

export const TopIMDBSection: React.FC<TopIMDBSectionProps> = ({ movies }) => {
  return (
    <section className="py-8">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold">Top IMDB Movies</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};